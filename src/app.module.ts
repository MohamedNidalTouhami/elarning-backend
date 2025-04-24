import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AgoraController } from './agora/agora.controller';

@Module({
  imports: [],
  controllers: [AppController, AgoraController],
  providers: [AppService],
})
export class AppModule {}
