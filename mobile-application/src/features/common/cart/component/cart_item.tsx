import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from '@components';
import Block from '@components/block';
import Colors from '@theme/colors';
import { Cart } from '@hooks/common/use-cart';

interface CartItemProps {
  item: Cart;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const CartItem = ({ item, isSelected, onSelect }: CartItemProps) => {
  const product = item.carts && item.carts[0];

  if (!product) {
    return <Text>Product information is not available</Text>;
  }

  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={() => onSelect(item._id)} style={styles.checkbox}>
        <Icon
          type="fontAwesome"
          name={isSelected ? 'check-square' : 'square'}
          size={24}
          color={isSelected ? Colors.primary : Colors.text}
        />
      </TouchableOpacity>
      <Block mr={"_10"}/>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Block mr={"_15"}/>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{product.productName}</Text>
        <Block mt={"_5"}/>
        <Text style={styles.description}>{product.description}</Text>
        <Block mt={"_5"}/>
        <Text style={styles.price}>{product.price} đ</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
    paddingVertical:10
  },
  checkbox: {
    marginRight: 5,
  },
  image: {
    width: 70,
    height: 70,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  price: {
    fontSize: 14,
    color: 'red',
  },
});

export default CartItem;