import { TableCell, TableRow } from "../ui/table";
import { format } from "date-fns";
import { da } from "date-fns/locale";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FaInfoCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
import IBook from "@/models/IBook";

export default function ListItemBook(props: IBook) {
    // const formattedDate = format(new Date(props.date), "PPp", { locale: da });
    // const navigate = useNavigate();

    function handleDelete() {
        console.log("delete event");

        // if (!props.id) {
        //     return;
        // }

        // deleteEvent(props.id)
        //     .then(() => {
        //         toast({
        //             title: "Event slettet!",
        //             description: `Vi har slettet ${props.name} eventet i systemet.`,
        //         });
        //         window.location.reload();
        //         return;
        //     })
        //     .catch((error) => {
        //         console.log(error.response.data.message);

        //         toast({
        //             title: "Åh nej! Noget gik galt!",
        //             description: `${error.response.data.message}`,
        //             variant: "destructive",
        //         });
        //     });
    }

    return (
        <TableRow>
            <TableCell className="font-medium">{props.id}</TableCell>
            <TableCell>{props.id}</TableCell>
            <TableCell>{props.title}</TableCell>
            <TableCell>{props.author}</TableCell>
            <TableCell>{props.year}</TableCell>
            <TableCell>
                <Dialog>
                    <DialogTrigger>
                        <FaInfoCircle />
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{props.title}</DialogTitle>
                            <div>
                                <p>Author: {props.author}</p>
                                <p>Year: {props.year}</p>
                                <div className="flex justify-around">
                                    <Link to={`/eventForm`} state={props}>
                                        <Button>Edit</Button>
                                    </Link>
                                    <DialogTrigger asChild>
                                        <Button onClick={handleDelete}>Delete</Button>
                                    </DialogTrigger>
                                </div>
                            </div>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </TableCell>
        </TableRow>
    );
}
