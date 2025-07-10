import React from "react";
import MakeupGiftDetails from "./giftType/MakeupGiftDetails";
import WalletGiftDetails from "./giftType/WalletGiftDetails";
import JewelleryGiftDetails from "./giftType/JewelleryGiftDetails";
import PerfumeGiftDetails from "./giftType/PerfumeGiftDetails";
import EdibleGiftDetails from "./giftType/EdibleGiftDetails";
import ShoeGiftDetails from "./giftType/ShoeGiftDetails";
import ClothingGiftDetails from "./giftType/ClothingGiftDetails";
import KidGiftDetails from "./giftType/KidGiftDetails";

const GiftItem = ({
    gift,
    recipientId,
    index,
    handleGiftSelection,
    giftOptions,
    ageType,
    gender
}) => {


    let finalGiftOptions = [];

    // If recipient is a Kid → Only show Perfume & Edible Stuff
    if (ageType === "Kid") {
        finalGiftOptions = ["Perfume", "Edible Stuff"];
    } else {
        // If recipient is Adult → Build full list based on gender
        finalGiftOptions = [...giftOptions];
    }

    // Ensure gift.type is valid
    if (gift.type && !finalGiftOptions.includes(gift.type)) {
        handleGiftSelection(recipientId, index, "type", "");
    }

    const uniqueGiftOptions = [...new Set(finalGiftOptions)];

    return (

        <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">

            <h3 className="text-xl font-semibold text-gray-700 mb-3">
                Gift {index + 1}
            </h3>



            {/* Only show if recipient is an adult */}
            {ageType === "Adult" && (
                <>
                    {/* Preferred style */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">
                            What is your preferred style for this gift?
                        </label>
                        <div className="flex flex-wrap gap-4">
                            {[
                                "Handmade & Crafted",
                                "Quirky & Unique",
                                "Funny & Lighthearted",
                            ].map((style) => (
                                <label key={style} className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={gift.preferredStyle?.includes(style) || false}
                                        onChange={(e) => {
                                            const checked = e.target.checked;
                                            handleGiftSelection(recipientId, index, "preferredStyle", [
                                                ...(gift.preferredStyle || []).filter((s) => s !== style),
                                                ...(checked ? [style] : []),
                                            ]);
                                        }}
                                    />
                                    <span className="text-gray-700">{style}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </>
            )}


            {/* Gift Type */}
            <div className="mb-4">
                <label className="block text-gray-700 mb-2 font-medium">
                    Gift Type
                </label>
                <select
                    value={gift.type || ""}
                    onChange={(e) =>
                        handleGiftSelection(recipientId, index, "type", e.target.value)
                    }
                    className="w-full border border-rose-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400"
                >
                    <option value="" disabled selected hidden>Select Gift Type</option>
                    {uniqueGiftOptions.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>


            {gift.type === "Makeup Products" &&
                gender === "Female" &&
                ageType === "Adult" && (
                    <MakeupGiftDetails
                        gift={gift}
                        recipientId={recipientId}
                        index={index}
                        handleGiftSelection={handleGiftSelection}
                    />
                )}

            {(gift.type === "Bag/Wallet" || gift.type === "Wallet") && (
                <WalletGiftDetails
                    gift={gift}
                    recipientId={recipientId}
                    index={index}
                    handleGiftSelection={handleGiftSelection}
                    gender={gender}
                />
            )}

            {gift.type === "Jewellery" && (
                <JewelleryGiftDetails
                    gift={gift}
                    recipientId={recipientId}
                    index={index}
                    handleGiftSelection={handleGiftSelection}
                    gender={gender}
                    ageType={ageType}
                />
            )}

            {gift.type === "Perfume" && (
                <PerfumeGiftDetails
                    gift={gift}
                    recipientId={recipientId}
                    index={index}
                    handleGiftSelection={handleGiftSelection}
                />
            )}

            {gift.type === "Edible Stuff" && (
                <EdibleGiftDetails
                    gift={gift}
                    recipientId={recipientId}
                    index={index}
                    handleGiftSelection={handleGiftSelection}
                />
            )}

            {gift.type === "Shoes" && (
                <ShoeGiftDetails
                    gift={gift}
                    recipientId={recipientId}
                    index={index}
                    handleGiftSelection={handleGiftSelection}
                    gender={gender}
                    ageType={ageType}
                />
            )}

            {gift.type === "Clothing" && (
                <ClothingGiftDetails
                    gift={gift}
                    recipientId={recipientId}
                    index={index}
                    handleGiftSelection={handleGiftSelection}
                    gender={gender}
                    ageType={ageType}
                />
            )}

            {ageType === "Kid" && (
                <KidGiftDetails
                    gift={gift}
                    recipientId={recipientId}
                    index={index}
                    handleGiftSelection={handleGiftSelection}
                />
            )}


        </div>
    );
};

export default GiftItem;
