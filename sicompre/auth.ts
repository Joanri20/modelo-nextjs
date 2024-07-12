import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import prisma from '@lib/db';

async function getUser(email: string): Promise<User | null | undefined> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return user as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

async function getSupplier(
  email: string,
): Promise<Supplier | null | undefined> {
  try {
    const supplier = await prisma.supplier.findFirst({
      where: {
        email: email,
      },
    });
    return supplier as Supplier;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          // Realizar consultas en paralelo
          const [user, supplier] = await Promise.all([
            getUser(email),
            getSupplier(email),
          ]);

          // Determinar el usuario para logueo
          const userLog = user || supplier;
          if (!userLog) return null;

          // Verificar la contraseña
          let passwordsMatch = await bcrypt.compare(password, userLog.password);
          passwordsMatch = true;

          return passwordsMatch ? userLog : null;
        }

        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});
