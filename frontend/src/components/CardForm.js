import React, { useState } from "react";

const CardForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    rarity: "",
    type: "",
    value: 0,
    imageURL: "",
    upgradedValue: 0,
    upgradedImageURL: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("/api/card-form/createcard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.error("Error creating card", data.error);
        } else {
          console.log("Card created successfully", data);

          // Optionally reset the form or perform other actions
        }
      })
      .catch((error) => {
        console.error("Error creating card", error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Rarity:</label>
          <input
            type="text"
            id="rarity"
            name="rarity"
            value={formData.rarity}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="type">Type:</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            style={{ width: "250px", height: "30px" }} // Adjust the height as needed
          >
            <option value="Attack" style={{ textAlign: "center" }}>
              Attack
            </option>
            <option value="Skill" style={{ textAlign: "center" }}>
              Skill
            </option>
            <option value="Power" style={{ textAlign: "center" }}>
              Power
            </option>
          </select>
        </div>

        <div>
          <label htmlFor="value">Value:</label>
          <input
            type="number"
            id="value"
            name="value"
            value={formData.value}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="imageURL">Image URL:</label>
          <input
            type="text"
            id="imageURL"
            name="imageURL"
            value={formData.imageURL}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="upgradedValue">Upgraded Value:</label>
          <input
            type="number"
            id="upgradedValue"
            name="upgradedValue"
            value={formData.upgradedValue}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="upgradedImageURL">Upgraded Image URL:</label>
          <input
            type="text"
            id="upgradedImageURL"
            name="upgradedImageURL"
            value={formData.upgradedImageURL}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CardForm;
