import { IParticipant } from "@/models/IParticipant";
import { ColumnDef } from "@tanstack/react-table";
import { FaRegEdit, FaInfoCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { deleteParticipant } from "@/services/ParticipantApi";

export const ParticipantColumns: ColumnDef<IParticipant>[] = [
    {
        accessorKey: "id",
        header: "Id",
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "gender",
        header: "Gender",
    },
    {
        accessorKey: "age",
        header: "Age",
    },
    {
        accessorKey: "club",
        header: "Club",
    },
    {
        accessorKey: "edit",
        header: "Details",
        cell: ({ row }) => {
            const participant = row.original as IParticipant;

            function handleDelete() {
                console.log("delete participant with id: ", participant.id);

                if (!participant.id) {
                    return;
                }

                deleteParticipant(participant.id)
                    .then(() => {
                        toast({
                            title: "Event slettet!",
                            description: `We have successfully deleted the participant with id: ${participant.id}`,
                        });
                        window.location.reload();
                        return;
                    })
                    .catch((error) => {
                        console.log(error.response.data.message);

                        toast({
                            title: "Oh no! Something went wrong!",
                            description: `${error.response.data.message}`,
                            variant: "destructive",
                        });
                    });
            }

            return (
                <div className="flex  hover:text-orange-500 transition-all">
                    <Dialog>
                        <DialogTrigger>
                            <FaInfoCircle size={22} />
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>{participant.name}</DialogTitle>
                                <DialogDescription></DialogDescription>
                            </DialogHeader>
                            <div>
                                <p>Id: {participant.id}</p>
                                <p>Age: {participant.age}</p>
                                <p>Gender: {participant.gender}</p>
                                <p>Club: {participant.club}</p>
                                <p>Disciplines: {participant.disciplines.join(", ")}</p>
                                <Link to={`/participantForm`} state={participant}>
                                    <Button>Edit</Button>
                                </Link>
                                <DialogTrigger asChild>
                                    <Button onClick={handleDelete}>Delete</Button>
                                </DialogTrigger>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            );
        },
    },
];
