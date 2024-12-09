import 'package:flutter/material.dart';
import 'package:flutter_web/common/widgets/custom_button.dart';
import 'package:flutter_web/common/widgets/task_title.dart';
import 'package:flutter_web/common/widgets/text_widget.dart';
import 'package:flutter_web/core/configs/theme/app_colors.dart';
import 'package:flutter_web/feature/user_changepass/controller/changepass_controller.dart';
import 'package:get/get.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class Changepass extends StatelessWidget {
  final String userId;
  const Changepass({super.key, required this.userId});

  @override
  Widget build(BuildContext context) {
    final controller = Get.find<ChangePassController>();
    return Obx(() {
      if (controller.isLoadingFetch.value) {
        return const Center(child: CircularProgressIndicator());
      }
      return AlertDialog(
        backgroundColor: AppColors.backgroundCard,
        title: const TextWidget(
          text: 'Cập nhật mật khẩu',
          fontSize: 24,
          color: AppColors.white,
          fontWeight: FontWeight.bold,
        ),
        content: Container(
          width: Get.width * 0.9,
          height: Get.height * 0.9,
          padding: EdgeInsets.symmetric(horizontal: 60.w),
          child: SingleChildScrollView(
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      SizedBox(
                        width: Get.width * 0.4,
                        child: TaskTitle(
                          label: 'Nhập mật khẩu mới',
                          note: '',
                          screenWidth: Get.width,
                          controllerNote: controller.password,
                        ),
                      ),
                      20.verticalSpace,
                      SizedBox(
                        width: Get.width * 0.4,
                        child: TaskTitle(
                          label: 'Nhập lại mật khẩu',
                          note: '',
                          screenWidth: Get.width,
                          controllerNote: controller.confirmPassword,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
        actions: [
          Row(
            mainAxisAlignment: MainAxisAlignment.end,
            children: [
              CustomButton(
                text: 'Hủy',
                onPressed: () {
                  Get.back();
                },
                textColor: AppColors.white,
                color: AppColors.primary,
              ),
              20.horizontalSpace,
              CustomButton(
                text: 'Lưu mật khẩu',
                onPressed: () {
                  controller.changePassword(userId);
                },
                textColor: AppColors.white,
                color: AppColors.primary,
              ),
            ],
          ),
        ],
      );
    });
  }
}
