import Block from "@components/block";
import Colors from "@theme/colors";
import React from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";
import TextHome from "./text_home";
import { Row } from "@components";
import { localImages } from "@assets/icons/images";

interface ListMacProps {
    handleNavigateToDetailProduct: (id: string) => void;
    selectedBrandName: string;
    data: { brand: string; products: any[] }[]; // Thêm 'brand' vào đây

}

const ProductBrand = ({ data, handleNavigateToDetailProduct ,selectedBrandName}: ListMacProps) => {
    const [imageError, setImageError] = React.useState(true);
    console.log("data", JSON.stringify(data, null, 2));
    const renderItem = ({ item, index }) => (
        <TouchableOpacity onPress={() => handleNavigateToDetailProduct(item._id)}>
        <View style={{ marginRight:90 }}>
            <View style={styles.itemContainer}>
                {imageError ? (
                    <View >
                        <Image source={localImages().ic_mac} style={styles.image} />
                    </View>
                ) : (
                    <Image
                        source={{ uri: item.image }}
                        style={styles.image}
                        onError={() => setImageError(true)}
                    />
                )}
                <Block style={styles.block_text}>
                    <Text style={styles.year}>{item.warrantyPeriod}</Text>
                </Block>
                <Text style={styles.title}>{item.name}</Text>
                <Block height={10} />
                <Block style={[styles.block_text, { height: 40, paddingHorizontal: 30, borderRadius: 17 }]}>
                    <Text style={styles.price}>{item.price}</Text>
                </Block>
                <Block height={10} />
            </View>
        </View>
        </TouchableOpacity>
    );


    return (
        <View>
            {data.map((item, index) => (
                <View key={index}>
                    <Row between style={{ paddingHorizontal: 4 }}>
                        <TextHome>{selectedBrandName}</TextHome>
                        <Text style={{ color: Colors.primary, fontWeight: "light", fontSize: 12 }}>xem thêm</Text>
                    </Row>
                    <Block height={3} />
                    <FlatList
                        numColumns={2}
                        data={item.products}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        contentContainerStyle={styles.listContainer}
                    />
                </View>
            ))}
        </View>

    );
}

const styles = StyleSheet.create({
    listContainer: {
        padding: 0,
    },
    block_text: {
        backgroundColor: Colors.container,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    itemContainer: {
        flex: 1,
        backgroundColor: '#F0F0F0',
        borderRadius: 10,
        alignItems: 'center',
        margin: 6,
        width: '150%',
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

export default ProductBrand;
