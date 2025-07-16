import { useCallback } from "react";

const KidGiftDetails = ({
  gift,
  recipientId,
  index,
  handleGiftSelection,
}) => {
  const handleChange = useCallback(
    (field, value) => {
      handleGiftSelection(recipientId, index, field, value);
    },
    [handleGiftSelection, recipientId, index]
  );

  const selectedType = gift.type;


  const budgetOptions = [
    "3500 PKR",
    "3500 – 5500 PKR",
    "5500 – 7500 PKR",
    "More than 7500 PKR",
  ];

  return (
    <div className="mb-4">
      {/* 🧸 Toys Category */}
      {selectedType === "Toys" && (
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
      )}
    </div>
  );
};

export default KidGiftDetails;