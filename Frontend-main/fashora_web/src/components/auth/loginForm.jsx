// import React, { useState, useEffect, useRef, useContext } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { useLoginUser } from "../../hooks/useLoginUser";
// import { useNavigate } from "react-router-dom";
// import toast, { Toaster } from "react-hot-toast";
// import ReCAPTCHA from "react-google-recaptcha";
// import { AuthContext } from "../../auth/authProvider";

// const LoginForm = () => {
//   const { mutate, isPending } = useLoginUser();
//   const navigate = useNavigate();
//   const { login } = useContext(AuthContext);

//   const recaptchaRef = useRef(null);
//   const [captchaValue, setCaptchaValue] = useState("");
//   const [siteKeyLoaded, setSiteKeyLoaded] = useState(false);

//   // OTP Step
//   const [isOTPStep, setIsOTPStep] = useState(false);
//   const [otpEmail, setOtpEmail] = useState("");
//   const [otpValue, setOtpValue] = useState("");

//   const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
//   const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5006";

//   useEffect(() => {
//     if (!RECAPTCHA_SITE_KEY) console.error("RECAPTCHA SITE KEY is missing!");
//     else setSiteKeyLoaded(true);
//   }, []);

//   const resetCaptcha = () => {
//     setCaptchaValue("");
//     recaptchaRef.current?.reset();
//   };

//   // ✅ Login form submit
//   const formik = useFormik({
//     initialValues: { email: "", password: "" },
//     validationSchema: Yup.object({
//       email: Yup.string().required("Email or phone is required"),
//       password: Yup.string().required("Password is required"),
//     }),
//     onSubmit: (values) => {
//       if (!captchaValue) {
//         toast.error("Please complete the CAPTCHA");
//         return;
//       }

//       mutate(
//         { ...values, captcha: captchaValue },
//         {
//           onSuccess: (res) => {
//             resetCaptcha();

//             // OTP triggered
//             if (res?.message?.includes("OTP sent")) {
//               setIsOTPStep(true);
//               setOtpEmail(values.email);
//             } else {
//               const { role, _id, name, email } = res?.data;
//               login({ role, _id, name, email }, res.token);
//               localStorage.setItem("userRole", role);
//               localStorage.setItem("token", res.token);
//               localStorage.setItem("user", JSON.stringify({ role, _id, name, email }));
//               setTimeout(() => {
//                 role === "admin" ? navigate("/admins/categoryy") : navigate("/home");
//               }, 500);
//             }
//           },
//           onError: (err) => {
//             toast.error(err?.response?.data?.message || "Login failed.");
//             resetCaptcha();
//           },
//         }
//       );
//     },
//   });
// const handleVerifyOTP = async () => {
//   if (!otpValue) return toast.error("Enter OTP");

//   try {
//     const res = await fetch(`${API_URL}/api/auth/verify-otp`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email: otpEmail, otp: otpValue }),
//     });

//     const contentType = res.headers.get("content-type");
    
//     // If the server didn't return JSON, it's likely a 404 or 500 error page
//     if (!contentType || !contentType.includes("application/json")) {
//       const errorText = await res.text();
//       console.error("Server error detail:", errorText);
//       throw new Error("Server sent a non-JSON response. Check the URL path.");
//     }

//     const data = await res.json();

//     if (!res.ok) throw new Error(data.message || "OTP verification failed");

//     // Success logic...
//     login(data.data, data.token);
//     toast.success("Login successful!");
//     navigate(data.data.role === "admin" ? "/admins/categoryy" : "/home");

//   } catch (err) {
//     toast.error(err.message);
//   }
// };
//   return (
//     <>
//       <Toaster position="top-center" />
//       <form onSubmit={formik.handleSubmit} className="w-full max-w-sm space-y-4 mx-auto" noValidate>
//         <img src="fashoraa.png" alt="Fashora Logo" className="w-30 h-30 mx-auto mb-4" />
//         <h2 className="text-lg font-semibold text-center">Welcome Back!</h2>

//         {!isOTPStep ? (
//           <>
//             <input type="text" placeholder="Phone / Email" {...formik.getFieldProps("email")} className="w-full border rounded px-3 py-2" />
//             {formik.touched.email && formik.errors.email && <p className="text-sm text-red-500">{formik.errors.email}</p>}

//             <input type="password" placeholder="Password" {...formik.getFieldProps("password")} className="w-full border rounded px-3 py-2" />
//             {formik.touched.password && formik.errors.password && <p className="text-sm text-red-500">{formik.errors.password}</p>}

//             <div className="flex items-center gap-2 text-sm">
//               <input type="checkbox" id="remember" />
//               <label htmlFor="remember">Remember Me</label>
//             </div>

//             {siteKeyLoaded && <ReCAPTCHA ref={recaptchaRef} sitekey={RECAPTCHA_SITE_KEY} onChange={(val) => setCaptchaValue(val)} onExpired={resetCaptcha} />}

