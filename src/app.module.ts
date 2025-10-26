import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './infrastructure/db/prisma.module';
import { PrismaService } from './infrastructure/db/prisma.service';
import { auth } from './lib/auth';
import { AppEnv } from './types/env';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    AuthModule.forRootAsync({
      imports: [PrismaModule, ConfigModule],
      useFactory: (prisma: PrismaService, config: ConfigService<AppEnv>) => ({
        auth: betterAuth({
          ...auth,
          emailAndPassword: { enabled: true, requireEmailVerification: false },
          trustedOrigins: [config.getOrThrow('TRUSTED_ORIGINS')],
          database: prismaAdapter(prisma, { provider: 'postgresql' }),
        }),
      }),
      disableGlobalAuthGuard: true,
      inject: [PrismaService, ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
