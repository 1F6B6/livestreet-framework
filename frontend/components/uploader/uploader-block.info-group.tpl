{**
 * Уникальные настройки определенного типа файла
 *}

{$component_info = 'ls-uploader-info'}

<div class="{$component_info}-group js-uploader-info-group" data-type="{$smarty.local.type}">
    {* Действия *}
    <ul class="{$component_info}-actions">
        <li><a href="#" class="link-dotted js-uploader-info-remove">{lang name='uploader.actions.remove'}</a></li>
    </ul>

    {* Уникальные св-ва для каждого типа *}
    <div class="{$component_info}-properties">
        {* Св-ва *}
        <ul class="{$component_info}-list">
            {foreach $smarty.local.properties as $property}
                <li class="{$component_info}-list-item">
                    <span class="{$component_info}-list-item-label">{$property['label']}:</span>
                    <span class="js-uploader-info-property" data-name="{$property['name']}"></span>
                </li>
            {/foreach}
        </ul>

        {* Текстовые св-ва *}
        <div class="{$component_info}-fields">
            {foreach $smarty.local.propertiesFields as $property}
                {component 'field' template='text'
                    name            = $property['name']
                    inputClasses    = "js-uploader-info-property"
                    inputAttributes = [ 'data-name' => $property['name'] ]
                    label           = $property['label']}
            {/foreach}
        </div>
    </div>
</div>