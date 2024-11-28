import 'package:flutter/material.dart';
import 'package:flutter_web/common/widgets/custom_button.dart';
import 'package:flutter_web/common/widgets/task_title.dart';
import 'package:flutter_web/common/widgets/text_widget.dart';
import 'package:flutter_web/core/configs/theme/app_colors.dart';
import 'package:flutter_web/feature/brand_create/controller/brand_create_controller.dart';
import 'package:get/get.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class BrandCreate extends StatelessWidget {
  const BrandCreate({super.key});

  @override
  Widget build(BuildContext context) {
    final controller = Get.find<BrandCreateController>();
    return AlertDialog(
      title: const TextWidget(
        text: 'Thêm thương hiệu',
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
                      label: 'Tên thương hiệu',
                      note: '',
                      screenWidth: Get.width,
                      controllerNote: controller.name,
                    ),
                    TaskTitle(
                      label: 'Mô tả',
                      note: '',
                      screenWidth: Get.width,
                      controllerNote: controller.description,
                    ),
                  ],
                ),
              ),
              20.horizontalSpace,
              Expanded(
                child: Column(
                  children: [
                    TaskTitle(
                      label: 'Logo',
                      note: '',
                      screenWidth: Get.width,
                      controllerNote: controller.logo,
                    ),
                    TaskTitle(
                      label: 'Loại thương hiệu',
                      note: '',
                      screenWidth: Get.width,
                      controllerNote: controller.brandType,
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
              text: 'Lưu sản phẩm',
              onPressed: () {
                controller.createBrand();
              },
              textColor: AppColors.white,
              color: AppColors.primary,
            ),
          ],
        ),
      ],
    );
  }
}
