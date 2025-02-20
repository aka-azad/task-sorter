import { Link } from "react-router";

const NotFoundPage = () => {
    return (
        <div className="flex items-center justify-center h-screen w-full bg-base-300">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-gray-800">404</h1>
                <p className="text-2xl font-semibold text-gray-600 mt-4">Page Not Found</p>
                <p className="text-gray-500 mt-2">Sorry, the page you are looking for does not exist.</p>
                <Link to="/" className="btn btn-primary mt-6">Go Home</Link>
            </div>
        </div>
    );
};

export default NotFoundPage;