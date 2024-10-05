import Block from "@components/block";
import Colors from "@theme/colors";
import React from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import TextHome from "./text_home";
import { Row } from "@components";

const data = [ // Tạo dữ liệu cho FlatList
    { id: '1', name: 'MacBook Pro', year: '2021', price: '$129,009', image: require('../../../../assets/icons/mac.png') },
    { id: '2', name: 'MacBook Air', year: '2020', price: '$99,900', image: require('../../../../assets/icons/mac.png') },
    { id: '3', name: 'iMac', year: '2021', price: '$179,009', image: require('../../../../assets/icons/mac.png') },
    { id: '4', name: 'Mac Mini', year: '2020', price: '$69,900', image: require('../../../../assets/icons/mac.png') },
    // Thêm các mục khác nếu cần
];

const ListMac = () => {
    const renderItem = ({ item, index }) => (
        <View style={styles.itemContainer}>
            <Image source={item.image} style={styles.image} />
            <Block style={styles.block_text}>
                <Text style={styles.year}>{item.year}</Text>
            </Block>
            <Text style={styles.title}>{item.name}</Text>
            <Block height={10} />
            <Block style={[styles.block_text, { height: 40, paddingHorizontal: 30, borderRadius: 17 }]}>
                <Text style={styles.price}>{item.price}</Text>

            </Block>
            <Block height={5} />

        </View>
    );

    return (
        <View>
            <Row between style={{paddingHorizontal: 4}}>
                <TextHome>Macbook</TextHome>
                <Text style={{color: Colors.primary, fontWeight: "light", fontSize: 12}}>xem thêm</Text>
            </Row>
            <Block height={3}/>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={2} // Đặt số cột là 2
                contentContainerStyle={styles.listContainer} // Style cho FlatList
            />
        </View>

    );
}

const styles = StyleSheet.create({
    listContainer: {
        padding: 0,
    },
    block_text: {
        backgroundColor: Colors.container, height: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10
    },
    itemContainer: {
        flex: 1,
        backgroundColor: '#F0F0F0',
        borderRadius: 10,
        alignItems: 'center',
        margin: 6

    },
    image: {
        width: 100,
        height: 90,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 5,
        color: Colors.primary
    },
    year: {
        fontSize: 8,
        color: Colors.primary,
        fontWeight: "bold"
    },
    price: {
        fontSize: 14,
        color: Colors.primary,
        fontWeight: 'bold',
    },
});

export default ListMac;