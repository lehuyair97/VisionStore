import { Row, Text } from "@components";
import { Picker } from "@react-native-picker/picker";
import { StyleSheet } from "react-native";

const ConfigSelector = ({
  selectedConfig,
  setSelectedConfig,
}: {
  setSelectedConfig: (item: string) => void;
  selectedConfig: string;
}) => {
  const handleConfigChange = (value: string) => {
    setSelectedConfig(value);
    console.log("Config type selected:", value);
  };

  return (
    <Row center marginLeft={'_20'}>
      <Text color={"black"} fontWeight="bold" fontSize={16}>
        Cấu hình cho:
      </Text>

      <Picker
        selectedValue={selectedConfig}
        onValueChange={handleConfigChange}
        style={styles.picker}
      >
        <Picker.Item label="Developer" value="developer" />
        <Picker.Item label="Graphic Design" value="graphicDesign" />
        <Picker.Item label="Office" value="office" />
        <Picker.Item label="Gaming" value="gaming" />
      </Picker>
    </Row>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  picker: {
    height: 50,
    width: 220,
  },
  selectedConfig: {
    fontSize: 16,
  },
});

export default ConfigSelector;
