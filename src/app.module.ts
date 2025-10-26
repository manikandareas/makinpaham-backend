import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './infrastructure/db/database.module';
import { DatabaseService } from './infrastructure/db/database.service';
import { auth } from './lib/auth';
import { AppEnv } from './types/env';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    AuthModule.forRootAsync({
      imports: [DatabaseModule, ConfigModule],
      useFactory: (prisma: DatabaseService, config: ConfigService<AppEnv>) => ({
        auth: betterAuth({
          ...auth,
          emailAndPassword: { enabled: true, requireEmailVerification: false },
          trustedOrigins: [config.getOrThrow('TRUSTED_ORIGINS')],
          database: prismaAdapter(prisma, { provider: 'postgresql' }),
        }),
      }),
      disableGlobalAuthGuard: true,
      inject: [DatabaseService, ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
