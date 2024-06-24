"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllParticipantsNoPagination } from "@/services/ParticipantApi";
import { IResult } from "@/models/IResult";
import { IResultRequest } from "@/models/IResultRequest";
import { createResult, updateResult } from "@/services/ResultApi";
import { IParticipantFull } from "@/models/IParticipantFull";
import { getAllDisciplines } from "@/services/DisciplinesApi";
import { IDiscipline } from "@/models/IDiscipline";
import resultTypeDictionary from "@/utils/resultTypeDictionary";

const FormSchema = z.object({
	discipline: z.number().min(1, {
		message: "Name must be at least 2 characters.",
	}),
	participant: z.number().min(1, {
		message: "Participant must be selected.",
	}),
	result: z.string().min(1, {
		message: "Result must be at least 1.",
	}),
});

export default function ResultsFormPage() {
	const [participants, setParticipants] = useState<IParticipantFull[] | null>(null);
	const [disciplines, setDisciplines] = useState<IDiscipline[] | null>(null);
	const result = useLocation().state as IResult | null;
	const navigate = useNavigate();

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
		getAllParticipantsNoPagination()
			.then((res) => setParticipants(res.data))
			.catch(() => {
				toast({
					title: "Oh no! Something went wrong!",
					description: `We could not fetch the participants from the server. Please try again later.`,
					variant: "destructive",
				});
			});
	}, []);

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			discipline: result ? result?.discipline.id : undefined,
			participant: result ? result?.participant.id : undefined,
			result: String(result?.result) || "",
		},
	});

	const { watch } = form;
	const participantSelected = watch("participant");
	const disciplineSelected = watch("discipline");

	const resultType = disciplines?.find((discipline) => discipline.id === Number(disciplineSelected))?.resultType;

	const selectedParticipantDisciplines = participants?.find((participant) => participant.id === Number(participantSelected))?.disciplines;

	function onSubmit(data: z.infer<typeof FormSchema>) {
		console.log(data);

		const newResult = {
			disciplineId: data.discipline,
			participantId: data.participant,
			result: Number(data.result),
		} as IResultRequest;

		console.log(result);

		if (result) {
			newResult.id = Number(result!.id);
			console.log(newResult);

			// PUT

			updateResult(newResult as IResultRequest)
				.then(() => {
					toast({
						title: "Result updated!",
						description: `We have successfully updated the result ${data.result} for participant ${data.participant} in the system`,
					});
					navigate("/results");
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
		} else {
			// POST

			createResult(newResult as IResultRequest)
				.then(() => {
					toast({
						title: "Result created!",
						description: `We have successfully created the result ${data.result} for participant ${data.participant} in the system`,
					});
					navigate("/results");
					return;
				})
				.catch(() => {
					toast({
						title: "Oh no!  Something went wrong!",
						description: `We could not create the result in the system. Please try again later.`,
						variant: "destructive",
					});
				});
		}
	}

	return (
		<>
			<h2 className="mb-5 text-pretty text-center text-3xl font-bold sm:text-5xl">{result ? "Edit" : "Create"} Result</h2>
			<section className="flex justify-center">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="flex w-80 flex-col justify-center space-y-6">
						<FormField
							control={form.control}
							name="participant"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Participant</FormLabel>
									<FormControl>
										<Select onValueChange={(value) => field.onChange(Number(value))} defaultValue={String(field.value)} disabled={result ? true : false}>
											<SelectTrigger>
												<SelectValue placeholder="Choose participant" />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													{participants?.map((participant) => (
														<SelectItem key={participant.id} value={String(participant.id)}>
															{participant.name}
														</SelectItem>
													))}
												</SelectGroup>
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{participantSelected && (
							<FormField
								control={form.control}
								name="discipline"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Discipline</FormLabel>
										<FormControl>
											<Select onValueChange={(value) => field.onChange(Number(value))} defaultValue={String(field.value)} disabled={result ? true : false}>
												<SelectTrigger>
													<SelectValue placeholder="Choose discipline" />
												</SelectTrigger>
												<SelectContent>
													<SelectGroup>
														{selectedParticipantDisciplines?.map((discipline) => (
															<SelectItem key={discipline.id} value={String(discipline.id)}>
																{discipline.name}
															</SelectItem>
														))}
													</SelectGroup>
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						)}
						{disciplineSelected && (
							<FormField
								control={form.control}
								name="result"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Result {resultTypeDictionary(resultType)}</FormLabel>
										<FormControl>
											<Input placeholder="Type Result..." type="number" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						)}
						<div className="flex justify-center">
							<Button className="w-24 font-bold" type="submit">
								{result ? "Edit" : "Create"}
							</Button>
						</div>
					</form>
				</Form>
			</section>
		</>
	);
}
