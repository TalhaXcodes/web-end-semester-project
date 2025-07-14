import { useCallback, useEffect, useState } from "react";

const KidGiftDetails = ({
  gift,
  recipientId,
  index,
  handleGiftSelection,
}) => {
  const handleChange = useCallback((field, value) => {
    handleGiftSelection(recipientId, index, field, value);
  }, [handleGiftSelection, recipientId, index]);


  const handleCheckboxChange = (field, option) => {
    const selected = gift[field] || [];
    let updated;
    if (field === "foodItems") {
      const maxSelections = gift.edibleQuantity || 1;
      if (selected.includes(option)) {
        updated = selected.filter((i) => i !== option);
      } else if (selected.length < maxSelections) {
        updated = [...selected, option];
      } else {
        return; // Prevent adding more items if max is reached
      }
    } else {
      updated = selected.includes(option)
        ? selected.filter((i) => i !== option)
        : [...selected, option];
    }
    handleChange(field, updated);
  };

  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    if (gift.category) {
      setSelectedCategory(gift.category);
    }
  }, [gift.category]);

  const budgetOptions = [
    "3500 PKR",
    "3500 – 5500 PKR",
    "5500 – 7500 PKR",
    "More than 7500 PKR",
  ];

  const priceOptions = [
    "1000–2000 PKR",
    "2000–3000 PKR",
    "3000–4000 PKR",
    "4000–5000 PKR",
    "More than 5000 PKR",
  ];

  const ediblePriceOptions = [
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
      case "1000–2000 PKR":
        return [1, 2];

      case "2000–3000 PKR":
        return [1, 2, 3];

      case "3000–4000 PKR":
        return [1, 2, 3, 4];

      case "4000–5000 PKR":
        return [1, 2, 3, 4, 5]; // picked the shorter one

      case "5000–6000 PKR":
        return [1, 2, 3, 4, 5, 6];

      case "6000–7000 PKR":
      case "More than 5000 PKR":
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

      default:
        return [];
    }
  };


  const [isPriceSelected, setIsPriceSelected] = useState(!!gift.jewelryPrice || !!gift.ediblePrice);

  useEffect(() => {
    setIsPriceSelected(!!gift.jewelryPrice || !!gift.ediblePrice);
    if (gift.jewelryPrice && (!gift.quantity || !getQuantityOptions(gift.jewelryPrice).includes(gift.quantity))) {
      handleChange("quantity", getQuantityOptions(gift.jewelryPrice)[0] || 1);
    }
    if (gift.ediblePrice && (!gift.edibleQuantity || !getQuantityOptions(gift.ediblePrice).includes(gift.edibleQuantity))) {
      handleChange("edibleQuantity", getQuantityOptions(gift.ediblePrice)[0] || 1);
    }
  }, [gift.jewelryPrice, gift.quantity, gift.ediblePrice, gift.edibleQuantity, handleChange]);

  useEffect(() => {
    const maxSelections = gift.quantity || 1;

    if (gift.jewelryStyle && gift.jewelryStyle.length > maxSelections) {
      const trimmedStyles = gift.jewelryStyle.slice(0, maxSelections);
      handleChange("jewelryStyle", trimmedStyles);
    }

    if (gift.jewelryColors && gift.jewelryColors.length > maxSelections) {
      const trimmedColors = gift.jewelryColors.slice(0, maxSelections);
      handleChange("jewelryColors", trimmedColors);
    }

    const edibleMaxSelections = gift.edibleQuantity || 1;
    if (gift.foodItems && gift.foodItems.length > edibleMaxSelections) {
      const trimmedItems = gift.foodItems.slice(0, edibleMaxSelections);
      handleChange("foodItems", trimmedItems);
    }
  }, [gift.quantity, gift.jewelryStyle, gift.jewelryColors, gift.edibleQuantity, gift.foodItems, handleChange]);

  return (
    <div className="mb-4">
      {/* 🎯 Category Selection */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-rose-600 mb-4">
          Gift {index + 1}
        </h3>
        <label className="block text-gray-700 font-medium mb-1">
          Gift Type
        </label>
        <select
          value={selectedCategory || ""}
          onChange={(e) => handleChange("category", e.target.value)}
          className="w-full border border-rose-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400"
        >
          <option value="" disabled hidden>
            Select Gift Type
          </option>
          <option value="Toys">Toys</option>
          <option value="Accessories">Accessories</option>
          <option value="Perfume">Perfume</option>
          <option value="Edible Stuff">Edible Stuff</option>
        </select>
      </div>


      {/* 🧸 Toys Category */}
      {selectedCategory === "Toys" && (
        <>
          {/* 🎯 Budget */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              What is your budget for the gift?
            </label>
            <div className="flex flex-col space-y-2">
              {budgetOptions.map((price) => (
                <label key={price} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={`kidBudget-${recipientId}-${index}`}
                    checked={gift.kidBudget === price}
                    onChange={() => handleChange("kidBudget", price)}
                  />
                  <span className="text-gray-700">{price}</span>
                </label>
              ))}
            </div>
          </div>
        </>
      )}

      {/* 💍 Accessories Category */}
      {selectedCategory === "Accessories" && (
        <div className="mb-4">
          <h4 className="text-lg font-semibold text-rose-600 mb-4">
            Accessory Preferences
          </h4>

          {/* 💰 Price (shared) */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Price</label>
            <div className="flex flex-col space-y-2">
              {priceOptions.map((price) => (
                <label key={price} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={`jewelryPrice-${recipientId}-${index}`}
                    checked={gift.jewelryPrice === price}
                    onChange={() => handleChange("jewelryPrice", price)}
                  />
                  <span className="text-gray-700">{price}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 📦 Quantity */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Quantity</label>
            <select
              value={gift.quantity || ""}
              onChange={(e) => handleChange("quantity", parseInt(e.target.value))}
              className="w-full border border-rose-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400"
              disabled={!isPriceSelected}
            >
              {!isPriceSelected && <option value="">Select a price first</option>}
              {isPriceSelected &&
                getQuantityOptions(gift.jewelryPrice).map((qty) => (
                  <option key={qty} value={qty}>
                    {qty}
                  </option>
                ))}
            </select>
          </div>

          {/* 🧒 Kid Options */}
          <>
            {/* Style */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">Style</label>
              <div className="flex flex-col space-y-2">
                {[
                  "Chain",
                  "Rings",
                  "Bracelets",
                  "Bangles",
                  "Scrunchies",
                  "Wrist bands",
                  "Bow style hairband",
                ].map((style) => (
                  <label key={style} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={gift.jewelryStyle?.includes(style) || false}
                      onChange={() => handleCheckboxChange("jewelryStyle", style)}
                      disabled={!isPriceSelected}
                    />
                    <span className="text-gray-700">{style}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Color combinations */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                Color Combinations
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  "Red",
                  "Blue",
                  "Green",
                  "Yellow",
                  "White",
                  "Black",
                  "Purple",
                ].map((color) => (
                  <label key={color} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={gift.jewelryColors?.includes(color) || false}
                      onChange={() => handleCheckboxChange("jewelryColors", color)}
                      disabled={!isPriceSelected}
                    />
                    <span className="text-gray-700">{color}</span>
                  </label>
                ))}
              </div>
            </div>
          </>
        </div>
      )}

      {/* 💐 Perfume Category */}
      {selectedCategory === "Perfume" && (
        <div className="mb-4">
          <h4 className="text-lg font-semibold text-rose-600 mb-4">
            Perfume Preferences
          </h4>
          {/* 🎯 Budget */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              What is your budget for the perfume?
            </label>
            <div className="flex flex-col space-y-2">
              {budgetOptions.map((price) => (
                <label key={price} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={`perfumeBudget-${recipientId}-${index}`}
                    checked={gift.perfumeBudget === price}
                    onChange={() => handleChange("perfumeBudget", price)}
                  />
                  <span className="text-gray-700">{price}</span>
                </label>
              ))}
            </div>
          </div>
          {/* 🎯 Scent Preference */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Does the child have a preferred scent?
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                "Floral",
                "Fruity",
                "Citrus",
                "Woody",
                "Other",
              ].map((scent) => (
                <label key={scent} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={gift.perfumeScent?.includes(scent) || false}
                    onChange={() => handleCheckboxChange("perfumeScent", scent)}
                  />
                  <span className="text-gray-700">{scent}</span>
                </label>
              ))}
            </div>
            {gift.perfumeScent?.includes("Other") && (
              <input
                type="text"
                value={gift.perfumeScentOther || ""}
                onChange={(e) => handleChange("perfumeScentOther", e.target.value)}
                placeholder="Please specify"
                className="mt-3 w-full border border-rose-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400"
              />
            )}
          </div>
        </div>
      )}

      {/* 🍬 Edible Stuff Category */}
      {selectedCategory === "Edible Stuff" && (
        <div className="mb-4">
          <h4 className="text-lg font-semibold text-rose-600 mb-4">
            Edible Stuff Preferences
          </h4>

          {/* 💰 Price */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Price</label>
            <div className="flex flex-col space-y-2">
              {ediblePriceOptions.map((price) => (
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
              {[
                "Chocolates",
                "Brownie",
                "Cake",
                "Cupcakes",
                "Snacks",
                "Jellies",
                "Popcorns",
                "Marshmellows",
                "Cola cans",
              ].map((item) => (
                <label key={item} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={gift.foodItems?.includes(item) || false}
                    onChange={() => handleCheckboxChange("foodItems", item)}
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
      )}
    </div>
  );
};

export default KidGiftDetails;