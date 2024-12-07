import { Module } from '@nestjs/common';
import { NotsService } from './nots.service';
import { NotsController } from './nots.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { Notificacion } from './entities/not.entity';

@Module({
  controllers: [NotsController],
  providers: [NotsService,],
  imports: [
    TypeOrmModule.forFeature([Notificacion]),
    AuthModule,
    UsersModule
  ],
  exports: [NotsService, TypeOrmModule]
})
export class NotsModule {}
