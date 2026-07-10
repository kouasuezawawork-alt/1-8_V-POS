import { createBrowserRouter } from "react-router-dom";

const Dummy = ({ text }) => (
    <div
        style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#05070d",
            color: "gold",
            fontSize: "30px",
        }}
    >
        {text}
    </div>
);

const router = createBrowserRouter([
    {
        path: "/",
        element: <Dummy text="Register Select" />,
    },
    {
        path: "/register",
        element: <Dummy text="Register Home" />,
    },
    {
        path: "/scan",
        element: <Dummy text="Scan" />,
    },
    {
        path: "/checkout",
        element: <Dummy text="Checkout" />,
    },
    {
        path: "/sending",
        element: <Dummy text="Sending" />,
    },
    {
        path: "/master-login",
        element: <Dummy text="Master Login" />,
    },
    {
        path: "/master",
        element: <Dummy text="Master" />,
    },
]);

export default router;