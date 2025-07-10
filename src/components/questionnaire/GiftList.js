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

  return (
    <div className="space-y-6">

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
