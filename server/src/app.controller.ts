import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
);

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return 'Hello World';
  }

  @Post('/login')
  async login(@Body('token') token): Promise<any> {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    console.log(ticket.getPayload(), 'ticket');
    const { email, name, picture } = ticket.getPayload();
    const data = await this.appService.login({ email, name, image: picture });
    return {
      data,
      message: 'success',
    };
  }
}
