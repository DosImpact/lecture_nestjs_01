import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!!!';
  }

  getHI(): string {
    return 'hi dosimpact!';
  }
}
