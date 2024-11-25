import { Icon, Row, Block } from "@components";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface StarRatingProps {
  rating: number;
  starSize?: number;
  editable?: boolean;
  onPress?: (rating: number) => void;
  hasLabel?: boolean
}

const labels = ["Tệ", "Bình thường", "Tốt", "Rất tốt", "Xuất sắc"];

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  starSize = 20,
  editable = false,
  onPress,
  hasLabel
}) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <Block alignItems="center" >
      <Row center between>
        {stars.map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => editable && onPress?.(star)}
            disabled={!editable}
          >
            <Icon
              type="fontAwesome"
              name="star"
              size={starSize}
              color={star <= rating ? "gold" : "lightgray"}
              style={{ marginHorizontal: 4 }}
            />
          </TouchableOpacity>
        ))}
        <Text style={{  fontSize: 14, color: "gray" }}>
          {hasLabel  && labels[rating - 1] || ""}
        </Text>
      </Row>
    </Block>
  );
};

export default StarRating;
