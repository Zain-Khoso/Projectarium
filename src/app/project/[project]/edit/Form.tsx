// Lib Imports.
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Check } from 'lucide-react';

// Local Imports.
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { updateDoc } from '@/utils/firebase/firestore';
import { cn } from '@/utils/utils';
import { Schema, SchemaT } from './schema';
import ScreenSpinner from '@/components/ScreenSpinner';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

// Hooks.
import { useEnums } from '@/hooks/firebase';

// Types.
type Props = {
  projectId: string;
  project: Dictionary;
};

// Component.
export default function EditForm({ projectId, project }: Props) {
  // React Hook Form Setup.
  const form = useForm<SchemaT>({
    resolver: zodResolver(Schema),
    defaultValues: project,
  });

  const router = useRouter();
  const { toast } = useToast();

  // Custom States.
  const [enumsLoading, enums] = useEnums();

  // Form submission handler.
  const onSubmit: SubmitHandler<SchemaT> = async function (data) {
    try {
      // Creating a new doc inside firestore.
      await updateDoc('projects', projectId, data);

      toast({
        title: 'Project Successfully Updated 🥳',
        description: 'Now the world can witness your greatness in double.',
      });

      router.refresh();
    } catch {
      toast({
        variant: 'destructive',
        title: 'Server Error',
        description:
          'We are unable to share your project right now, please try again or come back later.',
      });
    }
  };

  return (
    <DialogContent className="h-full sm:max-w-[520px] md:max-h-[80dvh] overflow-y-scroll">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={cn('space-y-6')}>
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
            <DialogDescription>
              Make changes to your project here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>

          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Title</FormLabel>
                <FormControl>
                  <Input
                    disabled={form.formState.isSubmitting}
                    placeholder="Projectarium"
                    {...field}
                    className={cn('max-w-screen-sm')}
                  />
                </FormControl>
                <FormDescription>Name of your Project.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Status */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger
                      disabled={form.formState.isSubmitting}
                      className={cn('max-w-screen-sm')}
                    >
                      <SelectValue placeholder="eg: Completed" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className={cn('max-w-screen-sm')}>
                    {enumsLoading ? (
                      <SelectItem key={'Status: Placeholder'} value="Idea">
                        Idea
                      </SelectItem>
                    ) : (
                      enums?.status.map((item: string) => (
                        <SelectItem key={`Status: ${item}`} value={item}>
                          {item}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
                <FormDescription>Your project&apos;s development status.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* URL */}
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Live View</FormLabel>
                <FormControl>
                  <Input
                    disabled={form.formState.isSubmitting}
                    type="url"
                    placeholder="https://projectarium.vercel.app"
                    {...field}
                    className={cn('max-w-screen-sm')}
                  />
                </FormControl>
                <FormDescription>Your project&apos;s Live URL.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Repository */}
          <FormField
            control={form.control}
            name="repository"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Code Repository</FormLabel>
                <FormControl>
                  <Input
                    disabled={form.formState.isSubmitting}
                    type="url"
                    placeholder="eg: https://github.com/username/repo.git"
                    {...field}
                    className={cn('max-w-screen-sm')}
                  />
                </FormControl>
                <FormDescription>Your project&apos;s code Repository.</FormDescription>
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
                    placeholder="Tell us a little bit about your project"
                    className={cn('resize-y max-w-screen-sm')}
                    {...field}
                  />
                </FormControl>
                <FormDescription>Explain your project&apos;s idea here.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter>
            <DialogClose
              disabled={form.formState.isSubmitting}
              type="submit"
              className={cn(
                'max-w-fit flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary2 h-10 px-4 py-2 ml-auto'
              )}
            >
              <Check size={16} />
              Save
            </DialogClose>
          </DialogFooter>
        </form>

        {form.formState.isSubmitting && <ScreenSpinner />}
      </Form>
    </DialogContent>
  );
}
