import { Injectable } from '@nestjs/common';
import { Pet } from './schemas/pet.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePetDTO, UpdatePetDTO } from './dto/pet.dto';
import { MongooseService } from '@Helpers/mongoose/mongoose.service';

@Injectable()
export class PetService {
  constructor(
    @InjectModel(Pet.name) private petModel: Model<Pet>,
    private mongooseService: MongooseService,
  ) {}

  async create(data: CreatePetDTO) {
    return await this.petModel.create(data);
  }

  async findAll() {
    return this.petModel.find().exec();
  }

  async findAllPaginate(page: number, limit: number) {
    const count = await this.petModel.estimatedDocumentCount();
    const query = this.petModel.find();
    return this.mongooseService.paginate<Pet>(query, count, page, limit);
  }

  async findById(id: string) {
    return this.petModel.findById(id);
  }

  async update(id: string, data: UpdatePetDTO) {
    return this.petModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(petId: string) {
    return await this.petModel.findByIdAndDelete(petId).exec();
  }
}
