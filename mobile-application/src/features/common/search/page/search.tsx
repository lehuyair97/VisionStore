import { StyleSheet, View } from "react-native";
import { Button, MainContainer, Text } from "@components";
import { EDGES } from "@utils/helper";
import Colors from "@theme/colors";
import AppBarSearch from "../component/appbar_serch";
import { useEffect, useState } from "react";

import useSearch from "@hooks/common/use-search";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("product");
  const { data:products, isLoading, search } = useSearch();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      search(searchTerm);
    } else {
      console.log("Search term is empty");
    }
  };

  useEffect(() => {
    console.log("datanew", products); // Kiểm tra dữ liệu sau khi tìm kiếm
  }, [products]);




  return (
    <MainContainer edges={EDGES.FULL} >
      <AppBarSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearch={handleSearch} />
      <Text color="black18">search</Text>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        products && products.map(product => (
          <Text key={product._id}>{product.name}</Text> // Hiển thị tên sản phẩm
        ))
      )}
    </MainContainer>
  );
}

export default Search;
