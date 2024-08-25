import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";


const formSchema = z.object({
  areaName: z.string().min(3, {
    message: "areaName must be at least 3 characters.",
  }),
  date: z.date(),
});

const AffectedAreas = () => {
  const { toast } = useToast();
  const date = new Date();
  const url = "https://cht-disaster-update.onrender.com";
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      areaName: "",
      date: date,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      await axios.post(`${url}/areas/add`, values);
      toast({
        title: "Record saved to database",
      });
    } catch (error) {
      console.error("Error:", error);
    }
    form.reset();
  };

  return (
    <>
      <Card className="bg-white/80">
        <CardHeader>
          <CardTitle className="text-xl font-bold font-special text-Green-100">
            দুর্গত এলাকার হালনাগাদ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="areaName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-Green-100">
                      দুর্গত এলাকার নাম(উদাহরণঃ লতিবান, পানছড়ি)
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="bg-transparent border-black"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <button
                className="bg-Green-100 w-full h-8 text-white rounded-md hover:bg-Green-100/80"
                type="submit"
              >
                যুক্ত করুন
              </button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};

export default AffectedAreas;
