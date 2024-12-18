import { Controller, Get, Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongoDBModule } from './config/mongo.config';

@Controller('health')
class HealthController {
  @Get()
  getHealth(): string {
    return 'OK';
  }
}

@Module({
  imports: [MongoDBModule, AuthModule],
  controllers: [HealthController],
})
export class AppModule {}
