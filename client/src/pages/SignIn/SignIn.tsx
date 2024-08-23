import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

const formSchema = z.object({
    userName: z.string().min(3, {
      message: "userName must be at least 3 characters.",
    }),
    password: z.string().min(4, 'Password must be at least 4 characters')
  })

const SignIn = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            userName: "",
            password: ""
        },
      });
      
    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values)
      }
  return (
    <>
      <Card className="bg-white/50">
        <CardHeader>
            <CardTitle className="text-xl font-bold font-special text-Green-100">Sign In</CardTitle>
        </CardHeader>
        <CardContent>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
            control={form.control}
            name="userName"
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="text-Green-100">User Name</FormLabel>
                    <FormControl>
                        <Input {...field} className="bg-transparent border-black"/>
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
                    <FormLabel className="text-Green-100">Password</FormLabel>
                    <FormControl>
                        <Input type="password" {...field} className="bg-transparent border-black"/>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
            />
            <button className="bg-Green-100 w-full h-8 text-white rounded-md hover:bg-Green-100/80" type="submit">Submit</button>
        </form>
        </Form>
        </CardContent>
      </Card>
    </>
  )
}

export default SignIn
