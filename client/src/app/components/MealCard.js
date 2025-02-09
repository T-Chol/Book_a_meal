// src/components/MealCard.js
import React from 'react';

const MealCard = ({ meal }) => {
  return (
    <div className="meal-card">
      <h3>{meal.name}</h3>
      <p>{meal.description}</p>
      <p><strong>Price:</strong> ${meal.price}</p>
      <button>Add to Cart</button>
    </div>
  );
};

export default MealCard;
