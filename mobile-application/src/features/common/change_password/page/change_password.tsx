import { Button, Input, MainContainer } from "@components";
import { commonStyles } from "@features/common/profile/styles/styles";
import { EDGES } from "@utils/helper";
import { useForm } from "react-hook-form";


interface ChangePasswordForm {
    password: string;
    new_password: string;
}

const ChangePassword = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
      } = useForm<ChangePasswordForm>({
        mode: "onChange",
      });
    return (
        <MainContainer edges={EDGES.LEFT_RIGHT} style={commonStyles.container}>
        <Input
          name="password"
          label="Mật khẩu cũ"
          placeholder="Nhập mật khẩu cũ"
          labelStyle={{ fontSize: 14 }}
          control={control}
          error={errors.password?.message}
          showError={!!errors.password?.message}
        />
        <Input
          name="new_password"
          label="Mật khẩu mới"
          placeholder="Nhập mật khẩu mới"
          labelStyle={{ fontSize: 14 }}
          control={control}
          error={errors.new_password?.message}
          showError={!!errors.new_password?.message}
          secureTextEntry={true}
        />
        <Button
          buttonStyle={{ marginTop: 30 }}
          label="Đổi mật khẩu"
          textStyle={{ color: "white" }}
          onPress={() => {
            handleSubmit((data) => {  
              console.log("handleSubmit called with data: ", data);
            })();
          }}
        />
        </MainContainer>
    );
};

export default ChangePassword;