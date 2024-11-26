import { Button, Row } from "@components";
import { TextInput } from "@components/text-input";
import { makeStyles } from "@theme";

type SearchAppBarProps = {
  textValue: string;
  onValueChange: (value: string) => void;
  buttonTitle: string;
  textPlaceHolder: string;
  onPress: () => void
};
export default function SearchAppBar({
  textValue,
  onValueChange,
  buttonTitle,
  textPlaceHolder,
  onPress
}: SearchAppBarProps) {
  const style = useStyle();
  return (
    <Row center mx={"m"} gap={"_10"}>
      <TextInput
      keyboardType="number-pad"
        value={textValue}
        style={style.textInput}
        containerStyle={{
          flex: 1,
        }}
        inputContainerStyle={{
          borderRadius: 16,
          borderColor: "red",
          borderWidth: 1,
        }}
        
        placeholder={textPlaceHolder}
        onChangeText={onValueChange}
      />
      <Button onPress={onPress} label={buttonTitle} />
    </Row>
  );
}

const useStyle = makeStyles((theme) => ({
  textInput: {
    backgroundColor: theme.colors.whiteF8,
    height: 40,
  },
}));
