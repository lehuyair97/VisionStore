import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, FlatList, Row, Block } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { localImages } from "../utils/images";
import { TextHome } from "../components/TextHome";

const ProductBrand = ({ data, handleNavigateToDetailProduct }) => {
    const [imageError, setImageError] = useState(true);
    const renderItem = ({ item, index }) => (
        <TouchableOpacity onPress={() => handleNavigateToDetailProduct()}>
            <View style={{ marginHorizontal: 10 }}>
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

    return (
        <View>
            {data.map((item, index) => (
                <View key={index}>
                    <Row between style={{ paddingHorizontal: 4 }}>
                        <TextHome>{item.brand}</TextHome>
                        <Text style={{ color: Colors.primary, fontWeight: "light", fontSize: 12 }}>xem thêm</Text>
                    </Row>
                    <Block height={3} />
                    <FlatList
                        numColumns={2}
                        data={item.products}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        contentContainerStyle={styles.listContainer}
                        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                    />
                </View>
            ))}
        </View>
    );
}

// ... existing code ... 