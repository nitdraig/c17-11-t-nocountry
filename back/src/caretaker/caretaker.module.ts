import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Caretaker, CaretakerSchema } from './schemas/caretaker.schema';
import { CaretakerService } from './caretaker.service';
import { GettersController } from './v1/getters/getters.controller';
import { AddController } from './v1/add/add.controller';
import { RoleModule } from '@Role/role.module';
import { UserModule } from '@User/user.module';
import { MongooseService } from '@Helpers/mongoose/mongoose.service';
import { UpdateController } from './v1/update/update.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Caretaker.name, schema: CaretakerSchema },
    ]),
    RoleModule,
    forwardRef(() => UserModule),
  ],
  providers: [CaretakerService, MongooseService],
  controllers: [GettersController, AddController, UpdateController],
  exports: [CaretakerService],
})
export class CaretakerModule {}
