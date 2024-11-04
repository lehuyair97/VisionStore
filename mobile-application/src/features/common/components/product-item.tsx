import { localImages } from "@assets/icons/images";
import { Block, Text, Row, Button } from "@components";
import { Image } from "react-native";
import { StyleSheet
   } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const ProductItem = ({ item }: { item: any }) => {
  return (
    <Block paddingVertical={"_10"} m={"_10"} style={styles.productContainer}>
      <Text color={"black"} fontWeight={"bold"} fontSize={16}>
        {item.subcategory_name}
      </Text>
      <Row center between>
        <Image source={{ uri: item?.image }} style={styles.productImage} />
        <Block flex={1} mx={"_10"} gap={'s'}>
          <Text numberOfLines={2} color={"black"} fontWeight={"600"}>
            {item.name}
          </Text>
          <Text color={"black"} fontWeight={"600"}>
            {item.price}{" "}
            <Text color={"gray136"} textDecorationLine={"line-through"}>
              {item?.original_price}
            </Text>
          </Text>
          <Row center gap={"_10"}>
            <TouchableOpacity>
              <Image
                source={localImages().ic_minus}
                style={styles.actionImage}
              />
            </TouchableOpacity>
            <Text color={"black"} fontWeight={"600"}>
              {item?.quantity}
            </Text>
            <TouchableOpacity>
              <Image
                source={localImages().ic_plus}
                style={styles.actionImage}
              />
            </TouchableOpacity>
          </Row>
        </Block>
        <Button
          label="Chọn"
          buttonStyle={{ paddingVertical: 5, borderRadius: 20 }}
          textStyle={{ color: "white" }}
        />
      </Row>
    </Block>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    backgroundColor: "white",
  },
  productImage: {
    width: 70,
    height: 70,
    resizeMode: "contain",
  },
  actionImage: {
    width: 18,
    height: 18,
  },
});

export default ProductItem;
