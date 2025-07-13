import React, { useEffect, useState } from "react";

const EdibleGiftDetails = ({
  gift,
  recipientId,
  index,
  handleGiftSelection,
}) => {
  const handleChange = (field, value) => {
    handleGiftSelection(recipientId, index, field, value);
  };

  const handleCheckboxChange = (item) => {
    const selected = gift.foodItems || [];
    const maxSelections = gift.edibleQuantity || 1;

    if (selected.includes(item)) {
      const updated = selected.filter((i) => i !== item);
      handleChange("foodItems", updated);
    } else if (selected.length < maxSelections) {
      const updated = [...selected, item];
      handleChange("foodItems", updated);
    }
  };

  const foodOptions = [
    "Chocolates",
    "Brownie",
    "Cake",
    "Cupcakes",
    "Snacks",
    "Jellies",
    "Popcorns",
    "Marshmellows",
    "Cola cans",
  ];

  const priceOptions = [
    "1000 PKR",
    "1000–2000 PKR",
    "3000–4000 PKR",
    "4000–5000 PKR",
    "5000–6000 PKR",
    "6000–7000 PKR",
  ];

  const getQuantityOptions = (price) => {
    switch (price) {
      case "1000 PKR":
        return [1, 2];
      case "1000–2000 PKR":
        return [1, 2];
      case "3000–4000 PKR":
        return [1, 2, 3, 4];
      case "4000–5000 PKR":
        return [1, 2, 3, 4, 5];
      case "5000–6000 PKR":
        return [1, 2, 3, 4, 5, 6];
      case "6000–7000 PKR":
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      default:
        return [];
    }
  };

  const [isPriceSelected, setIsPriceSelected] = useState(!!gift.ediblePrice);

  useEffect(() => {
    setIsPriceSelected(!!gift.ediblePrice);
    if (gift.ediblePrice && (!gift.edibleQuantity || !getQuantityOptions(gift.ediblePrice).includes(gift.edibleQuantity))) {
      handleChange("edibleQuantity", getQuantityOptions(gift.ediblePrice)[0] || 1);
    }
  }, [gift.ediblePrice, gift.edibleQuantity, handleChange]);

  // Effect to unmark excess checkboxes when quantity changes
  useEffect(() => {
    const maxSelections = gift.edibleQuantity || 1;
    if (gift.foodItems && gift.foodItems.length > maxSelections) {
      const trimmedItems = gift.foodItems.slice(0, maxSelections);
      handleChange("foodItems", trimmedItems);
    }
  }, [gift.edibleQuantity, gift.foodItems, handleChange]);

  return (
    <div className="mb-4">
      <h4 className="text-lg font-semibold text-rose-600 mb-4">
        Edible Preferences
      </h4>

      {/* 💰 Price */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Price</label>
        <div className="flex flex-col space-y-2">
          {priceOptions.map((price) => (
            <label key={price} className="flex items-center space-x-2">
              <input
                type="radio"
                name={`ediblePrice-${recipientId}-${index}`}
                checked={gift.ediblePrice === price}
                onChange={() => handleChange("ediblePrice", price)}
              />
              <span className="text-gray-700">{price}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 🔢 Quantity */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Quantity</label>
        <select
          value={gift.edibleQuantity || ""}
          onChange={(e) => handleChange("edibleQuantity", parseInt(e.target.value))}
          className="w-full border border-rose-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400"
          disabled={!isPriceSelected}
        >
          {!isPriceSelected && <option value="">Select a price first</option>}
          {isPriceSelected &&
            getQuantityOptions(gift.ediblePrice).map((qty) => (
              <option key={qty} value={qty}>
                {qty}
              </option>
            ))}
        </select>
      </div>

      {/* 🍱 Food Type */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Food</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {foodOptions.map((item) => (
            <label key={item} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={gift.foodItems?.includes(item) || false}
                onChange={() => handleCheckboxChange(item)}
                disabled={!isPriceSelected}
              />
              <span className="text-gray-700">{item}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 🍫 Preferred Flavour */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Preferred Flavour</label>
        <select
          value={gift.preferredFlavour || ""}
          onChange={(e) => handleChange("preferredFlavour", e.target.value)}
          className="w-full border border-rose-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400"
          disabled={!isPriceSelected}
        >
          {!isPriceSelected && <option value="">Select a price first</option>}
          {isPriceSelected && [
            "Chocolate",
            "Belgian Chocolate",
            "Red Velvet",
            "Caramel",
            "Vanilla",
          ].map((flavour) => (
            <option key={flavour} value={flavour}>
              {flavour}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default EdibleGiftDetails;