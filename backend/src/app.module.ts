import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from './authentication/user.entity';

@Module({
  imports: [AuthenticationModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      synchronize: true,
      database: './users.db',
      entities: [User],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
