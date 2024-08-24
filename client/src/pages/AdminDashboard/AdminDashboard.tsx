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
import { useToast } from "@/components/ui/use-toast";
import { Services } from "@/types/types";
import axios from "axios";
import { useEffect, useState } from "react";

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
    const [clickedUpdate, setClickedUpdate] = useState("");
    const [formData, setFormData] = useState<formData>({
        teamName: "",
        workingArea: "",
        contact: "",
        providedService: "",
        status: ""
    });
    const {toast} = useToast();
    const url = import.meta.env.VITE_API_URL;
    const date = new Date();

    const fetchServices = async () => {
        try {
            const response = await axios.get<Services[]>(`${url}/services`);
            setServices(response.data);
            setNewServices(response.data);
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
        setClickedUpdate(id);
        const singleService = newServices.find(service => service._id === id);
        setFormData({
            teamName: singleService?.teamName,
            workingArea: singleService?.workingArea,
            contact: singleService?.contact,
            providedService: singleService?.providedService,
            status: singleService?.status
        })
    }

    const handleCancelClickUpdate = () => {
        setClickedUpdate("");
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
        setClickedUpdate('')

        
     
};

  return (
    <>
      <div className='flex gap-4 w-full'>
        <button onClick={handleVerifiedList} className={listName === "Verified List"? 'font-special font-semibold bg-Green-200 text-White px-8 py-2 rounded-md': 'font-special font-semibold bg-White text-Green-200 px-8 py-2 rounded-md'}>Verified</button>
        <button onClick={handleUnverifiedList} className={listName === "Unverified List"? 'font-special font-semibold bg-Green-200 text-White px-8 py-2 rounded-md': 'font-special font-semibold bg-White text-Green-200 px-8 py-2 rounded-md'}>Unverified</button>
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
               <TableHead className="text-Green-200">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {newServices.map((service) => (
                <TableRow key={service._id}>
                  <TableCell className="text-Blue-200">
                    { clickedUpdate === service._id?  (
                        <input value={formData.teamName} 
                                className="w-[100px] bg-Blue-100/20 rounded-md pl-1"
                                name="teamName"
                                onChange={handleChange}/>
                    ): `${service.teamName}`}
                  </TableCell>
                  <TableCell className="text-Blue-200">
                  { clickedUpdate === service._id?  (
                        <input value={formData.status} 
                                className="w-[100px] bg-Blue-100/20 rounded-md pl-1"
                                name="status"
                                onChange={handleChange}/>
                    ): `${service.status}`}
                  </TableCell>
                  <TableCell className="text-Blue-200">
                  { clickedUpdate === service._id?  (
                        <input value={formData.workingArea}
                               className="w-[100px] bg-Blue-100/20 rounded-md pl-1"
                               name="workingArea"
                               onChange={handleChange}/>
                    ): `${service.workingArea}`}
                  </TableCell>
                  <TableCell className="text-Blue-200">
                  { clickedUpdate === service._id?  (
                        <input value={formData.providedService} 
                               className="w-[100px] bg-Blue-100/20 rounded-md pl-1"
                               name="providedService"
                               onChange={handleChange}/>
                    ): `${service.providedService}`}
                  </TableCell>
                  <TableCell className="text-Blue-200">
                  { clickedUpdate === service._id?  (
                        <input value={formData.contact} 
                               className="w-[100px] bg-Blue-100/20 rounded-md pl-1"
                               name="contact"
                               onChange={handleChange}/>
                    ): `${service.contact}`}
                  </TableCell>
                  <TableCell className="text-Blue-200">
                    {convertDate(service.date)}
                  </TableCell>
                {clickedUpdate === service._id? (
                    <TableCell className="text-Blue-200 flex gap-1">
                    <button onClick={() => handleVerify(service._id)} className="px-2 py-1 bg-Green-100 rounded-md text-white">Verify</button>
                    <button onClick={handleCancelClickUpdate} className="px-2 py-1 bg-red-700 rounded-md text-white">Cancel</button>
                  </TableCell>
                  ): (
                    <TableCell className="text-Blue-200 flex gap-1">
                  <button onClick={() => handleClickUpdate(service._id)} className="px-2 py-1 bg-Green-100 rounded-md text-white">Verify</button>
                  <button className="px-2 py-1 bg-red-700 rounded-md text-white">Delete</button>
                </TableCell>
                  )}
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
