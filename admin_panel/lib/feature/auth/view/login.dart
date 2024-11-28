import 'package:flutter/material.dart';
import 'package:flutter_web/core/configs/theme/app_colors.dart';
import 'package:flutter_web/feature/auth/controller/login_comtroller.dart';
import 'package:flutter_web/feature/auth/widget/img_login.dart';
import 'package:flutter_web/feature/auth/widget/login_from.dart';
import 'package:get/get.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:responsive_builder/responsive_builder.dart';

class LoginPage extends StatelessWidget {
  const LoginPage({super.key});

  @override
  Widget build(BuildContext context) {
    final loginController = Get.find<LoginController>();
    return ResponsiveBuilder(
      builder: (context, sizingInformation) {
        bool isMobile =
            sizingInformation.deviceScreenType == DeviceScreenType.mobile;
        return Stack(
          children: [
            Scaffold(
              body: Center(
                child: SingleChildScrollView(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      isMobile
                          ? Padding(
                              padding: EdgeInsets.symmetric(horizontal: 20.w),
                              child: Column(
                                mainAxisAlignment: MainAxisAlignment.center,
                                crossAxisAlignment: CrossAxisAlignment.center,
                                children: [
                                  const ImgLogin(),
                                  const SizedBox(height: 20),
                                  LoginFrom(
                                    loginController: loginController,
                                    borderRadius: 20,
                                  ),
                                ],
                              ),
                            )
                          : Padding(
                              padding: EdgeInsets.symmetric(horizontal: 80.w),
                              child: Center(
                                child: Row(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  crossAxisAlignment: CrossAxisAlignment.center,
                                  children: [
                                    Expanded(
                                      child: Container(
                                        decoration: BoxDecoration(
                                          color: AppColors.primary,
                                          borderRadius: BorderRadius.only(
                                            topLeft: Radius.circular(20.r),
                                            bottomLeft: Radius.circular(20.r),
                                          ),
                                        ),
                                        height: Get.height * 0.8,
                                        child: const ImgLogin(),
                                      ),
                                    ),
                                    Expanded(
                                      child: LoginFrom(
                                          loginController: loginController),
                                    ),
                                  ],
                                ),
                              ),
                            )
                    ],
                  ),
                ),
              ),
            ),
            Obx(() => loginController.isLoading.value
                ? const Center(
                    child: CircularProgressIndicator(),
                  )
                : const SizedBox.shrink()),
          ],
        );
      },
    );
  }
}
