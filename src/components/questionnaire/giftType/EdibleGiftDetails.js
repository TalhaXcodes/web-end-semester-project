import React from "react";

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
    const updated = selected.includes(item)
      ? selected.filter((i) => i !== item)
      : [...selected, item];

    handleChange("foodItems", updated);
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

  return (
    <div className="mb-4">
      <h4 className="text-lg font-semibold text-rose-600 mb-4">
        Edible Preferences
      </h4>

      {/* 🍱 Food Type */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">
          Food
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {foodOptions.map((item) => (
            <label key={item} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={gift.foodItems?.includes(item) || false}
                onChange={() => handleCheckboxChange(item)}
              />
              <span className="text-gray-700">{item}</span>
            </label>
          ))}
        </div>
      </div>

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
        <label className="block text-gray-700 font-medium mb-1">
          Quantity
        </label>
        <input
          type="number"
          min="1"
          value={gift.edibleQuantity || ""}
          onChange={(e) => handleChange("edibleQuantity", e.target.value)}
          placeholder="Enter quantity"
          className="w-full border border-rose-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400"
        />
      </div>
    </div>
  );
};

export default EdibleGiftDetails;
