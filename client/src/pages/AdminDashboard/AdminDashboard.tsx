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

const AdminDashboard = () => {
    const [services, setServices] = useState<Services[]>([]);
    const [newServices, setNewServices] = useState<Services[]>([]);
    const [listName, setListName] = useState<string>("");
    const url = import.meta.env.VITE_API_URL;
    useEffect(() => {
        const fetchServices = async () => {
        try {
            const response = await axios.get<Services[]>(`${url}/services`);
            setServices(response.data);
            setNewServices(response.data);
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

    const handleVerifiedList = () => {
        setListName("Verified List");
        const verifiedList = services.filter(service => service.isVerifiedByAdmin === true);
        setNewServices(verifiedList);
    };

    const handleUnverifiedList = () => {
        setListName("Unverified List");
        const unverifiedList = services.filter(service => service.isVerifiedByAdmin === false);
        setNewServices(unverifiedList);
    }
  return (
    <>
      <div className='flex gap-4 w-full'>
        <button onClick={handleVerifiedList} className='font-special font-semibold bg-White text-Green-200 px-8 py-2 rounded-md'>Verified</button>
        <button onClick={handleUnverifiedList} className='font-special font-semibold bg-White text-Green-200 px-8 py-2 rounded-md'>Unverified</button>
      </div>
      <Card className="bg-white/80 mt-6">
        <CardHeader>
          <CardTitle className="text-xl font-bold font-special text-Green-100">
            {listName? listName : "CHT Disaster Updates"}
          </CardTitle>
          <CardDescription className="text-Blue-200">
            A list of vlounteer groups and working areas to accelerate the
            working progress
          </CardDescription>
        </CardHeader>
       <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-Green-200">Team Name</TableHead>
                <TableHead className="text-Green-200">Status</TableHead>
                <TableHead className="text-Green-200">Working Area</TableHead>
                <TableHead className="text-Green-200">
                  Provided Services
                </TableHead>
                <TableHead className="text-Green-200">Contact No.</TableHead>
                <TableHead className="text-Green-200">Date</TableHead>
                <TableHead className="text-Green-200">Admin Status</TableHead>
                <TableHead className="text-Green-200">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {newServices.map((service) => (
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
                  <TableCell className="text-Blue-200 flex gap-1">
                    <button className="px-2 py-1 bg-Green-100 rounded-md text-white">Verify</button>
                    <button className="px-2 py-1 bg-red-700 rounded-md text-white">Delete</button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  )
}

export default AdminDashboard
