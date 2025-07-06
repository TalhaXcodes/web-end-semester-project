import React from "react";

const RecipientInfoForm = ({ recipient, setGiftData }) => {
  const handleChange = (field, value) => {
    setGiftData((prev) =>
      prev.map((r) => (r.id === recipient.id ? { ...r, [field]: value } : r))
    );
  };

  const handleOccasionChange = (occ, checked) => {
    setGiftData((prev) =>
      prev.map((r) =>
        r.id === recipient.id
          ? {
              ...r,
              occasion: checked
                ? [...(r.occasion || []), occ]
                : (r.occasion || []).filter((o) => o !== occ),
            }
          : r
      )
    );
  };

  const ageOptions =
    recipient.ageType === "Kid"
      ? ["Less than a year", "1–3", "3–6", "6–9", "9–12", "12–15"]
      : ["16–20", "20–25", "25–35", "More than 35 years"];

  return (
    <div className="mb-6 space-y-4">
      {/* Occasion */}
      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Occasion
        </label>
        <div className="flex flex-wrap gap-3">
          {["Birthday", "Anniversary", "Holiday" ,"Graduation", "Wedding/Engagement gift", "Thank you gift", "Get well soon" , "Other"].map(
            (occ) => (
              <label key={occ} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={recipient.occasion?.includes(occ) || false}
                  onChange={(e) =>
                    handleOccasionChange(occ, e.target.checked)
                  }
                />
                <span className="text-gray-700">{occ}</span>
              </label>
            )
          )}
        </div>
      </div>

      {/* Relationship */}
      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Relationship
        </label>
        <div className="flex flex-wrap gap-4">
          {["Close Family(Parent, Sibling, Child)","Extended Family (Aunt, Uncle, Cousin)", "Friend", "Colleague/Professional", "Spouse" , "Other"].map((rel) => (
            <label key={rel} className="flex items-center space-x-2">
              <input
                type="radio"
                name={`relationship-${recipient.id}`}
                checked={recipient.relationship === rel}
                onChange={() => handleChange("relationship", rel)}
              />
              <span className="text-gray-700">{rel}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Gender */}
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Gender</label>
        <div className="flex gap-6">
          {["Female", "Male"].map((gender) => (
            <label key={gender} className="flex items-center space-x-2">
              <input
                type="radio"
                name={`gender-${recipient.id}`}
                checked={recipient.gender === gender}
                onChange={() => handleChange("gender", gender)}
              />
              <span className="text-gray-700">{gender}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Kid / Adult */}
      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Is the recipient a Kid or an Adult?
        </label>
        <div className="flex gap-6">
          {["Kid", "Adult"].map((type) => (
            <label key={type} className="flex items-center space-x-2">
              <input
                type="radio"
                name={`ageType-${recipient.id}`}
                checked={recipient.ageType === type}
                onChange={() => handleChange("ageType", type)}
              />
              <span className="text-gray-700">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Age Group */}
      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Age Group
        </label>
        <select
          value={recipient.ageGroup || ""}
          onChange={(e) => handleChange("ageGroup", e.target.value)}
          disabled={!recipient.ageType}
          className="w-full border border-rose-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400"
        >
          <option value="" disabled selected hidden>
            Select age group
          </option>
          {ageOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default RecipientInfoForm;
