

import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cartcontext";
import axios from "axios";
import { AuthContext } from "../auth/authProvider";

const API = "http://localhost:5006"; // backend

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useContext(AuthContext);

  const [address, setAddress] = useState({ fullName: "", address: "", phone: "" });
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [loading, setLoading] = useState(false);

  const shipping = 150;
  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const total = subtotal + shipping;

  const handlePlaceOrder = async () => {
    if (!isAuthenticated) {
      return alert("You must be logged in to place an order");
    }
    if (!address.fullName || !address.address || !address.phone) {
      return alert("Please fill all fields");
    }
    if (cartItems.length === 0) return alert("Cart is empty");

    try {
      setLoading(true);

      // ------------------ Place Order ------------------
      const orderRes = await axios.post(
        `${API}/api/esewa/initiate`,
        {
          items: cartItems.map((i) => ({ productId: i._id, quantity: i.quantity })),
          subtotal,
          shipping,
          fullName: address.fullName,
          address: address.address,
          phone: address.phone,
          paymentMethod
        },
        { withCredentials: true } // important for cookie-based auth
      );

      // ------------------ COD ------------------
      if (paymentMethod === "cod") {
        clearCart();
        navigate("/order-success");
        return;
      }

      // ------------------ eSewa Payment ------------------
      const { paymentUrl, payload } = orderRes.data;

      const form = document.createElement("form");
      form.method = "POST";
      form.action = paymentUrl;
      form.style.display = "none";

      Object.entries(payload).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();

    } catch (err) {
      console.error("Order Error:", err);
      alert(err.response?.data?.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 py-10 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Shipping */}
        <div className="bg-white p-6 rounded shadow">
          <input
            placeholder="Full Name"
            value={address.fullName}
            onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
            className="w-full p-2 mb-2 border rounded"
          />
          <textarea
            placeholder="Address"
            rows={3}
            value={address.address}
            onChange={(e) => setAddress({ ...address, address: e.target.value })}
            className="w-full p-2 mb-2 border rounded"
          />
          <input
            placeholder="Phone"
            value={address.phone}
            onChange={(e) => setAddress({ ...address, phone: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Payment & Summary */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded shadow">
            <label className="flex gap-2 mb-2">
              <input
                type="radio"
                checked={paymentMethod === "cod"}
                onChange={() => setPaymentMethod("cod")}
              />
              Cash on Delivery
            </label>
            <label className="flex gap-2">
              <input
                type="radio"
                checked={paymentMethod === "esewa"}
                onChange={() => setPaymentMethod("esewa")}
              />
              eSewa
            </label>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <div className="flex justify-between mb-1">
              <span>Subtotal</span>
              <span>Rs. {subtotal}</span>
            </div>
            <div className="flex justify-between mb-1">
              <span>Shipping</span>
              <span>Rs. {shipping}</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>Rs. {total}</span>
            </div>

            <button
              disabled={loading}
              onClick={handlePlaceOrder}
              className="mt-4 w-full bg-purple-500 hover:bg-blue-500 text-white py-2 rounded font-semibold"
            >
              {loading ? "Processing..." : "Place Order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
