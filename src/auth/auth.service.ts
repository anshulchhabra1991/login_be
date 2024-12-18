import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { User } from './schemas/user.schema'; // Import User interface
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { ResponseService } from '../response/response.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    @InjectModel('User')
    private userModel: Model<User>,
    private responseService: ResponseService,
  ) {
  }

  async signUp(dto: SignUpDto): Promise<{ message: { message: any }; status: boolean }> {
    this.logger.log({ message: 'USER_SIGN_UP_SERVICE_START', log_info: { signUpData: dto } });
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = new this.userModel({
      email: dto.email,
      name: dto.name,
      password: hashedPassword,
    });

    try {
      await user.save();
      this.logger.log({ message: 'USER_SIGN_UP_SERVICE_SUCCESS', log_info: { user } });
      return this.responseService.success({ message: 'User added successfully!' });
    } catch (error) {
      const message = error.message;
      this.logger.log({ message: 'USER_SIGN_UP_SERVICE_ERROR', log_info: { message } });
      return this.responseService.error({ message })
    }
  }

  async signIn(dto: SignInDto): Promise<any> {
    this.logger.log({ message: 'USER_SIGN_IN_SERVICE_START', log_info: { signInData: dto } });
    try {
      const user = await this.userModel.findOne({ email: dto.email });
      if (!user || !(await bcrypt.compare(dto.password, user.password))) {
        return this.responseService.error({ message: 'User invalid or credentials error!' });
      }
      const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1h' });

      this.logger.log({ message: 'USER_SIGN_IN_SERVICE_SUCCESS', log_info: { token, signInData: dto } });
      return this.responseService.success({
        token: token,
        message: 'User validated successfully!',
      });
    } catch (error) {
      const message = error.message;
      this.logger.log({ message: 'USER_SIGN_IN_SERVICE_ERROR', log_info: { message } });
      return this.responseService.error({ message })
    }
  }
}
