import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [
    AuthModule,
    MessagesModule,
    MongooseModule.forRoot('mongodb://localhost/nest-messaging'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
