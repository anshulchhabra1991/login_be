import { MongooseModule } from '@nestjs/mongoose';

export const MongoDBModule = MongooseModule.forRoot('mongodb://localhost:27017/auth_db');
