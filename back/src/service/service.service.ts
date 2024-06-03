import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Service } from './schemas/service.schema';
import { MongooseService } from '@Helpers/mongoose/mongoose.service';
import { Model } from 'mongoose';
import { CreateServiceDTO, UpdateServiceDTO } from './dto/service.dto';

///LE pega a bdd conexion con el esquema
// Empiezo aca

@Injectable()
export class ServiceService {
  constructor(
    @InjectModel(Service.name) private serviceModel: Model<Service>,
    private mongooseService: MongooseService,
  ) {}

  async findAll() {
    return this.serviceModel.find().exec();
  }

  async findAllPaginate(page: number, limit: number) {
    const count = await this.serviceModel.estimatedDocumentCount();
    const query = this.serviceModel.find();
    return this.mongooseService.paginate(query, count, page, limit);
  }

  async findById(id: string) {
    return this.serviceModel.findById(id).exec();
  }

  async create(data: CreateServiceDTO) {
    const { ...req } = data;
    return this.serviceModel.create({
      ...req,
    });
  }

  async update(serviceId: string, data: UpdateServiceDTO) {
    const { ...req } = data;
    return this.serviceModel.findByIdAndUpdate(serviceId, req, { new: true });
  }
}
