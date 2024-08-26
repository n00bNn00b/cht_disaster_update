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
import { ChevronLeft, ChevronRight } from "lucide-react";
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
              দুর্গত এলাকাসমূহ
            </CardTitle>
          </CardHeader>
         <CardContent>
            <Table> 
              <TableHeader>
                <TableRow>
                  <TableHead className="text-Green-200 font-bold">এলাকার নাম</TableHead>
                  <TableHead className="text-Green-200 font-bold">পরিবার সংখ্যা</TableHead>
                  <TableHead className="text-Green-200 font-bold">ইউনিয়ন</TableHead>
                  <TableHead className="text-Green-200 font-bold">উপজেলা</TableHead>
                  <TableHead className="text-Green-200 font-bold">জেলা</TableHead>
                  <TableHead className="text-Green-200 font-bold">যোগাযোগের প্রতিনিধি</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {areas.map((area) => (
                  <TableRow key={area._id}>
                    <TableCell className="text-Blue-200">
                      {area.areaName}
                    </TableCell>
                    <TableCell className="text-Blue-200">
                      {area.families}
                    </TableCell>
                    <TableCell className="text-Blue-200">
                      {area.union}
                    </TableCell>
                    <TableCell className="text-Blue-200">
                      {area.subDistrict}
                    </TableCell>
                    <TableCell className="text-Blue-200">
                      {area.district}
                    </TableCell>
                    <TableCell className="text-Blue-200">
                      {area.representitive}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex justify-center gap-4 mt-4">
            {currentPage > 1 && (
              <button onClick={handlePreviousPage} className="px-2 py-2 rounded-xl bg-Green-200 text-white hover:bg-Green-200/90">
                <ChevronLeft/>
              </button>
            )}
            {currentPage < totalPages && (
              <button onClick={handleNextPage} className="px-2 py-2 rounded-xl bg-Green-200 text-white hover:bg-Green-200/90">
                <ChevronRight/>
              </button>
            )}
          </div>
          </CardContent>
        </Card>
      </>
    );
}

export default AffectedAreasPage
