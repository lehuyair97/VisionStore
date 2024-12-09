import 'package:flutter/material.dart';
import 'package:flutter_web/common/widgets/custom_button.dart';
import 'package:flutter_web/common/widgets/text_widget.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_web/core/configs/theme/app_colors.dart';
import 'package:flutter_web/feature/auth/controller/login_comtroller.dart';
import 'package:flutter_web/feature/auth/widget/custom_text_field.dart';
import 'package:get/get.dart';

class LoginFrom extends StatelessWidget {
  final LoginController loginController;
  final double borderRadius;
  const LoginFrom(
      {super.key, required this.loginController, this.borderRadius = 0});

  @override
  Widget build(BuildContext context) {
    return Container(
      height: Get.height * 0.8,
      padding: EdgeInsets.symmetric(horizontal: 60.w, vertical: 80.h),
      child: Card(
        color: AppColors.backgroundCard,
        elevation: 3,
        child: Container(
          height: Get.height * 0.3,
          width: Get.width * 0.5,
          padding: EdgeInsets.symmetric(horizontal: 60.w),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              80.verticalSpace,
              TextWidget(
                text: 'Admin Panel',
                color: AppColors.white,
                fontSize: 44.sp,
                fontWeight: FontWeight.bold,
                textAlign: TextAlign.start,
              ),
              20.verticalSpace,
              TextWidget(
                text:
                    'Quản trị viên của VisionStore có quyền truy cập vào bảng điều khiển để quản lý toàn bộ hệ thống.',
                color: AppColors.white,
                fontSize: 18.sp,
                textAlign: TextAlign.start,
                fontWeight: FontWeight.w300,
                maxLines: 3,
              ),
              80.verticalSpace,
              CustomTextField(
                controller: loginController.emailController,
                hintText: 'Email',
              ),
              30.verticalSpace,
              CustomTextField(
                controller: loginController.passwordController,
                hintText: 'Password',
                obscureText: true,
                suffixIcon: Icons.visibility,
                isMobile: false,
              ),
              30.verticalSpace,
              CustomButton(
                text: 'Đăng Nhập',
                onPressed: loginController.login,
                width: Get.width,
                height: 80.h,
                color: AppColors.primary,
              )
            ],
          ),
        ),
      ),
    );
  }
}
