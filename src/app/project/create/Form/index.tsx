'use client';

// Lib Imports.
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Share } from 'lucide-react';

// Local Imports.
import { cn } from '@/utils/utils';
import { Schema, SchemaT } from './schema';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
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
import { Small } from '@/components/ui/typography';

// Hooks.
import { useEnums } from '@/hooks/firebase/firestore/staticContent';

// Component.
export default function ShareProjectForm() {
  // React Hook Form Setup.
  const form = useForm<SchemaT>({
    resolver: zodResolver(Schema),
    defaultValues: {
      title: '',
      description: '',
      status: '',
      url: '',
      tags: [],
    },
  });
  const fileInputRef = form.register('images');

  // Custom States.
  const { enumsLoading, enums } = useEnums();

  // Form submission handler.
  const onSubmit: SubmitHandler<SchemaT> = async function (data) {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('space-y-4')}>
        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Title</FormLabel>
              <FormControl>
                <Input placeholder="Projectarium" {...field} className={cn('max-w-screen-sm')} />
              </FormControl>
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
                  type="file"
                  multiple
                  accept=".png, .jpg, .jpeg"
                  {...fileInputRef}
                  className={cn('max-w-screen-sm')}
                />
              </FormControl>
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
                  <SelectTrigger className={cn('max-w-screen-sm')}>
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
                  type="url"
                  placeholder="https://projectarium.vercel.app"
                  {...field}
                  className={cn('max-w-screen-sm')}
                />
              </FormControl>
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
                  placeholder="Tell us a little bit about your project"
                  className={cn('resize-y max-w-screen-sm')}
                  {...field}
                />
              </FormControl>
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
          <Button type="submit" className={cn('flex items-center gap-2')}>
            <Share size={16} />
            Share This Project
          </Button>
        </div>
      </form>
    </Form>
  );
}
