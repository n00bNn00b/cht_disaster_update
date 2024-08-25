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
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  victimName: z.string().min(3, {
    message: "name must be at least 3 characters.",
  }),
  familyMember: z.coerce.number().int().gte(0).positive(),
  contact: z.string(),
  address: z.string().min(3, {
    message: "address must be at least 3 characters.",
  }),
  union: z.string(),
  subDistrict: z.string(),
  district: z.string(),
  status: z.string(),
  date: z.date(),
});

const VictimFamilyForm = () => {
  const { toast } = useToast();
  const url = "https://cht-disaster-update.onrender.com";
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      victimName: "",
      contact: "",
      address: "",
      union: "",
      subDistrict: "",
      district: "",
      status: "",
      date: new Date(),
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await axios.post(`${url}/victims/add`, values).then((res) => {
      if (res.status === 201) {
        toast({
          title: res.data.message,
        });
      }
    });
    form.reset();
  };
  return (
    <>
      <Card className="bg-white/80">
        <CardHeader>
          <CardTitle className="text-xl font-bold font-special text-Green-100">
            ভিক্টিমের তালিকা হালনাগাদ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="victimName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-Green-100">
                      ভিক্টিমের নাম
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
              <FormField
                control={form.control}
                name="familyMember"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-Green-100">
                      পরিবারের সদস্য সংখ্যা
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
              <FormField
                control={form.control}
                name="contact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-Green-100">
                      যোগাযোগের নম্বরঃ
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
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-Green-100">গ্রামের নাম</FormLabel>
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
                name="union"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-Green-100">ইউনিয়ন</FormLabel>
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
                name="subDistrict"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-Green-100">উপজেলা</FormLabel>
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
                name="district"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-Green-100">জেলা</FormLabel>
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
                Submit
              </button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};

export default VictimFamilyForm;
