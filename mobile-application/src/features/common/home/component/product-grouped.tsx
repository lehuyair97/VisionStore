import Block from "@components/block";
import Colors from "@theme/colors";
import React from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";
import TextHome from "./text_home";
import { Row } from "@components";
import { localImages } from "@assets/icons/images";

interface Product {
  _id: string;
  image: string;
  warrantyPeriod: string;
  name: string;
  price: number | string;
}

interface ListMacProps {
  handleNavigateToDetailProduct: (id: string) => void;
  data: { 
    brand: string;
    products: Product[];
  }[];
}

const ProductGrouped = ({ data, handleNavigateToDetailProduct }: ListMacProps) => {
  const [imageError, setImageError] = React.useState(true);
  
  const renderItem = React.useCallback(({ item }: { item: Product }) => (
    <TouchableOpacity onPress={() => handleNavigateToDetailProduct(item._id)}>
      <View style={{ marginHorizontal: 10 }}>
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
  ), [handleNavigateToDetailProduct]);

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
            horizontal={true}
            data={item.products}
            renderItem={renderItem}
            keyExtractor={item => item._id}
            contentContainerStyle={styles.listContainer} // Style cho FlatList
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
    backgroundColor: Colors.container, height: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10
  },
  itemContainer: {
    width: 165,
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

export default ProductGrouped;
