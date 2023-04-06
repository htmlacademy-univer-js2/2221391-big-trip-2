import { render, RenderPosition } from '../render.js';
import Point from '../view/point.js';
import PointEdit from '../view/point-edit.js';
import Sort from '../view/sort.js';
import TripList from '../view/trip-list.js';

class Trip{
  constructor({container}) {
    this.component = new TripList();
    this.container = container;
  }

  init(pointsModel) {
    this.pointsModel = pointsModel;
    this.boardPoints = [...this.pointsModel.getPoints()];
    this.destinations = [...this.pointsModel.getDestinations()];
    this.offers = [...this.pointsModel.getOffers()];
    render(new Sort(), this.container, RenderPosition.BEFOREEND);
    render(this.component, this.container);
    render(new PointEdit(this.boardPoints[0], this.destinations, this.offers), this.component.getElement(), RenderPosition.BEFOREEND);

    for (const point of this.boardPoints){
      render(new Point(point, this.destinations, this.offers), this.component.getElement());
    }
  }
}

export default Trip;
