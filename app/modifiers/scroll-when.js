import { modifier } from 'ember-modifier';

export default modifier(function scrollWhen(element, [scrollTop]) {
  element.scrollTop = scrollTop;
});
