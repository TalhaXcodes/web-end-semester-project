import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig"; // ✅ make sure the path is correct
import { addToCart } from "../stores/cart";

const CategoryPage = () => {
  const { category } = useParams();
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // optional loading state

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const fetchedProducts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("❌ Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      product.category &&
      product.category.toLowerCase() === category.toLowerCase()
  );

  if (loading) {
    return <p className="text-center text-gray-500">Loading products...</p>;
  }

  return (
    <div className="p-5 max-w-7xl mx-auto">
      <h1 className="text-3xl font-semibold mb-5 capitalize text-center">
        {category} Collection
      </h1>

      {filteredProducts.length === 0 ? (
        <p className="text-gray-500 text-center">No products found in this category.</p>
      ) : (
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6 justify-center">
          {filteredProducts.map((product) => (
            <div
              key={product.id}  // <-- use id instead of index here
              className="flex flex-col bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden"
              style={{ maxWidth: "280px", height: "420px" }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="flex flex-col flex-grow p-4">
                <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
                <div className="mt-auto">
                  <p className="text-rose-700 font-bold mb-3">
                    PKR{Number(product.price).toFixed(2)}
                  </p>
                  <button
                    className="w-full bg-rose-600 hover:bg-rose-700 text-white py-2 rounded transition"
                    onClick={() =>
                      dispatch(addToCart({ productId: product.id, quantity: 1 }))
                    }
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
