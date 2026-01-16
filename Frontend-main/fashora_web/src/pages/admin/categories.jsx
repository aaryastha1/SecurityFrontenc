// src/components/Categories.jsx

import React, { useState } from "react";
import { Plus, Trash2, Edit2, Check, X } from "lucide-react";

const Categories = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: "Dresses" },
    { id: 2, name: "Tops" },
    { id: 3, name: "Sweater" },
    { id: 4, name: "Tees" },
  ]);

  const [newCategory, setNewCategory] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");

  const handleAddCategory = () => {
    if (!newCategory.trim()) return;
    if (categories.some((cat) => cat.name.toLowerCase() === newCategory.toLowerCase())) return;
    const newId = Math.max(...categories.map((c) => c.id), 0) + 1;
    setCategories([...categories, { id: newId, name: newCategory.trim() }]);
    setNewCategory("");
  };

  const handleDelete = (id) => {
    setCategories(categories.filter((cat) => cat.id !== id));
  };

  const startEditing = (cat) => {
    setEditingId(cat.id);
    setEditingName(cat.name);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingName("");
  };

  const saveEdit = () => {
    if (!editingName.trim()) return;
    if (categories.some((cat) => cat.id !== editingId && cat.name.toLowerCase() === editingName.toLowerCase())) return;
    setCategories(
      categories.map((cat) => (cat.id === editingId ? { ...cat, name: editingName.trim() } : cat))
    );
    cancelEditing();
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-purple-700">Manage Categories</h2>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="New category name"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddCategory()}
          className="border border-gray-300 px-4 py-2 rounded-lg w-full"
        />
        <button
          onClick={handleAddCategory}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>

      <ul className="space-y-3">
        {categories.map((cat) => (
          <li
            key={cat.id}
            className="flex justify-between items-center border p-3 rounded-lg hover:bg-gray-50"
          >
            {editingId === cat.id ? (
              <div className="flex w-full gap-2 items-center">
                <input
                  type="text"
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") saveEdit();
                    if (e.key === "Escape") cancelEditing();
                  }}
                  className="border border-gray-300 px-3 py-1 rounded-lg flex-1"
                />
                <button
                  onClick={saveEdit}
                  className="bg-green-600 text-white p-2 rounded hover:bg-green-700"
                >
                  <Check className="w-4 h-4" />
                </button>
                <button
                  onClick={cancelEditing}
                  className="border border-gray-300 p-2 rounded hover:bg-gray-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <span>{cat.name}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEditing(cat)}
                    className="border border-gray-300 p-2 rounded hover:bg-gray-100"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;