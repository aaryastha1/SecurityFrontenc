// import { useEffect } from "react";
// import { useSearchParams } from "react-router-dom";
// import axios from "axios";

// const PaymentSuccess = () => {
//   const [params] = useSearchParams();

//   useEffect(() => {
//     axios.get("http://localhost:5000/api/esewa/esewa/verify", {
//       params: {
//         oid: params.get("oid"),
//         refId: params.get("refId"),
//       },
//     });
//   }, []);

//   return <h2>Payment Successful 🎉</h2>;
// };

// export default PaymentSuccess;
