import React from "react";
import GiftItem from "./GiftItem";

const GiftList = ({
  recipient,
  recipients,
  giftOptions,
  handleGiftCountChange,
  handleGiftSelection,
  maxTotalItems,
  giftData,
}) => {
  const giftsAssignedToOthers = giftData.reduce(
    (sum, r) => (r.id !== recipient.id ? sum + (r.gifts.length || 0) : sum),
    0
  );

  const remainingForThisRecipient = maxTotalItems - giftsAssignedToOthers;

  const maxSelectable = Math.min(
    remainingForThisRecipient,
    maxTotalItems - (recipients - 1)
  );

  const minSelectable = 1;

  return (
    <div className="space-y-6">
      {/* 🎁 Gift count dropdown */}
      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Number of gifts for this recipient (You can add up to {maxSelectable})
        </label>
        <select
          value={recipient.gifts.length}
          onChange={(e) =>
            handleGiftCountChange(recipient.id, e.target.value)
          }
          className="w-full border border-rose-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400"
        >
          {[...Array(maxSelectable).keys()]
            .map((i) => i + minSelectable)
            .map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
        </select>
      </div>

      {/* 🎁 Gift inputs */}
      {recipient.gifts.map((gift, index) => (
        <GiftItem
          key={index}
          gift={gift}
          recipientId={recipient.id}
          index={index}
          handleGiftSelection={handleGiftSelection}
          giftOptions={giftOptions}
          ageType = {recipient.ageType}
          gender = {recipient.gender}
        />
      ))}
    </div>
  );
};

export default GiftList;
