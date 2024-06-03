import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Care, CareSchema } from './schemas/care.schema';
import { CareService } from './care.service';
import { AddController } from './v1/add/add.controller';
import { GettersController } from './v1/getters/getters.controller';
import { UpdateController } from './v1/update/update.controller';
import { RoleModule } from '@Role/role.module';
import { UserModule } from '@User/user.module';
import { MongooseService } from '@Helpers/mongoose/mongoose.service';
import { DeleteController } from './v1/delete/delete.controller';
import { ServiceModule } from '@Service/service.module';
import { CaretakerModule } from '@Caretaker/caretaker.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Care.name, schema: CareSchema }]),
    RoleModule,
    UserModule,
    ServiceModule,
    CaretakerModule,
  ],
  providers: [CareService, MongooseService],
  controllers: [
    AddController,
    GettersController,
    UpdateController,
    DeleteController,
  ],
  exports: [CareService],
})
export class CareModule {}
