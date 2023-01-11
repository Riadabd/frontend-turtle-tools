import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ValidateController extends Controller {
  @service store;

  // Error output variables
  @tracked showEmptySpace = true;
  @tracked errors = {};
  @tracked warnings = {};
  @tracked error_line = -1;

  // Line and text editors' values
  @tracked line_number_value = '1.';
  @tracked line_count_cache = 1;
  @tracked text_editor_value = '';

  // Track scrolling in text editor
  @tracked scroll_top = 0;

  // Track editor resizing
  @tracked editor_height = 0;

  @action
  updateValue(event) {
    this.text_editor_value = event.target.value;
  }

  @action
  async getSyntaxErrors() {
    if (this.text_editor_value) {
      this.showEmptySpace = false;
      this.errors = await this.store.fetchErrors(this.text_editor_value);
      this.warnings = await this.store.fetchWarnings(this.text_editor_value);
      if (this.errors.length > 0) {
        this.error_line = parseInt(
          this.errors[0].split('line ')[1].split('.')[0],
          10
        );
      }
    } else {
      this.errors = {};
      this.warnings = {};
      this.showEmptySpace = true;
    }
  }

  @action
  updateOnScrolling(event) {
    this.scroll_top = event.target.scrollTop;
  }

  @action
  updateLineCounter(event) {
    this.text_editor_value = event.target.value;
    this.countNumberOfLines();
  }

  @action
  adjustForResize(event) {
    this.editor_height = event[0].target.offsetHeight;
  }

  @action
  selectText() {
    let editor = document.getElementById('textEditor');
    const lines = this.text_editor_value.split('\n');
    let line_count,
      character_count = 0;

    for (line_count = 0; line_count < this.error_line - 1; line_count++) {
      character_count += lines[line_count].length + 1;
    }

    editor.focus();
    editor.setSelectionRange(
      character_count,
      character_count + lines[line_count].length
    );
  }

  countNumberOfLines() {
    const lines = this.text_editor_value.split('\n');
    if (this.line_count_cache != lines.length) {
      let line_editor_array = new Array();
      for (let i = 0; i < lines.length; i++) {
        line_editor_array[i] = i + 1 + '.';
      }

      this.line_count_cache = lines.length;
      this.line_number_value = line_editor_array.join('\n');
    }
  }
}
