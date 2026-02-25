"use client"

import { Button } from '@/app/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/form';
import { Input } from '@/app/components/ui/input';
import { MultiSelect } from '@/app/components/ui/multi-select';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { useWaitListSubmit } from '@/app/hooks/use-waitlist';
import { WaitingListFormSchema } from '@/app/utils/schemas/formSchemas/waitingListFormSchema';
import { WaitlistEntry } from '@/lib/types/waitlist';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import z from 'zod';

export default function WaitListPage() {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { waitListSubmit } = useWaitListSubmit()

  const router = useRouter()

  const form = useForm<z.infer<typeof WaitingListFormSchema>>({
    resolver: zodResolver(WaitingListFormSchema),
    defaultValues: {
      research_purpose: undefined,
      organization: '',
      interests: [],
      useremail: '',
      usercontact: '',
    },
  });


  const interestOptions = [
    { label: 'Indigenous Knowledge', value: 'indigenous-knowledge' },
    { label: 'Artificial Intelligence', value: 'ai' },
    { label: 'Agriculture', value: 'agriculture' },
    { label: 'Climate Change', value: 'climate-change' },
    { label: 'Education', value: 'education' },
    { label: 'Healthcare', value: 'healthcare' },
    { label: 'Technology', value: 'technology' },
    { label: 'Cultural Preservation', value: 'cultural-preservation' },
  ];

  const onSubmit = async (data: z.infer<typeof WaitingListFormSchema>) => {
    setIsSubmitting(true);
    try {
      await waitListSubmit(data as WaitlistEntry)

      // await WaitingListService.addToWaitingList(data);


      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (result.error) {
        console.error(result.error);
      }

      form.reset();
      router.push("/")
    } catch (error) {
      console.error('Error submitting onboarding data:', error, data);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800"
      >


        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Join the waiting list!
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Be part of something extraodinary. Join thousands of other already
            gaining early access to our revolutionary new products.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="research_purpose"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Purpose of Research</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your research purpose" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="academic">Academic</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="personal">Personal</SelectItem>
                      <SelectItem value="nonprofit">Non-profit</SelectItem>
                      <SelectItem value="government">Government</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    This helps us understand how you will use our platform.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="organization"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your institution or company"
                      {...field}
                      autoFocus
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User Name</FormLabel>
                  <FormControl>
                    <Input placeholder="User Name" {...field} autoFocus />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="useremail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="User Email Address"
                      {...field}
                      autoFocus
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="interests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Key Interests</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={interestOptions}
                      selected={field.value}
                      onChange={field.onChange}
                      placeholder="Select your interests"
                      autoFocus
                    />
                  </FormControl>
                  <FormDescription>
                    Select topics you are interested in exploring.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="usercontact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User Contact (optional) </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="User Contact Information"
                      {...field}
                      autoFocus
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mt-6 flex justify-between">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
            </div>
          </form>
        </Form>
      </motion.div>
    </div>
  );
}
