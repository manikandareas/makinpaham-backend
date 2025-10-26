import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from './infrastructure/db/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  async getUser() {
    try {
      return await this.prisma.user.findMany();
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  getHello(): string {
    return 'Hello World!';
  }
}
