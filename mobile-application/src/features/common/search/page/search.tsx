import MainContainer from "@components/main-container";
import Text from "@components/text";

import Block from "@components/block";
import useSearch from "@hooks/common/use-search";
import { ROUTES } from "@navigation/config/routes";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import { EDGES } from "@utils/helper";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import AppBarSearch from "../component/appbar_serch";
import ProductSearchItem from "../component/product-search-item";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: products, isLoading, search } = useSearch();

  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const handleNavigateToDetailProduct = (item: any) => {
    navigation.navigate(ROUTES.DetailProduct as keyof ParamListBase, {
      productId: item?._id,
    });
  };
  const handleSearch = () => {
    if (searchTerm.trim()) {
      search(searchTerm);
    } else {
    }
  };
  useEffect(() => {}, [products]);
  return (
    <MainContainer edges={EDGES.FULL}>
      <AppBarSearch
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearch={handleSearch}
      />
      <Block height={16} />
      {products ? (
        <FlatList
          data={products}
          renderItem={({ item }) => (
            <ProductSearchItem
              item={item}
              onPress={handleNavigateToDetailProduct}
            />
          )}
          keyExtractor={(item) => item._id}
        />
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text fontSize={16} fontWeight="600" color="black2A">
            Không tìm thấy sản phẩm
          </Text>
        </View>
      )}
    </MainContainer>
  );
};

export default Search;
