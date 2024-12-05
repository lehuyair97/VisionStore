import 'package:flutter/material.dart';
import 'package:flutter_web/common/widgets/custom_button.dart';
import 'package:flutter_web/common/widgets/task_title.dart';
import 'package:flutter_web/common/widgets/text_widget.dart';
import 'package:flutter_web/core/configs/theme/app_colors.dart';
import 'package:flutter_web/feature/user_update/controller/user_update_controller.dart';
import 'package:get/get.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class UserUpdate extends StatelessWidget {
  final String userId;
  const UserUpdate({super.key, required this.userId});

  @override
  Widget build(BuildContext context) {
    final controller = Get.find<UserUpdateController>();
    controller.fetchUserId(userId);
    return Obx(() {
      if (controller.isLoadingFetch.value) {
        return const Center(child: CircularProgressIndicator());
      }
      return AlertDialog(
        title: const TextWidget(
          text: 'Cập nhật thương hiệu',
        fontSize: 24,
        color: AppColors.primary,
        fontWeight: FontWeight.bold,
      ),
      content: Container(
        width: Get.width * 0.9,
        height: Get.height * 0.9,
        padding: const EdgeInsets.all(16.0),
        child: SingleChildScrollView(
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              Expanded(
                child: Column(
                  children: [
                    TaskTitle(
                        label: 'Tên người dùng',
                      note: '',
                      screenWidth: Get.width,
                      controllerNote: controller.name,
                    ),
                    TaskTitle(
                      label: 'Email',
                      note: '',
                      screenWidth: Get.width,
                      controllerNote: controller.email,
                    ),
                    TaskTitle(
                      label: 'Số điện thoại',
                      note: '',
                      screenWidth: Get.width,
                      controllerNote: controller.phoneNumber,
                    ),
                  ],
                ),
              ),
              20.horizontalSpace,
              Expanded(
                child: Column(
                  children: [
                    TaskTitle(
                      label: 'Ảnh đại diện',
                      note: '',
                      screenWidth: Get.width,
                      controllerNote: controller.avatar,
                    ),
                    TaskTitle(
                      label: 'Địa chỉ',
                      note: '',
                      screenWidth: Get.width,
                      controllerNote: controller.addressSelected,
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
              text: 'Lưu thương hiệu',
              onPressed: () {
                controller.updateUser(userId);
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
