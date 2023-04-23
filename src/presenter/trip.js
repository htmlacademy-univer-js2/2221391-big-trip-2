import { render, replace } from '../framework/render.js';
import Point from '../view/point.js';
import PointEdit from '../view/point-edit.js';
import Sort from '../view/sort.js';
import TripList from '../view/trip-list.js';
import NoPointView from '../view/no-points-view.js';

class Trip{
  #component = null;
  #container = null;
  #pointsModel = null;
  #boardPoints = null;
  #destinations = null;
  #offers = null;

  constructor({container}) {
    this.#component = new TripList();
    this.#container = container;
  }

  init(pointsModel) {
    this.#pointsModel = pointsModel;
    this.#boardPoints = [...this.#pointsModel.points];
    this.#destinations = [...this.#pointsModel.destinations];
    this.#offers = [...this.#pointsModel.offers];

    if (this.#boardPoints.length === 0) {
      render(new NoPointView(), this.#container);
    }
    else {
      render(new Sort(), this.#container);
      render(this.#component, this.#container);

      for (const point of this.#boardPoints){
        this.#renderPoint(point);
      }
  }
}

  #renderPoint = (point) => {
    const previewPointComponent = new Point(point, this.#destinations, this.#offers);
    const editingPointComponent = new PointEdit(point, this.#destinations, this.#offers);

    const replacePreviewPointToEditingPoint = () => {
      replace(editingPointComponent, previewPointComponent);
    };

    const replaceEditingPointToPreviewPoint = () => {
      replace(previewPointComponent, editingPointComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceEditingPointToPreviewPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    const handleEditClick = () => {
      replacePreviewPointToEditingPoint();
      document.addEventListener('keydown', onEscKeyDown);
    };

    previewPointComponent.setEditClickHandler(handleEditClick);

    editingPointComponent.setPreviewClickHandler(() => {
      replaceEditingPointToPreviewPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    editingPointComponent.setFormSubmitHandler(() => {
      replaceEditingPointToPreviewPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });


    render(previewPointComponent, this.#component.element);
  };
}

export default Trip;
