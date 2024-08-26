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
import { Victim } from "@/types/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface formData {
    victimName?: string;
    familyMember?: number;
    damages?: string;
    contact?: string;
    address?: string;
    union?: string;
    subDistrict?: string;
    district?: string;
}

const VictimListDashboard = () => {
    const [victims, setVictims] = useState<Victim[]>([]);
    const [currentPage, setCurrentPage] = useState(1); // State to track current page
    const [totalPages, setTotalPages] = useState(1); 
    const [formData, setFormData] = useState<formData>({
      victimName:"",
      familyMember: 0,
      damages: "",
      contact: "",
      address: "",
      union:"",
      subDistrict:"",
      district:""
    });
    const {toast} = useToast();
    const url = "https://cht-disaster-update.onrender.com";
    const date = new Date();

    useEffect(() => {
      const fetchVictims = async () => {
        try {
            const pageSize = 10; // Number of records per page (same as backend)
            const response = await axios.get(
              `${url}/victims?page=${currentPage}&limit=${pageSize}` // Add pagination parameters
            );
            setVictims(response.data.data);
            setTotalPages(Math.ceil(response.data.totalRecords / pageSize)); 
            } catch (error) {
                console.log(error);
        }
        };
        fetchVictims();
     });

    const convertDate = (isoDateString: string) => {
        const date = new Date(isoDateString);
        const formattedDate = date.toLocaleString();
        return formattedDate;
    }

    const handleClickUpdate = (id: string) => {
        const singleVictim = victims.find(victim => victim._id === id);
        setFormData({
            victimName: singleVictim?.victimName,
            familyMember: singleVictim?.familyMember,
            damages: singleVictim?.damages,
            contact: singleVictim?.contact,
            address: singleVictim?.address,
            union: singleVictim?.union,
            subDistrict: singleVictim?.subDistrict,
            district: singleVictim?.district
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
            victimName: formData.victimName,
            familyMember: formData.familyMember,
            damages: formData.damages,
            contact: formData.contact,
            address: formData.address,
            union: formData.union,
            subDistrict: formData.subDistrict,
            district: formData.district,
            date: date
        }

        const data1 = {
          _id: id,
          victimName: formData.victimName,
          familyMember: formData.familyMember,
          damages: formData.damages,
          contact: formData.contact,
          address: formData.address,
          union: formData.union,
          subDistrict: formData.subDistrict,
          district: formData.district,
          status: "",
          date: date.toLocaleString(),
          __v: 0
      }
        await axios.put(`${url}/victims/${id}`, data)
        .then(res => {
            console.log(res)
            if(res.status === 200) {
                toast({
                    title: res.data.message
                })
            }
        })
        .catch(error => console.log(error));
        setVictims((prev) =>
          prev.map((victim) =>
              victim._id === id ? { ...victim, ...data1 } : victim
          )
      );
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

const handleDelete = async (id:string) => {
  await axios.delete(`${url}/victims/${id}`);
  toast({
    title: "Victim record has been deleted"
  });
  const newVictim = victims.filter(victim => victim._id !== id)
  setVictims(newVictim);
}

  return (
    <>
      <Card className="bg-white/80 mt-6">
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
               <TableHead className="text-Green-200 font-bold">অ্যাকশন</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {victims.map((victim) => (
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
                  <TableCell className="text-Blue-200 flex gap-1">
                  <AlertDialog>
                    <AlertDialogTrigger>
                    <button onClick={() => handleClickUpdate(victim._id)} className="px-2 py-1 bg-Green-100 rounded-md text-white">Edit</button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogDescription className="flex flex-col gap-2">
                        <div className="flex flex-col gap-1">
                          <label className="text-Green-200 font-semibold">নাম</label>
                          <input value={formData.victimName} 
                                  className="w-full h-6 border rounded-md pl-2"
                                  name="victimName"
                                  onChange={handleChange}
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-Green-200 font-semibold">পরিবারের সদস্য সংখ্যা</label>
                          <input value={formData.familyMember} 
                                className="w-full h-6 border rounded-md pl-2"
                                name="familyMember"
                                onChange={handleChange}
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-Green-200 font-semibold">যোগাযোগের নম্বরঃ</label>
                          <input value={formData.contact} 
                                className="w-full h-6 border rounded-md pl-2"
                                name="contact"
                                onChange={handleChange}
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-Green-200 font-semibold">ক্ষয়ক্ষতিসমূহ</label>
                          <input value={formData.damages} 
                                className="w-full h-6 border rounded-md pl-2"
                                name="damages"
                                onChange={handleChange}
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-Green-200 font-semibold">গ্রামের নাম</label>
                          <input value={formData.address} 
                                className="w-full h-6 border rounded-md pl-2"
                                name="address"
                                onChange={handleChange}
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-Green-200 font-semibold">ইউনিয়ন</label>
                          <input value={formData.union}
                               className="w-full h-6 border rounded-md pl-2"
                               name="union"
                               onChange={handleChange}
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-Green-200 font-semibold">উপজেলা</label>
                          <input value={formData.subDistrict} 
                               className="w-full h-6 border rounded-md pl-2"
                               name="subDistrict"
                               onChange={handleChange}
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-Green-200 font-semibold">জেলা</label>
                          <input value={formData.district} 
                               className="w-full h-6 border rounded-md pl-2"
                               name="district"
                               onChange={handleChange}
                          />
                        </div>
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction className="bg-Green-200" onClick={() => handleVerify(victim._id)}>Update</AlertDialogAction>
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
                        <AlertDialogAction onClick={() => handleDelete(victim._id)} className="bg-red-700">Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                 </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-center gap-4 mt-4">
            {currentPage > 1 && (
              <button onClick={handlePreviousPage} className="px-2 py-2 rounded-md bg-Green-200 text-white hover:bg-Green-200/90">
                <ChevronLeft/>
              </button>
            )}
            {currentPage < totalPages && (
              <button onClick={handleNextPage} className="px-2 py-2 rounded-md bg-Green-200 text-white hover:bg-Green-200/90">
                <ChevronRight/>
              </button>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default VictimListDashboard
