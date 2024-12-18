import 'package:flutter/material.dart';
import 'package:flutter_web/common/widgets/custom_button.dart';
import 'package:flutter_web/common/widgets/custom_select.dart';
import 'package:flutter_web/common/widgets/task_date.dart';
import 'package:flutter_web/common/widgets/task_title.dart';
import 'package:flutter_web/common/widgets/text_widget.dart';
import 'package:flutter_web/core/configs/theme/app_colors.dart';
import 'package:flutter_web/feature/voucher_create/controller/voucher_create_controller.dart';
import 'package:get/get.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class VoucherCreate extends StatelessWidget {
  const VoucherCreate({super.key});

  @override
  Widget build(BuildContext context) {
    final controller = Get.find<VoucherCreateController>();
    return AlertDialog(
      backgroundColor: AppColors.backgroundCard,
      title: const TextWidget(
        text: 'Thêm voucher',
        fontSize: 24,
        color: AppColors.white,
        fontWeight: FontWeight.bold,
      ),
      content: Container(
        width: Get.width * 0.9,
        height: Get.height * 0.9,
        padding: const EdgeInsets.all(16.0),
        child: SingleChildScrollView(
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.center,
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Container(
                width: Get.width * 0.4,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    TaskTitle(
                      label: 'Giảm giá',
                      note: '',
                      screenWidth: Get.width,
                      controllerNote: controller.discount,
                    ),
                    Obx(
                      () => TaskDate(
                        label: 'Ngày Tao Voucher',
                        selectedDate: controller.expirationDate.value,
                        onDateSelected: (date) {
                          controller.onDateSelected(date);
                        },
                      ),
                    ),
                    10.verticalSpace,
                    CustomSelect(
                      label1: "Loại voucher",
                      selectList: controller.type
                          .map((e) => Item(id: e, name: e))
                          .toList(),
                      onProjectSelected: (value) {
                        controller.voucherType = value ?? "";
                      },
                    ),
                    TaskTitle(
                      label: 'title',
                      note: '',
                      screenWidth: Get.width,
                      controllerNote: controller.title,
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
                controller.createVoucher();
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
