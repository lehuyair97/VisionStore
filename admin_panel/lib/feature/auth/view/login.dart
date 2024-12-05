import 'package:flutter/material.dart';
import 'package:flutter_web/common/widgets/text_widget.dart';
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
                              padding: EdgeInsets.symmetric(horizontal: 200.w),
                              child: Center(
                                child: Card(
                                  color: AppColors.black.withOpacity(0.3),
                                  elevation: 0,
                                  child: Row(
                                    mainAxisAlignment: MainAxisAlignment.center,
                                    crossAxisAlignment:
                                        CrossAxisAlignment.center,
                                    children: [
                                      Expanded(
                                        child: Container(
                                          padding: EdgeInsets.symmetric(
                                              horizontal: 40.w),
                                          height: Get.height * 0.8,
                                          child: Column(
                                            mainAxisAlignment:
                                                MainAxisAlignment.center,
                                            crossAxisAlignment:
                                                CrossAxisAlignment.center,
                                            children: [
                                              TextWidget(
                                                text: 'VisonStore',
                                                fontSize: 44.sp,
                                                color: AppColors.primary,
                                                fontWeight: FontWeight.bold,
                                              ),
                                              SizedBox(height: 30.h),
                                              TextWidget(
                                                text:
                                                    'VisionStore là một ứng dụng bán hàng trực tuyến chuyên cung cấp các sản phẩm máy tính và phụ kiện công nghệ. Với sứ mệnh mang đến cho người dùng những sản phẩm chất lượng cùng dịch vụ tốt nhất, VisionStore là giải pháp mua sắm tiện lợi cho khách hàng có nhu cầu về thiết bị công nghệ.',
                                                fontSize: 20.sp,
                                                fontWeight: FontWeight.w300,
                                                color: AppColors.primary,
                                                textAlign: TextAlign.center,
                                                maxLines: 8,
                                              ),
                                              const SizedBox(height: 40),
                                              const ImgLogin()
                                            ],
                                          ),
                                        ),
                                      ),
                                      Expanded(
                                        child: LoginFrom(
                                            loginController: loginController),
                                      ),
                                    ],
                                  ),
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
