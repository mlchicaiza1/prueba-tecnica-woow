export interface IPaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
}
