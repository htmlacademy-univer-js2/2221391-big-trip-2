import {render} from './framework/render.js';
import FilterPresenter from './presenter/filter-presenter.js';
import Trip from './presenter/trip.js';
import PointsModel from './model/point-model.js';
import { getPoints, getDestinations, getOffersByType } from './mock/point.js';
import FilterModel from './model/filter-model.js';
import NewPointButtonView from './view/new-point-button-view.js';


const filtersContainer = document.querySelector('.trip-controls__filters');
const tripContainer = document.querySelector('.trip-events');
const siteHeaderElement = document.querySelector('.trip-main');
const points = getPoints();
const offersByType = getOffersByType();
const destinations = getDestinations();

const pointsModel = new PointsModel();
pointsModel.init(points, destinations, offersByType);
const filterModel = new FilterModel();
const filterPresenter = new FilterPresenter(filtersContainer, filterModel, pointsModel);
filterPresenter.init();

const tripPresenter = new Trip(tripContainer, pointsModel, filterModel);
tripPresenter.init();

const newPointButtonComponent = new NewPointButtonView();

const handleNewPointFormClose = () => {
  newPointButtonComponent.element.disabled = false;
};

const handleNewPointButtonClick = () => {
  tripPresenter.createPoint(handleNewPointFormClose);
  newPointButtonComponent.element.disabled = true;
};

render(newPointButtonComponent, siteHeaderElement);
newPointButtonComponent.setClickHandler(handleNewPointButtonClick);


