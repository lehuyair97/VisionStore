import { FlatList, StyleSheet, View } from "react-native";
import { Button, MainContainer, Text } from "@components";
import { EDGES } from "@utils/helper";
import Colors from "@theme/colors";
import AppBarSearch from "../component/appbar_serch";
import { useEffect, useState } from "react";
import ProductSearchItem from "../component/product-search-item";
import useSearch from "@hooks/common/use-search";
import Block from "@components/block";
import { ROUTES } from "@navigation/config/routes";
import { useNavigation, NavigationProp, ParamListBase } from "@react-navigation/native";


const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data:products, isLoading, search } = useSearch();

  const navigation = useNavigation<NavigationProp<ParamListBase>>();


  const handleNavigateToDetailProduct = (id: string) => {
    navigation.navigate(ROUTES.DetailProduct as keyof ParamListBase, {
      productId: id
    });
  };
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
      <Block height={16}/>
     {products ? <FlatList
        data={products}
        renderItem={({ item }) => <ProductSearchItem item={item} handleNavigateToDetailProduct={handleNavigateToDetailProduct} />}
        keyExtractor={(item) => item._id} 
      /> 
      : <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <Text fontSize={16} fontWeight="600" color="black2A">Không tìm thấy sản phẩm</Text>
      </View>}
    </MainContainer>
  );
}

export default Search;
