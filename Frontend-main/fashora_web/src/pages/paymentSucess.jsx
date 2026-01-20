import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cartcontext";

export default function PaymentSuccessPage() {
  const { clearCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    clearCart(); // remove items from cart
    navigate("/order-success", { replace: true }); // go to OrderSuccess page
  }, []);

  return null; // nothing rendered
}
