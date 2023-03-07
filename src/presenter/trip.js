import { render, RenderPosition } from '../render.js';
import Point from '../view/point.js';
import PointEdit from '../view/point-edit.js';
import PointNew from '../view/point-new.js';
import Sort from '../view/sort.js';
import TripList from '../view/trip-list.js';

class Trip{
  constructor({container}) {
    this.component = new TripList();
    this.container = container;
  }

  init() {
    render(new Sort(), this.container, RenderPosition.BEFOREEND);
    render(this.component, this.container);
    render(new PointNew(), this.component.getElement(), RenderPosition.BEFOREEND);
    render(new PointEdit(), this.component.getElement(), RenderPosition.BEFOREEND);

    for(let i=0; i<3; i++) {
      render(new Point(), this.component.getElement(), RenderPosition.BEFOREEND);
    }
  }
}

export default Trip;
