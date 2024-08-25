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
  import { Areas } from "@/types/types";
  import axios from "axios";
  import { useEffect, useState } from "react";

const AffectedAreasPage = () => {
    const [areas, setAreas] = useState<Areas[]>([]);
    const url = "https://cht-disaster-update.onrender.com";
    useEffect(() => {
      const fetchServices = async () => {
        try {
          const response = await axios.get<Areas[]>(`${url}/areas`);
          setAreas(response.data);
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
              Affected Areas
            </CardTitle>
          </CardHeader>
         <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-Green-200">Affected Areas</TableHead>
                  
                </TableRow>
              </TableHeader>
              <TableBody>
                {areas.map((area) => (
                  <TableRow key={area._id}>
                    <TableCell className="text-Blue-200">
                      {area.areaName}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </>
    );
}

export default AffectedAreasPage
