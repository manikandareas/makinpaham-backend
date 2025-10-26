import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './infrastructure/db/prisma.module';
import { PrismaService } from './infrastructure/db/prisma.service';
import { auth } from './lib/auth';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    AuthModule.forRootAsync({
      imports: [PrismaModule],
      useFactory: (prisma: PrismaService) => ({
        auth: betterAuth({
          ...auth,
          database: prismaAdapter(prisma, { provider: 'postgresql' }),
        }),
      }),
      inject: [PrismaService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
