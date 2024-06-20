import ListItemBook from "@/components/renderer/ListItemBook";
import ListRenderer from "@/components/renderer/ListRenderer";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import IBook from "@/models/IBook";
import { getAllBooks } from "@/services/BookApi";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function HomePage() {
    const [books, setBooks] = useState<null | IBook[]>(null);

    console.log(books);

    useEffect(() => {
        getAllBooks()
            .then(({ data }) => {
                setBooks(data);
            })
            .catch(() => {
                toast({
                    title: "Oh no! Something went wrong!",
                    description: `Could not find any books. Please try again later.`,
                    variant: "destructive",
                });
            });
    }, []);

    return (
        <div className="flex flex-col gap-3 w-3/4 mx-auto">
            <p className="text-center text-4xl">Books</p>
            <div>
                <NavLink to={"/eventForm"}>
                    <Button>Add Event</Button>
                </NavLink>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Id</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead>Year</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>{books && <ListRenderer items={books} renderItem={ListItemBook} />}</TableBody>
            </Table>
        </div>
    );
}
