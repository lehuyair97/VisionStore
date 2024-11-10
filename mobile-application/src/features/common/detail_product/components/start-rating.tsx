import { Icon, Row } from "@components";
import React from "react";

interface StarRatingProps {
  rating: number;
  starSize?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, starSize = 20 }) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <Row>
      {stars.map((star) => (
        <Icon
          type="fontAwesome"
          key={star}
          name="star"
          size={starSize}
          color={star <= rating ? "gold" : "lightgray"}
        />
      ))}
    </Row>
  );
};

export default StarRating;
