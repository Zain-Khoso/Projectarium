// Lib Imports.
import { NextResponse } from 'next/server';
import prisma from '@/libs/prismadb';

export async function POST(request: Request) {
  try {
    const reservedRoutes = ['api', 'login', 'signup', 'bookmarks'];

    const { currentUserId, username, image, name, bio, locationValue, website } =
      await request.json();

    if (reservedRoutes.includes(username)) throw new Error('Username exists.');

    const userExists = await prisma.user.findUnique({ where: { username } });

    if (userExists && userExists.id !== currentUserId) throw new Error('Username exists.');

    const updatedUser: Record<string, any> = {};

    updatedUser['image'] = image;
    updatedUser['name'] = name;
    updatedUser['bio'] = bio;
    updatedUser['locationValue'] = locationValue;
    updatedUser['website'] = website;

    const user = await prisma.user.update({
      where: { id: currentUserId },
      data: { ...updatedUser, username },
    });

    return NextResponse.json(user);
  } catch {
    return NextResponse.error();
  }
}
