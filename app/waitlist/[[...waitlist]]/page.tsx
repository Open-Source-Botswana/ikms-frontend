'use client';

import { IKMSLogo } from '@/app/components/shared/ikms-logo';
import { Button } from '@/app/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/app/components/ui/form';
import { Input } from '@/app/components/ui/input';
import { MultiSelect } from '@/app/components/ui/multi-select';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import { useWaitListSubmit } from '@/app/hooks/use-waitlist';
import { WaitingListFormSchema } from '@/app/utils/schemas/formSchemas/waitingListFormSchema';
import { WaitlistEntry } from '@/lib/types/waitlist';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import svgPaths from '@/app/utils/svg/svg-tts5hwykkz';

export default function WaitListPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { waitListSubmit } = useWaitListSubmit();

  const router = useRouter();

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
      await waitListSubmit(data as WaitlistEntry);

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
      router.push('/');
    } catch (error) {
      console.error('Error submitting onboarding data:', error, data);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="bg-[#1a1a1a] h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="max-w-[1400px] w-full h-full flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-12 px-4 sm:px-6 lg:px-8 py-4">
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start">
          <div className="relative w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[450px] mb-4 lg:mb-6">
            <div className="relative aspect-[685/666] w-full mx-auto mt-26">
              <svg
                className="absolute inset-0 w-full h-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 685 666"
              >
                <path
                  d={svgPaths.p930c300}
                  id="Ellipse 38"
                  opacity="0.14"
                  stroke="#F3F3F3"
                />
              </svg>
              <svg
                className="absolute inset-[6%_3%_0%_0%] w-[94%] h-[95%]"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 643 633"
              >
                <path
                  d={svgPaths.p3d12e000}
                  id="Ellipse 39"
                  opacity="0.14"
                  stroke="#F3F3F3"
                />
              </svg>
              <svg
                className="absolute inset-[3%_0%_0%_-2%] w-[101%] h-[107%]"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 689 713"
              >
                <path
                  d={svgPaths.p2ecc8180}
                  id="Ellipse 40"
                  opacity="0.14"
                  stroke="#F3F3F3"
                />
              </svg>

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-[0.6] sm:scale-75 lg:scale-90">
                <IKMSLogo />
              </div>
            </div>
          </div>

          <div className="w-full max-w-[450px] text-center lg:text-left pt-10">
            <p className="font-['Poppins:Bold',sans-serif] leading-[1.3] opacity-80 text-base sm:text-lg lg:text-xl text-white mb-3 lg:mb-4">
              A gateway to the expertise of community networks, practitioners
              and policymakers
            </p>

            <div className="h-[4px] w-[80px] mx-auto lg:mx-0">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 100 6"
              >
                <line
                  stroke="#DFA100"
                  strokeLinecap="round"
                  strokeWidth="6"
                  x1="3"
                  x2="97"
                  y1="3"
                  y2="3"
                />
              </svg>
            </div>
          </div>
        </div>

              <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[12px] bg-white shadow-2xl"
      >
        <div className="sticky top-0 bg-white border-b border-[#c7ccd0] px-6 sm:px-8 pt-6 pb-4 z-10">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="font-['Roboto:Bold',sans-serif] font-bold text-[#344767] text-xl sm:text-2xl mb-2" style={{ fontVariationSettings: "'wdth' 100" }}>
                Join the waiting list!
              </h2>
              <p className="font-['Roboto:Regular',sans-serif] font-normal text-[#7b809a] text-sm sm:text-base" style={{ fontVariationSettings: "'wdth' 100" }}>
                Powered by OpenSourceBotswana
              </p>
            </div>
            <button
              onClick={() => router.back()}
              className="ml-4 text-[#7b809a] hover:text-[#344767] transition-colors"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="px-2 sm:px-8 py-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="research_purpose"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-['Roboto:Regular',sans-serif] font-normal text-[#344767] text-sm" style={{ fontVariationSettings: "'wdth' 100" }}>
                      Purpose of Research
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-[42px] rounded-[8px] border-[#c7ccd0] bg-white font-['Roboto:Regular',sans-serif] text-sm" style={{ fontVariationSettings: "'wdth' 100" }}>
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
                    <FormDescription className="font-['Roboto:Regular',sans-serif] text-xs text-[#7b809a]" style={{ fontVariationSettings: "'wdth' 100" }}>
                      This helps us understand how you will use our platform.
                    </FormDescription>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="organization"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-['Roboto:Regular',sans-serif] font-normal text-[#344767] text-sm" style={{ fontVariationSettings: "'wdth' 100" }}>
                      Organization (Optional)
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your institution or company"
                        {...field}
                        className="h-[42px] rounded-[8px] border-[#c7ccd0] bg-white font-['Roboto:Regular',sans-serif] text-sm placeholder:text-[#7b809a]"
                        style={{ fontVariationSettings: "'wdth' 100" }}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-['Roboto:Regular',sans-serif] font-normal text-[#344767] text-sm" style={{ fontVariationSettings: "'wdth' 100" }}>
                      User Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="User Name"
                        {...field}
                        className="h-[42px] rounded-[8px] border-[#c7ccd0] bg-white font-['Roboto:Regular',sans-serif] text-sm placeholder:text-[#7b809a]"
                        style={{ fontVariationSettings: "'wdth' 100" }}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="useremail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-['Roboto:Regular',sans-serif] font-normal text-[#344767] text-sm" style={{ fontVariationSettings: "'wdth' 100" }}>
                      User Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="User Email Address"
                        {...field}
                        className="h-[42px] rounded-[8px] border-[#c7ccd0] bg-white font-['Roboto:Regular',sans-serif] text-sm placeholder:text-[#7b809a]"
                        style={{ fontVariationSettings: "'wdth' 100" }}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="interests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-['Roboto:Regular',sans-serif] font-normal text-[#344767] text-sm" style={{ fontVariationSettings: "'wdth' 100" }}>
                      Key Interests
                    </FormLabel>
                    <FormControl>
                      <MultiSelect
                        options={interestOptions}
                        selected={field.value}
                        onChange={field.onChange}
                        placeholder="Select your interests"
                      />
                    </FormControl>
                    <FormDescription className="font-['Roboto:Regular',sans-serif] text-xs text-[#7b809a]" style={{ fontVariationSettings: "'wdth' 100" }}>
                      Select topics you are interested in exploring.
                    </FormDescription>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="usercontact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-['Roboto:Regular',sans-serif] font-normal text-[#344767] text-sm" style={{ fontVariationSettings: "'wdth' 100" }}>
                      User Contact (Optional)
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="User Contact Information"
                        {...field}
                        className="h-[42px] rounded-[8px] border-[#c7ccd0] bg-white font-['Roboto:Regular',sans-serif] text-sm placeholder:text-[#7b809a]"
                        style={{ fontVariationSettings: "'wdth' 100" }}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="h-[40px] flex-1 bg-[#c7ccd0] rounded-[8px] hover:bg-[#b0b5b9] transition-colors"
                >
                  <p className="font-['Roboto:Bold',sans-serif] font-bold text-xs text-center text-white uppercase" style={{ fontVariationSettings: "'wdth' 100" }}>
                    CANCEL
                  </p>
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-[40px] flex-1 bg-[#678415] rounded-[8px] hover:bg-[#567013] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <p className="font-['Roboto:Bold',sans-serif] font-bold text-xs text-center text-white uppercase" style={{ fontVariationSettings: "'wdth' 100" }}>
                    {isSubmitting ? 'SUBMITTING...' : 'SUBMIT'}
                  </p>
                </button>
              </div>
            </form>
          </Form>
        </div>
      </motion.div>
      </div>
    </div>
  );
}
