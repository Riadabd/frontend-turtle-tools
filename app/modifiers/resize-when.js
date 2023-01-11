import { modifier } from 'ember-modifier';

export default modifier(function resizeWhen(element, [offsetHeight]) {
  element.style.height = 0;
  element.style.height = offsetHeight - element.offsetHeight + 'px';
});
