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
import { Victim } from "@/types/types";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

const VictimFamilyList = () => {
    const [victimList, setVictimList] = useState<Victim[]>([]);
    const [currentPage, setCurrentPage] = useState(1); // State to track current page
    const [totalPages, setTotalPages] = useState(1); 
  const url = "https://cht-disaster-update.onrender.com";
  useEffect(() => {
    const fetchServices = async () => {
      try {
          const pageSize = 10;
          const response = await axios.get(`${url}/victims?page=${currentPage}&limit=${pageSize}`);
          setTotalPages(Math.ceil(response.data.totalRecords / pageSize));
          setVictimList(response.data.data);
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
          ভিক্টিমের তালিকা
          </CardTitle>
        </CardHeader>
       <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-Green-200 font-bold">নাম</TableHead>
                <TableHead className="text-Green-200 font-bold">পরিবারের সদস্য সংখ্যা</TableHead>
                <TableHead className="text-Green-200 font-bold">যোগাযোগের নম্বরঃ</TableHead>
                <TableHead className="text-Green-200 font-bold">ক্ষয়ক্ষতিসমূহ</TableHead>
                <TableHead className="text-Green-200 font-bold">গ্রামের নাম</TableHead>
                <TableHead className="text-Green-200 font-bold">ইউনিয়ন</TableHead>
                <TableHead className="text-Green-200 font-bold">উপজেলা</TableHead>
                <TableHead className="text-Green-200 font-bold">জেলা</TableHead>
                <TableHead className="text-Green-200 font-bold">সংযুক্তির সময়</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {victimList.map((victim) => (
                <TableRow key={victim._id}>
                  <TableCell className="text-Blue-200">
                    {victim.victimName}
                  </TableCell>
                  <TableCell className="text-Blue-200">
                    {victim.familyMember}
                  </TableCell>
                  <TableCell className="text-Blue-200">
                    {victim.contact}
                  </TableCell>
                  <TableCell className="text-Blue-200">
                    {victim.damages}
                  </TableCell>
                  <TableCell className="text-Blue-200">
                    {victim.address}
                  </TableCell>
                  <TableCell className="text-Blue-200">
                    {victim.union}
                  </TableCell>
                  <TableCell className="text-Blue-200">
                    {victim.subDistrict}
                  </TableCell>
                  <TableCell className="text-Blue-200">
                    {victim.district}
                  </TableCell>
                  <TableCell className="text-Blue-200">
                    {convertDate(victim.date)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-center gap-4 mt-4">
            {currentPage > 1 && (
              <button onClick={handlePreviousPage} className="px-2 py-2 rounded-xl bg-Green-200 text-white bg-Green-200/90">
                <ChevronLeft/>
              </button>
            )}
            {currentPage < totalPages && (
              <button onClick={handleNextPage} className="px-2 py-2 rounded-xl bg-Green-200 text-white bg-Green-200/90">
                <ChevronRight/>
              </button>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default VictimFamilyList
