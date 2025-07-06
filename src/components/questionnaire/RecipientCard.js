import React from "react";
import RecipientInfoForm from "./RecipientInfoForm";
import GiftList from "./GiftList";

const RecipientCard = ({
    recipient,
    recipients,
    giftOptions,
    handleGiftCountChange,
    handleGiftSelection,
    setGiftData,
    maxTotalItems,
    giftData,
}) => {

    return (
        <div className="bg-white p-6 rounded-xl shadow-md border border-rose-300 mb-6">
            <h2 className="text-2xl font-semibold text-rose-600 mb-4">
                Recipient {recipient.id}
            </h2>

            <RecipientInfoForm recipient={recipient} setGiftData={setGiftData} />

            <GiftList
                recipient={recipient}
                recipients={recipients}
                giftOptions={giftOptions}
                handleGiftCountChange={handleGiftCountChange}
                handleGiftSelection={handleGiftSelection}
                maxTotalItems={maxTotalItems}
                giftData={giftData}
            />

        </div>
    );
};

export default RecipientCard;
