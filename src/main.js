import FilterPresenter from './presenter/filter-presenter.js';
import Trip from './presenter/trip.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';
import PointsApiService from './api-service/points-api.js';
import DestinationsApiService from './api-service/destinations-api.js';
import OffersApiService from './api-service/offers-api.js';
import NewPointButtonPresenter from './presenter/new-point-button-presenter.js';
import { END_POINT, AUTHORIZATION } from './const.js';

const filtersContainer = document.querySelector('.trip-controls__filters');
const tripContainer = document.querySelector('.trip-events');
const siteHeaderElement = document.querySelector('.trip-main');

const pointsModel = new PointsModel(new PointsApiService(END_POINT, AUTHORIZATION));
const destinationsModel = new DestinationsModel(new DestinationsApiService(END_POINT, AUTHORIZATION));
const offersModel = new OffersModel(new OffersApiService(END_POINT, AUTHORIZATION));

const filterModel = new FilterModel();
const filterPresenter = new FilterPresenter({
  filterContainer: filtersContainer,
  pointsModel: pointsModel,
  filterModel: filterModel,
  destinationsModel: destinationsModel,
  offersModel: offersModel
});
filterPresenter.init();

const tripPresenter = new Trip({
  tripInfoContainer: siteHeaderElement.querySelector('.trip-main__trip-info'),
  tripContainer: tripContainer,
  pointsModel: pointsModel,
  filterModel: filterModel,
  destinationsModel: destinationsModel,
  offersModel: offersModel
});
tripPresenter.init();

const newPointButtonPresenter = new NewPointButtonPresenter({
  newPointButtonContainer: siteHeaderElement,
  destinationsModel: destinationsModel,
  offersModel: offersModel,
  boardPresenter: tripPresenter,
  pointsModel: pointsModel
});

newPointButtonPresenter.init();


offersModel.init().finally(() => {
  destinationsModel.init().finally(() => {
    pointsModel.init().finally(() => {
      newPointButtonPresenter.renderNewPointButton();
    });
  });
});

