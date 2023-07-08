export interface Pageable<T> {
  content: T[];
  totalPages: number;
  last: boolean;
  first: boolean;
  totalElements: number;
}
