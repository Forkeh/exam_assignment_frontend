import { toast } from "@/components/ui/use-toast";
import { IDiscipline } from "@/models/IDiscipline";
import { getAllDisciplines } from "@/services/DisciplinesApi";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { getAllParticipantsNoPagination } from "@/services/ParticipantApi";
import { IParticipantFull } from "@/models/IParticipantFull";
import { z } from "zod";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createMultipleResults } from "@/services/ResultApi";
import { useNavigate } from "react-router-dom";

const IResultRequestSchema = z.object({
	disciplineId: z.number(),
	participantId: z.number(),
	result: z.string(),
});

const FormSchema = z.object({
	results: z.array(IResultRequestSchema).min(1, {
		message: "Result must be at least 1.",
	}),
});

export default function ResultsMultiFormPage() {
	const [disciplines, setDisciplines] = useState<IDiscipline[] | null>(null);
	const [selectedDiscipline, setSelectedDiscipline] = useState<string | null>(null);
	const [participants, setParticipants] = useState<IParticipantFull[] | null>(null);
	const navigate = useNavigate();

	function handleOnDisciplineChange(value: string) {
		setSelectedDiscipline(value);
	}

	useEffect(() => {
		getAllDisciplines()
			.then((res) => setDisciplines(res.data))
			.catch(() => {
				toast({
					title: "Oh no! Something went wrong!",
					description: `We could not fetch the disciplines from the server. Please try again later.`,
					variant: "destructive",
				});
			});
	}, []);

	useEffect(() => {
		if (!selectedDiscipline) return;

		getAllParticipantsNoPagination()
			.then((res) => setParticipants(res.data))
			.catch(() => {
				toast({
					title: "Oh no! Something went wrong!",
					description: `We could not fetch the participants from the server. Please try again later.`,
					variant: "destructive",
				});
			});
	}, [selectedDiscipline]);

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			results: [],
		},
	});

	const { replace } = useFieldArray({
		control: form.control,
		name: "results",
	});

	const filteredParticipants = participants?.filter((participant) => participant.disciplines.some((discipline) => discipline.id === Number(selectedDiscipline)));

	useEffect(() => {
		if (participants) {
			console.log(participants);

			const filteredParticipants = participants?.filter((participant) => participant.disciplines.some((discipline) => discipline.id === Number(selectedDiscipline)));

			// Initialize form fields based on participants when participants data is available
			const initialResults = filteredParticipants?.map((participant) => ({
				disciplineId: Number(selectedDiscipline) || 1,
				participantId: participant.id!,
				result: "",
			}));
			console.log(initialResults);

			replace(initialResults);
		}
	}, [selectedDiscipline, replace, participants]);

	function onSubmit(data: z.infer<typeof FormSchema>) {
		console.log(data.results);
		const newResults = data.results.filter((result) => !!result.result);
		console.log(newResults);

		// POST

		createMultipleResults(newResults)
			.then(() => {
				toast({
					title: "Results created!",
					description: `We have successfully created the results.`,
				});
				navigate("/results");
				return;
			})
			.catch(() => {
				toast({
					title: "Oh no! Something went wrong!",
					description: `Failed to create results.`,
					variant: "destructive",
				});
			});
	}

	return (
		<>
			<h2 className="mb-5 text-pretty text-center text-3xl font-bold sm:text-5xl">Create Multi Results</h2>
			{disciplines && (
				<Select onValueChange={handleOnDisciplineChange}>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Select Discipline" />
					</SelectTrigger>
					<SelectContent>
						{disciplines?.map((discipline) => (
							<SelectItem key={discipline.id} value={String(discipline.id)}>
								{discipline.name}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			)}

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					{filteredParticipants &&
						filteredParticipants.map((participant, index) => (
							<FormItem key={participant.id}>
								<FormLabel>{participant.name}</FormLabel>
								<FormField
									control={form.control}
									name={`results.${index}.result`}
									render={({ field }) => (
										<FormControl>
											<Input placeholder="Result" type="number" {...field} />
										</FormControl>
									)}
								/>
							</FormItem>
						))}
					<Button type="submit">Submit</Button>
				</form>
			</Form>
		</>
	);
}
