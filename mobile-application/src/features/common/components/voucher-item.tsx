import React from "react";
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  View,
  TextStyle,
} from "react-native";
import { Row, Block, Text } from "@components";
import { makeStyles } from "@theme";
import dayjs from "dayjs";

type Props = {
  title: string;
  content: string;
  validity: string;
  onUse: () => void;
  discount: number;
  discountType: "shipping" | "discount";
};

const Voucher: React.FC<Props> = ({
  title,
  content,
  validity,
  onUse,
  discount,
  discountType,
}) => {
  const styles = useStyles();

  const discountColor = discountType === "shipping" ? "#32CD32" : "#DF5454";

  return (
    <Row style={styles.container} p={"m"}>
      <Block
        justifyContent={"center"}
        alignItems={"center"}
        px={"_10"}
        style={[styles.discountSquare, { backgroundColor: discountColor }]}
      >
        <Text textAlign={"center"} style={styles.discount}>
          {`Giảm giá: ${discount}%`}
        </Text>
      </Block>
      <Block ml={"s"} flex={1}>
        <Text fontSize={16} fontWeight="bold" color={"black"}>
          {title}
        </Text>
        <Text color="gray136" style={styles.content}>
          {content}
        </Text>
      </Block>
      <Block>
        <TouchableOpacity style={styles.button} onPress={onUse}>
          <Text style={styles.buttonText}>Dùng ngay</Text>
        </TouchableOpacity>
        <Text color="green_500" style={styles.validity}>
          {`Hiệu lực: ${dayjs(validity).format("DD/MM/YYYY")}`}
        </Text>
      </Block>
    </Row>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: "row",
  },
  discountSquare: {
    width: 75,
    height: 75,
    borderRadius: 16,
  },
  content: {
    marginTop: 4,
    fontSize: 14,
  },
  validity: {
    marginTop: 2,
    fontSize: 13,
    maxWidth: 100,
  },
  discount: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#FFA500",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginLeft: "auto",
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
}));

export default Voucher;
