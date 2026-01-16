// import React, { useState, useEffect } from "react";
// import { FiUser } from "react-icons/fi";
// import { useGetProfile, useUpdateProfile } from "../hooks/useUserProfile";
// import { toast } from "react-hot-toast";

// export default function ProfilePage() {
//   const { data: profile, isLoading, isError } = useGetProfile();
//   const { mutate: updateProfile, isPending: updating } = useUpdateProfile();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phoneNumber: "",
//     password: "",
//   });

//   const [editMode, setEditMode] = useState(false);

//   useEffect(() => {
//     if (profile) {
//       setFormData({
//         name: profile.name || "",
//         email: profile.email || "",
//         phoneNumber: profile.phoneNumber || "",
//         password: "",
//       });
//     }
//   }, [profile]);

//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     updateProfile(formData, {
//       onSuccess: () => {
//         toast.success("Profile updated");
//         setEditMode(false);
//       },
//       onError: () => toast.error("Update failed"),
//     });
//   };

//   if (isLoading) return <p className="text-center mt-10">Loading profile...</p>;
//   if (isError) return <p className="text-center mt-10 text-red-500">Failed to load profile.</p>;

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//       <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
//         <div className="text-center mb-6">
//           <div className="mx-auto mb-2 flex items-center justify-center bg-[#9b59b6] rounded-full w-16 h-16">
//             <FiUser color="white" size={36} />
//           </div>
//         <h2 className="text-xl font-bold mb-2 text-gray-800">
//   My Profile
// </h2>

//           <p className="text-gray-500">Manage your personal information</p>
//         </div>

//      <div className="p-4 border rounded-lg mb-4 bg-gradient-to-r from-[#c9a66b] to-[#8b5e2a] text-white">
// <div className="flex justify-between items-center">
//   <h3 className="text-base font-medium text-white-700">Profile Settings</h3>
//   <svg className="w-5 h-5 text-white-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//   </svg>
// </div>

// </div>

//         <div className="p-4">
//           {!editMode ? (
//             <div className="space-y-3">
//               <ProfileField label="Full Name" value={profile.name} />
//               <ProfileField label="Email Address" value={profile.email} />
//               <ProfileField label="Phone Number" value={profile.phoneNumber} />

//               <button
//                 onClick={() => setEditMode(true)}
//                 className="w-full mt-6 px-4 py-2 bg-gradient-to-r from-[#c9a66b] to-[#8b5e2a] hover:from-[#b39151] hover:to-[#7a4f20] text-white rounded-lg text-sm font-medium transition"
//               >
//                 Update your details
//               </button>
//             </div>
//           ) : (
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <FormField
//                 name="name"
//                 label="Full Name"
//                 value={formData.name}
//                 onChange={handleChange}


                
//               />
//               <FormField
//                 name="email"
//                 label="Email Address"
//                 value={formData.email}
//                 onChange={handleChange}
//                 disabled
//               />
//               <FormField
//                 name="phoneNumber"
//                 label="Phone Number"
//                 value={formData.phoneNumber}
//                 onChange={handleChange}
//               />
//               <FormField
//                 name="password"
//                 label="New Password (optional)"
//                 value={formData.password}
//                 onChange={handleChange}
//                 type="password"
//               />

//               <div className="flex gap-3">
//                 <button
//                   type="submit"
//                   disabled={updating}
//                   className="w-full mt-6 px-4 py-2 bg-gradient-to-r from-[#c9a66b] to-[#8b5e2a] hover:from-[#b39151] hover:to-[#7a4f20] text-white rounded-lg text-sm font-medium transition"
//                 >
//                   {updating ? "Updating..." : "Save"}
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setEditMode(false)}
//                   className="w-full mt-6 px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-lg text-sm font-medium transition"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// // Reusable components
// function ProfileField({ label, value }) {
//   return (
//     <div>
//       <p className="text-sm text-gray-600 font-medium mb-1">{label}</p>
//       <input
//         type="text"
//         value={value}
//         readOnly
//         className="w-full p-2 bg-gray-100 border rounded"
//       />
//     </div>
//   );
// }

