import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from '@components';
import Colors from '@theme/colors';

const InputSearch = ({ searchTerm, setSearchTerm, onSearch }: { searchTerm: string, setSearchTerm: (searchTerm: string) => void, onSearch: () => void }) => {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const previousSearchTerm = useRef(searchTerm);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (debouncedSearchTerm.trim() && debouncedSearchTerm !== previousSearchTerm.current) {
        onSearch();
        previousSearchTerm.current = debouncedSearchTerm;
      }
    }, 600);

    return () => {
      clearTimeout(handler);
    };
  }, [debouncedSearchTerm, onSearch]);

  const handleChangeText = (text: string) => {
    setSearchTerm(text);
    setDebouncedSearchTerm(text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search"
        placeholderTextColor="#3E2723"
        value={searchTerm}
        onChangeText={handleChangeText}
        onSubmitEditing={onSearch}
      />

      <Icon type="fontAwesome5" name="camera" size={20} color="#3E2723" style={styles.leftIcon} />

      <TouchableOpacity style={styles.rightIcon} onPress={onSearch}>
        <Icon type="fontAwesome5" name="search" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8E1E1',
    borderRadius: 10,
    margin: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: '#3E2723',
  },
  leftIcon: {
    marginRight: 10,
  },
  rightIcon: {
    paddingVertical: 9,
    paddingHorizontal: 10,
    backgroundColor: Colors.primary,
    borderRadius: 10,
  },
});

export default InputSearch;