import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Role, RoleDocument } from './schemas/role.schema';
import { FilterQuery, Model } from 'mongoose';

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role.name) private roleModel: Model<Role>) {
    const count = this.roleModel.estimatedDocumentCount();
    count.then((value) => {
      if (value == 0) {
        this.roleModel.create(
          { name: 'admin' },
          { name: 'caretaker' },
          { name: 'owner' },
        );
      }
    });
  }

  async findAll(filter?: FilterQuery<Role>): Promise<RoleDocument[]> {
    return this.roleModel.find(filter).exec();
  }

  async findOneByName(name: string): Promise<RoleDocument> {
    return this.roleModel.findOne({ name }).exec();
  }

  async findById(id: string): Promise<Role> {
    return this.roleModel.findById(id).exec();
  }
}
