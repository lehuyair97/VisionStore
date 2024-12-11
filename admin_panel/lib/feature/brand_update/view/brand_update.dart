import 'package:flutter/material.dart';
import 'package:flutter_web/common/widgets/custom_button.dart';
import 'package:flutter_web/common/widgets/task_title.dart';
import 'package:flutter_web/common/widgets/text_widget.dart';
import 'package:flutter_web/core/configs/theme/app_colors.dart';
import 'package:flutter_web/feature/brand_update/controller/brand_update_controller.dart';
import 'package:get/get.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class BrandUpdate extends StatelessWidget {
  final String brandId;
  const BrandUpdate({super.key, required this.brandId});

  @override
  Widget build(BuildContext context) {
    final controller = Get.find<BrandUpdateController>();
    controller.fetchBrandId(brandId);
    return Obx(() {
      if (controller.isLoadingFetch.value) {
        return const Center(child: CircularProgressIndicator());
      }
      return AlertDialog(
        backgroundColor: AppColors.backgroundCard,
        title: const TextWidget(
          text: 'Cập nhật thương hiệu',
          fontSize: 24,
          color: AppColors.white,
          fontWeight: FontWeight.bold,
        ),
        content: Container(
          width: Get.width * 0.9,
          height: Get.height * 0.9,
          padding:
              const EdgeInsets.symmetric(horizontal: 200.0, vertical: 20.0),
          child: SingleChildScrollView(
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                Expanded(
                  child: Column(
                    children: [
                      TaskTitle(
                        sizeText: 30,
                        isNameMain: true,
                        label: 'Tên thương hiệu',
                        note: '',
                        screenWidth: Get.width,
                        controllerNote: controller.name,
                      ),
                      TaskTitle(
                        sizeText: 18,
                        isNameMain: true,
                        label: 'Logo',
                        note: '',
                        screenWidth: Get.width,
                        controllerNote: controller.logo,
                      ),
                      TaskTitle(
                        label: 'Mô tả',
                        note: '',
                        screenWidth: Get.width,
                        controllerNote: controller.description,
                      ),
                      TaskTitle(
                        label: 'Banner thương hiệu',
                        note: '',
                        screenWidth: Get.width,
                        controllerNote: controller.banner,
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
                  controller.updateBrand(brandId);
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
