import { localImages } from "@assets/icons/images";
import { Block, Button, Input, MainContainer, Row, Text } from "@components";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth, useSignIn } from "@hooks/auth";
import useSignInGoogle from "@hooks/auth/use-signin-google";
import usePushNotification from "@hooks/root/use-push-notification";
import { ROUTES } from "@navigation/config/routes";
import { signInForm } from "@navigation/config/types";
import messaging from "@react-native-firebase/messaging";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import theme from "@theme";
import { EDGES } from "@utils/helper";
import { validateUser } from "@utils/validate";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { Image } from "react-native";

function Signin({ navigation }) {
  const { handleLoginSuccess } = useAuth();
  const { submit, submitting } = useSignIn();
  const { submit: signInByGoogle } = useSignInGoogle();
  const { submit: submitPushNotification } = usePushNotification();
  const {
    control,
    getValues,
    formState: { errors },
  } = useForm<signInForm>({
    resolver: zodResolver(validateUser),
    mode: "onChange",
    defaultValues: {
      email: __DEV__ ? "lehuyair@gmail.com" : "",
      password: __DEV__ ? "123" : "",
    },
  });

  const handleSignIn = async (type: "normal" | "google") => {
    if (Object.keys(errors).length > 0) {
      return;
    }
    const token = await messaging().getToken();
    const data = getValues();
    const userForm = { ...data, ...{ device_token: token } };

    const { accessToken, isSuccess, refreshToken, user } =
      type === "normal" ? await submit(userForm) : await signInByGoogle(token);
    if (isSuccess) {
      handleLoginSuccess({
        accessToken: accessToken,
        refreshToken: refreshToken,
        user: user,
      });
    }
  };

  // const handleSendNotification = async () => {
  //   const token = await messaging().getToken();
  //   await submitPushNotification({
  //     title: "Just One",
  //     body: "Working now",
  //     token,
  //   });
  // };

  return (
    <MainContainer edges={EDGES.LEFT_RIGHT}>
      <Block flex={1} mx="l" gap="_10" my={"_100"}>
        <Image
          style={{ width: "50%", resizeMode: "contain", alignSelf: "center" }}
          source={localImages().logo}
        />
        <Input
          name="email"
          label="Username"
          placeholder="Nhập email"
          labelStyle={{ fontSize: 14 }}
          control={control}
          error={errors.email?.message}
          showError={!!errors.email?.message}
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
          onPress={() => handleSignIn("normal")}
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
            onPress={() => navigation.navigate(ROUTES.SignUp)}
            label="Đăng ký"
            noneStyle
            textStyle={{ color: theme.colors.primary, fontWeight: "bold" }}
          />
        </Row>
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Standard}
          color={GoogleSigninButton.Color.Dark}
          onPress={() => handleSignIn("google")}
        />
      </Block>
    </MainContainer>
  );
}

export default memo(Signin);
