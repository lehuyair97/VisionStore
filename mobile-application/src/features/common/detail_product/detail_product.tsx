import { Block, MainContainer, Row } from "@components";
import Text from "@components/text";
import AppBar from "@features/common/common/appbar";
import useAddCart, { CartItem } from "@hooks/common/use-add-cart";
import useproduct from "@hooks/common/use-get-product-detail";
import useQuantity from "@hooks/common/util/useQuantity";
import { RouteProp, useRoute } from "@react-navigation/native";
import Colors from "@theme/colors";
import { EDGES, SCREEN_WIDTH } from "@utils/helper";
import { useState } from "react";
import { Alert, FlatList } from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import ActionBottomBar from "./components/bottom-action-bar";
import Comment from "./components/comment";
import CustomControllerNums from "./custom-conntroler-nums";
import CustomItem from "./custom_item";
import ImgDetail from "./img_detail";
import { useAuth } from "@hooks/auth";
import { navigate } from "@navigation/config/navigation-service";
import useCommon from "@hooks/common/use-common";
import Animated, { FadeInLeft, ZoomInEasyDown } from "react-native-reanimated";
import theme from "@theme";
type Item = {
  id: number;
  image: string;
};

const dataCustomItem = [
  { color: "#D4A490", name: "Gold" },
  { color: "#AEAFB4", name: "Silver" },
  { color: "#646464", name: "Grey" },
];

const dataCustomItem2 = [
  { name: "215 GB" },
  { name: "512 GB" },
  { name: "1 TB" },
];
type DetailProductParams = {
  DetailProduct: {
    productId: string;
  };
};

const DetailProduct = () => {
  const route = useRoute<RouteProp<DetailProductParams, "DetailProduct">>();
  const { product } = route.params as any;
  const { userInfo, authenticationStatus } = useAuth();
  const { checkValidate } = useCommon();

  const { addCart } = useAddCart();
  const { quantity, increaseQuantity, decreaseQuantity } = useQuantity({
    initialQuantity: 1,
  });

  const [selectedColor, setSelectedColor] = useState<{
    color?: string;
    name: string;
  } | null>(null);
  const [selectedMemory, setSelectedMemory] = useState<{ name: string } | null>(
    null
  );

  const data: Item[] = [
    { id: 1, image: product?.image },
    { id: 2, image: product?.image },
    { id: 3, image: product?.image },
  ];

  const handleAddCart = () => {
    const orderData: any = {
      productId: product?._id,
      quantity,
    };
    addCart({ customerId: userInfo?._id, products: [orderData] });
  };

  const handleBuyNow = () => {
    const selectProduct = product as any;
    selectProduct.quantity = 1;
    selectProduct.productId = product._id;
    navigate("Payment", {
      selectedProducts: [selectProduct],
      totalPrice: product.price,
    });
  };
  return (
    <MainContainer
      style={{
        flex: 1,
        backgroundColor: Colors.background_fit_finder,
      }}
      edges={EDGES.LEFT_RIGHT}
    >
      <Block
        position={"absolute"}
        left={0}
        top={0}
        zIndex={"full"}
        width={SCREEN_WIDTH}
      >
        <AppBar
          iconLeft
          iconRight={true}
          iconRightName="share"
          colorIconLeft={Colors.black}
          colorIconRight={Colors.black}
          isBackground={false}
        />
      </Block>
      <ScrollView style={{ flex: 1 }}>
        <Block paddingVertical={"_40"} backgroundColor={"container"}>
          <Animated.Image
            sharedTransitionTag={`detail-image-${product._id}`}
            source={{ uri: product?.image }}
            style={{
              width: SCREEN_WIDTH,
              height: 280,
              resizeMode: "contain",
              backgroundColor: "white",
            }}
          />
        </Block>
        <Block marginTop={"m"} alignSelf={"center"} />
        <FlatList
          data={data}
          horizontal={true}
          renderItem={({ item }) => (
            <ImgDetail
              width={44}
              height={44}
              source={{ uri: item.image }}
              isBackground={true}
            />
          )}
          ItemSeparatorComponent={() => <Block style={{ width: 15 }} />}
          contentContainerStyle={{ justifyContent: "center", flexGrow: 1 }}
        />
        <Block mx={"_20"}>
          <Row center marginTop={"_20"} gap={"m"}>
            <Animated.Text
              entering={FadeInLeft.duration(300).delay(300)}
              style={{
                fontSize: 29,
                fontWeight: "bold",
                color: "black",
                flex: 3.4,
              }}
            >
              {product?.name}
            </Animated.Text>
            <Animated.View
              entering={ZoomInEasyDown.duration(400).delay(300)}
              style={{
                paddingVertical: 4,
                paddingHorizontal: 6,
                borderWidth: 0.7,
                borderColor: theme.colors.red_400,
                borderRadius:10
             }}
            >
              <Animated.Text
                style={{
                  fontSize: 12,
                  fontWeight: "300",
                  color: theme.colors.red_500,
                }}
              >
                {product?.warrantyPeriod}
              </Animated.Text>
            </Animated.View>
          </Row>
          <Text
            fontSize={21}
            fontWeight={"300"}
            color="blue_500"
            marginTop={"_10"}
          >
            {product?.price?.toLocaleString()}
          </Text>
          <CustomItem
            selected={selectedColor?.name}
            data={product?.optionsColor || dataCustomItem}
            title="Color"
            isRow={true}
            onSelect={(item) => setSelectedColor(item)}
          />
          <CustomItem
            selected={selectedMemory?.name}
            data={product?.optionsMemory || dataCustomItem2}
            title="Memory"
            onSelect={(item) => setSelectedMemory(item)}
          />
          <Row center between marginTop={"_40"}>
            <Text fontSize={18} color={"black"} fontWeight={"bold"}>
              Quantity
            </Text>
            <CustomControllerNums
              width={150}
              decreaseQuantity={decreaseQuantity}
              increaseQuantity={increaseQuantity}
              quantity={quantity}
            />
          </Row>
          <Comment productID={product?._id} />
        </Block>
      </ScrollView>
      <ActionBottomBar
        onAddToCart={() => checkValidate(handleAddCart)}
        onBuyNow={() => checkValidate(handleBuyNow)}
      />
    </MainContainer>
  );
};

export default DetailProduct;
