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
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  
import { useToast } from "@/components/ui/use-toast";
import { Areas } from "@/types/types";
import axios from "axios";
import { useEffect, useState } from "react";

interface formData {
  areaName?: string;
  families?: number;
  union?: string;
  subDistrict?: string;
  district?: string;
  representitive?: string;
}

const AffectedAreaDashboard = () => {
    const [areas, setAreas] = useState<Areas[]>([]);
    const [currentPage, setCurrentPage] = useState(1); // State to track current page
    const [totalPages, setTotalPages] = useState(1); 
    const [formData, setFormData] = useState<formData>({
      areaName:"",
      families: 0,
      union:"",
      subDistrict:"",
      district:"",
      representitive:"",
    });
    const {toast} = useToast();
    const url = "https://cht-disaster-update.onrender.com";
    const date = new Date();

    useEffect(() => {
      const fetchAreas = async () => {
        try {
            const pageSize = 20; // Number of records per page (same as backend)
            const response = await axios.get(
              `${url}/areas?page=${currentPage}&limit=${pageSize}` // Add pagination parameters
            );
            console.log(response.data)
            setAreas(response.data.data);
            setTotalPages(Math.ceil(response.data.totalRecords / pageSize)); 
            } catch (error) {
                console.log(error);
        }
        };
        fetchAreas();
     });

    const convertDate = (isoDateString: string) => {
        const date = new Date(isoDateString);
        const formattedDate = date.toLocaleString();
        return formattedDate;
    }

    const handleClickUpdate = (id: string) => {
        const singleArea = areas.find(area => area._id === id);
        setFormData({
          areaName: singleArea?.areaName,
          families: singleArea?.families,
          union: singleArea?.union,
          subDistrict: singleArea?.subDistrict,
          district: singleArea?.district,
          representitive: singleArea?.representitive
        })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { name, value } = e.target; 
    
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      };

    const handleVerify = async (id: string) => {
        const data = {
            areaName: formData.areaName,
            families: formData.families,
            union: formData.union,
            subDistrict: formData.subDistrict,
            district: formData.district,
            representitive: formData.representitive,
            date: date
        }
        await axios.put(`${url}/areas/${id}`, data)
        .then(res => {
            console.log(res)
            if(res.status === 200) {
                toast({
                    title: res.data.message
                })
            }
        })
        .catch(error => console.log(error));
};

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
      <Card className="bg-white/80 mt-6">
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
                <TableHead className="text-Green-200 font-bold">হালনাগাদের সময়</TableHead>
               <TableHead className="text-Green-200 font-bold">অ্যাকশন</TableHead>
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
                  <TableCell className="text-Blue-200">
                    {convertDate(area.date)}
                  </TableCell>
                  <TableCell className="text-Blue-200 flex gap-1">
                  <AlertDialog>
                    <AlertDialogTrigger>
                    <button onClick={() => handleClickUpdate(area._id)} className="px-2 py-1 bg-Green-100 rounded-md text-white">Verify</button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Verify Information</AlertDialogTitle>
                        <AlertDialogDescription className="flex flex-col gap-3">
                        <div className="flex flex-col gap-1">
                          <label>এলাকার নাম</label>
                          <input value={formData.areaName} 
                                  className="w-full h-8 bg-Blue-100/20 rounded-md pl-1"
                                  name="areaName"
                                  onChange={handleChange}
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label>পরিবার সংখ্যা</label>
                          <input value={formData.families} 
                                className="w-full h-8 bg-Blue-100/20 rounded-md pl-1"
                                name="families"
                                onChange={handleChange}
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label>ইউনিয়ন</label>
                          <input value={formData.union}
                               className="w-full h-8 bg-Blue-100/20 rounded-md pl-1"
                               name="union"
                               onChange={handleChange}
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label>উপজেলা</label>
                          <input value={formData.subDistrict} 
                               className="w-full h-8 bg-Blue-100/20 rounded-md pl-1"
                               name="subDistrict"
                               onChange={handleChange}
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label>জেলা</label>
                          <input value={formData.district} 
                               className="w-full h-8 bg-Blue-100/20 rounded-md pl-1"
                               name="district"
                               onChange={handleChange}
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label>যোগাযোগ</label>
                          <input value={formData.representitive} 
                               className="w-full h-8 bg-Blue-100/20 rounded-md pl-1"
                               name="representitive"
                               onChange={handleChange}
                          />
                        </div>
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleVerify(area._id)}>Verify</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  <AlertDialog>
                    <AlertDialogTrigger>
                      <button className="px-2 py-1 bg-red-700 rounded-md text-white">Delete</button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction className="bg-red-700">Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
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
  )
}

export default AffectedAreaDashboard
