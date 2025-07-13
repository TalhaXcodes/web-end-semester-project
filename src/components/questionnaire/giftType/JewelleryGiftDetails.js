import React, { useEffect, useState } from "react";

const JewelleryGiftDetails = ({
  gift,
  recipientId,
  index,
  handleGiftSelection,
  gender,
  ageType,
}) => {
  const handleChange = (field, value) => {
    handleGiftSelection(recipientId, index, field, value);
  };

  const handleCheckboxChange = (field, option) => {
    const selected = gift[field] || [];
    const maxSelections = gift.quantity || 1;

    if (selected.includes(option)) {
      const updated = selected.filter((i) => i !== option);
      handleChange(field, updated);
    } else if (selected.length < maxSelections) {
      const updated = [...selected, option];
      handleChange(field, updated);
    }
  };

  const isKid = ageType === "Kid";
  const isFemaleAdult = gender === "Female" && ageType === "Adult";
  const isMaleAdult = gender === "Male" && ageType === "Adult";

  const priceOptions = [
    "1000–2000 PKR",
    "2000–3000 PKR",
    "3000–4000 PKR",
    "4000–5000 PKR",
    "More than 5000 PKR",
  ];

  const getQuantityOptions = (price) => {
    switch (price) {
      case "1000–2000 PKR":
        return [1, 2];
      case "2000–3000 PKR":
        return [1, 2, 3];
      case "3000–4000 PKR":
        return [1, 2, 3, 4];
      case "4000–5000 PKR":
        return [1, 2, 3, 4, 5, 6];
      case "More than 5000 PKR":
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      default:
        return [];
    }
  };

  const [isPriceSelected, setIsPriceSelected] = useState(!!gift.jewelryPrice);

  useEffect(() => {
    setIsPriceSelected(!!gift.jewelryPrice);
    if (gift.jewelryPrice && (!gift.quantity || !getQuantityOptions(gift.jewelryPrice).includes(gift.quantity))) {
      handleChange("quantity", getQuantityOptions(gift.jewelryPrice)[0] || 1);
    }
  }, [gift.jewelryPrice, gift.quantity, handleChange]);

  // Effect to unmark excess checkboxes when quantity changes
  useEffect(() => {
    const maxSelections = gift.quantity || 1;

    // Trim jewelryStyle if it exceeds quantity
    if (gift.jewelryStyle && gift.jewelryStyle.length > maxSelections) {
      const trimmedStyles = gift.jewelryStyle.slice(0, maxSelections);
      handleChange("jewelryStyle", trimmedStyles);
    }

    // Trim jewelryColors or jewelryColor if it exceeds quantity
    const colorField = isKid ? "jewelryColors" : "jewelryColor";
    if (gift[colorField] && gift[colorField].length > maxSelections) {
      const trimmedColors = gift[colorField].slice(0, maxSelections);
      handleChange(colorField, trimmedColors);
    }
  }, [gift.quantity, gift.jewelryStyle, gift.jewelryColors, gift.jewelryColor, isKid, handleChange]);

  return (
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
      {isKid && (
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
      )}

      {/* 👨 Adult Male Options */}
      {isMaleAdult && (
        <>
          {/* Color */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Color</label>
            <div className="flex flex-col space-y-2">
              {["Silver", "Gold"].map((color) => (
                <label key={color} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={gift.jewelryColor?.includes(color) || false}
                    onChange={() => handleCheckboxChange("jewelryColor", color)}
                    disabled={!isPriceSelected}
                  />
                  <span className="text-gray-700">{color}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Style */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Style</label>
            <div className="flex flex-col space-y-2">
              {["Bracelet", "Chain", "Rings", "Wrist bands"].map((style) => (
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
        </>
      )}

      {/* 👩 Adult Female Options */}
      {isFemaleAdult && (
        <>
          {/* Color */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Color</label>
            <div className="flex flex-col space-y-2">
              {["Silver", "Gold"].map((color) => (
                <label key={color} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={gift.jewelryColor?.includes(color) || false}
                    onChange={() => handleCheckboxChange("jewelryColor", color)}
                    disabled={!isPriceSelected}
                  />
                  <span className="text-gray-700">{color}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Style */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Style</label>
            <div className="flex flex-col space-y-2">
              {[
                "Necklace",
                "Earrings",
                "Rings",
                "Chokr",
                "Jhumkis",
                "Bracelet",
                "Pendant",
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
        </>
      )}
    </div>
  );
};

export default JewelleryGiftDetails;