import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Caretaker, CaretakerDocument } from './schemas/caretaker.schema';
import { Model } from 'mongoose';
import { CreateCaretakerDTO, UpdateCaretakerDTO } from './dto/caretaker.dto';
import { MongooseService } from '@Helpers/mongoose/mongoose.service';

@Injectable()
export class CaretakerService {
  constructor(
    @InjectModel(Caretaker.name) private caretakerModel: Model<Caretaker>,
    private mongooseService: MongooseService,
  ) {}

  async findAll() {
    return this.caretakerModel
      .find({}, { sumPoint: 0 })
      .populate({ path: 'user', select: 'first_name last_name picture' })
      .populate({
        path: 'services',
        select: 'name description',
        model: 'Service',
      })
      .populate({ path: 'pets', select: 'name', model: 'Pet' })
      .exec();
  }

  async findAllPaginate(page: number, limit: number) {
    const count = await this.caretakerModel.estimatedDocumentCount();
    const query = this.caretakerModel
      .find({}, { sumPoint: 0 })
      .populate({ path: 'user', select: 'first_name last_name picture' })
      .populate({
        path: 'services',
        select: 'name description',
        model: 'Service',
      })
      .populate({ path: 'pets', select: 'name', model: 'Pet' });

    return this.mongooseService.paginate<Caretaker>(query, count, page, limit);
  }

  async findById(id: string) {
    return this.caretakerModel
      .findById(id)
      .populate({ path: 'user', select: 'first_name last_name picture' })
      .populate({
        path: 'services',
        select: 'name description',
        model: 'Service',
      })
      .populate({ path: 'pets', select: 'name', model: 'Pet' })
      .exec();
  }

  async findOneByUseId(userId: string): Promise<CaretakerDocument> {
    return this.caretakerModel
      .findOne({
        user: this.mongooseService.stringToObjectId(userId),
      })
      .exec();
  }

  async create(data: CreateCaretakerDTO) {
    const { user, services, pets, ...req } = data;
    return this.caretakerModel.create({
      user: this.mongooseService.stringToObjectId(user),
      services: this.mongooseService.stringToObjectId(services),
      pets: this.mongooseService.stringToObjectId(pets),
      ...req,
    });
  }

  async update(userId: string, data: UpdateCaretakerDTO) {
    const { services, pets, ...req } = data;

    return this.caretakerModel.findOneAndUpdate(
      {
        user: this.mongooseService.stringToObjectId(userId),
      },
      {
        services: this.mongooseService.stringToObjectId(services),
        pets: this.mongooseService.stringToObjectId(pets),
        ...req,
      },
      {
        new: true,
      },
    );
  }

  async updateById(id: string, data: UpdateCaretakerDTO) {
    const { services, pets, ...req } = data;

    return this.caretakerModel.findByIdAndUpdate(
      id,
      {
        services: this.mongooseService.stringToObjectId(services),
        pets: this.mongooseService.stringToObjectId(pets),
        ...req,
      },
      {
        new: true,
      },
    );
  }
}
