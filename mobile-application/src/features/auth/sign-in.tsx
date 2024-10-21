import { Image } from "react-native";
import { memo } from "react";
import { MainContainer, Input, Block, Button, Text, Row } from "@components";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { validateUser } from "@utils/validate";
import { signInForm } from "@navigation/config/types";
import { EDGES } from "@utils/helper";
import { localImages } from "@assets/icons/images";
import { useAuth, useSignIn } from "@hooks/auth";
import theme from "@theme";

function Signin() {
  const { handleLoginSuccess } = useAuth();
  const { submit, submitting } = useSignIn();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<signInForm>({
    resolver: zodResolver(validateUser),
    mode: "onChange",
    defaultValues: {
      username: __DEV__ ? "lehuypro97" : "",
      password: __DEV__ ? "Lehuypro97@" : "",
    },
  });

  const handleSignIn = async (data: signInForm) => {
    const { data: dataSignIn, success, accessToken } = await submit(data);
    if (success) {
      handleLoginSuccess({ accessToken: accessToken, user: dataSignIn?.user });
    }
  };

  return (
    <MainContainer edges={EDGES.LEFT_RIGHT}>
      <Block flex={1} mx="l" gap="_10" my={"_100"}>
        <Image
          style={{ width: "50%", resizeMode: "contain", alignSelf: "center" }}
          source={localImages().logo}
        />
        <Input
          name="username"
          label="Username"
          placeholder="Nhập email"
          labelStyle={{ fontSize: 14 }}
          control={control}
          error={errors.username?.message}
          showError={!!errors.username?.message}
        />
        <Input
          name="password"
          label="Password"
          placeholder="Nhập mật khẩu"
          labelStyle={{ fontSize: 14 }}
          control={control}
          error={errors.password?.message}
          showError={!!errors.password?.message}
          secureTextEntry={true}
        />
        <Button
          buttonStyle={{ marginTop: 30 }}
          label="Đăng nhập"
          textStyle={{ color: "white" }}
          onPress={handleSubmit(handleSignIn)}
          isLoadding={submitting}
        />
        <Row center alignSelf="center" gap={"_20"} my={"_30"}>
          <Button noneStyle>
            <Image
              style={{
                width: 55,
                height: 55,
                resizeMode: "stretch",
                borderRadius: 55,
              }}
              source={localImages().ic_google}
            />
          </Button>
          <Button noneStyle>
            <Image
              style={{
                width: 55,
                height: 55,
                borderRadius: 55,
                resizeMode: "stretch",
              }}
              source={localImages().ic_facebook}
            />
          </Button>
        </Row>
        <Row justifyContent="center">
          <Text
            fontWeight="bold"
            textAlign="center"
            color="black"
            fontSize={14}
          >
            Bạn đã có tài khoản?
          </Text>
          <Button
            label="Đăng ký"
            noneStyle
            textStyle={{ color: theme.colors.primary, fontWeight: "bold" }}
          />
        </Row>
      </Block>
    </MainContainer>
  );
}

export default memo(Signin);