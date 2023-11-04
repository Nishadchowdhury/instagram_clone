import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Loader } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { signinValidation } from "@/lib/validation"
import { useSignInAccount } from "@/lib/react-query/queriesAndMutations"
import { useUserContext } from "@/context/AuthContext"



const SigninForm = () => {
    const { toast } = useToast()
    const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
    const navigate = useNavigate();

    const { mutateAsync: singInAccount, isPending } = useSignInAccount();

    const form = useForm<z.infer<typeof signinValidation>>({
        resolver: zodResolver(signinValidation),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof signinValidation>) {
        console.log(values)

        const session = await singInAccount({
            email: values.email,
            password: values.password
        });

        if (!session) return toast({
            title: "Sign in failed, please try again!"
        })

        const isLoggedIn = await checkAuthUser();

        if (isLoggedIn) {
            form.reset();
            navigate("/")
        } else {
            return toast({ title: "Sign up failed. Please try again!" })
        }

    }

    return (


        <div className="sm:w-420 flex-center flex-col  ">
            <img src="/assets/images/logo.svg" alt="" />

            <h2 className="h3-bold md:h2-bold pt-5 sm:pt-2" >Log in to your account</h2>
            <p className="text-light-3 small-medium md:base-regular mt-2" >welcome back, Please enter your account details.</p>

            <Form {...form}>

                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input autoComplete="on" type="email" className="shad-input" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input autoComplete="on" type="password" className="shad-input" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="shad-button_primary">
                        {
                            isUserLoading ? (<div className="flex-center gap-2 ">
                                <Loader />
                            </div>) : ("Sign In")
                        }
                    </Button>

                    <p className="text-small-regular text-light-2 text-center mt-2">
                        Already have an account?

                        <Link to={"/sign-up"} className="text-primary-500 text-small-semibold ml-1" children="Log in" />

                    </p>
                </form>
            </Form>
        </div >
    )

}
export default SigninForm