import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class VisualiseController extends Controller {
  @service store;

  @tracked imageUrl = null;
  @tracked value = '';

  @action
  updateValue(event) {
    this.value = event.target.value;
  }

  @action
  async getImage() {
    if (this.value) {
      if (this.imageUrl) {
        URL.revokeObjectURL(this.imageUrl);
      }
      this.imageUrl = await this.store.fetchGraphRender(this.value);
    } else {
      this.imageUrl = null;
    }
  }
}
