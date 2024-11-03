import React from "react";
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Block, Row, Text } from "@components";
import { makeStyles } from "@theme";

const { width } = Dimensions.get("window");
const imageWidth = width * 0.48 - 16; // Tính toán 48% chiều rộng màn hình, trừ đi khoảng cách giữa các hình ảnh

type Props = {
  avatar: string;
  name: string;
  color: string;
  comment: string;
  images: string[];
  likes: number;
};

const CommentItem: React.FC<Props> = ({
  avatar,
  name,
  color,
  comment,
  images,
  likes,
}) => {
  const styles = useStyle();
  return (
    <Block borderBottomColor={"gray888"} borderBottomWidth={1}>
      <Row p={"l"} alignItems={"center"} justifyContent={"space-between"}>
        <Image source={{ uri: avatar }} style={styles.avatar as ImageStyle} />
        <Text
          fontSize={18}
          fontWeight={"bold"}
          color={"black"}
          style={styles.name}
        >
          {name}
        </Text>
        <TouchableOpacity style={styles.likeButton}>
          <Row center>
            <Text color={"gray136"}>Hữu ích {likes} </Text>
            <Ionicons name="heart-outline" size={24} color="red" />
          </Row>
        </TouchableOpacity>
      </Row>
      <Block mb={"_12"}>
        <Text fontSize={16} color={"amber_500"}>
          Màu sắc: {color}
        </Text>
      </Block>
      <Block mb={"_12"}>
        <Text style={styles.comment}>{comment}</Text>
      </Block>
      <Row center gap={"m"}>
        {images.map((image, index) => (
          <Image
            key={index}
            source={{ uri: image }}
            style={[styles.image as ImageStyle, { width: imageWidth }]}
          />
        ))}
      </Row>
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
  },
}));

export default CommentItem;
