import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../firebase/firebaseConfig";

function ProductTable() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null); // this stores Firestore docId (string)
  const [editData, setEditData] = useState({});

  // Fetch all products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsArray = [];
      querySnapshot.forEach((doc) => {
        // Normalize: ensure every product has an 'image' field
        const data = doc.data();
        productsArray.push({
          docId: doc.id,
          ...data,
          image: data.image || "", // fallback empty string if missing
        });
      });
      setProducts(productsArray);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  // Handle delete product
  const handleDelete = async (docId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteDoc(doc(db, "products", docId));
      setProducts(products.filter((p) => p.docId !== docId));
    }
  };

  // Handle start editing
  const handleEdit = (product) => {
    setEditingId(product.docId);
    setEditData({
      name: product.name,
      price: product.price,
      category: product.category,
      image: product.image || "",
    });
  };

  // Handle edit input change
  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  // Handle save edited product
  const handleSave = async (docId) => {
    try {
      // Basic validation without changing flow
      if (!editData.name.trim()) {
        alert("Name cannot be empty.");
        return;
      }
      const priceNum = parseFloat(editData.price);
      if (isNaN(priceNum) || priceNum < 0) {
        alert("Price must be a valid non-negative number.");
        return;
      }
      if (!editData.category.trim()) {
        alert("Category cannot be empty.");
        return;
      }

      const productRef = doc(db, "products", docId);
      await updateDoc(productRef, {
        ...editData,
        price: priceNum,
      });

      setProducts(
        products.map((p) =>
          p.docId === docId
            ? { ...p, ...editData, price: priceNum }
            : p
        )
      );
      setEditingId(null);
    } catch (error) {
      console.error("Error updating product:", error);
      alert(`Failed to update product: ${error.message}`);
    }
  };

  // Handle cancel editing
  const handleCancel = () => {
    setEditingId(null);
    setEditData({});
  };

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="max-w-5xl mx-auto my-10 p-6 bg-white rounded-lg shadow-lg border border-rose-300">
      <h2 className="text-3xl font-extrabold text-rose-700 mb-6 text-center tracking-wide">
        Manage Products
      </h2>

      <table className="w-full table-auto border-collapse border border-rose-300">
        <thead>
          <tr className="bg-rose-100 text-rose-800">
            <th className="border border-rose-300 px-4 py-2">Name</th>
            <th className="border border-rose-300 px-4 py-2">Price</th>
            <th className="border border-rose-300 px-4 py-2">Category</th>
            <th className="border border-rose-300 px-4 py-2">Image</th>
            <th className="border border-rose-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center p-4 text-rose-600">
                No products found.
              </td>
            </tr>
          )}
          {products.map((product) => (
            <tr key={product.docId} className="hover:bg-rose-50">
              <td className="border border-rose-300 px-4 py-2">
                {editingId === product.docId ? (
                  <input
                    type="text"
                    name="name"
                    value={editData.name}
                    onChange={handleChange}
                    className="p-1 border border-rose-300 rounded"
                  />
                ) : (
                  product.name
                )}
              </td>
              <td className="border border-rose-300 px-4 py-2 text-right">
                {editingId === product.docId ? (
                  <input
                    type="number"
                    name="price"
                    value={editData.price}
                    onChange={handleChange}
                    className="p-1 border border-rose-300 rounded w-24"
                  />
                ) : (
                  `PKR ${product.price.toFixed(2)}`
                )}
              </td>
              <td className="border border-rose-300 px-4 py-2">
                {editingId === product.docId ? (
                  <input
                    type="text"
                    name="category"
                    value={editData.category}
                    onChange={handleChange}
                    className="p-1 border border-rose-300 rounded"
                  />
                ) : (
                  product.category
                )}
              </td>
              <td className="border border-rose-300 px-4 py-2 text-center">
                {editingId === product.docId ? (
                  <input
                    type="text"
                    name="image"
                    value={editData.image}
                    onChange={handleChange}
                    className="p-1 border border-rose-300 rounded"
                  />
                ) : (
                  <img
                    src={product.image || ""}
                    alt={product.name}
                    className="w-12 h-12 object-cover inline-block rounded"
                  />
                )}
              </td>
              <td className="border border-rose-300 px-4 py-2 space-x-2 text-center">
                {editingId === product.docId ? (
                  <>
                    <button
                      onClick={() => handleSave(product.docId)}
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
                      onClick={() => handleEdit(product)}
                      className="bg-rose-500 text-white px-3 py-1 rounded hover:bg-rose-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.docId)}
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
  );
}

export default ProductTable;
