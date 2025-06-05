import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Home = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                navigate("/signup");
            }
        });

        return () => unsubscribe();
    }, [auth, navigate]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "Categories"));
                const fetchedCategories = querySnapshot.docs.map(doc => {
                    const data = doc.data();
                    console.log("Name:", data.name, "| Type:", typeof data.name);
                    console.log("Image:", data.image, "| Type:", typeof data.image, "| Length:", data.image.length);
                    return data;
                });
                setCategories(fetchedCategories);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);



    if (loading) {
        return <p className="text-center text-gray-500">Loading categories...</p>;
    }

    if (!categories.length) {
        return <p className="text-center text-gray-500">No categories found.</p>;
    }
    console.log("Rendering categories:", categories);

    return (
        <div className="p-4 max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-center text-rose-700 mb-8">
                Shop by Category
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
                {categories.map(category => (
                    <Link
                        to={`/category/${category.name.toLowerCase()}`}
                        key={category.id}
                        className="w-full max-w-sm rounded-xl shadow-lg border border-rose-300 hover:shadow-2xl transition cursor-pointer bg-white"
                    >
                        <img
                            src={category.image}
                            alt={category.name}
                            className="rounded-t-xl w-full h-48 object-contain bg-gray-100"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://via.placeholder.com/400x300?text=No+Image";
                            }}
                        />
                        <h2 className="text-xl font-semibold text-center p-4">
                            {category.name}
                        </h2>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Home;
