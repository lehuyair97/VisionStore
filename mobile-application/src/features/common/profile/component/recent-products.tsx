import { MainContainer } from "@components";
import Block from "@components/block";
import EmptyData from "@features/common/components/empty-data";
import ProductItem from "@features/common/components/product-item";
import AppBarCustom from "@features/common/home/component/appbar_custom";
import { commonStyles } from "@features/common/profile/styles/styles";
import { useAuth } from "@hooks/auth";
import useGetRecentProducts from "@hooks/common/use-get-recent-products";
import { EDGES, Helper } from "@utils/helper";
import { FlatList } from "react-native";
const RecentProducts = () => {
  const { userInfo } = useAuth();
  const { data: recentProducts } = useGetRecentProducts(userInfo?._id);

  return (
    <MainContainer edges={EDGES.LEFT_RIGHT} style={commonStyles.container}>
      <AppBarCustom
        title="Xem gần đây"
        iconLeft
        titleCenter
        isBackground
        paddingHorizontal={20}
        paddingVertical={10}
      />
      <Block mt={"_20"} mb={'_60'}>
        {recentProducts?.recent_products ? (
          <FlatList
            data={recentProducts?.recent_products}
            keyExtractor={Helper.getKeyExtractor}
            renderItem={(item) => {
              return <ProductItem item={item} isRecent />;
            }}
          />
        ) : (
          <EmptyData content="Gần đây bạn không theo dõi đơn hàng nào" />
        )}
      </Block>
    </MainContainer>
  );
};

export default RecentProducts;
