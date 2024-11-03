import React, { useState } from 'react';
import { localImages } from "@assets/icons/images";
import { Block, Icon, MainContainer, Row } from "@components";
import { StyleSheet,FlatList, TouchableOpacity } from "react-native";
import AppBar from "@features/common/common/appbar";
import Colors from "@theme/colors";
import { EDGES } from "@utils/helper";
import { ScrollView } from "react-native-virtualized-view";
import Text from "@components/text";
import ImgDetail from "./img_detail";
import CustomItem from "./custom_item";
import { NavigationProp, ParamListBase, useNavigation, useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import useProductDetail from "@hooks/common/use-get-product-detail";
import CustomControllerNums from './custom-conntroler-nums';
import useAddCart, { CartItem } from '@hooks/common/use-add-cart';
import { ROUTES } from '@navigation/config/routes';

type Item = {
    id: number;
    image: string;
}


const dataCustomItem = [
    { color: "#D4A490", name: "Gold" },
    { color: "#AEAFB4", name: "Silver" },
    { color: "#646464", name: "Grey" },

]

const dataCustomItem2 = [
    {  name: "215 GB" },
    {  name: "512 GB" },
    {  name: "1 TB" },
]
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
  paymentTransactions: {
    id: string;
    userId: string;
    orderId: string;
    paymentMethod: string;
    paymentStatus: string;
    _id: string;
    paymentDate: string;
  };
  totalBill: number;
  carts: CartItem[];
  orderDate: string;
}

const DetailProduct = () => {
    const route = useRoute<RouteProp<DetailProductParams, 'DetailProduct'>>();
    const { productId } = route.params;
    const { data: productDetail, isPending, error, isLoading } = useProductDetail(productId);
    const { addCart } = useAddCart();
    const navigation = useNavigation<NavigationProp<ParamListBase>>();



    const [quantity, setQuantity] = useState(1);

    const increaseQuantity = () => setQuantity(prev => prev + 1);
    const decreaseQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

    const data: Item[] = [
        { id: 1, image: productDetail?.image },
        { id: 2, image: productDetail?.image },
        { id: 3, image: productDetail?.image },
    ];

    const handleAddCart = () => {
        const orderData: OrderData = {
            customerId: "605c5b2e33f2e45b8b5d537f",
            customerName: "Thao",
            customerEmail: "thao@gmail.com",
            customerAddress: "123 Main St",
            customerPhoneNumber: 1234567890,
            paymentTransactions: {
                id: "transaction123",
                userId: "605c5b2e33f2e45b8b5d537f",
                orderId: "605c5b2e33f2e45b8b5d5380",
                paymentMethod: "credit card",
                paymentStatus: "completed",
                _id: "6724da62f0a671aa5f05bb2e",
                paymentDate: "2024-11-01T13:40:50.566Z"
            },
            totalBill: productDetail?.price || 0,
            carts: [
                {
                    productId,
                    productName: productDetail?.name || "",
                    quantity,
                    price: productDetail?.price || 0,
                    image: productDetail?.image || "",
                    description: productDetail?.description || ""
                }
            ],
            orderDate: new Date().toISOString()
        };

        addCart(orderData, {
            onSuccess: () => {
                
                // navigation.navigate(ROUTES.Home);
                console.log("Success");
            },
            onError: () => {
                console.log("Error");
            }
        });
    };

    return (
        <MainContainer style={{flex: 1, backgroundColor: Colors.background_fit_finder}} edges={EDGES.LEFT_RIGHT}>
            <AppBar 
            iconLeft = {true}
            iconRight = {true}
            iconRightName = "share"
            colorIconLeft = {Colors.black}
            colorIconRight = {Colors.black}
            isBackground = {false}
            />
            <ScrollView
            style={{flex: 1, paddingHorizontal: 26}}
            >
                <ImgDetail width={285} height={285} source={{ uri: productDetail?.image }}/>
                <Block marginTop={"_5"} alignSelf={"center"}/>
                <FlatList
                        data={data}
                        horizontal={true}
                        renderItem={({item}) => (
                        <ImgDetail width={44} height={44} source={{ uri: item.image }} isBackground={true}/>
                        )}
                        ItemSeparatorComponent={() => <Block style={{ width: 15 }} />} 
                        contentContainerStyle={{ justifyContent: 'center', flexGrow: 1 }} 
                    />
                    <Block marginTop={"_20"}/>
                    <Row center>
                        <Text fontSize={29} fontWeight={"bold"} color="black2A">
                            {productDetail?.name}
                        </Text>
                        <Block width={5}/>
                        <Text fontSize={12} fontWeight={"300"} color="black2A">
                            2021
                        </Text>
                    </Row>
                    <Block marginTop={"_10"}/>
                    <Text fontSize={21} fontWeight={"300"} color="blue_500">
                    {productDetail?.price}
                    </Text>
                    <Block marginTop={"_20"}/>
                    <CustomItem data={dataCustomItem} title="WARNA" isRow={true}/>
                    <Block marginTop={"_20"}/>
                    <CustomItem data={dataCustomItem2} title="PENYIMPANAN" />
                    <Block height={30}/>

                    <Block>
                    <Row center between>
                    <Block width={150} backgroundColor="gray136" borderRadius={"_28"} padding={"_10"}>
                       <CustomControllerNums decreaseQuantity={decreaseQuantity} increaseQuantity={increaseQuantity} quantity={quantity}/>
                        </Block>
                        <TouchableOpacity style={styles.buyButton} onPress={handleAddCart}>
                            <Text style={styles.buyButtonText}>Mua</Text>
                        </TouchableOpacity>
                    </Row>
                    </Block>
                    <Block height={100}/>

            </ScrollView>
        </MainContainer>
    );
};

const styles = StyleSheet.create({

    quantityText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    buyButton: {
        backgroundColor: '#E53935',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        height: 50,
        width: "50%",
    },
    buyButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        alignSelf: "center",
        fontSize: 16,
    },
});

export default DetailProduct;
