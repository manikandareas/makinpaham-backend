import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { anonymous } from 'better-auth/plugins';

export const auth = betterAuth({
  database: prismaAdapter({}, { provider: 'postgresql' }),
  basePath: '/api/auth',
  hooks: {},
  plugins: [anonymous()],
});
