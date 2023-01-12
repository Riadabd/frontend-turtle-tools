import Service from '@ember/service';
import { tracked } from 'tracked-built-ins';

export default class StoreService extends Service {
  storage = {};

  constructor() {
    super(...arguments);
    this.storage.errors = tracked([]);
    this.storage.warnings = tracked([]);
  }

  async fetchErrors(turtle_input) {
    let response = await fetch('/validate', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: turtle_input,
    });

    let json = await response.json();
    return json['errors'];
  }

  async fetchWarnings(turtle_input) {
    let response = await fetch('/validate', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: turtle_input,
    });

    let json = await response.json();
    return json['warnings'];
  }

  async fetchGraphRender(turtle_input) {
    let response = await fetch('/graph', {
      method: 'POST',
      headers: {
        Accept: 'image/svg',
      },
      body: turtle_input,
    });

    let image = await response.blob();
    const url = URL.createObjectURL(image);
    return url;
  }
}
