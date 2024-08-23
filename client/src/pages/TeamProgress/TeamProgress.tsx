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
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
    teamName: z.string().min(3, {
    message: "teamName must be at least 3 characters.",
    }),
    status: z.string().min(3, {
        message: "status must be at least 3 characters.",
    }),
    workingArea: z.string().min(3, {
        message: "workingArea must be at least 3 characters.",
    }),
    providedService: z.string().min(3, {
        message: "providedService must be at least 3 characters.",
    }),
    contact: z.string().min(3, {
        message: "contact must be at least 3 characters.",
    }),
    date: z.date(),
    isVerifiedByAdmin: z.boolean()
  })

const TeamProgress = () => {
    const {toast} = useToast();
    const date = new Date(); 
    const url = import.meta.env.VITE_API_URL;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            teamName: "",
            status: "",
            workingArea: "",
            providedService: "",
            contact: "",
            date: date,
            isVerifiedByAdmin: false
        },
      });
      
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values)
        try {
            await axios.post(`${url}/services/add`, values);
            toast({
              title: "Record saved to database"
            })
          } catch (error) {
            console.error('Error:', error);
          }
      }
  return (
    <>
      <Card className="bg-white/80">
        <CardHeader>
            <CardTitle className="text-xl font-bold font-special text-Green-100">Team Progress</CardTitle>
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
            name="status"
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
            name="workingArea"
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="text-Green-100">Working Area</FormLabel>
                    <FormControl>
                        <Input {...field} className="bg-transparent border-black"/>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="providedService"
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="text-Green-100">Provided Services</FormLabel>
                    <FormControl>
                        <Input {...field} className="bg-transparent border-black"/>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="contact"
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="text-Green-100">Contact No.</FormLabel>
                    <FormControl>
                        <Input {...field} className="bg-transparent border-black"/>
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
