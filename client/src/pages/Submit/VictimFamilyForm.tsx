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
    name: z.string().min(3, {
    message: "name must be at least 3 characters.",
    }),
    familyMembers: z.number(),
    damageHappened: z.string().min(3, {
        message: "damageHappened must be at least 3 characters.",
    }),
    
  })

const VictimFamilyForm = () => {
    const {toast} = useToast();
    const url = import.meta.env.VITE_API_URL;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            familyMembers: 1,
            damageHappened: "",
            
        },
      });
      
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
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
            <CardTitle className="text-xl font-bold font-special text-Green-100">Victim Family Information</CardTitle>
        </CardHeader>
        <CardContent>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="text-Green-100">Name(Family Head)</FormLabel>
                    <FormControl>
                        <Input {...field} className="bg-transparent border-black"/>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="familyMembers"
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="text-Green-100">Family Members</FormLabel>
                    <FormControl>
                        <Input type="number" {...field} className="bg-transparent border-black"/>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="damageHappened"
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="text-Green-100">Damage Happened</FormLabel>
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

export default VictimFamilyForm
