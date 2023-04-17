import {render} from './framework/render.js';
import Filters from './view/filters.js';
import Trip from './presenter/trip.js';
import PointsModel from './model/point-model.js';
import { getPoints, getDestinations, getOffersByType } from './mock/point.js';


const filtersContainer = document.querySelector('.trip-controls__filters');
const tripContainer = document.querySelector('.trip-events');
const tripPresenter = new Trip({container: tripContainer});
const points = getPoints();
const offersByType = getOffersByType();
const destinations = getDestinations();

const pointsModel = new PointsModel();
render(new Filters(), filtersContainer);
pointsModel.init(points, destinations, offersByType);
tripPresenter.init(pointsModel);
