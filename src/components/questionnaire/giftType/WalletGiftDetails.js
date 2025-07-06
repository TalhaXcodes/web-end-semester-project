import React from "react";

const WalletGiftDetails = ({
  gift,
  recipientId,
  index,
  handleGiftSelection,
  gender,
}) => {
  const handleChange = (field, value) => {
    handleGiftSelection(recipientId, index, field, value);
  };

  // 🎨 Female-specific options
  const femaleColors = ["Red", "Blue", "Black", "Green"];
  const femaleStyles = ["Mini wallets", "Tote bags", "Clutch", "Handbags"];
  const femalePrices = [
    "3000–5000 PKR",
    "5000–10,000 PKR",
    "10,000–15,000 PKR",
    "15,000–20,000 PKR",
    "20,000–25,000 PKR",
  ];

  // 👔 Male-specific options
  const maleColors = ["Black", "Camel brown", "Brown"];
  const maleStyles = [
    "Bifold wallets",
    "Trifold wallets",
    "Card wallets",
    "Front-pocket wallets",
    "Travelling wallets",
    "Formal bag",
  ];
  const malePrices = [
    "3000–5000 PKR",
    "5000–6000 PKR",
    "6000–8000 PKR",
    "8000–10,000 PKR",
  ];

  const isFemale = gender === "Female";

  return (
    <div className="mb-4">
      <h4 className="text-lg font-semibold text-rose-600 mb-4">
        {isFemale ? "Bag & Wallet Preferences" : "Wallet Preferences"}
      </h4>

      {/* 🎨 Color */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Color</label>
        <div className="flex flex-col space-y-2">
          {(isFemale ? femaleColors : maleColors).map((color) => (
            <label key={color} className="flex items-center space-x-2">
              <input
                type="radio"
                name={`walletColor-${recipientId}-${index}`}
                checked={gift.walletColor === color}
                onChange={() => handleChange("walletColor", color)}
              />
              <span className="text-gray-700">{color}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 💼 Style */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Style</label>
        <div className="flex flex-col space-y-2">
          {(isFemale ? femaleStyles : maleStyles).map((style) => (
            <label key={style} className="flex items-center space-x-2">
              <input
                type="radio"
                name={`walletStyle-${recipientId}-${index}`}
                checked={gift.walletStyle === style}
                onChange={() => handleChange("walletStyle", style)}
              />
              <span className="text-gray-700">{style}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 💰 Price */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Price</label>
        <div className="flex flex-col space-y-2">
          {(isFemale ? femalePrices : malePrices).map((price) => (
            <label key={price} className="flex items-center space-x-2">
              <input
                type="radio"
                name={`walletPrice-${recipientId}-${index}`}
                checked={gift.walletPrice === price}
                onChange={() => handleChange("walletPrice", price)}
              />
              <span className="text-gray-700">{price}</span>
            </label>
          ))}
        </div>
      </div>

      {/* ✒️ Engraving */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">
          Text engraved (optional)
        </label>
        <input
          type="text"
          value={gift.walletEngraving || ""}
          onChange={(e) => handleChange("walletEngraving", e.target.value)}
          placeholder="e.g., Name or initials"
          className="w-full border border-rose-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400"
        />
      </div>
    </div>
  );
};

export default WalletGiftDetails;
