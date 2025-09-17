import { useNavigate } from "react-router-dom";

function HeaderComponents() {

    const navigate = useNavigate();

    return (
        <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-md">
            <h1 className="text-2xl font-bold text-blue-600">Vexa</h1>
            <ul className="flex space-x-6 text-gray-700">
                <li>Home</li>
                <li>Shop</li>
                <li>Categories</li>
                <li>Contact</li>
            </ul>
            {/* <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">Cart</button> */}
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg" onClick={() => navigate("/login")}>Login</button>
        </nav>
    );
}

export default HeaderComponents;