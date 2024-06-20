"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IParticipant } from "@/models/IParticipant";
import { getAllDisciplines } from "@/services/DisciplinesApi";
import { IDiscipline } from "@/models/IDiscipline";
import { getAllParticipantsNoPagination } from "@/services/ParticipantApi";
import { IResult } from "@/models/IResult";

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
    const [disciplines, setDisciplines] = useState<IDiscipline[]>([]);
    const [participants, setParticipants] = useState<IParticipant[] | null>(null);
    const result = useLocation().state as IResult | null;
    const navigate = useNavigate();

    console.log(result);
    console.log(participants);

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
            discipline: String(result?.discipline.id) || "",
            participant: String(result?.participant.id) || "",
            result: result?.result || "",
        },
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log("onSubmit");

        console.log(data);

        // const newParticipant = {
        //     name: data.name,
        //     gender: data.gender,
        //     age: Number(data.age),
        //     club: data.club,
        //     disciplines: data.disciplines,
        // } as IParticipant;

        // // console.log(newParticipant);

        // if (participant) {
        //     newParticipant.id = Number(participant!.id);
        //     console.log(newParticipant);

        //     // PUT

        //     updateParticipant(newParticipant as IParticipant)
        //         .then(() => {
        //             toast({
        //                 title: "Participant updated!",
        //                 description: `We have successfully updated the participant ${data.name} in the system`,
        //             });
        //             navigate("/");
        //             return;
        //         })
        //         .catch((error) => {
        //             console.log(error.response.data.message);

        //             toast({
        //                 title: "Oh no! Something went wrong!",
        //                 description: `${error.response.data.message}`,
        //                 variant: "destructive",
        //             });
        //         });
        // } else {
        //     // POST

        //     createParticipant(newParticipant as IParticipant)
        //         .then(() => {
        //             toast({
        //                 title: "Participant created!",
        //                 description: `We have successfully created the participant ${data.name} in the system.`,
        //             });
        //             navigate("/");
        //             return;
        //         })
        //         .catch(() => {
        //             toast({
        //                 title: "Oh no!  Something went wrong!",
        //                 description: `We could not create the participant ${data.name} in the system. Please try again later.`,
        //                 variant: "destructive",
        //             });
        //         });
        // }
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
                        name="discipline"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Discipline</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Choose discipline" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {disciplines?.map((discipline) => (
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
                    <FormField
                        control={form.control}
                        name="participant"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Participant</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Choose discipline" />
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
                    {/* <FormField
                        control={form.control}
                        name="age"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Age</FormLabel>
                                <FormControl>
                                    <Input placeholder="Name of the participant" type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="club"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Club</FormLabel>
                                <FormControl>
                                    <Input placeholder="Name of the club" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="disciplines"
                        render={() => (
                            <FormItem>
                                <div className="mb-4">
                                    <FormLabel className="text-base">Disciplines</FormLabel>
                                    <FormDescription>Select disciplines.</FormDescription>
                                </div>
                                {disciplines.map((item) => (
                                    <FormField
                                        key={item.id}
                                        control={form.control}
                                        name="disciplines"
                                        render={({ field }) => {
                                            return (
                                                <FormItem
                                                    key={item.id}
                                                    className="flex flex-row items-start space-x-3 space-y-0"
                                                >
                                                    <FormControl>
                                                        <Checkbox
                                                            className="size-6 appearance-none w-4 h-4 border-2 border-blue-500 rounded-sm bg-white checked:bg-blue-800 checked:border-0"
                                                            checked={field.value?.includes(item.id)}
                                                            onCheckedChange={(checked) => {
                                                                return checked
                                                                    ? field.onChange([...field.value, item.id])
                                                                    : field.onChange(
                                                                          field.value?.filter(
                                                                              (value) => value !== item.id
                                                                          )
                                                                      );
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">{item.name}</FormLabel>
                                                </FormItem>
                                            );
                                        }}
                                    />
                                ))}
                                <FormMessage />
                            </FormItem>
                        )}
                    /> */}
                    <Button type="submit">{result ? "Update" : "Create"}</Button>
                </form>
            </Form>
        </>
    );
}
