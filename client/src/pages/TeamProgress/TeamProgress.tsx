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
    teamName: z.string().min(3, {
    message: "teamName must be at least 3 characters.",
    }),
    teamStatus: z.string().min(3, {
        message: "teamStatus must be at least 3 characters.",
    }),
    workinAreas: z.string().min(3, {
        message: "teamStatus must be at least 3 characters.",
    }),
    areasDone: z.string().min(3, {
        message: "teamStatus must be at least 3 characters.",
    }),
    contactNo: z.string().min(3, {
        message: "teamStatus must be at least 3 characters.",
    }),
  })

const TeamProgress = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            teamName: "",
            teamStatus: "",
            workinAreas: "",
            areasDone: "",
            contactNo: ""
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
            name="teamName"
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="text-Green-100">Team Name</FormLabel>
                    <FormControl>
                        <Input {...field} className="bg-transparent border-black"/>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="teamStatus"
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="text-Green-100">Team Staus</FormLabel>
                    <FormControl>
                        <Input {...field} className="bg-transparent border-black"/>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="workinAreas"
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="text-Green-100">Working Areas</FormLabel>
                    <FormControl>
                        <Input {...field} className="bg-transparent border-black"/>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="areasDone"
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="text-Green-100">Areas Done</FormLabel>
                    <FormControl>
                        <Input {...field} className="bg-transparent border-black"/>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="contactNo"
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="text-Green-100">Contact No.</FormLabel>
                    <FormControl>
                        <Input type="tel" {...field} className="bg-transparent border-black"/>
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

export default TeamProgress
