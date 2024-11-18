import { Button, Input, MainContainer, Text } from "@components";
import Block from "@components/block";
import AppBarCustom from "@features/common/home/component/appbar_custom";
import { commonStyles } from "@features/common/profile/styles/styles";
import { EDGES } from "@utils/helper";
import { useForm } from "react-hook-form";
import { useAuth } from "@hooks/auth";
import useChangePassword from "@hooks/common/use-change-password";
import { zodResolver } from "@hookform/resolvers/zod";
import { validateChangePW } from "@utils/validate";
interface ChangePasswordForm {
  oldPassword: string;
  newPassword: string;
}

const ChangePassword = () => {
  const { userInfo } = useAuth();
  const { changePassword, data } = useChangePassword(userInfo?._id);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordForm>({
    mode: "onChange",
    resolver: zodResolver(validateChangePW),
  });

  const handleChangePassword = async (data) => {
    const res = await changePassword(data);
  };
  return (
    <MainContainer edges={EDGES.LEFT_RIGHT} style={commonStyles.container}>
      <AppBarCustom
        title="Đổi mật khẩu"
        iconLeft
        titleCenter
        isBackground
        paddingHorizontal={20}
        paddingVertical={10}
      />
      <Block mx={"_20"} mt={"_20"}>
        <Input
          name="oldPassword"
          label="Mật hiện tại"
          placeholder="Nhập mật khẩu hiện tại"
          labelStyle={{ fontSize: 14 }}
          control={control}
          error={errors.oldPassword?.message}
          showError={!!errors.oldPassword?.message}
          secureTextEntry={true}
        />
        <Input
          name="newPassword"
          label="Mật khẩu mới"
          placeholder="Nhập mật khẩu mới"
          labelStyle={{ fontSize: 14 }}
          control={control}
          error={errors.newPassword?.message}
          showError={!!errors.newPassword?.message}
          secureTextEntry={true}
        />
        {data?.isSuccess === false && (
          <Text mt={"s"} color={"red_500"}>
            {data?.message}
          </Text>
        )}

        <Button
          buttonStyle={{ marginTop: 30 }}
          label="Đổi mật khẩu"
          textStyle={{ color: "white" }}
          onPress={handleSubmit(handleChangePassword)}
        />
      </Block>
    </MainContainer>
  );
};

export default ChangePassword;
