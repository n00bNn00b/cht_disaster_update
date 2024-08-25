import { AlertDialog } from "@/components/ui/alert-dialog";
import Modal from "@/components/ui/apps/topbar/Modal/Modal";
import { Badge } from "@/components/ui/badge";
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
  const [currentPage, setCurrentPage] = useState(1); // State to track current page
  const [totalPages, setTotalPages] = useState(1); // State to track total pages

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const pageSize = 20; // Number of records per page (same as backend)
        const response = await axios.get(
          `${url}/services?page=${currentPage}&limit=${pageSize}` // Add pagination parameters
        );
        console.log(response.data)
        setServices(response.data.data);
        setTotalPages(Math.ceil(response.data.totalRecords / pageSize)); // Calculate total pages from response
      } catch (error) {
        console.log(error);
      }
    };

    fetchServices();
  }, [url, currentPage]); // Update on URL change or page change

  const convertDate = (isoDateString: string) => {
    const date = new Date(isoDateString);
    const formattedDate = date.toLocaleString();
    return formattedDate;
}

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

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
                <TableHead className="text-Green-200 font-bold">টিমের নাম</TableHead>
                <TableHead className="text-Green-200 font-bold">
                  টিমের স্ট্যাটাস
                </TableHead>
                <TableHead className="text-Green-200 font-bold">
                  কার্যক্রম এলাকা
                </TableHead>
                <TableHead className="text-Green-200 font-bold">সহায়তাসমূহ</TableHead>
                <TableHead className="text-Green-200 font-bold">যোগাযোগ</TableHead>
                <TableHead className="text-Green-200 font-bold">হালনাগাদের সময়</TableHead>
                <TableHead className="text-Green-200 font-bold">
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
                      ? <Badge variant="outline" className="bg-Green-200 text-white">Verified by IAU</Badge>
                      : <Badge variant="outline" className="bg-yellow-300 text-white">Still not verified</Badge>}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* Add pagination controls */}
          <div className="flex justify-between mt-4">
            {currentPage > 1 && (
              <button onClick={handlePreviousPage} className="px-10 py-2 rounded-md bg-Green-200 text-white">
                Previous Page
              </button>
            )}
            {currentPage < totalPages && (
              <button onClick={handleNextPage} className="px-10 py-2 rounded-md bg-Green-200 text-white">
                Next Page
              </button>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default Home;