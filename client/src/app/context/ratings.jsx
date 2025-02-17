// // client/src/app/context/ratings.jsx
// "use client";
// import { useState, useEffect } from "react";
// import StarRatings from "react-star-ratings";
// import axios from "axios";

// const Rating = ({ productId, userId }) => {
// const [rating, setRating] = useState(0);
// const [averageRating, setAverageRating] = useState(0);
// const [loading, setLoading] = useState(true);

// useEffect(() => {
// // Fetch user's rating & average rating
// axios
//     .get(`http://127.0.0.1:5000/${productId}`, { params: { userId } })
//     .then(({ data }) => {
//     setRating(data.userRating || 0);
//     setAverageRating(data.averageRating || 0);
//     })
//     .catch((err) => console.error("Failed to load ratings", err))
//     .finally(() => setLoading(false));
// }, [productId, userId]);

// const handleRatingChange = (newRating) => {
// setRating(newRating);

// axios
//     .post(`/api/ratings`, { productId, userId, rating: newRating })
//     .then(({ data }) => setAverageRating(data.newAverage))
//     .catch((err) => console.error("Failed to submit rating", err));
// };

// return (
// <div>
//     <h3>Rate this product</h3>
//     {loading ? (
//     <p>Loading ratings...</p>
//     ) : (
//     <>
//         <StarRatings
//         rating={rating}
//         starRatedColor="gold"
//         starHoverColor="gold"
//         changeRating={handleRatingChange}
//         numberOfStars={5}
//         name="rating"
//         />
//         <p>Average Rating: {averageRating.toFixed(1)} ★</p>
//     </>
//     )}
// </div>
// );
// };

// export default Rating;