//             <button type="submit" disabled={isPending} className={`w-full bg-[#a27c4b] text-white py-2 rounded ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}>
//               {isPending ? "Signing In..." : "Sign In"}
//             </button>
//           </>
//         ) : (
//           <>
//             <input type="text" placeholder="Enter OTP" value={otpValue} onChange={(e) => setOtpValue(e.target.value)} className="w-full border rounded px-3 py-2" />
//             <button type="button" onClick={handleVerifyOTP} className="w-full bg-[#a27c4b] text-white py-2 rounded">
//               Verify OTP
//             </button>
//           </>
//         )}

//         {!isOTPStep && (
//           <p className="text-sm text-center">
//             Don’t have an account? <a href="/signup" className="font-semibold text-[#744f28]">Sign Up</a>
//           </p>
//         )}
//       </form>
//     </>
//   );
// };

// export default LoginForm;


import React, { useState, useEffect, useRef, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLoginUser } from "../../hooks/useLoginUser";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha";
import { AuthContext } from "../../auth/authProvider";
import api from "../../api/api"; // Axios instance with withCredentials=true

const LoginForm = () => {
  const { mutate, isPending } = useLoginUser();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const recaptchaRef = useRef(null);
  const [captchaValue, setCaptchaValue] = useState("");
  const [siteKeyLoaded, setSiteKeyLoaded] = useState(false);

  // OTP
  const [isOTPStep, setIsOTPStep] = useState(false);
  const [otpEmail, setOtpEmail] = useState("");
  const [otpValue, setOtpValue] = useState("");

  const [csrfToken, setCsrfToken] = useState(""); // 🔐 CSRF token

  const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  // Fetch CSRF token on mount
  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const res = await api.get("/csrf-token");
        setCsrfToken(res.data.csrfToken);
      } catch (err) {
        console.error("Failed to fetch CSRF token:", err);
      }
    };
    fetchCsrfToken();
  }, []);

  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY) {
      console.error("RECAPTCHA SITE KEY is missing!");
    } else {
      setSiteKeyLoaded(true);
    }
  }, []);

  const resetCaptcha = () => {
    setCaptchaValue("");
    recaptchaRef.current?.reset();
  };

  // ===== LOGIN FORM =====
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string().required("Email or phone is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      if (!captchaValue) {
        toast.error("Please complete the CAPTCHA");
        return;
      }

      try {
        const res = await api.post(
          "/auth/login",
          { ...values, captcha: captchaValue },
          {
            headers: {
              "X-CSRF-Token": csrfToken, // 🔐 Send CSRF token in headers
            },
          }
        );

        resetCaptcha();

        if (res?.data?.message?.includes("OTP sent")) {
          setIsOTPStep(true);
          setOtpEmail(values.email);
          return;
        }

        // fallback (non-OTP)
        login(res.data.data);
        toast.success("Login successful!");
        navigate(res.data.data.role === "admin" ? "/admins/categoryy" : "/home");
      } catch (err) {
        toast.error(err?.response?.data?.message || "Login failed");
        resetCaptcha();
      }
    },
  });

  // ===== VERIFY OTP =====
  const handleVerifyOTP = async () => {
    if (!otpValue) return toast.error("Enter OTP");

    try {
      const res = await api.post(
        "/auth/verify-otp",
        { email: otpEmail, otp: otpValue },
        {
          headers: {
            "X-CSRF-Token": csrfToken, // 🔐 Send CSRF token in headers
          },
        }
      );

      // ✅ Login user via context (cookie already set)
      login(res.data.data);
      toast.success("Login successful!");
      navigate(res.data.data.role === "admin" ? "/admins/categoryy" : "/home");
    } catch (err) {
      toast.error(err?.response?.data?.message || "OTP verification failed");
    }
  };

  return (
    <>
      <Toaster position="top-center" />

      <form
        onSubmit={formik.handleSubmit}
        className="w-full max-w-sm space-y-4 mx-auto"
        noValidate
      >
        <img
          src="fashoraa.png"
          alt="Fashora Logo"
          className="w-30 h-30 mx-auto mb-4"
        />

        <h2 className="text-lg font-semibold text-center">Welcome Back!</h2>

        {!isOTPStep ? (
          <>
            <input
              type="text"
              placeholder="Phone / Email"
              {...formik.getFieldProps("email")}
              className="w-full border rounded px-3 py-2"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-sm text-red-500">{formik.errors.email}</p>
            )}

            <input
              type="password"
              placeholder="Password"
              {...formik.getFieldProps("password")}
              className="w-full border rounded px-3 py-2"
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-sm text-red-500">{formik.errors.password}</p>
            )}

            {siteKeyLoaded && (
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={RECAPTCHA_SITE_KEY}
                onChange={(val) => setCaptchaValue(val)}
                onExpired={resetCaptcha}
              />
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-[#a27c4b] text-white py-2 rounded"
            >
              {isPending ? "Signing In..." : "Sign In"}
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otpValue}
              onChange={(e) => setOtpValue(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />

            <button
              type="button"
              onClick={handleVerifyOTP}
              className="w-full bg-[#a27c4b] text-white py-2 rounded"
            >
              Verify OTP
            </button>
          </>
        )}
      </form>
    </>
  );
};

export default LoginForm;
