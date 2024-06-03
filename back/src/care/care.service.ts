import { Injectable } from '@nestjs/common';
import { CreateCareDTO, UpdateCareDTO } from './dto/care.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Care } from './schemas/care.schema';
import { Model, Types } from 'mongoose';
import { MongooseService } from '@Helpers/mongoose/mongoose.service';
import { ServiceService } from '@Service/service.service';
import { CaretakerService } from '@Caretaker/caretaker.service';

@Injectable()
export class CareService {
  constructor(
    @InjectModel(Care.name) private careModel: Model<Care>,
    private mongooseService: MongooseService,
    private serviceService: ServiceService,
    private caretakerService: CaretakerService,
  ) {}

  async create(data: CreateCareDTO, userId: string) {
    const { pet, services, date, ...req } = data;

    const servicePrices = await Promise.all(
      services.map(async (serviceId) => {
        const service = await this.serviceService.findById(serviceId);
        return service.price;
      }),
    );

    const totalPrice = servicePrices.reduce((total, price) => total + price, 0);

    return this.careModel.create({
      user: this.mongooseService.stringToObjectId(userId),
      pet: this.mongooseService.stringToObjectId(pet),
      services: this.mongooseService.stringToObjectId(services),
      date: new Date(date),
      totalPrice: totalPrice,
      status: 'pending',
      state: false,
      ...req,
    });
  }

  async findAll() {
    return this.careModel
      .find()
      .populate({
        path: 'user',
        select: 'first_name last_name picture birthday phone address',
      })
      .populate({ path: 'pet', select: 'name' })
      .populate({ path: 'services', model: 'Service' })
      .populate({
        path: 'caretaker',
        select: 'stars reviews user description',
        populate: {
          path: 'user',
          select: 'first_name last_name picture',
        },
      })
      .exec();
  }

  async findAllPending() {
    return this.careModel
      .find({ status: 'pending' })
      .populate({
        path: 'user',
        select: 'first_name last_name picture birthday phone address',
      })
      .populate({ path: 'pet', select: 'name' })
      .populate({ path: 'services', model: 'Service' })
      .populate({
        path: 'caretaker',
        select: 'stars reviews user',
        populate: {
          path: 'user',
          select: 'first_name last_name picture',
        },
      })
      .exec();
  }

  async findAllPaginate(page: number, limit: number) {
    const count = await this.careModel.estimatedDocumentCount();
    const query = this.careModel
      .find()
      .populate({ path: 'user', select: 'first_name last_name picture' })
      .populate({ path: 'pet', select: 'name' })
      .populate({ path: 'services', model: 'Service' })
      .populate({
        path: 'caretaker',
        select: 'stars reviews user',
        populate: {
          path: 'user',
          select: 'first_name last_name picture',
        },
      });

    return this.mongooseService.paginate<Care>(query, count, page, limit);
  }

  async findById(id: string) {
    return this.careModel
      .findById(id)
      .populate({ path: 'user', select: 'first_name last_name picture' })
      .populate({ path: 'pet', select: 'name' })
      .populate({ path: 'services', model: 'Service' })
      .populate({
        path: 'caretaker',
        select: 'stars reviews user',
        populate: {
          path: 'user',
          select: 'first_name last_name picture',
        },
      })
      .exec();
  }

  async findByCaretaker(caretakerId: string) {
    const caretakerObjectId = new Types.ObjectId(caretakerId);
    return this.careModel.find({ caretaker: caretakerObjectId }).exec();
  }

  async update(
    data: UpdateCareDTO,
    userId: string,
    role: string,
    careId: string,
  ) {
    const { status, description, ...req } = data;

    const care = await this.careModel.findById(careId);
    //*Check care state
    if (care.state) {
      throw new Error('care_completed');
    }

    if (role === 'caretaker') {
      const caretaker = await this.caretakerService.findOneByUseId(userId);

      const updateCare = await this.careModel.findOneAndUpdate(
        { _id: this.mongooseService.stringToObjectId(careId) },
        {
          caretaker: caretaker._id,
          status: status,
          state: status === 'completed',
          ...req,
        },
        { new: true },
      );

      //*Update active request caretaker
      if (status == 'accept') {
        await this.caretakerService.update(caretaker.user['_id'], {
          active_requests: caretaker.active_requests + 1,
        });
      }
      if (status == 'completed') {
        await this.caretakerService.update(caretaker.user['_id'], {
          active_requests: caretaker.active_requests - 1,
        });
      }

      return updateCare;
    } else if (role === 'owner' && description !== undefined) {
      return this.careModel.findOneAndUpdate(
        {
          _id: this.mongooseService.stringToObjectId(careId),
        },
        {
          description: description,
          ...req,
        },
        {
          new: true,
        },
      );
    } else {
      throw new Error('fail_request');
    }
  }

  async delete(careId: string) {
    return await this.careModel.findByIdAndDelete(careId).exec();
  }
}
