import { localImages } from "@assets/icons/images";
import { Block, Text, Row, Button, Icon } from "@components";
import { navigate } from "@navigation/config/navigation-service";
import { ROUTES } from "@navigation/config/routes";
import { Image, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";

const ProductItem = ({
  item,
  isRecent,
  isComment,
  onItemPress,
}: {
  item: any;
  isRecent?: boolean;
  isComment?: boolean;
  onItemPress?: (item: any) => void;
}) => {
  const product = isRecent ? item?.item : item;

  return (
    <Block
      paddingVertical={"m"}
      m={"_10"}
      style={[styles.productContainer, {}]}
    >
      <Text color={"black"} fontWeight={"bold"} fontSize={14}>
        {product?.name}
      </Text>
      <Row center between>
        <Image
          source={
            product?.image && {
              uri: product?.product?.image
                ? product?.product?.image
                : product?.image,
            }
          }
          style={styles.productImage}
        />
        <Block flex={1} mx={"_10"} gap={"s"}>
          {product?.product?.price ?? product?.price ? (
            <Block>
              <Text numberOfLines={2} color={"black"} fontWeight={"600"}>
                {product?.product?.name ?? product?.name}
              </Text>
              <Text color={"black"} fontWeight={"600"}>
                {product?.product?.price?.toLocaleString() ??
                  product?.price?.toLocaleString()}{" "}
                <Text color={"gray136"} textDecorationLine={"line-through"}>
                  {product?.original_price}
                </Text>
              </Text>
            </Block>
          ) : (
            <Text ml={"_20"} color={"black"}>
              Vui lòng chọn linh kiện
            </Text>
          )}
          {(!isRecent && !isComment) && product?.price && (
            <Row center gap={"_10"}>
              <TouchableOpacity>
                <Image
                  source={localImages().ic_minus}
                  style={styles.actionImage}
                />
              </TouchableOpacity>
              <Text color={"black"} fontWeight={"600"}>
                {1}
              </Text>
              <TouchableOpacity>
                <Image
                  source={localImages().ic_plus}
                  style={styles.actionImage}
                />
              </TouchableOpacity>
            </Row>
          )}
        </Block>
        {isRecent || isComment ? (
          <TouchableOpacity
            onPress={() =>
              navigate(ROUTES.DetailProduct, { product: product })
            }
          >
            <Row center gap={"_10"}>
              <Text color={"primary"}>Chi Tiết</Text>
              <Icon
                type={"antDesign"}
                name="arrowright"
                size={18}
                color={"#DF5454"}
              />
            </Row>
          </TouchableOpacity>
        ) : (
          <Button
            onPress={() => onItemPress(item)}
            label="Chọn"
            buttonStyle={{ paddingVertical: 5, borderRadius: 20 }}
            textStyle={{ color: "white" }}
          />
        )}
      </Row>
    </Block>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    borderBottomWidth: 1,
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
    width: 60,
    height: 60,
    resizeMode: "cover",
    margin: 5,
  },
  actionImage: {
    width: 18,
    height: 18,
  },
});

export default ProductItem;
