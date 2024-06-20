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
import { Checkbox } from "@radix-ui/react-checkbox";

const FormSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    gender: z.string().min(2, {
        message: "Gender must be selected.",
    }),
    age: z.coerce.number().int().min(6, {
        message: "Age must be at least 6.",
    }),
    club: z.string().min(1, {
        message: "Club must be at least 1.",
    }),
    disciplines: z.array(z.number()).refine((value) => value.some((item) => item), {
        message: "You have to select at least one discipline.",
    }),
    // disciplines: z.array(z.number()).min(1, {
    //     message: "Must select at least 1 discipline.",
    // }),
});

export default function ParticipantsFormPage() {
    const [disciplines, setDisciplines] = useState<IDiscipline[]>([]);
    const participant = useLocation().state as IParticipant | null;

    console.log(disciplines);
    console.log(participant);

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

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: participant?.name || "",
            gender: participant?.gender || "MALE",
            age: participant?.age || 0,
            club: participant?.club || "",
            disciplines: disciplines.map((d) => d.id) || [],
        },
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(data);

        const newParticipant = {
            name: data.name,
            gender: data.gender,
            age: Number(data.age),
        } as IParticipant;

        console.log(newParticipant);

        // if (participant) {
        //     newParticipant.id = Number(participant!.id);
        //     console.log(newParticipant);

        //     // PUT

        //     updateEvent(newEvent as eventRequest)
        //         .then(() => {
        //             toast({
        //                 title: "Event opdateret!",
        //                 description: `Vi har opdateret ${data.name} eventet i systemet.`,
        //             });
        //             navigate("/");
        //             return;
        //         })
        //         .catch((error) => {
        //             console.log(error.response.data.message);

        //             toast({
        //                 title: "Åh nej! Noget gik galt!",
        //                 description: `${error.response.data.message}`,
        //                 variant: "destructive",
        //             });
        //         });
        // } else {
        //     // POST

        //     createEvent(newEvent as eventRequest)
        //         .then(() => {
        //             toast({
        //                 title: "Event oprettet!",
        //                 description: `Vi har oprettet ${data.name} eventet i systemet.`,
        //             });
        //             navigate("/");
        //             return;
        //         })
        //         .catch(() => {
        //             toast({
        //                 title: "Åh nej! Noget gik galt!",
        //                 description: `Måske eksisterer eventet allerede i systemet. Prøv igen på et senere tidspunkt.`,
        //                 variant: "destructive",
        //             });
        //         });
        // }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Name of the participant" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Gender</FormLabel>

                            <FormControl>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Choose gender" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="MALE">Male</SelectItem>
                                            <SelectItem value="FEMALE">Female</SelectItem>
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
                                                                      field.value?.filter((value) => value !== item.id)
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
                />
                <Checkbox>Checkbox</Checkbox>
                <Button type="submit">{participant ? "Update" : "Create"}</Button>
            </form>
        </Form>
    );
}
