import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Pet, PetSchema } from './schemas/pet.schema';
import { PetService } from './pet.service';
import { AddController } from './v1/add/add.controller';
import { GettersController } from './v1/getters/getters.controller';
import { UpdateController } from './v1/update/update.controller';
import { RoleModule } from '@Role/role.module';
import { UserModule } from '@User/user.module';
import { MongooseService } from '@Helpers/mongoose/mongoose.service';
import { DeleteController } from './v1/delete/delete.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pet.name, schema: PetSchema }]),
    RoleModule,
    UserModule,
  ],
  controllers: [
    AddController,
    GettersController,
    UpdateController,
    DeleteController,
  ],
  providers: [PetService, MongooseService],
})
export class PetModule {}
