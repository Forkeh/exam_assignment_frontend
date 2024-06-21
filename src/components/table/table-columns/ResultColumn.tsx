import { ColumnDef } from "@tanstack/react-table";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "@/components/ui/use-toast";
import { IResult } from "@/models/IResult";
import { resultConversion } from "@/utils/resultConversion";
import { deleteResult } from "@/services/ResultApi";

export const ResultColumns: ColumnDef<IResult>[] = [
    {
        accessorKey: "id",
        header: "Id",
    },
    {
        accessorKey: "discipline",
        header: "Discipline",
        cell: ({ row }) => {
            const result = row.original as IResult;

            return <div>{result.discipline.name}</div>;
        },
    },
    {
        accessorKey: "participant",
        header: "Particiant",
        cell: ({ row }) => {
            const result = row.original as IResult;

            return <div>{result.participant.name}</div>;
        },
    },
    {
        accessorKey: "result",
        header: "Result",
        cell: ({ row }) => {
            const result = row.original as IResult;

            return <div>{resultConversion(result)}</div>;
            // return <div>{result.result}</div>;
        },
    },
    {
        accessorKey: "edit",
        header: "Edit",
        cell: ({ row }) => {
            const result = row.original as IResult;
            return (
                <div className="flex  hover:text-orange-500 transition-all cursor-pointer">
                    <Link to={`/resultForm`} state={result}>
                        <FaEdit size={22} />
                    </Link>
                </div>
            );
        },
    },
    {
        accessorKey: "delete",
        header: "Delete",
        cell: ({ row }) => {
            const result = row.original as IResult;

            function handleDelete() {
                console.log("delete result with id: ", result.id);

                if (!result.id) {
                    return;
                }

                deleteResult(result.id)
                    .then(() => {
                        toast({
                            title: "Result deleted!",
                            description: `We have successfully deleted the result with id: ${result.id}`,
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
                <div className="flex  hover:text-orange-500 transition-all cursor-pointer">
                    <MdDeleteForever size={22} onClick={handleDelete} />
                </div>
            );
        },
    },
];
