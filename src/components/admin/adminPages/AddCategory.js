import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../../firebase/firebaseConfig";

function AddCategoryForm() {
  const [formData, setFormData] = useState({ name: "", image: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.image.trim()) {
      alert("Please fill in both fields.");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "Categories"), {
        name: formData.name,
        image: formData.image,
      });
      setFormData({ name: "", image: "" });
      alert("Category added successfully!");
    } catch (error) {
      console.error("Error adding category:", error);
      alert("Failed to add category.");
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto my-6 p-4 bg-white rounded shadow border border-rose-300"
    >
      <h2 className="text-2xl font-semibold text-rose-700 mb-4 text-center">
        Add New Category
      </h2>

      <input
        type="text"
        name="name"
        placeholder="Category Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full p-2 mb-4 border border-rose-300 rounded"
      />
      <input
        type="text"
        name="image"
        placeholder="Image URL"
        value={formData.image}
        onChange={handleChange}
        className="w-full p-2 mb-4 border border-rose-300 rounded"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-rose-600 text-white w-full py-2 rounded hover:bg-rose-700 disabled:opacity-50"
      >
        {loading ? "Adding..." : "Add Category"}
      </button>
    </form>
  );
}

export default AddCategoryForm;
