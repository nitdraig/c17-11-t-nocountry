import { PaginateResult } from '@Interfaces/global.interface';
import { Injectable } from '@nestjs/common';
import { Query, Types } from 'mongoose';

@Injectable()
export class MongooseService {
  stringToObjectId(
    id: string | string[],
  ): Types.ObjectId | Types.ObjectId[] | undefined {
    if (id == undefined || id == null) return undefined;
    if (id instanceof Array) {
      const ids = id.map((id) => new Types.ObjectId(id));
      return ids;
    }
    return new Types.ObjectId(id);
  }

  async paginate<T>(
    query: Query<T[], any>,
    count: number,
    page: number,
    limit: number,
  ): Promise<PaginateResult<T>> {
    if (page <= 0) page = 1;
    if (limit <= 0) limit = 10;

    const offset = (page - 1) * limit;
    const pages = Math.ceil(count / limit);

    const result = await query.skip(offset).limit(limit).exec();

    return {
      docs: result,
      totalDocs: count,
      totalPages: pages,
      limit,
      page,
      hasPrevPage: page == 1 || result.length == 0 ? false : true,
      hasNextPage: pages > page ? true : false,
      nextPage: page == pages || result.length == 0 ? null : page + 1,
      prevPage: page <= 1 || result.length == 0 ? null : page - 1,
    };
  }
}
