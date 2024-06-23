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
	const [filterBy, setFilter] = useState("");
	const [filterValue, setFilterValue] = useState("");
	const [search, setSearch] = useState("");

	// TODO: Can this be fixed?
	// useEffect(() => {
	//     let filterValue = "";
	//     switch (filterBy) {
	//         case "gender":
	//             filterValue = "MALE";
	//             break;
	//         case "club":
	//             filterValue = "Tigers Club";
	//             break;
	//         case "discipline":
	//             filterValue = "1";
	//             break;
	//         default:
	//             filterValue = "";
	//     }
	//     setFilterValue(filterValue);
	// }, [filterBy]);

	useEffect(() => {
		const queryParams = new URLSearchParams({
			pageIndex: String(pagination.pageIndex),
			pageSize: String(pagination.pageSize),

			...sort,
		});

		if (filterBy != "none" && filterValue != "") {
			queryParams.append("filterBy", filterBy);
			queryParams.append("filterValue", filterValue);
		}
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
	}, [pagination, sort, search, filterBy, filterValue]);

	return (
		<>
			<div className="flex flex-col gap-4">
				<h2 className="mb-5 text-pretty text-center text-3xl font-bold sm:text-5xl">Participants</h2>
				{participants && (
					<>
						<div className="flex justify-between">
							<div className="flex flex-wrap gap-10">
								<Input
									className="w-[200px] bg-gray-100"
									placeholder="Search Participants..."
									onChange={(e) => {
										setPagination((prevState) => ({ ...prevState, pageIndex: 0 }));
										setSearch(e.target.value);
									}}
								/>
								<div className="flex gap-1">
									{/* <Label htmlFor="email">Your email address</Label> */}
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

								<div className="flex gap-2">
									<Select
										onValueChange={(value) => {
											setFilter(value);
										}}
									>
										<SelectTrigger className="w-[160px] bg-gray-100">
											<SelectValue placeholder="Filter by" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="none">No Filter</SelectItem>
											<SelectItem value="gender">Gender</SelectItem>
											<SelectItem value="club">Club</SelectItem>
											<SelectItem value="discipline">Discipline</SelectItem>
										</SelectContent>
									</Select>

									{filterBy === "gender" && (
										<Select
											defaultValue={"MALE"}
											onValueChange={(value) => {
												setPagination((prevState) => ({ ...prevState, pageIndex: 0 }));
												setFilterValue(value);
											}}
										>
											<SelectTrigger className="w-[160px] bg-gray-100">
												<SelectValue placeholder="Filter by" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="MALE">Male</SelectItem>
												<SelectItem value="FEMALE">Female</SelectItem>
											</SelectContent>
										</Select>
									)}

									{filterBy === "club" && (
										<Select
											defaultValue="Tigers Club"
											onValueChange={(value) => {
												setPagination((prevState) => ({ ...prevState, pageIndex: 0 }));
												setFilterValue(value);
											}}
										>
											<SelectTrigger className="w-[160px] bg-gray-100">
												<SelectValue placeholder="Filter by" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="Tigers Club">Tigers Club</SelectItem>
												<SelectItem value="Bears Club">Bears Club</SelectItem>
												<SelectItem value="Lions Club">Lions Club</SelectItem>
												<SelectItem value="Wolves Club">Wolves Club</SelectItem>
												<SelectItem value="Hawks Club">Hawks Club</SelectItem>
												<SelectItem value="Eagles Club">Eagles Club</SelectItem>
											</SelectContent>
										</Select>
									)}

									{filterBy === "discipline" && (
										<Select
											defaultValue="1"
											onValueChange={(value) => {
												setPagination((prevState) => ({ ...prevState, pageIndex: 0 }));
												setFilterValue(value);
											}}
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
									)}
								</div>
							</div>
							<Link to={"participantForm"}>
								<Button className="hover:bg-slate-500">Add Participant</Button>
							</Link>
						</div>
						<div>
							<DataTable columns={ParticipantColumns} data={participants.content} pagination={pagination} />
						</div>
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
								<p>
									{" "}
									Page {pagination.pageIndex + 1} / {participants?.totalPages}{" "}
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
