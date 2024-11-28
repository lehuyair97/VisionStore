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
      padding: EdgeInsets.symmetric(horizontal: 40.w),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.only(
          topRight: Radius.circular(20.r),
          bottomRight: Radius.circular(20.r),
          bottomLeft: Radius.circular(borderRadius),
          topLeft: Radius.circular(borderRadius),
        ),
        boxShadow: [
          BoxShadow(
            color: Colors.grey.withOpacity(0.1),
            blurRadius: 1,
            spreadRadius: 1,
            offset: Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          const TextWidget(
            text: 'Vision Store',
            color: AppColors.primary,
            fontSize: 30,
            fontWeight: FontWeight.bold,
          ),
          40.verticalSpace,
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
            height: 50.h,
            color: AppColors.primary,
          )
        ],
      ),
    );
  }
}
