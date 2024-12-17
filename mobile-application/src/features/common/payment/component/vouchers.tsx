import { Block, Icon, Row, Text } from "@components";
import React, { useEffect, useState } from "react";
import useGetActiveVoucher from "@hooks/common/use-get-voucher-active";
import BottomSheet from "@features/common/components/bottom-sheet";
import SearchView from "@features/common/build-pc/components/search-app-bar";
import { ActivityIndicator, FlatList } from "react-native";
import { Helper } from "@utils/helper";
import Voucher from "@features/common/components/voucher-item";
interface VouchersProp {
  height?: number;
  refRBSheet: React.RefObject<any>;
  onVoucherSelected: (voucher: any) => void;
}
export default function Vouchers({
  height,
  refRBSheet,
  onVoucherSelected,
}: VouchersProp) {
  const { data, isPending } = useGetActiveVoucher();
  const [filterData, setFilterData] = useState([]);
  useEffect(() => {
    setFilterData(data);
  }, [data]);

  const handleFilter = () => {
    if (!value || value.trim() === "") {
      setFilterData(data);
      return;
    }
    const filtered = data.filter((f) =>
      f.title.toLowerCase().startsWith(value.toLowerCase())
    );
    setFilterData(filtered);
  };
  const [value, setValues] = useState<string>();
  return (
    <BottomSheet height={height} refRBSheet={refRBSheet}>
      <Block>
        <Row center between m={"_20"}>
          <Text color={"black"} fontSize={16} fontWeight={"bold"}>
            Chọn Voucher
          </Text>
          <Icon type="entypo" name="chevron-down" color={"black"} size={24} />
        </Row>
        <SearchView
          keyboardType="default"
          textPlaceHolder="Nhập mã voucher"
          onValueChange={setValues}
          textValue={value}
          onPress={handleFilter}
          buttonTitle="Áp dụng"
        />
        {isPending ? (
          <Block flex={1} justifyContent={"center"} alignItems={"center"}>
            <ActivityIndicator />
          </Block>
        ) : (
          <Block style={{ paddingBottom: 230, paddingTop: 10 }}>
            <FlatList
              data={filterData}
              keyExtractor={Helper.getKeyExtractor}
              scrollEnabled={true}
              renderItem={({ item }: any) => (
                <Voucher
                  content={item?.description}
                  discountType={item?.type}
                  title={item?.title}
                  discount={item?.discount}
                  validity={item?.expiration_date}
                  onUse={() => onVoucherSelected(item)}
                />
              )}
            />
          </Block>
        )}
      </Block>
    </BottomSheet>
  );
}
