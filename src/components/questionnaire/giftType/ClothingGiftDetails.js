import React from "react";

const ClothingGiftDetails = ({
  gift,
  recipientId,
  index,
  handleGiftSelection,
  gender,
  ageType,
}) => {
  if (ageType !== "Adult") return null; // ❌ not for kids

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

  const dressTypeOptions = ["Stitched dress", "Unstitched dress"];
  const colorOptions = [
    "Red", "Green", "Blue", "Black", "Yellow", "White",
    "Pink", "Maroon", "Purple", "Grey",
  ];
  const pieceOptions = ["One-piece", "Two-piece", "Three-piece"];
  const femaleStyleOptions = ["Shirt", "Trouser", "Frock", "Gown", "Shalwar"];
  const maleStyleOptions = ["Waistcoats", "Kurta", "Shalwar kameez"];
  const sizeOptions = ["XS", "S", "M", "L", "XL"];
  const priceOptions = [
    "5000 PKR",
    "5000–8000 PKR",
    "8000–10,000 PKR",
    "10,000–15,000 PKR",
    "15,000–20,000 PKR",
  ];

  const isStitched = gift.dressType === "Stitched dress";
  const isFemale = gender === "Female";
  const isMale = gender === "Male";

  return (
    <div className="mb-4">
      <h4 className="text-lg font-semibold text-rose-600 mb-4">
        Clothing Preferences
      </h4>

      {/* What kind of dress */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">
          What kind of dress would you like to add?
        </label>
        <div className="flex flex-col space-y-2">
          {dressTypeOptions.map((type) => (
            <label key={type} className="flex items-center space-x-2">
              <input
                type="radio"
                name={`dressType-${recipientId}-${index}`}
                checked={gift.dressType === type}
                onChange={() => handleChange("dressType", type)}
              />
              <span className="text-gray-700">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Color (for both) */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">
          What should be the colors of the dress?
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {colorOptions.map((color) => (
            <label key={color} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={gift.dressColors?.includes(color) || false}
                onChange={() => handleCheckboxChange("dressColors", color)}
              />
              <span className="text-gray-700">{color}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 👨 Male-only Style (if stitched) */}
      {isMale && isStitched && (
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Style of dress
          </label>
          <div className="flex flex-col space-y-2">
            {maleStyleOptions.map((style) => (
              <label key={style} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={gift.maleDressStyle?.includes(style) || false}
                  onChange={() => handleCheckboxChange("maleDressStyle", style)}
                />
                <span className="text-gray-700">{style}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* 💸 Price (for both) */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">
          Price range of dress
        </label>
        <div className="flex flex-col space-y-2">
          {priceOptions.map((price) => (
            <label key={price} className="flex items-center space-x-2">
              <input
                type="radio"
                name={`dressPrice-${recipientId}-${index}`}
                checked={gift.dressPrice === price}
                onChange={() => handleChange("dressPrice", price)}
              />
              <span className="text-gray-700">{price}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Number of pieces (for both) */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">
          Please indicate the preferred number of pieces for the dress:
        </label>
        <div className="flex flex-col space-y-2">
          {pieceOptions.map((piece) => (
            <label key={piece} className="flex items-center space-x-2">
              <input
                type="radio"
                name={`dressPieces-${recipientId}-${index}`}
                checked={gift.dressPieces === piece}
                onChange={() => handleChange("dressPieces", piece)}
              />
              <span className="text-gray-700">{piece}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 👩 Female-only Style (if stitched) */}
      {isFemale && isStitched && (
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Style of dress
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {femaleStyleOptions.map((style) => (
              <label key={style} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={gift.femaleDressStyle?.includes(style) || false}
                  onChange={() =>
                    handleCheckboxChange("femaleDressStyle", style)
                  }
                />
                <span className="text-gray-700">{style}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* 📏 Size (if stitched) */}
      {isStitched && (
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Size of dress
          </label>
          <div className="flex flex-col space-y-2">
            {sizeOptions.map((size) => (
              <label key={size} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name={`dressSize-${recipientId}-${index}`}
                  checked={gift.dressSize === size}
                  onChange={() => handleChange("dressSize", size)}
                />
                <span className="text-gray-700">{size}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClothingGiftDetails;
