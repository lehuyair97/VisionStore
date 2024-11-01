import React from "react";
import { Image, TouchableOpacity, StyleSheet, ImageStyle } from "react-native";
import { Text, Row, Block } from "@components"; 
import { makeStyles } from "@theme"; 

type Props = {
  image: string;
  title: string;
  content: string;
  validity: string;
  onUse: () => void;
};

const Voucher: React.FC<Props> = ({ image, title, content, validity, onUse }) => {
  const styles = useStyles();

  return (
    <Row style={styles.container} p={"m"}>
      <Image source={{ uri: image }} style={styles.image as ImageStyle} />
      <Block ml={"s"} >
        <Text fontSize={16} fontWeight="bold" color={'black'}>{title}</Text>
        <Text color="gray136" style={styles.content}>{content}</Text>
        <Text color="green_500" style={styles.validity}>{`Hiệu lực: ${validity}`}</Text>
      </Block>
      <TouchableOpacity style={styles.button} onPress={onUse}>
        <Text style={styles.buttonText}>Dùng ngay</Text>
      </TouchableOpacity>
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
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  content: {
    marginTop: 4,
    fontSize: 14,
  },
  validity: {
    marginTop: 2,
    fontSize: 13,
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
