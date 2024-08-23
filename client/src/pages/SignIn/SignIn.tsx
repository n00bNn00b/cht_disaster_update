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
import axios from "axios";
import { toast } from "@/components/ui/use-toast";

const formSchema = z.object({
  email: z.string().min(3, {
    message: "email must be at least 3 characters.",
  }),
  password: z.string().min(4, "Password must be at least 4 characters"),
});

const SignIn = () => {
  const url = import.meta.env.VITE_API_URL;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios
        .post(`${url}/login`, values)
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            toast({
              title: res.data.message,
            });
          }
        })
        .catch((err) => {
          toast({
            title: err.response.data.error,
          });
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <>
      <Card className="bg-white/80">
        <CardHeader>
          <CardTitle className="text-xl font-bold font-special text-Green-100">
            Sign In
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-Green-100">Email</FormLabel>
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
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-Green-100">Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
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
                Submit
              </button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};

export default SignIn;
