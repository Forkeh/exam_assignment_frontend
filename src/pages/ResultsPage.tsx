import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import DataTable, { PaginationSize } from "@/components/table/DataTable.tsx";
import { Button } from "@/components/ui/button";
import { IPagination } from "@/models/IPagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { IResult } from "@/models/IResult";
import { getAllResults } from "@/services/ResultApi";
import { ResultColumns } from "@/components/table/table-columns/ResultColumn";

// TODO: Implement Sort, Filter, Search?
export default function ResultsPage() {
    const [results, setResults] = useState<IPagination<IResult> | null>(null);
    const [pagination, setPagination] = useState<PaginationSize>({
        pageIndex: 0, //initial page index
        pageSize: 10, //default page size
    });
    const [sort, setSort] = useState({
        sortBy: "result",
        sortDir: "ASC",
    });
    const [filterBy, setFilter] = useState("1");

    console.log(results);

    useEffect(() => {
        const queryParams = new URLSearchParams({
            pageIndex: String(pagination.pageIndex),
            pageSize: String(pagination.pageSize),

            ...sort,
        });

        if (filterBy != "none") {
            queryParams.append("filterBy", filterBy);
        }

        console.log(queryParams);

        getAllResults(queryParams.toString())
            .then(({ data }) => {
                setResults(data);
            })
            .catch(() => {
                toast({
                    title: "Oh no! Something went wrong.",
                    description: `Failed to fetch results.`,
                    variant: "destructive",
                });
            });
    }, [pagination, sort, filterBy]);

    return (
        <>
            <div className="flex flex-col gap-4">
                <h2 className="text-3xl sm:text-5xl font-bold text-center text-pretty mb-5">Results</h2>
                {results && (
                    <>
                        <div className="flex justify-between">
                            <div className="flex gap-10 flex-wrap">
                                <Select
                                    onValueChange={(value) => {
                                        setPagination((prevState) => ({ ...prevState, pageIndex: 0 }));
                                        setSort((prevState) => ({ ...prevState, sortBy: value }));
                                    }}
                                >
                                    <SelectTrigger className="w-[140px] bg-gray-100">
                                        <SelectValue placeholder="Sort By" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="id">ID</SelectItem>
                                        <SelectItem value="name">Name</SelectItem>
                                        <SelectItem value="gender">Gender</SelectItem>
                                        <SelectItem value="club">Club</SelectItem>
                                    </SelectContent>
                                </Select>

                                <div className="flex gap-2">
                                    <Select
                                        onValueChange={(value) => {
                                            setFilter(value);
                                        }}
                                        defaultValue="1"
                                    >
                                        <SelectTrigger className="w-[160px] bg-gray-100">
                                            <SelectValue placeholder="Filter by" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1">100m Sprint</SelectItem>
                                            <SelectItem value="2">200m Sprint</SelectItem>
                                            <SelectItem value="3">400m Sprint</SelectItem>
                                            <SelectItem value="4">Long Jump</SelectItem>
                                            <SelectItem value="5">Triple Jump</SelectItem>
                                            <SelectItem value="6">Shot Put</SelectItem>
                                            <SelectItem value="7">Decathlon</SelectItem>
                                            <SelectItem value="8">Heptathlon</SelectItem>
                                            <SelectItem value="9">Pentathlon</SelectItem>
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
                            </div>
                            <Link to={"/resultForm"}>
                                <Button className="hover:bg-slate-500">Add Result</Button>
                            </Link>
                        </div>
                        <motion.div
                            key={pagination.pageIndex + sort.sortBy + sort.sortDir + filterBy}
                            initial={{
                                opacity: 0,
                            }}
                            animate={{
                                opacity: 1,
                            }}
                        >
                            <DataTable columns={ResultColumns} data={results.content} pagination={pagination} />
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
                                disabled={results?.first}
                            >
                                {"Back"}
                            </Button>
                            {results?.totalPages ? (
                                <p>
                                    {" "}
                                    Page {pagination.pageIndex + 1} / {results?.totalPages}{" "}
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
                                disabled={results?.last}
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
