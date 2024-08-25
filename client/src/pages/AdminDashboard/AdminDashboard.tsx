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
import { Services } from "@/types/types";
import axios from "axios";
import { useEffect, useState } from "react";
import AdmitCard from "./AdmitCard";


interface formData {
  teamName?: string;
  workingArea?: string;
  contact?: string;
  providedService?: string;
  status?: string;
}

const AdminDashboard = () => {
    const [services, setServices] = useState<Services[]>([]);
    const [newServices, setNewServices] = useState<Services[]>([]);
    const [listName, setListName] = useState<string>("");
    const [currentPage, setCurrentPage] = useState(1); // State to track current page
    const [totalPages, setTotalPages] = useState(1); 
    const [formData, setFormData] = useState<formData>({
        teamName: "",
        workingArea: "",
        contact: "",
        providedService: "",
        status: ""
    });
    const {toast} = useToast();
    const url = "https://cht-disaster-update.onrender.com";
    const date = new Date();

    const fetchServices = async () => {
        try {
            const pageSize = 20; // Number of records per page (same as backend)
            const response = await axios.get(
              `${url}/services?page=${currentPage}&limit=${pageSize}` // Add pagination parameters
            );
            console.log(response.data)
            setServices(response.data.data);
            setTotalPages(Math.ceil(response.data.totalRecords / pageSize)); 
            } catch (error) {
                console.log(error);
        }
        };
    useEffect(() => {
        fetchServices();
     });

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

    const handleClickUpdate = (id: string) => {
        const singleService = newServices.find(service => service._id === id);
        setFormData({
            teamName: singleService?.teamName,
            workingArea: singleService?.workingArea,
            contact: singleService?.contact,
            providedService: singleService?.providedService,
            status: singleService?.status
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
            teamName: formData.teamName,
            workingArea: formData.workingArea,
            contact: formData.contact,
            providedService: formData.providedService,
            status: formData.status,
            isVerifiedByAdmin: true,
            date: date
        }
        await axios.put(`${url}/services/${id}`, data)
        .then(res => {
            fetchServices();
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
      <AdmitCard/>
      <Card className="bg-white/80 mt-6">
        <CardHeader>
          <CardTitle className="text-xl font-bold font-special text-Green-100">
            {listName? listName : "CHT Disaster Updates"}
          </CardTitle>
          <CardDescription>
          <div className='flex gap-4 w-full'>
            <button onClick={handleVerifiedList} className={listName === "Verified List"? 'font-special font-semibold bg-Green-200 text-White px-4 py-1 rounded-2xl': 'font-special font-semibold bg-Blue-100 text-White px-4 py-1 rounded-2xl'}>Verified</button>
            <button onClick={handleUnverifiedList} className={listName === "Unverified List"? 'font-special font-semibold bg-Green-200 text-White px-4 py-1 rounded-2xl': 'font-special font-semibold bg-Blue-100 text-White px-4 py-1 rounded-2xl'}>Unverified</button>
          </div>
          </CardDescription>
        </CardHeader>
       <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-Green-200 font-bold">টিমের নাম</TableHead>
                <TableHead className="text-Green-200 font-bold">টিমের স্ট্যাটাস</TableHead>
                <TableHead className="text-Green-200 font-bold">কার্যক্রম এলাকা</TableHead>
                <TableHead className="text-Green-200 font-bold">
                সহায়তাসমূহ
                </TableHead>
                <TableHead className="text-Green-200 font-bold">যোগাযোগ</TableHead>
                <TableHead className="text-Green-200 font-bold">হালনাগাদের সময়</TableHead>
               <TableHead className="text-Green-200 font-bold">অ্যাকশন</TableHead>
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
                  <TableCell className="text-Blue-200 flex gap-1">
                  <AlertDialog>
                    <AlertDialogTrigger>
                    <button onClick={() => handleClickUpdate(service._id)} className="px-2 py-1 bg-Green-100 rounded-md text-white">Verify</button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Verify Information</AlertDialogTitle>
                        <AlertDialogDescription className="flex flex-col gap-3">
                        <div className="flex flex-col gap-1">
                          <label>টিমের নাম</label>
                          <input value={formData.teamName} 
                                  className="w-full h-8 bg-Blue-100/20 rounded-md pl-1"
                                  name="teamName"
                                  onChange={handleChange}
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label>স্ট্যাটাস</label>
                          <input value={formData.status} 
                                className="w-full h-8 bg-Blue-100/20 rounded-md pl-1"
                                name="status"
                                onChange={handleChange}
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label>কার্যক্রম এলাকা</label>
                          <input value={formData.workingArea}
                               className="w-full h-8 bg-Blue-100/20 rounded-md pl-1"
                               name="workingArea"
                               onChange={handleChange}
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label>সহায়তাসমূহ</label>
                          <input value={formData.providedService} 
                               className="w-full h-8 bg-Blue-100/20 rounded-md pl-1"
                               name="providedService"
                               onChange={handleChange}
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label>যোগাযোগ</label>
                          <input value={formData.contact} 
                               className="w-full h-8 bg-Blue-100/20 rounded-md pl-1"
                               name="contact"
                               onChange={handleChange}
                          />
                        </div>
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleVerify(service._id)}>Verify</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  <button className="px-2 py-1 bg-red-700 rounded-md text-white">Delete</button>
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

export default AdminDashboard
