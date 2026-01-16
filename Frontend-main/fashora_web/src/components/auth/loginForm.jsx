import React, { useState, useEffect, useRef, useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useLoginUser } from '../../hooks/useLoginUser';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import ReCAPTCHA from 'react-google-recaptcha';

// ✅ Import AuthContext
import { AuthContext } from '../../auth/authProvider';

const LoginForm = () => {
  const { mutate, isPending } = useLoginUser();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // for RBAC

  const recaptchaRef = useRef(null);
  const [captchaValue, setCaptchaValue] = useState('');
  const [siteKeyLoaded, setSiteKeyLoaded] = useState(false);

  const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY) {
      console.error('RECAPTCHA SITE KEY is missing!');
    } else {
      setSiteKeyLoaded(true);
    }
  }, []);

  const resetCaptcha = () => {
    setCaptchaValue('');
    if (recaptchaRef.current) {
      recaptchaRef.current.reset();
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required('Email or phone is required'),
      password: Yup.string().required('Password is required'),
    }),

    onSubmit: (values) => {
      if (!captchaValue) {
        toast.error('Please complete the CAPTCHA');
        return;
      }

      mutate(
        { ...values, captcha: captchaValue },
        {
          onSuccess: (res) => {
            toast.success('Login successful!');
            resetCaptcha();

            const { role, _id, name, email } = res?.data;

            // ✅ Save user to AuthContext
            login({ role, _id, name, email }, res.token);

            // ✅ Save role & token in localStorage
            localStorage.setItem('userRole', role);
            localStorage.setItem('token', res.token);
            localStorage.setItem('user', JSON.stringify({ role, _id, name, email }));

            // ✅ Redirect based on role
            setTimeout(() => {
              role === 'admin'
                ? navigate('/admins/categoryy')
                : navigate('/home');
            }, 500);
          },

          onError: (error) => {
            const message =
              error?.response?.data?.message ||
              'Login failed. Please try again.';

            toast.error(message);

            // 🔐 Important: reset captcha so user can retry
            resetCaptcha();
          },
        }
      );
    },
  });

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

        <h2 className="text-lg font-semibold text-center">
          Welcome Back!
        </h2>

        <input
          type="text"
          name="email"
          placeholder="Phone / Email"
          className="w-full border rounded px-3 py-2"
          {...formik.getFieldProps('email')}
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-sm text-red-500">{formik.errors.email}</p>
        )}

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border rounded px-3 py-2"
          {...formik.getFieldProps('password')}
        />
        {formik.touched.password && formik.errors.password && (
          <p className="text-sm text-red-500">{formik.errors.password}</p>
        )}

        <div className="flex items-center gap-2 text-sm">
          <input type="checkbox" id="remember" />
          <label htmlFor="remember">Remember Me</label>
        </div>

        {/* CAPTCHA */}
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
          className={`w-full bg-[#a27c4b] text-white py-2 rounded ${
            isPending ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isPending ? 'Signing In...' : 'Sign In'}
        </button>

        <p className="text-sm text-center">
          Don’t have an account?{' '}
          <a href="/signup" className="font-semibold text-[#744f28]">
            Sign Up
          </a>
        </p>
      </form>
    </>
  );
};

export default LoginForm;
