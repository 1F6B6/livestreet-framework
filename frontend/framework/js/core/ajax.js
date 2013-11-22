/**
 * Ajax
 *
 * @module ajax
 *
 * @license   GNU General Public License, version 2
 * @copyright 2013 OOO "ЛС-СОФТ" {@link http://livestreetcms.com}
 * @author    Denis Shakhov <denis.shakhov@gmail.com>
 */

var ls = ls || {};

ls.ajax = (function ($) {
	"use strict";

	/**
	 * Выполнение AJAX запроса, автоматически передает security key
	 */
	this.load = function(url, params, callback, more) {
		more = more || {};
		params = params || {};

		if ( typeof LIVESTREET_SECURITY_KEY !== 'undefined' ) params.security_ls_key = LIVESTREET_SECURITY_KEY;

		$.each(params, function(k, v){
			if (typeof(v) == "boolean") {
				params[k] = v ? 1 : 0;
			}
		});

		if (url.indexOf('http://') != 0 && url.indexOf('https://') != 0 && url.indexOf('/') != 0) {
			url = aRouter['ajax'] + url + '/';
		}

		var ajaxOptions = $.extend({}, {
			type: "POST",
			url: url,
			data: params,
			dataType: 'json',
			success: callback || function(){
				ls.debug("ajax success: ");
				ls.debug.apply(ls, arguments);
			}.bind(this),
			error: function(msg){
				ls.debug("ajax error: ");
				ls.debug.apply(ls, arguments);
			}.bind(this),
			complete: function(msg){
				ls.debug("ajax complete: ");
				ls.debug.apply(ls, arguments);
			}.bind(this)
		}, more);

		ls.hook.run('ls_ajax_before', [ajaxOptions, callback, more], this);

		return $.ajax(ajaxOptions);
	};

	/**
	 * Выполнение AJAX отправки формы, включая загрузку файлов
	 */
	this.submit = function(url, form, callback, more) {
		var more = more || {},
			form = typeof form == 'string' ? $(form) : form,
			button = more.submitButton || form.find('[type=submit]').eq(0),
			params = more.params || {};

		params.security_ls_key = LIVESTREET_SECURITY_KEY;

		if (url.indexOf('http://') != 0 && url.indexOf('https://') != 0 && url.indexOf('/') != 0) {
			url = aRouter['ajax'] + url + '/';
		}

		var options = {
			type: 'POST',
			url: url,
			dataType: more.dataType || 'json',
			data: params,
			beforeSubmit: function (arr, form, options) {
				button && button.prop('disabled', true).addClass('loading');
			},
			beforeSerialize: function (form, options) {
				if (typeof more.validate == 'undefined' || more.validate === true) {
					return form.parsley('validate');
				}

				return true;
			},
			success: typeof callback == 'function' ? function (result, status, xhr, form) {
				button.prop('disabled', false).removeClass('loading');

				if (result.bStateError) {
					ls.msg.error(null, result.sMsg);

					// more.warning(result, status, xhr, form);
				} else {
					if (result.sMsg) {
						ls.msg.notice(null, result.sMsg);
					}
					callback(result, status, xhr, form);
				}
			} : function () {
				ls.debug("ajax success: ");
				ls.debug.apply(ls, arguments);
			}.bind(this),
			error: more.error || function(){
				ls.debug("ajax error: ");
				ls.debug.apply(ls, arguments);
			}.bind(this),
			complete: more.complete || function(){
				ls.debug("ajax complete: ");
				ls.debug.apply(ls, arguments);
			}.bind(this)
		};

		ls.hook.run('ls_ajaxsubmit_before', [options,form,callback,more], this);

		form.ajaxSubmit(options);
	};

	/**
	 * Создание ajax формы
	 *
	 * @param  {String}          url      Ссылка
	 * @param  {jQuery, String}  form     Селектор формы либо объект jquery
	 * @param  {Function}        callback Success коллбэк
	 * @param  {Object}          more     Дополнительные параметры
	 */
	this.form = function(url, form, callback, more) {
		var form = typeof form == 'string' ? $(form) : form;

		form.on('submit', function (e) {
			ls.ajax.submit(url, form, callback, more);
			e.preventDefault();
		});
	};

	return this;
}).call(ls.ajax || {}, jQuery);