// ... rest of your imports and code unchanged
import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    updateDoc
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../firebase/firebaseConfig";

function CategoryTable() {
    // ... all your state and functions unchanged

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({ name: "", image: "" });

    // Fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            const querySnapshot = await getDocs(collection(db, "Categories"));
            const categoriesArray = [];
            querySnapshot.forEach((doc) => {
                categoriesArray.push({ docId: doc.id, ...doc.data() });
            });
            setCategories(categoriesArray);
            setLoading(false);
        };

        fetchCategories();
    }, []);

    // Delete category
    const handleDelete = async (docId) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            await deleteDoc(doc(db, "Categories", docId));
            setCategories(categories.filter((c) => c.docId !== docId));
        }
    };

    // Start editing
    const handleEdit = (category) => {
        setEditingId(category.docId);
        setEditData({ name: category.name, image: category.image || "" });
    };

    // Handle input change
    const handleChange = (e) => {
        setEditData({ ...editData, [e.target.name]: e.target.value });
    };

    // Save edits
    const handleSave = async (docId) => {
        try {
            const categoryRef = doc(db, "Categories", docId);
            await updateDoc(categoryRef, {
                name: editData.name,
                image: editData.image,
            });

            setCategories(
                categories.map((c) =>
                    c.docId === docId ? { ...c, ...editData } : c
                )
            );
            setEditingId(null);
        } catch (error) {
            console.error("Error updating category:", error);
            alert(`Failed to update category: ${error.message}`);
        }
    };

    // Cancel editing
    const handleCancel = () => {
        setEditingId(null);
        setEditData({ name: "", image: "" });
    };
    if (loading) return <p>Loading categories...</p>;

    return (
        <div className="max-w-4xl mx-auto my-10 p-6 bg-white rounded-lg shadow-lg border border-rose-300">
            <h2 className="text-3xl font-extrabold text-rose-700 mb-6 text-center tracking-wide">
                Manage Categories
            </h2>
            <div className="overflow-x-auto">
                <table className="w-full table-auto border-collapse border border-rose-300">
                    <thead>
                        <tr className="bg-rose-100 text-rose-800">
                            <th className="border border-rose-300 px-4 py-2">Name</th>
                            <th className="border border-rose-300 px-4 py-2">Image URL</th>
                            <th className="border border-rose-300 px-4 py-2">Preview</th>
                            <th className="border border-rose-300 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.length === 0 && (
                            <tr>
                                <td colSpan="4" className="text-center p-4 text-rose-600">
                                    No categories found.
                                </td>
                            </tr>
                        )}
                        {categories.map((category) => (
                            <tr key={category.docId} className="hover:bg-rose-50">
                                <td className="border border-rose-300 px-4 py-2">
                                    {editingId === category.docId ? (
                                        <input
                                            type="text"
                                            name="name"
                                            value={editData.name}
                                            onChange={handleChange}
                                            className="p-1 border border-rose-300 rounded"
                                        />
                                    ) : (
                                        category.name
                                    )}
                                </td>
                                <td className="border border-rose-300 px-4 py-2">
                                    {editingId === category.docId ? (
                                        <input
                                            type="text"
                                            name="image"
                                            value={editData.image}
                                            onChange={handleChange}
                                            className="p-1 border border-rose-300 rounded"
                                        />
                                    ) : (
                                        category.image
                                    )}
                                </td>
                                <td className="border border-rose-300 px-4 py-2 text-center">
                                    <img
                                        src={
                                            category.image ||
                                            "https://via.placeholder.com/60x60?text=No+Image"
                                        }
                                        alt={category.name}
                                        className="w-12 h-12 object-cover rounded inline-block"
                                    />
                                </td>
                                <td className="border border-rose-300 px-4 py-2 text-center flex justify-center gap-2">
                                    {editingId === category.docId ? (
                                        <>
                                            <button
                                                onClick={() => handleSave(category.docId)}
                                                className="bg-rose-600 text-white px-3 py-1 rounded hover:bg-rose-700"
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={handleCancel}
                                                className="bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400"
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                onClick={() => handleEdit(category)}
                                                className="bg-rose-500 text-white px-3 py-1 rounded hover:bg-rose-600"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(category.docId)}
                                                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                                            >
                                                Delete
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CategoryTable;
