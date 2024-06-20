import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Loader from "./components/ui/Loader";
import PageLayout from "./pages/PageLayout";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";

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
                element: <HomePage/>,
            },
            {
                path: "/path1",
                element: <div>Path 1</div>,
            },
            {
                path: "/path2",
                element: <div>Path 2</div>,
            },
        ],
    },
]);

export default App;
