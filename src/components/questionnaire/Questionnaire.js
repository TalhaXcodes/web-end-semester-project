import { useState } from "react";
import RecipientInfoForm from "./RecipientInfoForm";
import GiftList from "./GiftList";
import PersonalityAnalysisForm from "./PersonalityAnalysisForm";
import GiftPackaging from "./GiftPackaging";
import FeedbackSection from "./FeedbackSection";

const Questionnaire = () => {
  const [recipientStepIndex, setRecipientStepIndex] = useState(0);
  const [phase, setPhase] = useState("recipients");
  const [recipients, setRecipients] = useState(1);
  const [giftData, setGiftData] = useState([{ id: 1, gifts: [{}], knownDuration: "", ageType: "", gender: "" }]);
  const [personalityData, setPersonalityData] = useState({});
  const [packagingChoice, setPackagingChoice] = useState("");
  const [feedbackData, setFeedbackData] = useState({
    helpful: "",
    suggestion: "",
  });


  const maxRecipients = 10;
  const maxTotalItems = 10;

  const handleRecipientChange = (e) => {
    const newCount = parseInt(e.target.value);

    // Count how many gifts are already allocated
    const allocatedGifts = giftData.reduce((sum, r) => sum + (r.gifts?.length || 0), 0);

    // Check if there's enough room for new recipients
    const maxRecipientsAllowed = maxTotalItems - allocatedGifts + giftData.length;

    if (newCount > maxRecipientsAllowed) {
      alert(
        `You have already allocated ${allocatedGifts} gifts. You can select up to ${maxRecipientsAllowed} recipients based on remaining gift capacity.`
      );
      return; // Don't update recipient count
    }

    setRecipients(newCount);

    const newGiftData = Array.from({ length: newCount }, (_, i) => {
      const existing = giftData[i] || {};

      return {
        ...existing,
        id: i + 1,
        gifts: existing.gifts?.length > 0 ? existing.gifts : [{}],
        knownDuration: existing.knownDuration || "",
        ageType: existing.ageType || "",
        gender: existing.gender || "",
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

  

  const handleNextRecipient = () => {
    if (recipientStepIndex < recipients - 1) {
      setRecipientStepIndex((prev) => prev + 1);
    } else {
      setPhase("personality");
    }
  };

  const handleBack = () => {
    if (phase === "feedback") {
      setPhase("packaging");
    } else if (phase === "packaging") {
      setPhase("personality");
    } else if (phase === "personality") {
      setPhase("recipients");
      setRecipientStepIndex(recipients - 1); // go back to last recipient
    } else if (phase === "recipients" && recipientStepIndex > 0) {
      setRecipientStepIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  console.log("🎉 Final Submission:", {
    giftData,
    personalityData,
    packagingChoice,
    feedbackData,
  });

  // TODO: send to Firebase or show summary screen
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
            {[...Array(maxTotalItems).keys()].map(i => i + 1).filter(i => {
              const allocatedGifts = giftData.reduce((sum, r) => sum + (r.gifts?.length || 0), 0);
              const maxRecipientsAllowed = maxTotalItems - allocatedGifts + giftData.length;
              return i <= maxRecipientsAllowed;
            })
              .map(i => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
          </select>
        </div>

        {phase === "recipients" && giftData[recipientStepIndex] && (
          <>
            <div className="bg-white p-6 rounded-xl shadow-md border border-rose-300 mb-6">
              <h2 className="text-2xl font-semibold text-rose-600 mb-4 text-center">
                Recipient {recipientStepIndex + 1} of {recipients}
              </h2>

              <RecipientInfoForm
                recipient={giftData[recipientStepIndex]}
                setGiftData={setGiftData}
              />

              <GiftList
                recipient={giftData[recipientStepIndex]}
                recipients={recipients}
                giftOptions={giftOptions}
                handleGiftCountChange={handleGiftCountChange}
                handleGiftSelection={handleGiftSelection}
                maxTotalItems={maxTotalItems}
                giftData={giftData}
              />

              <div className="mt-6 flex justify-between">

                {recipientStepIndex > 0 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="bg-rose-600 text-white py-2 px-4 rounded-md hover:bg-rose-700 transition"
                  >
                    Back
                  </button>
                )}



                <button
                  type="button"
                  onClick={handleNextRecipient}
                  className="bg-rose-600 text-white py-2 px-4 rounded-md hover:bg-rose-700 transition ml-auto"
                >
                  {recipientStepIndex === recipients - 1
                    ? "Next"
                    : "Save & Continue to Next Recipient"}
                </button>
              </div>
            </div>
          </>
        )}

        {phase === "personality" && (
          <div className="space-y-6">
            <PersonalityAnalysisForm
              personalityData={personalityData}
              setPersonalityData={setPersonalityData}
            />

            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={handleBack}
                className="bg-rose-600 text-white py-2 px-4 rounded-md hover:bg-rose-700 transition"
              >
                Back
              </button>

              <button
                type="button"
                onClick={() => setPhase("packaging")}
                className="bg-rose-600 text-white py-2 px-4 rounded-md hover:bg-rose-700 transition"
              >
                Next
              </button>
            </div>
          </div>
        )}


        {phase === "packaging" && (
          <div className="space-y-6">
            <GiftPackaging
              packagingChoice={packagingChoice}
              setPackagingChoice={setPackagingChoice}
            />

            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={handleBack}
                className="bg-rose-600 text-white py-2 px-4 rounded-md hover:bg-rose-700 transition"
              >
                Back
              </button>

              <button
                type="button"
                onClick={() => setPhase("feedback")}
                className="bg-rose-600 text-white py-2 px-4 rounded-md hover:bg-rose-700 transition"
              >
                Next
              </button>
            </div>
          </div>
        )}


        {phase === "feedback" && (
          <div className="space-y-6">
            <FeedbackSection
              feedbackData={feedbackData}
              setFeedbackData={setFeedbackData}
            />

            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={handleBack}
                className="bg-rose-600 text-white py-2 px-4 rounded-md hover:bg-rose-700 transition"
              >
                Back
              </button>

              <button
                type="submit"
                className="bg-rose-600 text-white py-2 px-4 rounded-md hover:bg-rose-700 transition"
              >
                Submit
              </button>
            </div>
          </div>
        )}


      </form>
    </div>
  );
};

export default Questionnaire;
