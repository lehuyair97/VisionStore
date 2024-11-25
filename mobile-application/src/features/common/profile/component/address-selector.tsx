import { Block, Text } from "@components";
import useGetDistricts from "@hooks/common/express-delivery/use-get-districts";
import useGetProvinces from "@hooks/common/express-delivery/use-get-provinces";
import useGetWards from "@hooks/common/express-delivery/use-get-wards";
import { Picker } from "@react-native-picker/picker";
import { StyleSheet } from "react-native";

const AddressSelector = ({
  selectedDistrict,
  setSelectedDistrict,
  selectedProvince,
  setSelectedProvince,
  selectedWard,
  setSelectedWard,
}) => {
  const { data: provinces, isLoading: loadingProvinces } = useGetProvinces();
  const { data: districts, isLoading: loadingDistricts } = useGetDistricts(
    selectedProvince?.ProvinceID || null
  );
  const { data: wards, isLoading: loadingWards, error } = useGetWards(
    selectedDistrict?.DistrictID || null
  );
  return (
    <Block style={styles.container}>
      <Block style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedProvince}
          onValueChange={(itemValue) => setSelectedProvince(itemValue)}
          enabled={!loadingProvinces}
          style={styles.picker}
        >
          <Picker.Item label="Chọn Tỉnh" value={null} />
          {provinces?.data?.map((province: any) => (
            <Picker.Item
              key={province?.ProvinceID}
              label={province?.ProvinceName}
              value={province}
            />
          ))}
        </Picker>
      </Block>
      <Block style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedDistrict}
          onValueChange={(itemValue) => setSelectedDistrict(itemValue)}
          enabled={!loadingDistricts && !!selectedProvince}
          style={styles.picker}
        >
          <Picker.Item label="Chọn Huyện" value={null} />
          {districts?.data?.map((district: any) => (
            <Picker.Item
              key={district?.DistrictID}
              label={district?.DistrictName}
              value={district}
            />
          ))}
        </Picker>
      </Block>
      <Block style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedWard}
          onValueChange={(itemValue) => setSelectedWard(itemValue)}
          enabled={!loadingWards && !!selectedDistrict}
          style={styles.picker}
        >
          <Picker.Item label="Chọn Xã" value={null} />
          {wards?.data?.map((ward: any) => (
            <Picker.Item
              key={ward?.WardCode}
              label={ward?.WardName}
              value={ward}
            />
          ))}
        </Picker>
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {},
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginVertical: 8,
  },
  picker: {
    height: 50,
    width: "100%",
  },
});

export default AddressSelector;
