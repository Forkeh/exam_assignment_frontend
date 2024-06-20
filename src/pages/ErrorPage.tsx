import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <div className="flex justify-center w-full">
            <h1 className="text-4xl">Something went wrong! ⛔</h1>
        </div>
    );
}
