import { render, RenderPosition } from './render.js';
import Filters from './view/filters.js';
import Trip from './presenter/trip.js';

const filtersContainer = document.querySelector('.trip-controls__filters');
const tripContainer = document.querySelector('.trip-events');
const tripPresenter = new Trip({container: tripContainer});

render(new Filters(), filtersContainer, RenderPosition.BEFOREEND);
tripPresenter.init();
