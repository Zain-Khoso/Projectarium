// Lib Imports.
import { NextResponse } from 'next/server';
import prisma from '@/libs/prismadb';
import bcrypt from 'bcrypt';

// POST request handler.
export async function POST(request: Request) {
  const body = await request.json();
  const { email, username, password } = body;

  // Checking if there is a user with this email.
  const emailUser = await prisma.user.findUnique({ where: { email } });
  if (emailUser) return NextResponse.json({ errorField: 'email' });

  // Checking if there is a user with this username.
  const usernameUser = await prisma.user.findUnique({ where: { username } });
  if (usernameUser) return NextResponse.json({ errorField: 'username' });

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: { email, username, hashedPassword },
  });

  return NextResponse.json(user);
}
