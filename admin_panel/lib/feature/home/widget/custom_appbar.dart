import 'package:flutter/material.dart';
import 'package:flutter_web/common/img/img.dart';
import 'package:flutter_web/common/img/lottie.dart';
import 'package:flutter_web/common/widgets/search_field.dart';
import 'package:flutter_web/common/widgets/text_widget.dart';
import 'package:flutter_web/core/configs/theme/app_colors.dart';
import 'package:flutter_web/feature/auth/controller/login_comtroller.dart';
import 'package:flutter_web/feature/home/controller/home_contrioller.dart';
import 'package:get/get.dart';
import 'package:lottie/lottie.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class CustomAppBar extends StatelessWidget {
  const CustomAppBar({super.key});

  @override
  Widget build(BuildContext context) {
    final controller = Get.put(HomeController());
    final controllerLogin = Get.put(LoginController());
    print("controllerLogin.users?.userName ${controllerLogin.users?.userName}");
    return Card(
      elevation: 3,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
      color: AppColors.backgroundCard,
      child: Padding(
        padding: EdgeInsets.all(16.w),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.center,
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            SizedBox(
              width: Get.width * 0.4,
              child: SearchField(
                controller: controller.searchController,
                onChanged: (value) {},
              ),
            ),
            Spacer(),
            customAppBar(LottieClass.chat, AppColors.backgroundTab),
            customAppBar(LottieClass.notification, AppColors.backgroundTab),
            customAppBar(LottieClass.present, AppColors.backgroundTab),
            Container(
              width: 44,
              height: 44,
              decoration: BoxDecoration(
                color: AppColors.backgroundTab,
                borderRadius: BorderRadius.circular(50),
              ),
              child: Image.network(
                controllerLogin.users?.avatar ??
                    "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",
                height: 44,
                width: 44,
                scale: 1.0,
                fit: BoxFit.cover,
                errorBuilder: (context, error, stackTrace) =>
                    Image.asset(Img.logo, height: 44, width: 44),
              ),
            ),
            10.horizontalSpace,
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                TextWidget(
                    text: '${controllerLogin.users?.userName ?? 'Admin'}',
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                    color: AppColors.white),
                TextWidget(
                    text:
                        '${controllerLogin.users?.email ?? 'thaodongpham@gmail.com'}',
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                    color: AppColors.white),
              ],
            ),
            customAppBar(LottieClass.setting, AppColors.backgroundTab),
          ],
        ),
      ),
    );
  }
}

Widget customAppBar(String lottieUrl, Color backgroundColor) {
  return Padding(
    padding: const EdgeInsets.symmetric(horizontal: 16),
    child: Container(
      width: 44,
      height: 44,
      decoration: BoxDecoration(
        color: backgroundColor ?? AppColors.backgroundTab,
        borderRadius: BorderRadius.circular(50),
      ),
      child: Lottie.network(
        lottieUrl,
        frameRate: FrameRate(10),
        repeat: true,
        reverse: false,
      ),
    ),
  );
}
