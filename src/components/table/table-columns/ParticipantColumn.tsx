import { IParticipant } from "@/models/IParticipant";
import { ColumnDef } from "@tanstack/react-table";
import { FaInfoCircle, FaMale, FaFemale } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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
		cell: ({ row }) => {
			const participant = row.original as IParticipant;

			return <div>{participant.gender === "MALE" ? <FaMale size={25} /> : <FaFemale size={25} />}</div>;
		},
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
		accessorKey: "discipline",
		header: "Disciplines",
		cell: ({ row }) => {
			const participant = row.original as IParticipant;

			return <div>{participant.disciplines.join(" - ")}</div>;
		},
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
				<div className="flex transition-all hover:text-orange-500">
					<Dialog>
						<DialogTrigger>
							<FaInfoCircle size={22} />
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>{participant.name}</DialogTitle>
								<DialogDescription></DialogDescription>
							</DialogHeader>
							<div className="flex flex-col items-center gap-2">
								<div className="grid w-3/4 grid-cols-2">
									<div className="font-bold">Id:</div>
									<div>{participant.id}</div>
									<div className="font-bold">Age:</div>
									<div>{participant.age}</div>
									<div className="font-bold">Age Group:</div>
									<div>{participant.ageGroup}</div>
									<div className="font-bold">Gender:</div>
									<div>{participant.gender === "MALE" ? "Male" : "Female"}</div>
									<div className="font-bold">Club:</div>
									<div>{participant.club}</div>
									<div className="font-bold">Disciplines:</div>
									<div>{participant.disciplines.join(", ")}</div>
								</div>

								<div className="mt-3 flex gap-5">
									<Link to={`/participantForm`} state={participant}>
										<Button>Edit</Button>
									</Link>
									<DialogTrigger asChild>
										<Button className="hover:bg-red-300" onClick={handleDelete}>
											Delete
										</Button>
									</DialogTrigger>
								</div>
							</div>
						</DialogContent>
					</Dialog>
				</div>
			);
		},
	},
];
