'use client';

// Local Imports.
import { Button } from '@/components/ui/button';

// Types.
type Props = {
  projectId: string;
};

// Component.
export default function DeleteButton({}: Props) {
  return <Button variant="destructive">Yes, Delete it.</Button>;
}
