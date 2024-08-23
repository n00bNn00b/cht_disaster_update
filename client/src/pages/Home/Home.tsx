import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
;import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  
  

const Home = () => {
  return (
    <>
      <Card className="bg-white/80">
        <CardHeader>
            <CardTitle className="text-xl font-bold font-special text-Green-100">CHT Disaster Updates</CardTitle>
            <CardDescription className="text-Blue-200">A list of vlounteer groups and working areas to accelerate the working progress</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead className="text-Blue-200">Team Name</TableHead>
                    <TableHead className="text-Blue-200">Team Status</TableHead>
                    <TableHead className="text-Blue-200">Working Areas</TableHead>
                    <TableHead className="text-Blue-200">Areas Done</TableHead>
                    <TableHead className="text-Blue-200">Contact No.</TableHead>
                    <TableHead className="text-Blue-200">Admin Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                    <TableCell className="text-Blue-200">Unmesh</TableCell>
                    <TableCell className="text-Blue-200">Working</TableCell>
                    <TableCell className="text-Blue-200">Dhoniram Para(Matiranga)</TableCell>
                    <TableCell className="text-Blue-200">Dhoniram Para(Matiranga), Beltoli Para(Kharachari)</TableCell>
                    <TableCell className="text-Blue-200">01556331709</TableCell>
                    <TableCell className="text-Blue-200">Verified by admin</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
    </CardContent>
      </Card>
    </>
  )
}

export default Home
