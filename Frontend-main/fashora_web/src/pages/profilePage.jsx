

import React, { useState, useEffect, useRef } from "react";
import { FiUser } from "react-icons/fi";
import { useGetProfile, useUpdateProfile } from "../hooks/useUserProfile";
import { toast } from "react-hot-toast";

export default function ProfilePage() {
  const { data: profile, isLoading, isError } = useGetProfile();
  const { mutate: updateProfile, isPending: updating } = useUpdateProfile();
  const fileInputRef = useRef(null);

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    password: "",
  });
  const [profileImage, setProfileImage] = useState(null); // file
  const [preview, setPreview] = useState(""); // image URL
  const [passwordStrength, setPasswordStrength] = useState({ label: "", color: "red" });
  const [changesMade, setChangesMade] = useState(false); // disable save until change

  // Load profile data
  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        phoneNumber: profile.phoneNumber || "",
        password: "",
      });
      setPreview(profile.profileImage || "");
    }
  }, [profile]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setChangesMade(true);

    if (name === "password") {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setProfileImage(file);
    setPreview(URL.createObjectURL(file));
    setChangesMade(true);
    e.target.value = null; // allow same file selection again
  };

  // Password strength calculation
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

  // Submit updated profile
  const handleSubmit = (e) => {
    e.preventDefault();
    const updates = new FormData();
    updates.append("name", formData.name);
    updates.append("phoneNumber", formData.phoneNumber);
    if (formData.password) updates.append("password", formData.password);
    if (profileImage) updates.append("profileImage", profileImage);

    updateProfile(updates, {
      onSuccess: (updatedData) => {
        toast.success("Profile updated successfully!");
        setEditMode(false);
        setChangesMade(false);
        setProfileImage(null);
        setPreview(updatedData.profileImage || "");
        setFormData(prev => ({ ...prev, password: "" })); // reset password field
      },
      onError: () => toast.error("Update failed"),
    });
  };

  if (isLoading) return <p className="text-center mt-10">Loading profile...</p>;
  if (isError) return <p className="text-center mt-10 text-red-500">Failed to load profile.</p>;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <div
            onClick={() => editMode && fileInputRef.current.click()}
            className="mx-auto mb-2 flex items-center justify-center bg-[#9b59b6] rounded-full w-20 h-20 cursor-pointer overflow-hidden"
          >
            {preview ? (
              <img src={preview} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <FiUser color="white" size={36} />
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageChange}
          />

          <h2 className="text-xl font-bold mb-2 text-gray-800">My Profile</h2>
          <p className="text-gray-500">Manage your personal information</p>
        </div>

        <div className="p-4 border rounded-lg mb-4 bg-gradient-to-r from-[#c9a66b] to-[#8b5e2a] text-white">
          <h3 className="text-base font-medium">Profile Settings</h3>
        </div>

        <div className="p-4">
          {!editMode ? (
            <div className="space-y-3">
              <ProfileField label="Full Name" value={profile.name} />
              <ProfileField label="Email Address" value={profile.email} />
              <ProfileField label="Phone Number" value={profile.phoneNumber} />

              <button
                onClick={() => setEditMode(true)}
                className="w-full mt-6 px-4 py-2 bg-gradient-to-r from-[#c9a66b] to-[#8b5e2a] text-white rounded-lg"
              >
                Update your details
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <FormField
                name="name"
                label="Full Name"
                value={formData.name}
                onChange={handleChange}
              />
              <FormField
                name="email"
                label="Email Address"
                value={profile.email}
                disabled
              />
              <FormField
                name="phoneNumber"
                label="Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              <FormField
                name="password"
                label="New Password (optional)"
                value={formData.password}
                onChange={handleChange}
                type="password"
              />

              {formData.password && (
                <p className="text-sm font-semibold" style={{ color: passwordStrength.color }}>
                  Strength: {passwordStrength.label}
                </p>
              )}

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={updating || !changesMade}
                  className={`w-full mt-6 px-4 py-2 text-white rounded-lg ${
                    updating || !changesMade
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-[#c9a66b] to-[#8b5e2a]"
                  }`}
                >
                  {updating ? "Updating..." : "Save"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setEditMode(false);
                    setPreview(profile.profileImage || "");
                    setFormData(prev => ({ ...prev, password: "" }));
                    setProfileImage(null);
                    setChangesMade(false);
                  }}
                  className="w-full mt-6 px-4 py-2 bg-gray-400 text-white rounded-lg"
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

// Display-only field
function ProfileField({ label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-600 font-medium mb-1">{label}</p>
      <input
        type="text"
        value={value}
        readOnly
        className="w-full p-2 bg-gray-100 border rounded"
      />
    </div>
  );
}

// Editable field
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
