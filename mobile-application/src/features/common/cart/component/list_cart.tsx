import React, { useState } from 'react';
import { FlatList } from 'react-native';
import CartItem from './cart_item';
import { Cart } from '@hooks/common/use-cart';
import Text from '@components/text';
import useQuantity from '@hooks/common/util/useQuantity';


interface ListCartProps {
  products: Cart[];
  selectedItems: string[];
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
  onUpdateTotalPrice: (id: string, price: number) => void;
}

const ListCart = ({ products, selectedItems, setSelectedItems, onUpdateTotalPrice }: ListCartProps) => {

  const toggleSelect = (id: string) => {
    setSelectedItems(prevSelected =>
      prevSelected.includes(id)
        ? prevSelected.filter(item => item !== id)
        : [...prevSelected, id]
    );
  };

  return (
    <FlatList
      data={products}
      keyExtractor={item => item._id || Math.random().toString()}
      contentContainerStyle={{ marginHorizontal: 20 }}
      style={{ marginBottom: 100 }}
      renderItem={({ item }) => {
        const product = item.carts && item.carts[0];

        if (!product) {
          return <Text>No products available</Text>;
        }


        return (
          <CartItem

            item={item}
            isSelected={selectedItems.includes(item._id)}
            onSelect={toggleSelect}
            onUpdateTotalPrice={onUpdateTotalPrice}
          />
        );
      }}
    />
  );
}

export default ListCart;