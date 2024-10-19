import React, { useState } from 'react';
import { FlatList } from 'react-native';
import CartItem from './cart_item';

const products = [
  { id: '1', name: 'Ram Corsair Vengeance RGB RS DDR4', description: 'Ram 8gb', price: '850.000', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_YVXBVcBdt6OTYbMteseyBFEGLcQ26wdfEg&s' },
  { id: '2', name: 'CPU Intel Core i5 12400F', description: 'Core i5', price: '3.090.000', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_YVXBVcBdt6OTYbMteseyBFEGLcQ26wdfEg&s' },
  { id: '3', name: 'Mainboard Asus TUF Gaming B760M-PLUS Wifi D4', description: 'B760M-PLUS', price: '3.890.000', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_YVXBVcBdt6OTYbMteseyBFEGLcQ26wdfEg&s' },
  { id: '4', name: 'Chuột Logitech G703 Lightspeed Wireless', description: 'G703', price: '2.290.000', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_YVXBVcBdt6OTYbMteseyBFEGLcQ26wdfEg&s' },
  { id: '5', name: 'Tai nghe Logitech G733 Lightspeed Wireless Black', description: 'G733', price: '3.000.000', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_YVXBVcBdt6OTYbMteseyBFEGLcQ26wdfEg&s' },
];

const ListCart = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

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
      keyExtractor={item => item.id}
      contentContainerStyle={{marginHorizontal: 20}}
      renderItem={({ item }) => (
        <CartItem
          item={item}
          isSelected={selectedItems.includes(item.id)}
          onSelect={toggleSelect}
          
        />
      )}
    />
  );
}

export default ListCart;