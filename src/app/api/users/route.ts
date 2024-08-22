// Lib Imports.
import { NextResponse } from 'next/server';
import prisma from '@/libs/prismadb';

export async function POST(request: Request) {
  try {
    const { currentUserId, username, image, name, bio, locationValue, website } =
      await request.json();

    const usernameExists = await prisma.user.findUnique({ where: { username } });

    if (usernameExists) return NextResponse.error();

    const updatedUser: Record<string, any> = {};

    if (image) updatedUser['image'] = image;
    if (name) updatedUser['name'] = name;
    if (bio) updatedUser['bio'] = bio;
    if (locationValue) updatedUser['locationValue'] = locationValue;
    if (website) updatedUser['website'] = website;

    const user = await prisma.user.update({
      where: { id: currentUserId },
      data: { ...updatedUser, username },
    });

    return NextResponse.json(user);
  } catch {
    return NextResponse.error();
  }
}
