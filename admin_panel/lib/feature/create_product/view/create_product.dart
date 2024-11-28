import 'package:flutter/material.dart';
import 'package:flutter_web/common/widgets/custom_button.dart';
import 'package:flutter_web/common/widgets/custom_select.dart';
import 'package:flutter_web/common/widgets/task_title.dart';
import 'package:flutter_web/common/widgets/text_widget.dart';
import 'package:flutter_web/core/configs/theme/app_colors.dart';
import 'package:flutter_web/feature/create_product/controller/create_product_controller.dart';
import 'package:flutter_web/feature/products/controller/products_controller.dart';
import 'package:get/get.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class CreateProduct extends StatelessWidget {
  final ProductsController productsController;

  const CreateProduct({super.key, required this.productsController});

  @override
  Widget build(BuildContext context) {
    final controller = Get.find<CreateProductController>();
    return AlertDialog(
      title: const TextWidget(
        text: 'Thêm sản phẩm',
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
                          controllerNote: controller.name),
                      TaskTitle(
                          label: 'Giá sản phẩm',
                          note: '',
                          screenWidth: Get.width,
                          controllerNote: controller.price),
                      TaskTitle(
                          label: 'Mô tả',
                          note: '',
                          screenWidth: Get.width,
                          controllerNote: controller.description),
                      TaskTitle(
                          label: 'Mô tả chi tiết',
                          note: '',
                          screenWidth: Get.width,
                          controllerNote: controller.descriptions),
                      TaskTitle(
                          label: 'Thời hạn bảo hành',
                          note: '',
                          screenWidth: Get.width,
                          controllerNote: controller.warrantyPeriod),
                      TaskTitle(
                          label: 'Số lượng',
                          note: '',
                          screenWidth: Get.width,
                          isNumber: true,
                          controllerNote: controller.stock),
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
                          controllerNote: controller.weight),
                      TaskTitle(
                          label: 'Thêm link ảnh',
                          note: '',
                          screenWidth: Get.width,
                          controllerNote: controller.image),
                      CustomSelect(
                        label1: 'Thương hiệu',
                        selectList: controller.brandList
                            .map((e) => Item(id: e.id ?? '', name: e.name ?? ''))
                            .toList(),
                        onProjectSelected: (value) {
                          controller.brand.text = value ?? "";
                        },
                      ),
                      CustomSelect(
                        label1: 'Loại sản phẩm',
                        name: "Tên loại sản phẩm",
                        hint: "Chọn loại sản phẩm",
                        selectList: controller.categoryList
                            .map((e) => Item(id: e.id, name: e.name))
                            .toList(),
                        onProjectSelected: (value) {
                          controller.categoryId.text = value ?? "";
                        },
                      ),
                      CustomSelect(
                        label1: 'Loại sản phẩm con',
                        name: "back",
                        selectList: controller.subCategoryList
                            .map((e) => Item(id: e.id, name: e.name))
                            .toList(),
                        onProjectSelected: (value) {
                          controller.subCategoryId.text = value ?? "";
                        },
                      ),
                      TaskTitle(
                          label: 'SKU',
                          note: '',
                          screenWidth: Get.width,
                          controllerNote: controller.sku),
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
                controller.postAddProduct(productsController);
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
