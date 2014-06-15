<?php
/*-------------------------------------------------------
*
*   LiveStreet Engine Social Networking
*   Copyright © 2008 Mzhelskiy Maxim
*
*--------------------------------------------------------
*
*   Official site: www.livestreet.ru
*   Contact e-mail: rus.engine@gmail.com
*
*   GNU General Public License, version 2:
*   http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
*
---------------------------------------------------------
*/

/**
 * Абстрактный класс мапера
 * Вся задача маппера сводится в выполнению запроса к базе данных (или либому другому источнику данных) и возвращения результата в модуль.
 *
 * @package engine
 * @since 1.0
 */
abstract class Mapper extends LsObject {
	/**
	 * Объект подключения к базе данных
	 *
	 * @var DbSimple_Database
	 */
	protected $oDb;

	/**
	 * Передаем коннект к БД
	 *
	 * @param DbSimple_Database $oDb
	 */
	public function __construct(DbSimple_Database $oDb) {
		parent::__construct();
		$this->oDb = $oDb;
	}

	protected function IsSuccessful($mRes) {
		return $mRes===false or is_null($mRes) ? false : true;
	}
}