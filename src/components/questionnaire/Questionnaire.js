import { useState } from "react";
import RecipientCard from "./RecipientCard";
import PersonalityAnalysisForm from "./PersonalityAnalysisForm";
import GiftPackaging from "./GiftPackaging";
import FeedbackSection from "./FeedbackSection";

const Questionnaire = () => {
  const [recipients, setRecipients] = useState(1);
  const [giftData, setGiftData] = useState([{ id: 1, gifts: [{}] }]);
  const [personalityData, setPersonalityData] = useState({});
  const [packagingChoice, setPackagingChoice] = useState("");
  const [feedbackData, setFeedbackData] = useState({
    helpful: "",
    suggestion: "",
  });


  const maxRecipients = 10;
  const maxTotalItems = 10;

  const handleRecipientChange = (e) => {
    const count = parseInt(e.target.value);
    setRecipients(count);
    const newGiftData = Array.from({ length: count }, (_, i) => {
      const existing = giftData[i];
      return {
        id: i + 1,
        gifts: existing?.gifts?.length ? existing.gifts : [{}],
      };
    });
    setGiftData(newGiftData);
  };

  const handleGiftCountChange = (recipientId, count) => {
    const totalGifts = giftData.reduce((sum, r) => sum + (r.gifts.length || 0), 0);
    const newGiftCount = parseInt(count);
    if (totalGifts + newGiftCount - (giftData[recipientId - 1]?.gifts.length || 0) <= maxTotalItems) {
      setGiftData((prev) =>
        prev.map((recipient) =>
          recipient.id === recipientId
            ? { ...recipient, gifts: Array(newGiftCount).fill({}) }
            : recipient
        )
      );
    } else {
      alert(`Total gifts across all recipients cannot exceed ${maxTotalItems}.`);
    }
  };

  const handleGiftSelection = (recipientId, giftIndex, field, value) => {
    setGiftData((prev) =>
      prev.map((recipient) =>
        recipient.id === recipientId
          ? {
            ...recipient,
            gifts: recipient.gifts.map((gift, idx) =>
              idx === giftIndex ? { ...gift, [field]: value } : gift
            ),
          }
          : recipient
      )
    );
  };

  const giftOptions = [
    "Clothing",
    "Shoes",
    "Jewellery",
    "Perfume",
    "Edible Stuff",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", JSON.stringify(giftData, null, 2));
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-center text-rose-700 mb-8">
        Gift Basket Questionnaire
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-md border border-rose-300">
          <label className="block text-gray-700 font-semibold mb-2">
            How many recipients for the gift baskets? (Max: {maxRecipients})
          </label>
          <select
            value={recipients}
            onChange={handleRecipientChange}
            className="w-full border border-rose-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400"
          >
            {[...Array(maxRecipients).keys()].map((i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>
        {giftData.map((recipient) => (
          <RecipientCard
            key={recipient.id}
            recipient={recipient}
            recipients={recipients}
            giftOptions={giftOptions}
            handleGiftCountChange={handleGiftCountChange}
            handleGiftSelection={handleGiftSelection}
            setGiftData={setGiftData}
            maxTotalItems={maxTotalItems}
            giftData={giftData}
          />
        ))}

        <PersonalityAnalysisForm
          personalityData={personalityData}
          setPersonalityData={setPersonalityData}
        />

        <GiftPackaging
          packagingChoice={packagingChoice}
          setPackagingChoice={setPackagingChoice}
        />

        <FeedbackSection
          feedbackData={feedbackData}
          setFeedbackData={setFeedbackData}
        />




        <button
          type="submit"
          className="w-full bg-rose-600 text-white py-2 rounded-md hover:bg-rose-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Questionnaire;