// function FormField({ name, label, value, onChange, disabled = false, type = "text" }) {
//   return (
//     <div>
//       <p className="text-sm text-gray-600 font-medium mb-1">{label}</p>
//       <input
//         name={name}
//         type={type}
//         value={value}
//         onChange={onChange}
//         disabled={disabled}
//         className={`w-full p-2 border rounded ${disabled ? "bg-gray-100" : ""}`}
//         placeholder={label}
//       />
//     </div>
//   );
// }



import React, { useState, useEffect } from "react";
import { FiUser } from "react-icons/fi";
import { useGetProfile, useUpdateProfile } from "../hooks/useUserProfile";
import { toast } from "react-hot-toast";

export default function ProfilePage() {
  const { data: profile, isLoading, isError } = useGetProfile();
  const { mutate: updateProfile, isPending: updating } = useUpdateProfile();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({ label: "", color: "red" });

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        email: profile.email || "",
        phoneNumber: profile.phoneNumber || "",
        password: "",
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Password strength logic
    if (name === "password") {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData, {
      onSuccess: () => {
        toast.success("Profile updated");
        setEditMode(false);
      },
      onError: () => toast.error("Update failed"),
    });
  };

  // Password strength calculator
  const calculatePasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[\W_]/.test(password)) score++;

    if (!password) return { label: "", color: "red" };
    if (score === 5) return { label: "Very Strong", color: "green" };
    if (score === 4) return { label: "Strong", color: "limegreen" };
    if (score === 3) return { label: "Medium", color: "orange" };
    return { label: "Weak", color: "red" };
  };

  if (isLoading) return <p className="text-center mt-10">Loading profile...</p>;
  if (isError) return <p className="text-center mt-10 text-red-500">Failed to load profile.</p>;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
        <div className="text-center mb-6">
          <div className="mx-auto mb-2 flex items-center justify-center bg-[#9b59b6] rounded-full w-16 h-16">
            <FiUser color="white" size={36} />
          </div>
          <h2 className="text-xl font-bold mb-2 text-gray-800">My Profile</h2>
          <p className="text-gray-500">Manage your personal information</p>
        </div>

        <div className="p-4 border rounded-lg mb-4 bg-gradient-to-r from-[#c9a66b] to-[#8b5e2a] text-white">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-medium text-white-700">Profile Settings</h3>
            <svg className="w-5 h-5 text-white-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
        </div>

        <div className="p-4">
          {!editMode ? (
            <div className="space-y-3">
              <ProfileField label="Full Name" value={profile.name} />
              <ProfileField label="Email Address" value={profile.email} />
              <ProfileField label="Phone Number" value={profile.phoneNumber} />

              <button
                onClick={() => setEditMode(true)}
                className="w-full mt-6 px-4 py-2 bg-gradient-to-r from-[#c9a66b] to-[#8b5e2a] hover:from-[#b39151] hover:to-[#7a4f20] text-white rounded-lg text-sm font-medium transition"
              >
                Update your details
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <FormField name="name" label="Full Name" value={formData.name} onChange={handleChange} />
              <FormField name="email" label="Email Address" value={formData.email} onChange={handleChange} disabled />
              <FormField name="phoneNumber" label="Phone Number" value={formData.phoneNumber} onChange={handleChange} />
              <FormField name="password" label="New Password (optional)" value={formData.password} onChange={handleChange} type="password" />

              {/* Password strength meter */}
              {formData.password && (
                <p className="text-sm font-semibold" style={{ color: passwordStrength.color }}>
                  Strength: {passwordStrength.label}
                </p>
              )}

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={updating}
                  className="w-full mt-6 px-4 py-2 bg-gradient-to-r from-[#c9a66b] to-[#8b5e2a] hover:from-[#b39151] hover:to-[#7a4f20] text-white rounded-lg text-sm font-medium transition"
                >
                  {updating ? "Updating..." : "Save"}
                </button>
                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                  className="w-full mt-6 px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-lg text-sm font-medium transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// Reusable components
function ProfileField({ label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-600 font-medium mb-1">{label}</p>
      <input type="text" value={value} readOnly className="w-full p-2 bg-gray-100 border rounded" />
    </div>
  );
}

function FormField({ name, label, value, onChange, disabled = false, type = "text" }) {
  return (
    <div>
      <p className="text-sm text-gray-600 font-medium mb-1">{label}</p>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full p-2 border rounded ${disabled ? "bg-gray-100" : ""}`}
        placeholder={label}
      />
    </div>
  );
}
