import { isPointDateFuture, isPointDatePast, isPointDateFuturePast } from './point-date.js';
import { FilterType } from '../mock/point.js';

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isPointDateFuture(point.dateFrom) || isPointDateFuturePast(point.dateFrom, point.dateTo)),
  [FilterType.PAST]: (points) => points.filter((point) => isPointDatePast(point.dateTo) || isPointDateFuturePast(point.dateFrom, point.dateTo)),
};

export { filter };
