import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../../contexts/CartContext";

const CheckoutScreen = () => {
    const { cart, total } = useContext(CartContext);

    const vat = parseFloat(total) * 0.18;
    const grandTotal = parseFloat(total) + vat;

    // Form states
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [payment, setPayment] = useState("cod");

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, []);

    const handlePlaceOrder = () => {
        if (!name || !phone || !address) {
            alert("Please fill all required fields.");
            return;
        }

        console.log("Order Placed ✅", {
            name,
            phone,
            address,
            payment,
            cart,
            total: grandTotal,
        });

        alert("🎉 Order placed successfully!");
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Checkout</h1>

            {/* Cart Items */}
            <div className="bg-white shadow-md rounded-lg p-4 mb-6">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                {cart.length > 0 ? (
                    <div className="space-y-3">
                        {cart.map((item) => (
                            <div
                                key={item.id}
                                className="flex justify-between items-center border-b pb-2"
                            >
                                <img className="max-w-[80px]" src={item.image} alt="" />
                                <div className="flex-1 mx-4">
                                    <p className="font-medium">{item.title}</p>
                                    <p className="text-sm text-gray-500">
                                        {item.amount} × ₹{item.price}
                                    </p>
                                </div>
                                <p className="font-semibold">₹{item.price * item.amount}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">Your cart is empty</p>
                )}
            </div>

            {/* Price Details */}
            <div className="bg-white shadow-md rounded-lg p-4 mb-6">
                <h2 className="text-lg font-semibold mb-4">Price Details</h2>
                <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>₹ {parseFloat(total).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    {/* <span>VAT (18%):</span> */}
                    <span>GST (18%):</span>
                    <span>₹ {vat.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                    <span>Total:</span>
                    <span>₹ {grandTotal.toFixed(2)}</span>
                </div>
            </div>

            {/* Shipping Details */}
            <div className="bg-white shadow-md rounded-lg p-4 mb-6">
                <h2 className="text-lg font-semibold mb-4">Shipping Information</h2>
                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Full Name"
                        className="w-full border p-3 rounded-lg"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Phone Number"
                        className="w-full border p-3 rounded-lg"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <textarea
                        placeholder="Full Address"
                        className="w-full border p-3 rounded-lg"
                        rows="3"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white shadow-md rounded-lg p-4 mb-6">
                <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
                <div className="space-y-2">
                    <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            value="cod"
                            checked={payment === "cod"}
                            onChange={(e) => setPayment(e.target.value)}
                        />
                        Cash on Delivery
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            value="online"
                            checked={payment === "online"}
                            onChange={(e) => setPayment(e.target.value)}
                        />
                        Online Payment
                    </label>
                </div>
            </div>

            {/* Place Order Button */}
            <button
                onClick={handlePlaceOrder}
                className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90 transition">
                Place Order
            </button>
        </div>
    );
};

export default CheckoutScreen;
