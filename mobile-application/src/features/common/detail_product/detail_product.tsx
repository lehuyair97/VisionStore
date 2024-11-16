import { Block, MainContainer, Row } from "@components";
import Text from "@components/text";
import AppBar from "@features/common/common/appbar";
import useAddCart, { CartItem } from "@hooks/common/use-add-cart";
import useProductDetail from "@hooks/common/use-get-product-detail";
import useQuantity from "@hooks/common/util/useQuantity";
import { RouteProp, useRoute } from "@react-navigation/native";
import Colors from "@theme/colors";
import { EDGES } from "@utils/helper";
import { useState } from "react";
import { FlatList } from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import ActionBottomBar from "./components/bottom-action-bar";
import Comment from "./components/comment";
import CustomControllerNums from "./custom-conntroler-nums";
import CustomItem from "./custom_item";
import ImgDetail from "./img_detail";
import { useAuth } from "@hooks/auth";
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

interface OrderData {
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerAddress: string;
  customerPhoneNumber: number;
  optionsColor: string;
  optionsMemory: string;
  paymentTransactions: {
    id: string;
    userId: string;
    orderId: string;
    paymentMethod: string;
    paymentStatus: string;
    _id: string;
    paymentDate: string;
  };
  totalBill?: number;
  carts: CartItem[];
  orderDate: string;
}

const DetailProduct = () => {
  const route = useRoute<RouteProp<DetailProductParams, "DetailProduct">>();
  const { productId } = route.params;
  const { userInfo } = useAuth();
  const {
    data: productDetail,
    isPending,
    error,
    isLoading,
  } = useProductDetail(productId);
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
    { id: 1, image: productDetail?.image },
    { id: 2, image: productDetail?.image },
    { id: 3, image: productDetail?.image },
  ];

  const handleAddCart = () => {
    const orderData: any = {
      customerId: userInfo?._id,
      productId,
      quantity

    };

    addCart(orderData, {
      onSuccess: () => {
        console.log("Success");
      },
      onError: () => {
        console.log("Error");
      },
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
      <AppBar
        iconLeft={true}
        iconRight={true}
        iconRightName="share"
        colorIconLeft={Colors.black}
        colorIconRight={Colors.black}
        isBackground={false}
      />
      <ScrollView style={{ flex: 1, paddingHorizontal: 26 }}>
        <ImgDetail
          width={285}
          height={285}
          source={{ uri: productDetail?.image }}
        />
        <Block marginTop={"_5"} alignSelf={"center"} />
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
        <Row center marginTop={"_20"}>
          <Text fontSize={29} fontWeight={"bold"} color="black2A">
            {productDetail?.name}
          </Text>
          <Block width={10} />
          <Text fontSize={12} fontWeight={"300"} color="black2A">
            {productDetail?.warrantyPeriod}
          </Text>
        </Row>
        <Text
          fontSize={21}
          fontWeight={"300"}
          color="blue_500"
          marginTop={"_10"}
        >
          {productDetail?.price}
        </Text>
        <CustomItem
          selected={selectedColor?.name}
          data={productDetail?.optionsColor || dataCustomItem}
          title="Color"
          isRow={true}
          onSelect={(item) => setSelectedColor(item)}
        />
        <CustomItem
          selected={selectedMemory?.name}
          data={productDetail?.optionsMemory || dataCustomItem2}
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
        <Comment productID={productId} />
      </ScrollView>
      <ActionBottomBar onAddToCart={handleAddCart} onBuyNow={() => {}} />
    </MainContainer>
  );
};

export default DetailProduct;
