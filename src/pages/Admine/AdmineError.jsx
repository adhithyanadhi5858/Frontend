import { Link } from "react-router-dom";

const AdmineError = () => {




  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mt-2">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-600 mt-2">
        The page you are looking for might have been removed or does not exist.
      </p>

      <Link to={"/admine"} className="btn btn-primary mt-6">
        Go Home
      </Link>
    </div>
  );
};

export default AdmineError;

