import { TypeOrmCrudService as BaseService } from '@nestjsx/crud-typeorm';
import { CrudRequest } from '@nestjsx/crud';

export class TypeOrmCrudService<T> extends BaseService<T> {
  async deleteOne(req: CrudRequest): Promise<void | T> {
    const record = await this.getOne(req);
    return this.repo.softRemove(record);
  }
}
