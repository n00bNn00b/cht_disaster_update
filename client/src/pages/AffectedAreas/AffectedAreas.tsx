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
    const [currentPage, setCurrentPage] = useState(1); // State to track current page
    const [totalPages, setTotalPages] = useState(1); 
    const url = "https://cht-disaster-update.onrender.com";
    useEffect(() => {
      const fetchServices = async () => {
        try {
          const pageSize = 10;
          const response = await axios.get(`${url}/areas?page=${currentPage}&limit=${pageSize}`);
          setTotalPages(Math.ceil(response.data.totalRecords / pageSize));
          setAreas(response.data.data);
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchServices();
    }, [url, currentPage]);

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
}

export default AffectedAreasPage
