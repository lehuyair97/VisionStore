import React, { useState } from "react";
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageStyle,
} from "react-native";
import { Block, Icon, Row, Text } from "@components";
import { makeStyles } from "@theme";
import dayjs from "dayjs";
import StarRating from "../detail_product/components/start-rating";
import ProductItem from "./product-item";
import { localImages } from "@assets/icons/images";
import { Helper } from "@utils/helper";

const { width } = Dimensions.get("window");
const imageWidth = width * 0.48 - 16;
type Props = {
  avatar: string;
  name: string;
  color: string;
  comment: string;
  images: string[];
  likes: number;
  timestamp: string;
  rating?: number;
  product?: any;
  isUserReview?: boolean;
  onLike: () => void;
};
const CommentItem: React.FC<Props> = ({
  avatar,
  name,
  color,
  comment,
  images,
  likes,
  timestamp,
  rating,
  product,
  isUserReview,
  onLike,
}) => {
  const styles = useStyle();
  const [imageError, setImageError] = useState(false);
  return (
    <Block borderBottomColor={"gray_200"} borderBottomWidth={1}>
      <Row alignItems={"center"} justifyContent={"space-between"}>
        <Image source={{ uri: avatar }} style={styles.avatar as ImageStyle} />
        <Text
          fontSize={18}
          fontWeight={"bold"}
          color={"black"}
          style={styles.name}
        >
          {name}
        </Text>
        {!isUserReview && (
          <TouchableOpacity onPress={onLike} style={styles.likeButton}>
            <Row center gap={"s"}>
              <Text mt={"s"} color={"gray136"}>
                Hữu ích {likes}
              </Text>
              <Icon type="antDesign" name="like2" size={24} color="blue" />
            </Row>
          </TouchableOpacity>
        )}
      </Row>
      <Block my={"_10"}>
        <Text fontSize={16} color={"gray136"}>
          Màu sắc:
          <Text fontSize={16} color={"black"}>
            {color}
          </Text>
        </Text>
      </Block>
      <Block mb={"_12"}>
        <Text style={styles.comment}>{comment}</Text>
      </Block>
      {images && (
        <Row center gap={"m"}>
          {imageError ? (
            <Image
              source={localImages().ic_mac}
              style={styles.image as ImageStyle}
            />
          ) : (
            images.map((image, index) => (
              <Image
                key={index}
                onError={() => setImageError(true)}
                source={{ uri: Helper.convertToLocalUrl(image) }}
                style={[styles.image as ImageStyle, { width: imageWidth }]}
              />
            ))
          )}
        </Row>
      )}
      <Row between center mb={"_20"}>
        <Text color={"gray136"}>{dayjs(timestamp).format("DD/MM/YYYY")}</Text>
        <StarRating rating={rating} />
      </Row>
      {product && <ProductItem item={product} isComment />}
    </Block>
  );
};

const useStyle = makeStyles((theme) => ({
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  name: {
    flex: 1,
  },
  likeButton: {
    padding: 8,
  },
  comment: {
    fontSize: 14,
    color: "#333",
  },
  image: {
    height: 100,
    marginBottom: 8,
    borderRadius: 8,
    resizeMode: "contain",
  },
}));

export default CommentItem;
