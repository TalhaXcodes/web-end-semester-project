import React from "react";

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
    const updated = selected.includes(option)
      ? selected.filter((i) => i !== option)
      : [...selected, option];

    handleChange(field, updated);
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
                    type="radio"
                    name={`kidJewelryStyle-${recipientId}-${index}`}
                    checked={gift.jewelryStyle === style}
                    onChange={() => handleChange("jewelryStyle", style)}
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
                    type="radio"
                    name={`maleJewelryColor-${recipientId}-${index}`}
                    checked={gift.jewelryColor === color}
                    onChange={() => handleChange("jewelryColor", color)}
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
                    type="radio"
                    name={`maleJewelryStyle-${recipientId}-${index}`}
                    checked={gift.jewelryStyle === style}
                    onChange={() => handleChange("jewelryStyle", style)}
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
                    type="radio"
                    name={`femaleJewelryColor-${recipientId}-${index}`}
                    checked={gift.jewelryColor === color}
                    onChange={() => handleChange("jewelryColor", color)}
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
                    type="radio"
                    name={`femaleJewelryStyle-${recipientId}-${index}`}
                    checked={gift.jewelryStyle === style}
                    onChange={() => handleChange("jewelryStyle", style)}
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
