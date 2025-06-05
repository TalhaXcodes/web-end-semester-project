import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../../firebase/firebaseConfig";

function AddProductForm() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setIsError(false);

    try {
      await addDoc(collection(db, "products"), {
        ...product,
        price: parseFloat(product.price)
      });
      setMessage("✅ Product added successfully!");
      setProduct({ name: "", price: "", category: "", image: "" });
    } catch (error) {
      setMessage("❌ Error adding product: " + error.message);
      setIsError(true);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto my-10 p-8 bg-white rounded-lg shadow-lg border border-rose-300">
      <h2 className="text-3xl font-extrabold text-rose-700 mb-8 text-center tracking-wide">
        Add New Product
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
          required
          className="w-full p-3 border border-rose-300 rounded-md 
                     focus:outline-none focus:ring-2 focus:ring-rose-500 
                     placeholder:text-rose-400 transition"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          required
          className="w-full p-3 border border-rose-300 rounded-md 
                     focus:outline-none focus:ring-2 focus:ring-rose-500 
                     placeholder:text-rose-400 transition"
        />
        <input
          type="text"
          name="category"
          placeholder="Category (e.g., shoes)"
          value={product.category}
          onChange={handleChange}
          required
          className="w-full p-3 border border-rose-300 rounded-md 
                     focus:outline-none focus:ring-2 focus:ring-rose-500 
                     placeholder:text-rose-400 transition"
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={product.image}
          onChange={handleChange}
          required
          className="w-full p-3 border border-rose-300 rounded-md 
                     focus:outline-none focus:ring-2 focus:ring-rose-500 
                     placeholder:text-rose-400 transition"
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-md font-extrabold text-white transition
            ${loading
              ? "bg-rose-400 cursor-not-allowed"
              : "bg-rose-600 hover:bg-rose-700"
            }`}
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
      {message && (
        <p
          className={`mt-6 text-center text-sm font-semibold ${isError ? "text-red-700" : "text-rose-700"
            }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default AddProductForm;
