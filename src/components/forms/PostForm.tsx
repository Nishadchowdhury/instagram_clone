import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"


import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "../ui/textarea"
import FileUploader from "../shared/FileUploader"
import { postValidation } from "@/lib/validation"
import { Models } from "appwrite"
import { useCreatePost } from "@/lib/react-query/queriesAndMutations"
import { useUserContext } from "@/context/AuthContext"
import { useToast } from "../ui/use-toast"
import { Navigate, useNavigate } from "react-router-dom"

type PostFormProps = {
    post?: Models.Document;
}

const PostForm = ({ post }: PostFormProps) => {
    const { user } = useUserContext();
    const { toast } = useToast();
    const navigate = useNavigate();
    const { mutateAsync: createPost, isPending: isLoadingCreate } = useCreatePost()



    const form = useForm<z.infer<typeof postValidation>>({
        resolver: zodResolver(postValidation),
        defaultValues: {
            caption: post ? post.caption : "",
            file: [],
            Location: post ? post.location : "",
            tags: post ? post.tags.join(",") : "",
        },
    })

    async function onSubmit(values: z.infer<typeof postValidation>) {

        const newPost = await createPost({
            ...values,
            userId: user.id,
        })

        if (!newPost) toast({ title: "Please try again" })

        navigate('/');

        console.log(values)
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl ">
                <FormField
                    control={form.control}
                    name="caption"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_labeL">Caption</FormLabel>
                            <FormControl>
                                <Textarea className="shad-textarea custom-scrollbar" {...field} />
                            </FormControl>

                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="file"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_labeL">Add Photos</FormLabel>
                            <FormControl>
                                <FileUploader
                                    filedChange={field.onChange}
                                    mediaUrl={post?.imageUrl}
                                />
                            </FormControl>

                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="Location"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_labeL">Add Location</FormLabel>
                            <FormControl>
                                <Input type="text" className="shad-input" {...field} />
                            </FormControl>

                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_labeL">{`Add Tags (Separated by comma " , ")`}</FormLabel>
                            <FormControl>
                                <Input type="text" className="shad-input" placeholder="Art, Expression, Learn" {...field} />
                            </FormControl>

                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />

                <div className="flex gap-4 items-center justify-end">
                    <Button
                        type="button"
                        className="shad-button_dark_4"
                    >
                        Cancel
                    </Button>


                    <Button className="shad-button_primary whitespace-nowrap" type="submit">Submit</Button>
                </div>

            </form>
        </Form>
    )

}
export default PostForm