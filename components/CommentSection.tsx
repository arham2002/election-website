"use client";

import React from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem } from './ui/form';
import { Button } from './ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  input: z.string().min(2).max(50),
});

type Props = {
  keyword: string;
}

function CommentSection() {


const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      input: "",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    router.push(`/search/${values.input}`)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} >
        <FormField 
          control={form.control}
          name='input'
          render={({ field }) => (
            <FormItem>
              <FormControl className="w-full">
                <Textarea  
                  placeholder="Comments"
                  className='w-full h-40'
                />
              </FormControl>
            </FormItem>
          )}
        />
      
      <Button className=" border-black border-2 h-10 py-6 px-4 mt-4 text-xl transition-colors hover:bg-green-500 hover:text-black">Submit</Button>
      </form>
    </Form>
  )
}

export default CommentSection;