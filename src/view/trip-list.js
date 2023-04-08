import { createElement } from '../render.js';

const createTripEventsTemplate = () => (
  `<ul class="trip-events__list">
  </ul>`
);

export default class TripList {
  #element = null;

  get template() {
    return createTripEventsTemplate;
  }

  get element() {
    this.#element = this.#element || createElement(this.template);
    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
