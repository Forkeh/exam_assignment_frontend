import { IParticipant } from "@/models/IParticipant";
import { ColumnDef } from "@tanstack/react-table";
import { FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

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
                    <Link to={"form"} state={participant}>
                        <FaRegEdit size={22} />
                    </Link>
                </div>
            );
        },
    },
];
