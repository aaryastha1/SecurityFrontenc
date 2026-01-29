
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRegisterUser } from '../../hooks/useRegisteruserTan';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';

const RegisterForm = () => {
  const navigate = useNavigate();
  const { mutate, isSuccess, isLoading } = useRegisterUser();
  const [message, setMessage] = useState('');
  const [captchaValue, setCaptchaValue] = useState('');
  const [passwordStrength, setPasswordStrength] = useState({ label: '', color: 'red', score: 0 });
  const [siteKeyLoaded, setSiteKeyLoaded] = useState(false);

  // Get site key from .env
  const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY) {
      console.error('RECAPTCHA SITE KEY is missing! Check your .env file.');
    } else {
      setSiteKeyLoaded(true);
    }
  }, []);

  const validationSchema = Yup.object({
    name: Yup.string().required('Full Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    password: Yup.string().min(6, 'Password too short').required('Password is required'),
  });

  const formik = useFormik({
    initialValues: { name: '', email: '', phoneNumber: '', password: '' },
    validationSchema,
    onSubmit: (values) => {
      if (!captchaValue) {
        setMessage('Please complete the CAPTCHA');
        return;
      }

      mutate(
        { ...values, captcha: captchaValue },
        {
          onSuccess: (response) => {
            setMessage(response?.message || 'Registration successful!');
            formik.resetForm();
            setCaptchaValue('');
            setPasswordStrength({ label: '', color: 'red', score: 0 });
            setTimeout(() => navigate('/login'), 1000);
          },
          onError: (error) => {
            setMessage(error?.response?.data?.message || 'Registration failed. Please try again.');
            setCaptchaValue('');
          },
        }
      );
    },
  });

  const calculatePasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[\W_]/.test(password)) score++;

    if (!password) return { label: '', color: 'red', score: 0 };
    if (score === 5) return { label: 'Very Strong', color: 'green', score: 5 };
    if (score === 4) return { label: 'Strong', color: 'limegreen', score: 4 };
    if (score === 3) return { label: 'Medium', color: 'orange', score: 3 };
    return { label: 'Weak', color: 'red', score: 1 };
  };

  const handlePasswordChange = (e) => {
    formik.handleChange(e);
    setPasswordStrength(calculatePasswordStrength(e.target.value));
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="w-full max-w-sm space-y-4 p-6 mx-auto mt-10 bg-white rounded shadow"
    >
      <img src="/fashoraa.png" alt="Fashora Logo" className="w-30 h-30 mx-auto mb-4" />
      <h2 className="text-lg font-semibold text-center">Sign Up</h2>

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        className="w-full border rounded px-3 py-2"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.name}
      />
      {formik.touched.name && formik.errors.name && <p className="text-sm text-red-500">{formik.errors.name}</p>}

      <input
        type="email"
        name="email"
        placeholder="Email"
        className="w-full border rounded px-3 py-2"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
      />
      {formik.touched.email && formik.errors.email && <p className="text-sm text-red-500">{formik.errors.email}</p>}

      <input
        type="text"
        name="phoneNumber"
        placeholder="Phone Number"
        className="w-full border rounded px-3 py-2"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.phoneNumber}
      />
      {formik.touched.phoneNumber && formik.errors.phoneNumber && (
        <p className="text-sm text-red-500">{formik.errors.phoneNumber}</p>
      )}

      <input
        type="password"
        name="password"
        placeholder="Password"
        className="w-full border rounded px-3 py-2"
        onChange={handlePasswordChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
      />
      {formik.touched.password && formik.errors.password && (
        <p className="text-sm text-red-500">{formik.errors.password}</p>
      )}

      {/* Password strength meter */}
      {formik.values.password && (
        <>
          <div className="w-full h-2 rounded bg-gray-200 mt-1">
            <div
              className="h-2 rounded"
              style={{
                width: `${(passwordStrength.score / 5) * 100}%`,
                backgroundColor: passwordStrength.color,
                transition: 'width 0.3s',
              }}
            />
          </div>
          <p className="text-sm font-semibold" style={{ color: passwordStrength.color }}>
            Strength: {passwordStrength.label}
          </p>
        </>
      )}

      {/* reCAPTCHA */}
      {siteKeyLoaded && (
        <div className="mt-2">
          <ReCAPTCHA sitekey={RECAPTCHA_SITE_KEY} onChange={(value) => setCaptchaValue(value)} />
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-[#a27c4b] text-white font-semibold py-2 rounded shadow hover:bg-[#906938]"
      >
        {isLoading ? 'Signing Up...' : 'Sign Up'}
      </button>

      <div className="my-4 text-sm text-[#888] flex items-center gap-2">
        <div className="flex-grow h-px bg-gray-300" />
        OR
        <div className="flex-grow h-px bg-gray-300" />
      </div>

      <p className="text-sm text-center">
        Already have an account?{' '}
        <a href="/login" className="text-[#744f28] font-semibold">
          Sign In
        </a>
      </p>

      {message && <p className={`text-center ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>{message}</p>}
    </form>
  );
};

export default RegisterForm;
