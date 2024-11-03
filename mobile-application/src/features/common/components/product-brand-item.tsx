import React, { useState } from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";
import Block from "@components/block";
import Colors from "@theme/colors";
import { localImages } from "@assets/icons/images";

interface ProductBrandItemProps {
    item: any;
    handleNavigateToDetailProduct: (id: string) => void;
}

const ProductBrandItem = ({ item, handleNavigateToDetailProduct }: ProductBrandItemProps) => {
    const [imageError, setImageError] = useState(false);

    console.log("item", item);

    return (
        <TouchableOpacity style={{ width: '51%' }} onPress={() => handleNavigateToDetailProduct(item._id)}>
            <View style={{ marginRight: 90 }}>
                <View style={styles.itemContainer}>
                    {imageError ? (
                        <View>
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
};

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
        margin: 10,
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

export default ProductBrandItem;
