import React from "react";

const scaleOptions = [1, 2, 3, 4, 5];

const PersonalityAnalysisForm = ({ personalityData, setPersonalityData }) => {
  const handleChange = (field, value) => {
    setPersonalityData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const renderScale = (name, labelLeft, labelRight) => (
    <div className="mb-6">
      <label className="block text-gray-700 font-medium mb-2">
        {name}
      </label>
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm text-gray-500 w-28">{labelLeft}</span>
        {scaleOptions.map((val) => (
          <label key={val} className="flex flex-col items-center">
            <input
              type="radio"
              name={name}
              value={val}
              checked={personalityData[name] === String(val)}
              onChange={(e) => handleChange(name, e.target.value)}
            />
            <span className="text-sm text-gray-600">{val}</span>
          </label>
        ))}
        <span className="text-sm text-gray-500 w-28 text-right">{labelRight}</span>
      </div>
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-rose-300 mt-8">
      <h2 className="text-2xl font-semibold text-rose-600 mb-6 text-center">
        Recipient Personality Analysis
      </h2>

      {renderScale("personality", "Introvert", "Extrovert")}

      {renderScale(
        " How important is it for you to make the gift recipient feel special or emotionally connected through your gift?",
        "Less important",
        "Highly important"
      )}

      {renderScale("Do you enjoy incorporating handmade elements into gifts?", "Not at all", "Absolutely")}

      {renderScale(" What colors or textures do you find most appealing for gift baskets?", "Neutral", "Vibrant")}

      {renderScale("How does the recipient react to surprises?", "Not sure", "Loves them")}

      {renderScale("How close are you to the recipient?", "Not close", "Very close")}

      {renderScale(
        " How likely is the recipient to appreciate practical gifts (e.g. Hair-dryer, Hairstraightener) over sentimental ones?",
        "Prefers sentimental",
        "Prefers practical"
      )}

      {renderScale(
        "How much does the recipient value gifts that are unique or one-of-a-kind?",
        "Prefers common gifts",
        "Loves unique gifts"
      )}

      {renderScale(
        " How likely is the recipient to enjoy experience-based gifts (e.g., concert tickets,cooking classes) over physical items?",
        "Prefers physical gifts",
        "Prefers experiences"
      )}

      {renderScale(
        " How comfortable are you with spending above your budget for a high-quality or meaningful gift?",
        "Not comfortable",
        "Very comfortable"
      )}

      {renderScale(
        " How much does the recipient appreciate gifts that reflect shared memories or inside jokes?",
        "Not at all",
        "Greatly appreciates"
      )}

      {renderScale(
        " How much do you agree that a handwritten note adds significant value to the gift?",
        "Strongly disagree",
        "Strongly agree"
      )}

      {renderScale(
        " How likely are you to prioritize a handmade or DIY gift over a store-bought one to stay within budget?",
        "Unlikely",
        "Very likely"
      )}
    </div>
  );
};

export default PersonalityAnalysisForm;
