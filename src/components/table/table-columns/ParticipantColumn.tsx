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

            return (
                <div className="flex  hover:text-orange-500 transition-all">
                    {/* <Link to={"form"} state={participant}>
                        <FaInfoCircle size={22} />
                    </Link> */}
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
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            );
        },
    },
];
