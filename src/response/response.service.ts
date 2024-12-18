import { Injectable } from '@nestjs/common';

@Injectable()
export class ResponseService {
  success(data: any) {
    return {
      status: true,
      ...data,
    };
  }

  error(message: { message: any }) {
    return {
      status: false,
      message: message.message,
    };
  }
}
