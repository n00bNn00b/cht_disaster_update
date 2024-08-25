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
import { useEffect, useState } from "react";

const VictimFamilyList = () => {
    const [victimList, setVictimList] = useState<Victim[]>([]);
  const url = "https://cht-disaster-update.onrender.com";
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get<Victim[]>(`${url}/victims`);
        setVictimList(response.data);
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
        </CardContent>
      </Card>
    </>
  )
}

export default VictimFamilyList
