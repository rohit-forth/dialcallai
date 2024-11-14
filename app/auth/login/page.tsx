"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { z } from "zod";

import { Button, buttonVariants } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import linkedin from "@/public/images/linkdin.png"
import google from "@/public/images/google.png"
import outlook from "@/public/images/outlook.png"
// Define the validation schema using Zod
const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
});

export default function LoginForm() {
    const form = useForm({
        resolver: zodResolver(formSchema),
    });

    // Define the submit handler with FieldValues type
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        // TypeScript will infer the data type
        const username = (data as { username: string }).username;
        console.log("Form data:", username);
    };

    return (
        <section className="w-full">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter Email" {...field} />
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
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter Password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="w-full text-end ">
                        <Link href="" className="bg-transparent text-primary  shadow-none border-0 ">
                            Forgot Password?
                        </Link>
                        {/* <Link href="" className={`${buttonVariants({ variant: "outline" })} text-primary border-0 shadow-none hover:text-primary` } >
                        Forgot Password?
                    </Link> */}

                    </div>
                    <Button className="w-full theme-background text-white" variant={"default"} type="submit">
                        Login
                    </Button>
                    <div className="w-full text-center ">
                        <p>Or log in with</p>
                    </div>
                </form>
            </Form>
            <div className="login-btn flex flex-row justify-center mt-6">
                <Button className="bg-transparent border-0 shadow-none"><img src={outlook.src} alt="outlook" /></Button>
                <Button className="bg-transparent border-0 shadow-none"><img src={google.src} alt="google" /></Button>
                <Button className="bg-transparent border-0 shadow-none"><img src={linkedin.src} alt="linkedin" /></Button>
            </div>
            <div className="mt-8"> 
                <p className="text-gray font-light">Don’t have an account?</p>
                <Link href={"" } className="font-medium text-base underline">Join today</Link>
            </div>
        </section>
    );
}
