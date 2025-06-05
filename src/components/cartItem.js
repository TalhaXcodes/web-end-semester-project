import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { changeQuantity } from '../stores/cart';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";



const CartItem = ({ data }) => {
  const { productId, quantity } = data;
  const [detail, setDetail] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
        console.log("Fetching product with ID:", productId);
      try {
        const docRef = doc(db, "products", productId.toString());
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setDetail({
            id: docSnap.id,
            category: data.category || '',
            image: data.image || '',
            name: data.name || '',
            price: data.price || 0,
          });
        } else {
          setDetail({ notFound: true });
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setDetail({ notFound: true });
      }
    };

    fetchProduct();
  }, [productId]);

  const handleMinusQuantity = () => {
    dispatch(changeQuantity({ productId, quantity: quantity - 1 }));
  };

  const handlePlusQuantity = () => {
    dispatch(changeQuantity({ productId, quantity: quantity + 1 }));
  };

  if (!detail) return <p>Loading...</p>;
  if (detail.notFound) {
    return (
      <div className="text-red-500 bg-white p-3 rounded shadow">Product not found.</div>
    );
  }

  return (
    <div className="flex justify-between items-center bg-white text-black p-3 border rounded shadow-sm gap-3">
      <img src={detail.image} alt={detail.name} className="w-16 h-16 object-cover rounded" />
      <div className="flex-1">
        <h3 className="font-semibold">{detail.name}</h3>
        <p className="text-sm text-gray-500">PKR {detail.price * quantity}</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={handleMinusQuantity}
          className="w-6 h-6 bg-rose-400 text-white rounded-full text-center font-bold"
        >
          -
        </button>
        <span>{quantity}</span>
        <button
          onClick={handlePlusQuantity}
          className="w-6 h-6 bg-rose-400 text-white rounded-full text-center font-bold"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CartItem;
