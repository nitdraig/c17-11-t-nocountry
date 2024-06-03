export interface AnyObject {
  [key: string]: any;
}

export interface PaginateResult<T> {
  docs: T[];
  totalDocs: number;
  totalPages: number;
  limit: number;
  page: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}
