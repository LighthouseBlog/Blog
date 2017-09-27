import { EditorService } from '../_services/editor.service';

declare var $: any;

function initializePlugin(editorService: EditorService) {
  $.extend($.FroalaEditor.POPUP_TEMPLATES, {
    'customPlugin.popup': '[_BUTTONS_][_CUSTOM_LAYER_]'
  });

  // Define popup buttons.
  $.extend($.FroalaEditor.DEFAULTS, {
    popupButtons: ['popupClose', '|', 'popupButton1'],
  });

  // The custom popup is defined inside a plugin (new or existing).
  $.FroalaEditor.PLUGINS.customPlugin = function (editor) {
    // Create custom popup.
    function initPopup () {
      // Popup buttons.
      let popup_buttons = '';

      // Create the list of buttons.
      if (editor.opts.popupButtons.length > 1) {
        popup_buttons += '<div class="fr-buttons">';
        popup_buttons += editor.button.buildList(editor.opts.popupButtons);
        popup_buttons += '</div>';
      }

      // Load popup template.
      const template = {
        buttons: popup_buttons,
        custom_layer: `
        <div>
            <input id="git-url" placeholder="Url or Gist Id" value="">
        </div>`
      };

      // Create popup.
      const $popup = editor.popups.create('customPlugin.popup', template);

      return $popup;
    }

    function convertUrl() {
      const url = $('#git-url').val();
      return editorService.convertToHtml(url);
    }

    // Show the popup
    function showPopup () {
      // Get the popup object defined above.
      let $popup = editor.popups.get('customPlugin.popup');

      // If popup doesn't exist then create it.
      // To improve performance it is best to create the popup when it is first needed
      // and not when the editor is initialized.
      if (!$popup) {
        $popup = initPopup()
      }

      // Set the editor toolbar as the popup's container.
      editor.popups.setContainer('customPlugin.popup', editor.$tb);

      // This will trigger the refresh event assigned to the popup.
      // editor.popups.refresh('customPlugin.popup');

      // This custom popup is opened by pressing a button from the editor's toolbar.
      // Get the button's object in order to place the popup relative to it.
      const $btn = editor.$tb.find('.fr-command[data-cmd="github"]');

      // Set the popup's position.
      const left = $btn.offset().left + $btn.outerWidth() / 2;
      const top = $btn.offset().top + (editor.opts.toolbarBottom ? 10 : $btn.outerHeight() - 10);

      // Show the custom popup.
      // The button's outerHeight is required in case the popup needs to be displayed above it.
      editor.popups.show('customPlugin.popup', left, top, $btn.outerHeight());
    }

    // Hide the custom popup.
    function hidePopup () {
      editor.popups.hide('customPlugin.popup');
    }

    // Methods visible outside the plugin.
    return {
      showPopup: showPopup,
      hidePopup: hidePopup,
      convertUrl: convertUrl
    }
  }

  // Define an icon and command for the button that opens the custom popup.
  $.FroalaEditor.DefineIcon('github', { NAME: 'github'})
  $.FroalaEditor.RegisterCommand('github', {
    title: 'Convert Url to GISTlike code',
    icon: 'github',
    undo: false,
    focus: false,
    plugin: 'customPlugin',
    callback: function () {
      this.customPlugin.showPopup();
    }
  });

  // Define custom popup close button icon and command.
  $.FroalaEditor.DefineIcon('popupClose', { NAME: 'times' });
  $.FroalaEditor.RegisterCommand('popupClose', {
    title: 'Close',
    undo: false,
    focus: false,
    callback: function () {
      this.customPlugin.hidePopup();
    }
  });

  // Define custom popup 1.
  $.FroalaEditor.DefineIcon('popupButton1', { NAME: 'github' });
  $.FroalaEditor.RegisterCommand('popupButton1', {
    title: 'convert',
    undo: false,
    focus: false,
    callback: function () {
      this.customPlugin.convertUrl()
        .subscribe(result => {
          this.html.insert(result.html);
          this.customPlugin.hidePopup();
        }, error => {
          this.customPlugin.hidePopup();
          alert(error);
        });
    }
  });
}

export default initializePlugin;
