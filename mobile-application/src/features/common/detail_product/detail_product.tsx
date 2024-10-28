import { localImages } from "@assets/icons/images";
import { Block, Icon, MainContainer, Row } from "@components";
import { StyleSheet,FlatList } from "react-native";
import AppBar from "@features/common/common/appbar";
import Colors from "@theme/colors";
import { EDGES } from "@utils/helper";
import { ScrollView } from "react-native-virtualized-view";
import Text from "@components/text";
import ImgDetail from "./img_detail";
import CustomItem from "./custom_item";

type Item = {
    id: number;
    image: string;
}
const data: Item[] = [
    { id: 1, image: localImages().ic_mac },
    { id: 2, image: localImages().ic_mac },
    { id: 3, image: localImages().ic_mac },
];

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
const DetailProduct = () => (
    <MainContainer style={{flex: 1, backgroundColor: Colors.background_fit_finder}} edges={EDGES.LEFT_RIGHT}>
        <Block marginTop={"_5"} />
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
            <ImgDetail width={285} height={285}/>
            <Block marginTop={"_20"} alignSelf={"center"}/>
            <FlatList
                    data={data}
                    horizontal={true}
                    renderItem={({item}) => (
                    <ImgDetail width={44} height={44} source={item.image} isBackground={true}/>
                    )}
                    ItemSeparatorComponent={() => <Block style={{ width: 15 }} />} 
                    contentContainerStyle={{ justifyContent: 'center', flexGrow: 1 }} 
                />
                <Block marginTop={"_20"}/>
                <Row center>
                    <Text fontSize={29} fontWeight={"bold"} color="black2A">
                        MacBook Air M1
                    </Text>
                    <Block width={5}/>
                    <Text fontSize={12} fontWeight={"300"} color="black2A">
                        2021
                    </Text>
                </Row>
                <Block marginTop={"_10"}/>
                <Text fontSize={21} fontWeight={"300"} color="blue_500">
                Rp 20.999.000
                </Text>
                <Block marginTop={"_20"}/>
                <CustomItem data={dataCustomItem} title="WARNA" isRow={true}/>
                <Block marginTop={"_20"}/>
                <CustomItem data={dataCustomItem2} title="PENYIMPANAN" />
                <Block height={100}/>
        </ScrollView>
    </MainContainer>
);

const styles = StyleSheet.create({

});

export default DetailProduct;
