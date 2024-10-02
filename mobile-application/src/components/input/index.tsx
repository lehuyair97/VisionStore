import { NativeSyntheticEvent, TextInputFocusEventData } from "react-native";

import { Controller } from "react-hook-form";
import { TextInput } from "../text-input";
import { makeStyles } from "@theme";
import { FormInputProps } from "./type";

const FormInput = (props: FormInputProps) => {
  const { name, error, control, required = true, ...rest } = props;

  const styles = useStyles();

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value, ref },
        fieldState: { error: fieldError },
      }) => (
        <TextInput
          {...rest}
          ref={ref}
          required={required}
          style={styles.inputStyle}
          value={value}
          onChangeText={(text: string) => {
            onChange(text);
            props.onChangeText && props.onChangeText(text);
          }}
          onBlur={(e: NativeSyntheticEvent<TextInputFocusEventData>) => {
            onBlur();
            props.onBlur && props.onBlur(e);
          }}
          keyboardAppearance="dark"
          error={fieldError && (error || fieldError?.message)}
        />
      )}
      defaultValue=""
    />
  );
};

export default FormInput;

const useStyles = makeStyles((theme) => ({
  inputStyle: {
    height: theme.spacing._40,
    color: theme.colors.title,
    fontSize: 14,
    backgroundColor: "transparent",
  },
}));
