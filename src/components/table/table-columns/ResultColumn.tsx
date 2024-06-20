import { IParticipant } from "@/models/IParticipant";
import { ColumnDef } from "@tanstack/react-table";
import { FaInfoCircle } from "react-icons/fa";
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
import { IResult } from "@/models/IResult";

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
    },
    {
        accessorKey: "edit",
        header: "Details",
        cell: ({ row }) => {
            const result = row.original as IResult;

            function handleDelete() {
                console.log("delete participant with id: ", result.id);

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
                <div className="flex  hover:text-orange-500 transition-all">
                    <Dialog>
                        <DialogTrigger>
                            <FaInfoCircle size={22} />
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>{result.discipline.name}</DialogTitle>
                                <DialogDescription></DialogDescription>
                            </DialogHeader>
                            <div>
                                <Link to={`/resultForm`} state={result}>
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
