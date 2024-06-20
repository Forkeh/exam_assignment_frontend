import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Loader from "./components/ui/Loader";
import PageLayout from "./pages/PageLayout";
import ErrorPage from "./pages/ErrorPage";
import ParticipantsPage from "./pages/ParticipantsPage";
import ResultsPage from "./pages/ResultsPage";
import ParticipantsFormPage from "./pages/ParticipantsFormPage";

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
                path: "/path2",
                element: <div>Path 2</div>,
            },
            {
                path: "/participantForm",
                element: <ParticipantsFormPage />,
            },
        ],
    },
]);

export default App;
