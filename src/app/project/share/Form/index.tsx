'use client';

// Lib Imports.
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Share } from 'lucide-react';

// Local Imports.
import { uploadFile } from '@/utils/firebase/storage';
import { uploadDoc } from '@/utils/firebase/firestore';
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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Small } from '@/components/ui/typography';

// Hooks.
import useDarkmode from '@/hooks/useDarkmode';
import { useAuthRedirect } from '@/hooks/firebase/useAuthRedirect';
import { useEnums } from '@/hooks/firebase/firestore/staticContent';

// Component.
export default function ShareProjectForm() {
  useDarkmode()
  useAuthRedirect();

  // React Hook Form Setup.
  const form = useForm<SchemaT>({
    resolver: zodResolver(Schema),
    defaultValues: {
      title: '',
      description: '',
      status: '',
      url: '',
      repository: '',
      tags: [],
    },
  });
  const fileInputRef = form.register('images');

  const router = useRouter();
  const { toast } = useToast();

  // Custom States.
  const { enumsLoading, enums } = useEnums();

  // Form submission handler.
  const onSubmit: SubmitHandler<SchemaT> = async function (data) {
    const { images, ...rest }: { images?: FileList } = data;

    /* 
      Validing images, to see if they are actually images, 
      That they are each under 5mb large.
      And Only 5 are accepted.
    */
    let files = Array.from(images!).filter((file) => {
      if (file?.size > 5242880) return false;

      if (!['image/png', 'image/jpeg'].includes(file?.type)) return false;

      return true;
    });

    if (files.length === 0) {
      form.setError('images', {
        type: 'pattern',
        message: 'Provide at least one image, of size less than 5mb.',
      });
      return;
    }

    if (files.length > 5) files = files.slice(0, 5);

    try {
      // Uploading files.
      const uploadedFiles = await Promise.all(
        files.map(async (file) => {
          const url = await uploadFile('/projects/thumbnails', file);
          return url;
        })
      );

      // Creating a new doc inside firestore.
      const docId = await uploadDoc('projects', { images: uploadedFiles, ...rest });

      toast({
        title: 'Project Successfully Shared 🥳',
        description: 'Now the world can witness your greatness',
      });
      router.push(`/project/${docId}`);
    } catch {
      toast({
        variant: 'destructive',
        title: 'Server Error',
        description:
          'We are unable to share your project right now, please try again or come back later.',
      });
    } finally {
      return;
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('space-y-6')}>
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

        {/* Images */}
        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Images</FormLabel>
              <FormControl>
                <Input
                  disabled={form.formState.isSubmitting}
                  type="file"
                  multiple
                  accept=".png, .jpg, .jpeg"
                  {...fileInputRef}
                  className={cn('max-w-screen-sm')}
                />
              </FormControl>
              <FormDescription>Project Visuals, Upto 5 images are allowed.</FormDescription>
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
                    enums?.status.map((item) => (
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
              <FormLabel>Live View ( Optional )</FormLabel>
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
              <FormLabel>Code Repository ( Optional )</FormLabel>
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
              <FormDescription>Explain the your project&apos;s idea here.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Tags */}
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <ToggleGroup
                  disabled={form.formState.isSubmitting}
                  size={'sm'}
                  type="multiple"
                  className={cn('flex items-center justify-start flex-wrap')}
                  onValueChange={(val) => {
                    field.onChange();
                    form.setValue('tags', val);
                  }}
                >
                  {enumsLoading ? (
                    <ToggleGroupItem
                      key={`Tag: Placeholder`}
                      value="Other"
                      aria-label="Toggle bold"
                    >
                      <Small>Other</Small>
                    </ToggleGroupItem>
                  ) : (
                    enums?.tags.map((item) => (
                      <ToggleGroupItem key={`Tag: ${item}`} value={item} aria-label="Toggle bold">
                        <Small>{item}</Small>
                      </ToggleGroupItem>
                    ))
                  )}
                </ToggleGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Form Control */}
        <div className={cn('flex justify-end')}>
          <Button
            disabled={form.formState.isSubmitting}
            type="submit"
            className={cn('flex items-center gap-2')}
          >
            <Share size={16} />
            Share This Project
          </Button>
        </div>
      </form>

      {form.formState.isSubmitting && <ScreenSpinner />}
    </Form>
  );
}
