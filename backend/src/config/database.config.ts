import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseConfig {
  static getMongoURI(): string {
    return process.env.MONGO_URI || 'mongodb+srv://jhquispelo:S8IJzszBHpUWe33m@cluster0.885yg.mongodb.net/mi_app?retryWrites=true&w=majority&appName=Cluster0';
  }

  static getMongoOptions(): Record<string, unknown> {
    return {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
  }
}
