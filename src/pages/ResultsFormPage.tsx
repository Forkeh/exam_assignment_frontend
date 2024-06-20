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

const FormSchema = z.object({
    discipline: z.string().min(1, {
        message: "Name must be at least 2 characters.",
    }),
    participant: z.string().min(1, {
        message: "Participant must be selected.",
    }),
    result: z.string().min(1, {
        message: "Result must be at least 1.",
    }),
});

export default function ResultsFormPage() {
    // const [disciplines, setDisciplines] = useState<IDiscipline[]>([]);
    const [participants, setParticipants] = useState<IParticipantFull[] | null>(null);
    const result = useLocation().state as IResult | null;
    const navigate = useNavigate();

    console.log(result);
    console.log(participants);

    // useEffect(() => {
    //     getAllDisciplines()
    //         .then((res) => setDisciplines(res.data))
    //         .catch(() => {
    //             toast({
    //                 title: "Oh no! Something went wrong!",
    //                 description: `We could not fetch the disciplines from the server. Please try again later.`,
    //                 variant: "destructive",
    //             });
    //         });
    // }, []);

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
            discipline: result ? String(result?.discipline.id) : "",
            participant: result ? String(result?.participant.id) : "",
            result: result?.result || "",
        },
    });

    const { watch } = form;
    const participantSelected = watch("participant");
    const disciplineSelected = watch("discipline");

    const selectedParticipant = participants?.find(
        (participant) => participant.id === Number(participantSelected)
    );

    const selectedParticipantDisciplines = selectedParticipant?.disciplines;
    console.log(selectedParticipantDisciplines);
    

    console.log("participant " + participantSelected);
    console.log("selected " + disciplineSelected);

    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log("onSubmit");

        console.log(data);

        const newResult = {
            disciplineId: data.discipline,
            participantId: data.participant,
            result: data.result,
        } as IResultRequest;

        console.log(newResult);

        if (result) {
            newResult.id = Number(newResult!.id);
            console.log(newResult);

            // PUT

            updateResult(newResult as IResultRequest)
                .then(() => {
                    toast({
                        title: "Result updated!",
                        description: `We have successfully updated the result ${data.result} for participant ${data.participant} in the system`,
                    });
                    navigate("/");
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
                    navigate("/");
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
            <h2 className="text-3xl sm:text-5xl font-bold text-center text-pretty mb-5">
                {result ? "Update" : "Create"} Result
            </h2>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                    <FormField
                        control={form.control}
                        name="participant"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Participant</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        disabled={result ? true : false}
                                    >
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
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            disabled={result ? true : false}
                                        >
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
                                    <FormLabel>Result</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Type Result..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}

                    <Button type="submit">{result ? "Update" : "Create"}</Button>
                </form>
            </Form>
        </>
    );
}
