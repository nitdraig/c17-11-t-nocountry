import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Service, ServiceSchema } from './schemas/service.schema';
import { ServiceService } from './service.service';
import { AddController } from './v1/add/add.controller';
import { GettersController } from './v1/getters/getters.controller';
import { UpdateController } from './v1/update/update.controller';
import { MongooseService } from '@Helpers/mongoose/mongoose.service';
import { RoleModule } from '@Role/role.module';
import { UserModule } from '@User/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Service.name, schema: ServiceSchema }]),
    RoleModule,
    UserModule,
  ],
  exports: [ServiceService],
  providers: [ServiceService, MongooseService],
  controllers: [AddController, GettersController, UpdateController],
})
export class ServiceModule {}
