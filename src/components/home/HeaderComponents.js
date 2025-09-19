import { useNavigate } from "react-router-dom";

function HeaderComponents({ cartItemCount }) {

    const navigate = useNavigate();

    return (
        <header className=" text-black px-4 py-2 flex items-center">
            {/* Logo */}
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/")}>
                <h1 className="text-2xl font-bold text-blue-600">Vexa</h1>
            </div>

            {/* Location */}
            <div className="ml-6 flex items-center space-x-1 cursor-pointer">
                <div className="leading-tight">
                    <p className="text-xs text-black-300">Delivering to Surat 395001</p>
                    <p className="font-bold text-sm">Update location</p>
                </div>
            </div>

            {/* Search Bar */}
            <div className="flex flex-1 mx-6">
                <input
                    type="text"
                    placeholder="Search Products"
                    className="flex-1 px-3 py-2 text-black focus:outline-none border-black border rounded-md"
                />
            </div>

            {/* Language */}
            <div className="flex items-center space-x-1 cursor-pointer">
                <img
                    src="https://flagcdn.com/w20/in.png"
                    alt="India Flag"
                    className="h-4"
                />
                <span className="text-sm">EN</span>
            </div>

            {/* Account & Lists */}
            <div className="ml-6 leading-tight cursor-pointer">
                <p className="text-xs">Hello, sign in</p>
                <p className="font-bold text-sm">Account & Lists</p>
            </div>

            {/* Cart */}
            <div className="ml-6 flex items-center cursor-pointer">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                    {cartItemCount === 0 ? `Cart` : `Cart (${cartItemCount})`}
                </button>
                <button className="px-4 py-2 ml-1 bg-blue-600 text-white rounded-lg" onClick={() => navigate("/login")}>Login</button>
            </div>
        </header>
    );
}

export default HeaderComponents;