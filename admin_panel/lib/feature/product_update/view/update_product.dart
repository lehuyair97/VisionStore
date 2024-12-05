import 'package:flutter/material.dart';
import 'package:flutter_web/common/widgets/custom_button.dart';
import 'package:flutter_web/common/widgets/custom_select.dart';
import 'package:flutter_web/common/widgets/task_title.dart';
import 'package:flutter_web/common/widgets/text_widget.dart';
import 'package:flutter_web/core/configs/theme/app_colors.dart';
import 'package:flutter_web/feature/product_update/controller/update_product_controller.dart';
import 'package:get/get.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class UpdateProduct extends StatefulWidget {
  final String productId;
  const UpdateProduct({
    super.key,
    required this.productId,
  });

  @override
  State<UpdateProduct> createState() => _UpdateProductState();
}

class _UpdateProductState extends State<UpdateProduct> {
  @override
  Widget build(BuildContext context) {
    final controllerUpdate = Get.put(UpdateProductController());
    controllerUpdate.getProduct(widget.productId);
    return Obx(() {
      if (controllerUpdate.isLoading.value) {
        return const Center(child: CircularProgressIndicator());
      }
      return AlertDialog(
        title: const TextWidget(
          text: 'Chỉnh sửa sản phẩm',
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
                  child: Padding(
                    padding: EdgeInsets.symmetric(horizontal: 20.w),
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        TaskTitle(
                            label: 'Tên sản phẩm',
                            note: '',
                            screenWidth: Get.width,
                            controllerNote: controllerUpdate.name),
                        TaskTitle(
                            label: 'Giá sản phẩm',
                            note: '',
                            screenWidth: Get.width,
                            controllerNote: controllerUpdate.price),
                        TaskTitle(
                            label: 'Mô tả',
                            note: '',
                            screenWidth: Get.width,
                            controllerNote: controllerUpdate.description),
                        TaskTitle(
                            label: 'Mô tả chi tiết',
                            note: '',
                            screenWidth: Get.width,
                            controllerNote: controllerUpdate.descriptions),
                        TaskTitle(
                            label: 'Thời hạn bảo hành',
                            note: '',
                            screenWidth: Get.width,
                            controllerNote: controllerUpdate.warrantyPeriod),
                        TaskTitle(
                            label: 'Số lượng',
                            note: '',
                            screenWidth: Get.width,
                            isNumber: true,
                            controllerNote: controllerUpdate.stock),
                      ],
                    ),
                  ),
                ),
                Expanded(
                  child: Padding(
                    padding: EdgeInsets.symmetric(horizontal: 20.w),
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        TaskTitle(
                            label: 'Trọng lượng',
                            note: '',
                            screenWidth: Get.width,
                            isNumber: true,
                            controllerNote: controllerUpdate.weight),
                        TaskTitle(
                            label: 'Thêm link ảnh',
                            note: '',
                            screenWidth: Get.width,
                            controllerNote: controllerUpdate.image),
                        CustomSelect(
                          label1: 'Thương hiệu',
                          name: controllerUpdate.brandId.text,
                          selectList: controllerUpdate.brandList
                              .map((e) => Item(id: e.id ?? '', name: e.name ?? ''))
                              .toList(),
                          onProjectSelected: (value) {
                            controllerUpdate.brandId.text = value ?? "";
                          },
                        ),
                        CustomSelect(
                          label1: 'Loại sản phẩm',
                          name: controllerUpdate.categoryId.text,
                          selectList: controllerUpdate.categoryList
                              .map((e) => Item(id: e.id, name: e.name))
                              .toList(),
                          onProjectSelected: (value) {
                            controllerUpdate.categoryId.text = value ?? "";
                          },
                        ),
                        CustomSelect(
                          label1: 'Loại sản phẩm con',
                          name: controllerUpdate.subCategoryId.text,
                          selectList: controllerUpdate.subCategoryList
                              .map((e) => Item(id: e.id, name: e.name))
                              .toList(),
                          onProjectSelected: (value) {
                            controllerUpdate.subCategoryId.text = value ?? "";
                          },
                        ),
                        TaskTitle(
                            label: 'SKU',
                            note: '',
                            screenWidth: Get.width,
                            controllerNote: controllerUpdate.sku),
                      ],
                    ),
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
                  controllerUpdate.postUpdateProduct(widget.productId);
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
