import {
    Card,
    CardContent,
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

const VictimFamilyList = () => {
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
  return (
    <>
      <Card className="bg-white/80">
        <CardHeader>
          <CardTitle className="text-xl font-bold font-special text-Green-100">
            Victim Family List
          </CardTitle>
        </CardHeader>
       <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-Green-200">Name(Family Head)</TableHead>
                <TableHead className="text-Green-200">Family Members</TableHead>
                <TableHead className="text-Green-200">Damaged Happened</TableHead>
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  )
}

export default VictimFamilyList
