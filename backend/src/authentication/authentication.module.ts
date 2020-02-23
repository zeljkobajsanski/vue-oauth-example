import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
