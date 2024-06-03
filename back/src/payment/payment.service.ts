import { MongooseService } from '@Helpers/mongoose/mongoose.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Payment } from './schemas/payment.schema';
import { Model } from 'mongoose';
import { CreatePaymentDTO, UpdatePaymentDTO } from './dto/payment.dto';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment.name) private paymentService: Model<Payment>,
    private mongooseService: MongooseService,
  ) {}

  async findAll() {
    return this.paymentService
      .find()
      .populate({
        path: 'care',
        select:
          'caretaker user services pet totalPrice state date hours status',
        populate: [
          {
            path: 'pet',
            select: 'name',
          },
          {
            path: 'user',
            select: 'first_name last_name',
          },
          {
            path: 'services',
            select: 'name',
            model: 'Service',
          },
          {
            path: 'caretaker',
            select: 'user',
            populate: {
              path: 'user',
              select: 'first_name last_name',
            },
          },
        ],
      })
      .exec();
  }

  async findAllPaginate(page: number, limit: number) {
    const count = await this.paymentService.estimatedDocumentCount();
    const query = this.paymentService.find().populate({
      path: 'care',
      select: 'caretaker user services pet totalPrice state date hours status',
      populate: [
        {
          path: 'pet',
          select: 'name',
        },
        {
          path: 'user',
          select: 'first_name last_name',
        },
        {
          path: 'services',
          select: 'name',
          model: 'Service',
        },
        {
          path: 'caretaker',
          select: 'user',
          populate: {
            path: 'user',
            select: 'first_name last_name',
          },
        },
      ],
    });
    return this.mongooseService.paginate(query, count, page, limit);
  }

  async findById(id: string) {
    return this.paymentService
      .findById(id)
      .populate({
        path: 'care',
        select:
          'caretaker user services pet totalPrice state date hours status',
        populate: [
          {
            path: 'pet',
            select: 'name',
          },
          {
            path: 'user',
            select: 'first_name last_name',
          },
          {
            path: 'services',
            select: 'name',
            model: 'Service',
          },
          {
            path: 'caretaker',
            select: 'user',
            populate: {
              path: 'user',
              select: 'first_name last_name',
            },
          },
        ],
      })
      .exec();
  }

  async create(data: CreatePaymentDTO) {
    const { ...req } = data;
    return this.paymentService.create({
      ...req,
    });
  }

  async update(paymentId: string, data: UpdatePaymentDTO) {
    const { ...req } = data;
    return this.paymentService.findByIdAndUpdate(paymentId, req, { new: true });
  }
}
