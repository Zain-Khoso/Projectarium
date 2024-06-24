// Lib Imports.
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Dispatch, SetStateAction, useState } from 'react';
import { collection } from 'firebase/firestore';
import { useQuery } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAuthState } from 'react-firebase-hooks/auth';
import { SendHorizontal, CheckIcon, SortAscIcon } from 'lucide-react';

// Local Imports.
import { auth, firestore } from '@/configs/firebase';
import { createDoc, fetchDocs } from '@/utils/firebase/firestore';
import { cn } from '@/utils/utils';
import { Schema, SchemaT } from './schema';
import ScreenSpinner from '@/components/ScreenSpinner';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';

// Types.
type Props = {
  projectId: string;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
};

// Component.
export default function CreateContributionForm({ projectId, setDialogOpen }: Props) {
  // React Query Setup.
  const {
    isLoading,
    isError,
    data: users,
  } = useQuery({
    queryKey: ['users'],
    queryFn: async () => await fetchDocs(collection(firestore, 'users')),
    refetchOnWindowFocus: false,
  });

  const [currUser] = useAuthState(auth);
  const [userId, setUserId] = useState('');
  const { toast } = useToast();
  const router = useRouter();

  if (isError) {
    toast({
      variant: 'destructive',
      title: 'Server Error',
      description: 'Unable to connect to server, try again later.',
    });
    router.back();
  }

  // React Hook Form Setup.
  const form = useForm<SchemaT>({
    resolver: zodResolver(Schema),
    defaultValues: { name: '', description: '' },
  });

  // Form submission handler.
  const onSubmit: SubmitHandler<SchemaT> = async function (data) {
    const { description } = data;

    try {
      // Creating a new doc inside firestore.
      await createDoc(`projects/${projectId}/contributors`, userId, { description });

      toast({
        title: 'Request Sent Successfully 📨',
        description:
          'This Contributor will recieve a request, if they accept, they will be shown in the contributors list.',
      });
    } catch (err: any) {
      if (err.message == 'Missing or insufficient permissions.') {
        toast({
          title: 'Already a contributor. 😀',
          description: 'You have already added this user as a contributor to this project.',
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Server Error',
          description:
            'We are unable to send a request to this user, please try again or come back later.',
        });
      }
    } finally {
      form.reset();
      setDialogOpen(false);
    }
  };

  return (
    <DialogContent
      className={cn(
        'sm:max-w-[520px] md:max-h-[80dvh] overflow-y-auto',
        form.formState.isSubmitting && 'overflow-hidden'
      )}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={cn('space-y-6')}>
          <DialogHeader>
            <DialogTitle>Add Contributor</DialogTitle>
            <DialogDescription>
              Select a user as the contributor and describe their contribution a little bit. After
              that click on the Send Request button at the bottom.
            </DialogDescription>
          </DialogHeader>

          {/* User */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Select a Contributor</FormLabel>

                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          'max-w-screen-sm justify-between',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        <div className={cn('flex-1 flex items-center justify-start gap-2')}>
                          {isLoading ? (
                            'Loading...'
                          ) : field.value ? (
                            <>
                              <Image
                                alt={`Picture of ${users?.find((user) => user.name === field.value)?.name}`}
                                width={50}
                                height={50}
                                src={users?.find((user) => user.name === field.value)?.picture}
                                className="w-6 aspect-square rounded-full"
                              />

                              {users?.find((user) => user.name === field.value)?.name}
                            </>
                          ) : (
                            'Select user'
                          )}
                        </div>
                        <SortAscIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>

                  <PopoverContent className="max-w-screen-sm p-2">
                    <Command>
                      <CommandInput placeholder="Search user..." className="h-9" />
                      <CommandEmpty>No user found.</CommandEmpty>
                      <CommandList className={cn('space-y-2 h-[200px] overflow-auto')}>
                        {users?.map((user) => {
                          if (user.id !== currUser?.uid)
                            return (
                              <CommandItem
                                value={user.name}
                                key={user.id}
                                onSelect={() => {
                                  form.setValue('name', user.name);
                                  setUserId(user.id);
                                }}
                              >
                                <div className={cn('flex-1 flex items-center justify-start gap-2')}>
                                  <Image
                                    alt={`Picture of ${user.name}`}
                                    width={50}
                                    height={50}
                                    src={user.picture}
                                    className="w-6 aspect-square rounded-full"
                                  />

                                  {user.name}
                                </div>
                                <CheckIcon
                                  className={cn(
                                    'ml-auto h-4 w-4',
                                    user.name === field.value ? 'opacity-100' : 'opacity-0'
                                  )}
                                />
                              </CommandItem>
                            );
                        })}
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>

                <FormDescription>The user who contributed to your project.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={form.formState.isSubmitting}
                    placeholder="Tell us a little bit about this contribution."
                    className={cn('resize-y max-w-screen-sm')}
                    {...field}
                  />
                </FormControl>
                <FormDescription>Describe this user&apos;s contribution.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter>
            <Button
              disabled={form.formState.isSubmitting}
              type="submit"
              size={'sm'}
              className="flex items-center gap-1"
            >
              Send Request
              <SendHorizontal size={12} />
            </Button>
          </DialogFooter>
        </form>

        {form.formState.isSubmitting && <ScreenSpinner />}
      </Form>
    </DialogContent>
  );
}
