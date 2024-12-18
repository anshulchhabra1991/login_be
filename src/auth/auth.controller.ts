import { Controller, Post, Body, UsePipes, ValidationPipe, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ description: 'Sign Up api for users.' })
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async signup(@Body() signUpDto: SignUpDto) {
    this.logger.log({ message: 'USER_SIGN_UP_REQUEST_RECEIVED', log_info: { signUpData: signUpDto } });
    return await this.authService.signUp(signUpDto);
  }

  @Post('signin')
  @ApiOperation({ description: 'Sign In api for users.' })
  signIn(@Body() signInDto: SignInDto) {
    this.logger.log({ message: 'USER_SIGN_IN_REQUEST_RECEIVED', log_info: { signInData: signInDto } });
    return this.authService.signIn(signInDto);
  }
}
