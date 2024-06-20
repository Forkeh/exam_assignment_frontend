import { IParticipant } from "@/models/IParticipant";
import { getAllParticipants } from "@/services/ParticipantApi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import DataTable, { PaginationSize } from "@/components/table/DataTable.tsx";
import { Button } from "@/components/ui/button";
import { IPagination } from "@/models/IPagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { ParticipantColumns } from "@/components/table/table-columns/ParticipantColumn";
import { DataTable2 } from "@/components/table/DataTable2";

export default function ParticipantsPage() {
    const [participants, setParticipants] = useState<IPagination<IParticipant> | null>(null);
    const [pagination, setPagination] = useState<PaginationSize>({
        pageIndex: 0, //initial page index
        pageSize: 5, //default page size
    });
    const [sort, setSort] = useState({
        sortBy: "id",
        sortDir: "ASC",
    });
    const [filter, setFilter] = useState("");
    const [search, setSearch] = useState("");

    console.log(participants);

    useEffect(() => {
        const queryParams = new URLSearchParams({
            pageIndex: String(pagination.pageIndex),
            pageSize: String(pagination.pageSize),

            ...sort,
        });

        if (filter != "none") queryParams.append("filterBy", filter);
        if (search) queryParams.append("searchBy", search);

        console.log(queryParams);

        getAllParticipants(queryParams.toString())
            .then(({ data }) => {
                setParticipants(data);
            })
            .catch(() => {
                toast({
                    title: "Oh no! Something went wrong.",
                    description: `Failed to fetch participants.`,
                    variant: "destructive",
                });
            });
    }, [pagination, sort, filter, search]);
    return (
        <>
            <div className="flex flex-col gap-4">
                <h2 className="text-white text-3xl sm:text-5xl font-bold text-center text-pretty mb-5">Produkter</h2>
                {participants && (
                    <>
                        <div className="flex justify-between">
                            <div className="flex gap-4 flex-wrap">
                                <Input
                                    className="w-[200px] bg-gray-100"
                                    placeholder="Search Participants..."
                                    onChange={(e) => {
                                        setPagination((prevState) => ({ ...prevState, pageIndex: 0 }));
                                        setSearch(e.target.value);
                                    }}
                                />
                                <div className="flex gap-1">
                                    <Select
                                        onValueChange={(value) => {
                                            setPagination((prevState) => ({ ...prevState, pageIndex: 0 }));
                                            setSort((prevState) => ({ ...prevState, sortBy: value }));
                                        }}
                                    >
                                        <SelectTrigger className="w-[140px] bg-gray-100">
                                            <SelectValue placeholder="Sorter efter" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="id">ID</SelectItem>
                                            <SelectItem value="name">Navn</SelectItem>
                                            <SelectItem value="price">Pris</SelectItem>
                                            <SelectItem value="stock">Antal</SelectItem>
                                        </SelectContent>
                                    </Select>

                                    <Select
                                        defaultValue="ASC"
                                        onValueChange={(value) => {
                                            setPagination((prevState) => ({ ...prevState, pageIndex: 0 }));
                                            setSort((prevState) => ({ ...prevState, sortDir: value }));
                                        }}
                                    >
                                        <SelectTrigger className="w-[120px] bg-gray-100">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="ASC">Ascending</SelectItem>
                                            <SelectItem value="DESC">Descending</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <Select
                                    onValueChange={(value) => {
                                        setPagination((prevState) => ({ ...prevState, pageIndex: 0 }));
                                        setFilter(value);
                                    }}
                                >
                                    <SelectTrigger className="w-[160px] bg-gray-100">
                                        <SelectValue placeholder="Filter by" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="none">Ingen</SelectItem>
                                        <SelectItem value="Snacks">Snacks</SelectItem>
                                        <SelectItem value="Alkohol">Alkohol</SelectItem>
                                        <SelectItem value="Drikkevarer">Drikkevarer</SelectItem>
                                        <SelectItem value="Andet">Andet</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Link to={"form"}>
                                <Button className="hover:bg-slate-500">Add Participant</Button>
                            </Link>
                        </div>
                        <motion.div
                            key={pagination.pageIndex + sort.sortBy + sort.sortDir + filter + search}
                            initial={{
                                opacity: 0,
                            }}
                            animate={{
                                opacity: 1,
                            }}
                        >
                            <DataTable
                                columns={ParticipantColumns}
                                data={participants}
                                pagination={pagination}
                            />
                        </motion.div>
                        <div className="flex justify-evenly">
                            <Button
                                className="hover:bg-slate-500"
                                onClick={() =>
                                    setPagination((prevState) => ({
                                        ...prevState,
                                        pageIndex: prevState.pageIndex - 1,
                                    }))
                                }
                                disabled={participants?.first}
                            >
                                {"Back"}
                            </Button>
                            {participants?.totalPages ? (
                                <p className="text-white">
                                    {" "}
                                    Side {pagination.pageIndex + 1} / {participants?.totalPages}{" "}
                                </p>
                            ) : null}
                            <Button
                                className="hover:bg-slate-500"
                                onClick={() =>
                                    setPagination((prevState) => ({
                                        ...prevState,
                                        pageIndex: prevState.pageIndex + 1,
                                    }))
                                }
                                disabled={participants?.last}
                            >
                                {"Next"}
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
