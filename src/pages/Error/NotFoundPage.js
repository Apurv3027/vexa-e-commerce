import { useNavigate } from 'react-router-dom';

function NotFoundPage() {

    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
            <h1 className="text-9xl font-bold text-gray-800 mb-4">404</h1>
            <p className="text-xl text-gray-600 text-center mb-8 max-w-md">
                Sorry, the page you are looking for does not exist.
            </p>
            <button
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
                onClick={() => navigate('/')}>
                Go Back Home
            </button>
        </div>
    );
}

export default NotFoundPage;