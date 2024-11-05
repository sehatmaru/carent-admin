export class PaginationRequestModel {
  public pageNumber = 1
  public pageSize = 5

  reset() {
    this.pageNumber = 1
  }
}
