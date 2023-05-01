import {render} from './framework/render.js';
import Filters from './view/filters.js';
import Trip from './presenter/trip.js';
import PointsModel from './model/point-model.js';
import { getPoints, getDestinations, getOffersByType } from './mock/point.js';
import { generateFilter } from './mock/filter.js';


const filtersContainer = document.querySelector('.trip-controls__filters');
const tripContainer = document.querySelector('.trip-events');
const points = getPoints();
const offersByType = getOffersByType();
const destinations = getDestinations();

const pointsModel = new PointsModel();
pointsModel.init(points, destinations, offersByType);
const tripPresenter = new Trip(tripContainer, pointsModel);
tripPresenter.init();
const filters = generateFilter(pointsModel.points);

render(new Filters(filters), filtersContainer);


