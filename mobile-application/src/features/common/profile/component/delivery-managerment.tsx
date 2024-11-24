import { Button, Icon, Input, MainContainer, Row, Text } from "@components";
import Block from "@components/block";
import ModalCustom from "@features/common/components/center-modal";
import DeliveryManagermentItem from "@features/common/components/delivery-managerment-item";
import AppBarCustom from "@features/common/home/component/appbar_custom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@hooks/auth";
import useRemoveAddress from "@hooks/common/use-delete-address";
import useUpdateAddress from "@hooks/common/use-update-address";
import { Helper } from "@utils/helper";
import { validNewAddress } from "@utils/validate";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Alert } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import AddressSelector from "./address-selector";
import DeliveryManagerActions from "./delivery-manager-action";
export default function DeliveryManagerment() {
  const refActionBottom = useRef<any>();
  const [isOpenModalNewAddress, setIsOpenModalNewAddress] =
    useState<boolean>(false);
  const { userInfo } = useAuth();
  const [selectedProvince, setSelectedProvince] = useState<any | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<any | null>(null);
  const [selectedWard, setSelectedWard] = useState<any | null>(null);
  const { updateAddress } = useUpdateAddress(userInfo?._id);
  const { removeAddress } = useRemoveAddress(userInfo?._id);
  const [addressSelected, setaddressSelected] = useState(null);
  type detailAddress = {
    detail: string;
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<detailAddress>({
    mode: "onChange",
    resolver: zodResolver(validNewAddress),
    defaultValues: {
      detail: "",
    },
  });
  const handleOpenAction = (item) => {
    setaddressSelected(item);
    setValue("detail", item?.detail);

    if (refActionBottom?.current) {
      refActionBottom.current.open();
    }
  };
  const handleAddnewAddress = async (formData) => {
    if (!selectedWard || !selectedDistrict || !selectedProvince) {
      Alert.alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    const location = `${selectedWard?.WardName} - ${selectedDistrict?.DistrictName} - Tỉnh ${selectedProvince?.ProvinceName} `;
    const newAddress = {
      detail: formData.detail,
      location: location,
      district_id: selectedDistrict?.DistrictID,
      ward_code: parseInt(selectedWard?.WardCode)
    }
    const address = {
      ...newAddress,
      isSelected: true,
      addressId: addressSelected?._id || null,
    };
    await updateAddress(address).then((data)=>{if(data?.isSuccess){
      setIsOpenModalNewAddress(false)
    }})
  };

  const handleActionpress = async (item: any) => {
    if (item?.action === "edit") {
      setIsOpenModalNewAddress(true);
    }
    if (item?.action === "delete") {
      await removeAddress({ addressId: addressSelected?._id });
    }
    if (item?.action === "setDefault") {
      await updateAddress({
        ...addressSelected,
        addressId: addressSelected?._id,
        isSelected: true,
      });
    }
    refActionBottom?.current.close();
  };
  return (
    <MainContainer>
      <Block flex={1}>
        <AppBarCustom
          title="Quản lý địa chỉ"
          iconLeft
          titleCenter
          isBackground
          paddingHorizontal={20}
          paddingVertical={10}
        />
        <Block mx={"_20"} mt={"_20"}>
          <FlatList
            data={userInfo?.address}
            keyExtractor={Helper.getKeyExtractor}
            renderItem={({ item }) => (
              <DeliveryManagermentItem
                location={item.location}
                isSelected={item?.isSelected}
                detail={item.detail}
                onPress={() => handleOpenAction(item)}
              />
            )}
          />
          <Button
            noneStyle
            onPress={() => {
              setaddressSelected(null);
              setIsOpenModalNewAddress(true);
            }}
          >
            <Row center justifyContent={"center"} gap={"_10"} my="_20">
              <Icon
                type="antDesign"
                name="pluscircleo"
                size={14}
                color={"#DF5454"}
              />
              <Text fontSize={14} fontWeight={"bold"} color="primary">
                Thêm địa chỉ mới
              </Text>
            </Row>
          </Button>
        </Block>
      </Block>
      <ModalCustom
        labelText="Thêm"
        isOpen={isOpenModalNewAddress}
        title="Nhập địa chỉ mới của bạn"
        handleClose={() => setIsOpenModalNewAddress(false)}
        handleSubmit={handleSubmit(handleAddnewAddress)}
      >
        <Block gap={"m"} width={"90%"}>
          <Input
            control={control}
            name="detail"
            error={errors.detail?.message}
            showError={!!errors.detail?.message}
            label="Địa chỉ chi tiết"
            placeholder="Số nhà - Tên đường"
          />
          <AddressSelector
            setSelectedWard={setSelectedWard}
            selectedWard={selectedWard}
            setSelectedDistrict={setSelectedDistrict}
            selectedDistrict={selectedDistrict}
            setSelectedProvince={setSelectedProvince}
            selectedProvince={selectedProvince}
          />
        </Block>
      </ModalCustom>
      <DeliveryManagerActions
        refRBSheet={refActionBottom}
        height={300}
        onActionPress={handleActionpress}
      />
    </MainContainer>
  );
}
