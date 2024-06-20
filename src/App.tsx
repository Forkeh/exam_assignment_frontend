import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Loader from "./components/ui/Loader";
import PageLayout from "./pages/PageLayout";
import ErrorPage from "./pages/ErrorPage";
import ParticipantsPage from "./pages/ParticipantsPage";
import ResultsPage from "./pages/ResultsPage";
import ParticipantsFormPage from "./pages/ParticipantsFormPage";
import ResultsFormPage from "./pages/ResultsFormPage";

function App() {
    return <RouterProvider router={router} />;
}

const router = createBrowserRouter([
    {
        element: <PageLayout />,
        loader: Loader,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <ParticipantsPage />,
            },
            {
                path: "/results",
                element: <ResultsPage />,
            },
            {
                path: "/participantForm",
                element: <ParticipantsFormPage />,
            },
            {
                path: "/resultForm",
                element: <ResultsFormPage />,
            },
        ],
    },
]);

export default App;
