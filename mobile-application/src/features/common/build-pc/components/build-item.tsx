import { Button, Icon, Row } from "@components";
import Block from "@components/block";
import Text from "@components/text";
import ActionBottomBar from "@features/common/detail_product/components/bottom-action-bar";
import { navigate } from "@navigation/config/navigation-service";
import { SCREEN_WIDTH } from "@utils/helper";
import React from "react";
import { View, FlatList, Image, StyleSheet } from "react-native";
import { useAuth } from "@hooks/auth";
import useAddCart from "@hooks/common/use-add-cart";
import useCommon from "@hooks/common/use-common";
import { check } from "react-native-permissions";
type ProductData = {
  image: string;
  name: string;
  price: number;
  description: string;
};

type Props = {
  data: ProductData[];
};

const ProductItem = ({
  product,
  index,
}: {
  product: ProductData;
  index: number;
}) => {
  const { checkValidate } = useCommon();
  const { userInfo } = useAuth();
  const { addCart } = useAddCart();
  const components = Object.keys(product);
  const price = components.reduce((temp, current) => {
    return (temp += product[current].price);
  }, 0);
  const ordersCart = components.map((c) => {
    return {
      productId: product[c]._id,
      quantity: 1,
    };
  });
  const ordersCartPayment = components.map((c) => {
    return { ...product[c], productId: product[c]._id, quantity: 1 };
  });
  const handleAddCart = () => {
    addCart({ customerId: userInfo?._id, products: ordersCart });
  };
  const handleBuyNow = () => {
    navigate("Payment", {
      selectedProducts: ordersCartPayment,
      totalPrice: price,
    });
  };
  return (
    <Block bg={"container"} marginVertical={"_10"} padding={"_10"}>
      <Text color={"black"} fontWeight={"bold"}>
        Cấu hình {index + 1}
      </Text>
      {Object.keys(product).map((key) => {
        return (
          <Text color={"black"}>
            - {key}: {product[key]?.name}
          </Text>
        );
      })}
      <Row bg={"red_500"} py={"xs"} gap={"_10"} center px={"_20"} mt={"_10"}>
        <Text color={"container"} fontSize={14} mr={"_20"}>
          {price && price.toLocaleString()}
          <Text fontSize={10} fontWeight={"bold"}>
            VND
          </Text>
        </Text>
        <Row center>
          <Button
            noneStyle
            buttonStyle={{
              borderLeftWidth: 1,
              borderRightWidth: 1,
              paddingHorizontal: 10,
              borderColor: "white",
            }}
            onPress={() => checkValidate(handleAddCart)}
          >
            <Icon
              type="fontAwesome"
              name="cart-plus"
              size={34}
              color={"white"}
            />
          </Button>
          <Button
            noneStyle
            label="Mua ngay"
            onPress={() => checkValidate(handleBuyNow)}
            textStyle={{
              color: "white",
              fontWeight: "bold",
              fontSize: 14,
              marginLeft: 10,
            }}
          />
        </Row>
      </Row>
    </Block>
  );
};

const BuildItem: React.FC<Props> = ({ data }) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index }) => (
        <ProductItem product={item} index={index} />
      )}
      contentContainerStyle={styles.listContainer}
    />
  );
};

export default BuildItem;

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
  itemContainer: {
    flexDirection: "row",
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 8,
    backgroundColor: "#fff",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 16,
    justifyContent: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  price: {
    fontSize: 14,
    color: "#E91E63",
    marginBottom: 8,
  },
  description: {
    fontSize: 12,
    color: "#666",
  },
});
