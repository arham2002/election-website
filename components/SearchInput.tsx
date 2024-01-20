"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod"
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect, useRef, useState } from "react";




// Import statements...

const formSchema = z.object({
  input: z.string().min(2).max(50),
});

type Props = {
  keyword: string;
  suggestions: string[] | undefined; // New prop for suggestions
};

function SearchInput({ keyword, suggestions }: Props) {
  const router = useRouter();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchBoxRef = useRef<HTMLInputElement>(null);
  const suggestionClickedRef = useRef(true);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      input: "",
    },
  });

  const handleInputChange = (value: string) => {
    form.setValue("input", value);
    setShowSuggestions(value.trim().length > 0);
  };

  const handleSuggestionClick = (value: string) => {

    suggestionClickedRef.current = true;

    // Set input value and hide suggestions
    form.setValue("input", value);
    setShowSuggestions(false);

    // Trigger form submission
    form.handleSubmit(onSubmit)();
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const cleanedInput = values.input.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");
    router.push(`/search/${cleanedInput}`);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
  
      // Log the value of suggestionClickedRef
  
      // Close suggestions dropdown if clicked outside of it, the search box, or the suggestion box
      if (
        !suggestionClickedRef.current &&
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target as Node) &&
        event.target !== searchBoxRef.current
      ) {
        setShowSuggestions(false);
      }
  
      suggestionClickedRef.current = true;
    };
  
    document.addEventListener("mousedown", handleOutsideClick);
  
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  },  [suggestionClickedRef]);

  
  
  
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-center space-x-2 text-4xl relative"
        autoComplete="off"
      >
        <FormField
          control={form.control}
          name="input"
          render={({ field }) => (
            <FormItem>
              <FormControl className="w-full relative">
                <div>
                  <Input
                    className="text-2xl h-12"
                    placeholder={`Search by ${keyword}`}
                    {...field}
                    onChange={(e) => {
                      handleInputChange(e.target.value);
                    }}
                    autoComplete="off"
                    ref={searchBoxRef}
                  />
                  {showSuggestions && suggestions && suggestions.length > 0 && (
                    <div className="absolute top-full left-0 bg-white border border-gray-300 mt-1 w-full rounded-md shadow-lg">
                      {suggestions
                        .filter((suggestion) =>
                          suggestion.toLowerCase().includes(form.getValues("input").toLowerCase())
                        )
                        .slice(0, 6)
                        .map((suggestion, index) => (
                          <div
                            key={index}
                            className="cursor-pointer p-2 text-sm hover:bg-gray-100"
                            onClick={() => handleSuggestionClick(suggestion)}
                          >
                            {suggestion}
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <Button className="space-y-2 border-black h-10 py-2 px-3">Search</Button>
      </form>
    </Form>
  );

  // ... (other imports and code)

    

}


export default SearchInput;

