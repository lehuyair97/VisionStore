import Block from "@components/block";
import Colors from "@theme/colors";
import React from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import TextHome from "./text_home";
import { Row } from "@components";

interface ListMacProps {
    data: any[];
  }

const ListMac = ({ data }: ListMacProps) => {
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
            <Block height={10} />

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