"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import linkedin from "@/public/images/linkdin.png"
import google from "@/public/images/google.png"
import outlook from "@/public/images/outlook.png"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { Checkbox } from "@/components/ui/checkbox";

// Define the validation schema using Zod
const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
});

export default function SignUp() {
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
        <>
            <Tabs defaultValue="basic_info" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-5">
                    <TabsTrigger value="basic_info">Basic info</TabsTrigger>
                    <TabsTrigger value="password">Password setup</TabsTrigger>
                    <TabsTrigger value="verification">Verification</TabsTrigger>
                </TabsList>
                {/* basic_info */}
                <TabsContent value="basic_info">
                    <Card className="border-0 shadow-none">
                        {/* <CardHeader>
                            <CardTitle>Account</CardTitle>
                        </CardHeader> */}
                        <CardContent className="space-y-3 p-0">
                            <div className="space-y-1">
                                <Input id="email" defaultValue="johndoe@gmail.com" />
                            </div>
                            <div className="space-y-1">
                                <Input id="username" placeholder="Company name" />
                            </div>
                            <div className="space-y-1">
                                <Input id="username" placeholder="First name" />
                            </div>
                            <div className="space-y-1">
                                <Input id="username" placeholder="Last name" />
                            </div>
                            <div className="space-y-1">
                                <Input id="username" placeholder="Contact details" />
                            </div>
                            <CardFooter className="p-0">
                                <Button className="w-full theme-background text-white">Next</Button>
                            </CardFooter>
                            <div className="w-full text-center mb-2">
                                <p>Or sign up with</p>
                            </div>
                            <div className="login-btn flex flex-row justify-center mt-6">
                                <Button className="bg-transparent border-0 shadow-none"><img src={outlook.src} alt="outlook" /></Button>
                                <Button className="bg-transparent border-0 shadow-none"><img src={google.src} alt="google" /></Button>
                                <Button className="bg-transparent border-0 shadow-none"><img src={linkedin.src} alt="linkedin" /></Button>
                            </div>
                            <div className="mt-8">
                                <p className="text-gray font-light">Already have an account?</p>
                                <Link href={""} className="font-medium text-base underline">Log into your account</Link>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* password tab */}
                <TabsContent value="password" >
                    <Card className="border-0 shadow-none">
                        <CardContent className=" space-y-3 p-0 mb-5">
                            <div className="space-y-1">
                                <Input id="current" type="password" placeholder="Enter your password" />
                            </div>
                            <div className="space-y-1">
                                <ul className="text-gray grid font-normal text-xs gap-2 grid-cols-2">
                                    <li>Use 8 or more characters</li>
                                    <li>One special character</li>
                                    <li>One uppercase character</li>
                                    <li>One lowercase character</li>
                                    <li>One number</li>
                                </ul>
                            </div>
                            <div className="space-y-1">
                                <Input id="new" type="password" placeholder="Re-enter your password" />
                            </div>
                        </CardContent>
                        <CardFooter className="p-0 mb-4">
                            <Button className="w-full theme-background text-white">Next</Button>
                        </CardFooter>
                        <div className="w-full text-center mb-2">
                            <p>Or sign up with</p>
                        </div>
                        <div className="login-btn flex flex-row justify-center mt-6">
                            <Button className="bg-transparent border-0 shadow-none"><img src={outlook.src} alt="outlook" /></Button>
                            <Button className="bg-transparent border-0 shadow-none"><img src={google.src} alt="google" /></Button>
                            <Button className="bg-transparent border-0 shadow-none"><img src={linkedin.src} alt="linkedin" /></Button>
                        </div>
                        <div className="mt-8">
                            <p className="text-gray font-light">Already have an account?</p>
                            <Link href={""} className="font-medium text-base underline">Log into your account</Link>
                        </div>
                    </Card>
                </TabsContent>


                {/* verification tab */}
                <TabsContent value="verification">
                    <Card className="border-0 shadow-none">
                        <CardContent className="space-y-3 p-0">
                            <div className="space-y-3">
                                <Label htmlFor="current" className="text-gray">Enter verification code we just sent to</Label>
                                <p className="font-medium">johndoe@gmail.com</p>
                                <InputOTP maxLength={6}>
                                    <InputOTPGroup>
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                        <InputOTPSlot index={2} />
                                    </InputOTPGroup>
                                    <InputOTPSeparator />
                                    <InputOTPGroup>
                                        <InputOTPSlot index={3} />
                                        <InputOTPSlot index={4} />
                                        <InputOTPSlot index={5} />
                                    </InputOTPGroup>
                                </InputOTP>
                            </div>
                            <div>
                                <p >Resend?<span className="text-primary ml-2">00:59</span></p>
                            </div>
                            <CardFooter className="p-0 mt-4">
                                <Button className="w-full theme-background text-white">Create account</Button>
                            </CardFooter>
                            <div className="terms-and-conditions flex flex-col">
                                <div className="flex">
                                    <Checkbox className="mt-1 mr-2" />
                                    <p className="p-0 text-xs font-normal light-black">I want to receive emails about the product, feature updates, events, and marketing promotions.</p>
                                </div>
                                <div>
                                    <p className="text-gray text-xs ">By creating an account, you agree to the <span className="theme-color underline"> Terms of use and Privacy Policy.</span> </p>
                                </div>
                            </div>
                        </CardContent>

                        <div className="w-full text-center mb-2 p-4">
                            <p>Or sign up with</p>
                        </div>
                        <div className="login-btn flex flex-row justify-center mt-6">
                            <Button className="bg-transparent border-0 shadow-none"><img src={outlook.src} alt="outlook" /></Button>
                            <Button className="bg-transparent border-0 shadow-none"><img src={google.src} alt="google" /></Button>
                            <Button className="bg-transparent border-0 shadow-none"><img src={linkedin.src} alt="linkedin" /></Button>
                        </div>
                        <div className="mt-8">
                            <p className="text-gray font-light">Already have an account?</p>
                            <Link href={""} className="font-medium text-base underline">Log into your account</Link>
                        </div>
                    </Card>
                </TabsContent>
            </Tabs>
        </>
        // <Form {...form}>
        //   <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        //     <FormField
        //       control={form.control}
        //       name="username"
        //       render={({ field }) => (
        //         <FormItem>
        //           <FormLabel>Email</FormLabel>
        //           <FormControl>
        //             <Input placeholder="Enter Email" {...field} />
        //           </FormControl>
        //           {/* <FormDescription>
        //             This is your public display name.
        //           </FormDescription> */}
        //           <FormMessage />
        //         </FormItem>
        //       )}
        //     />
        //     <FormField
        //       control={form.control}
        //       name="username"
        //       render={({ field }) => (
        //         <FormItem>
        //           <FormLabel>Password</FormLabel>
        //           <FormControl>
        //             <Input placeholder="Enter Password" {...field} />
        //           </FormControl>
        //           {/* <FormDescription>
        //             This is your public display name.
        //           </FormDescription> */}
        //           <FormMessage />
        //         </FormItem>
        //       )}
        //     />
        //     <div>
        //       <Link
        //         href=""
        //         className="bg-transparent text-primary shadow-none border-0 "
        //       >
        //         Forgot Password?
        //       </Link>
        //     </div>
        //     <Button className="w-full" variant={"default"} type="submit">
        //       Login
        //     </Button>
        //   </form>
        // </Form>

    );
}
