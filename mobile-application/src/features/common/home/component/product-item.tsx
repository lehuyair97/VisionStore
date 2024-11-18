import React, { useState } from "react";
import { TouchableOpacity, View, Image, StyleSheet } from "react-native";
import { Block, Text } from "@components";
import Colors from "@theme/colors";
import { localImages } from "@assets/icons/images";
import { SCREEN_WIDTH } from "@utils/helper";

interface ProductItemProps {
  product:
    | {
        _id: string;
        image: string;
        warrantyPeriod: string;
        name: string;
        price: string;
      }
    | any;
  onPress: (id: string) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, onPress }) => {
  const price = product?.price?.toLocaleString();
  const [imageError, setImageError] = useState(false);
  return (
    <TouchableOpacity onPress={() => onPress(product._id)}>
      <View style={styles.itemWrapper}>
        {imageError ? (
          <Image source={localImages().ic_mac} style={styles.productImage} />
        ) : (
          <Image
            source={{ uri: product.image }}
            style={styles.productImage}
            onError={() => setImageError(true)}
          />
        )}
        <Block style={styles.warrantyContainer}>
          <Text style={styles.warrantyText}>{product.warrantyPeriod}</Text>
        </Block>
        <Text numberOfLines={2} style={styles.productName}>
          {product.name}
        </Text>
        <Block height={10} />
        <Block style={styles.priceContainer}>
          <Text style={styles.productPrice}>
            {price}
            <Text color={'primary'} fontSize={7}>  VND</Text>
          </Text>
        </Block>
        <Block height={10} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemWrapper: {
    marginTop:10,
    backgroundColor: "#FFF",
    borderRadius: 10,
    alignItems: "center",
    width: SCREEN_WIDTH / 2 - 30,
  },
  productImage: {
    width: 100,
    height: 90,
    resizeMode: "center",
  },
  warrantyContainer: {
    backgroundColor: Colors.whiteF8,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  warrantyText: {
    fontSize: 8,
    color: Colors.primary,
    fontWeight: "bold",
  },
  productName: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
    color: Colors.primary,
    minHeight: 40,
    marginHorizontal: 18,
  },
  priceContainer: {
    backgroundColor: Colors.whiteF8,
    height: 40,
    borderRadius: 17,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  productPrice: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: "bold",
  },
});

export default ProductItem;
