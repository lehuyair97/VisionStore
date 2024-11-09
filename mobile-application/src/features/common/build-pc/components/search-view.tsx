import { Button, Row } from "@components";
import { TextInput } from "@components/text-input";
import { makeStyles } from "@theme";

export default function SearchView() {
  const style = useStyle();
  return (
    <Row center>
      <TextInput
        style={style.textInput}
        containerStyle={{ flex: 1 }}
        placeholder="Nhập giá tiền bạn muốn build"
      />
      <Button label="Build" />
    </Row>
  );
}

const useStyle = makeStyles((theme) => ({
  textInput: {
    backgroundColor: theme.colors.whiteF8,
    height: 40,
  },
}));
