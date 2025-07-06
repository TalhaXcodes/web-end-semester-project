import React from "react";
import JewelleryGiftDetails from "./JewelleryGiftDetails";

const KidGiftDetails = ({
  gift,
  recipientId,
  index,
  handleGiftSelection,
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

  const budgetOptions = [
    "3500 PKR",
    "3500 – 5500 PKR",
    "5500 – 7500 PKR",
    "More than 7500 PKR",
  ];

  const toyOptions = [
    "Building Toys (e.g. LEGO)",
    "Dolls",
    "Arts & Crafts",
    "Outdoor/ Sports",
    "Tech/ Games",
    "Other",
  ];

  const dislikeOptions = [
    "Noisy Toys",
    "Messy Crafts",
    "Animated Characters",
    "Other",
  ];

  const wantsAccessories = gift.kidWantsAccessories === "Yes";

  return (
    <div className="mb-4">
      <h4 className="text-lg font-semibold text-rose-600 mb-4">
        Gift Preferences (Kid)
      </h4>

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

      {/* 🧸 Toy or Activity */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">
          Does the child have a favorite type of toy or activity?
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {toyOptions.map((option) => (
            <label key={option} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={gift.kidToyTypes?.includes(option) || false}
                onChange={() => handleCheckboxChange("kidToyTypes", option)}
              />
              <span className="text-gray-700">{option}</span>
            </label>
          ))}
        </div>

        {/* 📩 If 'Other' selected → input field */}
        {gift.kidToyTypes?.includes("Other") && (
          <input
            type="text"
            value={gift.kidToyOther || ""}
            onChange={(e) => handleChange("kidToyOther", e.target.value)}
            placeholder="Please specify"
            className="mt-3 w-full border border-rose-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400"
          />
        )}
      </div>

      {/* 😒 Dislikes */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">
          Does the child have any strong dislikes?
        </label>
        <div className="flex flex-col space-y-2">
          {dislikeOptions.map((option) => (
            <label key={option} className="flex items-center space-x-2">
              <input
                type="radio"
                name={`kidDislikes-${recipientId}-${index}`}
                checked={gift.kidDislike === option}
                onChange={() => handleChange("kidDislike", option)}
              />
              <span className="text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 🎀 Accessories */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">
          Would you like to add accessories?
        </label>
        <div className="flex flex-col space-y-2">
          {["Yes", "No"].map((opt) => (
            <label key={opt} className="flex items-center space-x-2">
              <input
                type="radio"
                name={`kidWantsAccessories-${recipientId}-${index}`}
                checked={gift.kidWantsAccessories === opt}
                onChange={() => handleChange("kidWantsAccessories", opt)}
              />
              <span className="text-gray-700">{opt}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 💍 If yes → Show Jewellery section */}
      {wantsAccessories && (
        <div className="mt-6">
          <JewelleryGiftDetails
            gift={gift}
            recipientId={recipientId}
            index={index}
            handleGiftSelection={handleGiftSelection}
            gender="Kid"
            ageType="Kid"
          />
        </div>
      )}
    </div>
  );
};

export default KidGiftDetails;
