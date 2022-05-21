export interface IPaginatedEntity<EntityType> {
  readonly paginatedResult: EntityType[],
  readonly totalCount: number
}
