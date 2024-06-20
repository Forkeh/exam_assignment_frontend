import React from "react";

interface Props {
    name: string;
    age: number;
    gender: string;
    city: string;
}

export default function PersonCard({ name, age, city, gender }: Props) {
    return (
        <div className="bg-slate-300">
            <p>Name: {name}</p>
            <p>Age: {age}</p>
            <p>Gender: {gender}</p>
            <p>City: {city}</p>
        </div>
    );
}
