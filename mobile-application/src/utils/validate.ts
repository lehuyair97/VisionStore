import z from "zod/lib";

export const validateUser = z.object({
  username: z
    .string()
    .min(1, "Vui lòng nhập email")
    .email(
      "Email bạn nhập không hợp lệ. Hãy chắc chắn rằng nó dưới dạng example@email.com"
    ),
  password: z.string().min(1, "Vui lòng nhập mật khẩu"),
  re_password: z.string().min(1, "Vui lòng không để trống"),
  display_name: z.string().min(1, "Họ tên không để trống"),
});

export const validateEditProfile = z.object({
  email: z
  .string()
  .min(1, "Vui lòng nhập email")
  .email(
    "Email bạn nhập không hợp lệ. Hãy chắc chắn rằng nó dưới dạng example@email.com"
  ),
display_name: z.string().min(1, "Vui lòng nhập mật khẩu"),
address: z.string().min(1, "Vui lòng không để trống"),
phone_number: z.string().min(1, "Họ tên không để trống"),
})