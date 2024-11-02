import React, { useState } from 'react';
import { FlatList } from 'react-native';
import CartItem from './cart_item';
import { Cart } from '@hooks/common/use-cart';
import Text from '@components/text';


interface ListCartProps {
  products: Cart[];
  selectedItems: string[];
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
}

const ListCart = ({ products, selectedItems, setSelectedItems }: ListCartProps) => {
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
      renderItem={({ item }) => (
        item ? (
          <CartItem
            item={item}
            isSelected={selectedItems.includes(item._id)}
            onSelect={toggleSelect}
          />
        ) : <Text>No products available</Text>
      )}
    />
  );
}

export default ListCart;