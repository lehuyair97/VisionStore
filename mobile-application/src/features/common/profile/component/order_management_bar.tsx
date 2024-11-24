import React, { useState } from "react";
import { MainContainer, Row } from "@components";
import Text from "@components/text";
import { EDGES } from "@utils/helper";
import { commonStyles } from "../styles/styles";
import { StyleSheet, FlatList, View } from "react-native";
import Colors from "@theme/colors";
import Block from "@components/block";
import RenderItem from "@features/common/profile/component/renderitem";

interface OrderManagementProps {
  data: any;
}

const OrderManagement = ({ data }: OrderManagementProps) => {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <MainContainer edges={EDGES.LEFT_RIGHT} style={[commonStyles.container]}>
      <Row between>
        <Text style={commonStyles.title}>Đơn hàng của tôi</Text>
        <Text style={styles.textR}>Đơn hàng</Text>
      </Row>
      <Block mt="_5" />
      <View style={{ justifyContent: "center", alignItems: "flex-start" }}>
        <FlatList
          data={data}
          renderItem={({ item, index }) => (
            <RenderItem
              item={item}
              index={index}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
            />
          )}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 0 }}
        />
      </View>
    </MainContainer>
  );
};

export default OrderManagement;

const styles = StyleSheet.create({
  textR: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: "400",
  },
});
