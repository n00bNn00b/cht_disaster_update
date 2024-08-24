import { AlertDialog } from "@/components/ui/alert-dialog";
import Modal from "@/components/ui/apps/topbar/Modal/Modal";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Services } from "@/types/types";
import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
  const [services, setServices] = useState<Services[]>([]);
  const url = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get<Services[]>(`${url}/services`);
        setServices(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchServices();
  }, [url]);

  const convertDate = (isoDateString: string) => {
    const date = new Date(isoDateString);
    const formattedDate = date.toLocaleString();
    return formattedDate;
}
  return (
    <>
      <Card className="bg-white/80">
        <CardHeader>
          <CardTitle className="text-xl font-bold font-special text-Green-100">
            CHT Disaster Updates
          </CardTitle>
          <CardDescription className="text-Blue-200">
            A list of vlounteer groups and working areas to accelerate the
            working progress
          </CardDescription>
        </CardHeader>
        <AlertDialog defaultOpen={true}>
          <Modal />
        </AlertDialog>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-Green-200">টিমের নাম</TableHead>
                <TableHead className="text-Green-200">
                  টিমের স্ট্যাটাস
                </TableHead>
                <TableHead className="text-Green-200">
                  কার্যক্রম এলাকা
                </TableHead>
                <TableHead className="text-Green-200">সহায়তাসমূহ</TableHead>
                <TableHead className="text-Green-200">যোগাযোগ</TableHead>
                <TableHead className="text-Green-200">হালনাগাদের সময়</TableHead>
                <TableHead className="text-Green-200">
                  ভেরিফিকেশন স্ট্যাটাস
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((service) => (
                <TableRow key={service._id}>
                  <TableCell className="text-Blue-200">
                    {service.teamName}
                  </TableCell>
                  <TableCell className="text-Blue-200">
                    {service.status}
                  </TableCell>
                  <TableCell className="text-Blue-200">
                    {service.workingArea}
                  </TableCell>
                  <TableCell className="text-Blue-200">
                    {service.providedService}
                  </TableCell>
                  <TableCell className="text-Blue-200">
                    {service.contact}
                  </TableCell>
                  <TableCell className="text-Blue-200">
                    {convertDate(service.date)}
                  </TableCell>
                  <TableCell className="text-Blue-200">
                    {service.isVerifiedByAdmin
                      ? "Verified by IAU"
                      : "Still not verified"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
};

export default Home;
