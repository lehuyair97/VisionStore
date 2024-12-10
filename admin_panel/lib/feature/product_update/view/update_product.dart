import 'package:flutter/material.dart';
import 'package:flutter_web/common/widgets/custom_button.dart';
import 'package:flutter_web/common/widgets/custom_select.dart';
import 'package:flutter_web/common/widgets/task_title.dart';
import 'package:flutter_web/common/widgets/text_widget.dart';
import 'package:flutter_web/core/configs/theme/app_colors.dart';
import 'package:flutter_web/feature/computer_accessories/controller/computer_accessories_controller.dart';
import 'package:flutter_web/feature/product_update/controller/update_product_controller.dart';
import 'package:get/get.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class UpdateProduct extends StatefulWidget {
  final String productId;
  final String? categoryKey;
  const UpdateProduct({
    super.key,
    required this.productId,
    this.categoryKey,
  });

  @override
  State<UpdateProduct> createState() => _UpdateProductState();
}

class _UpdateProductState extends State<UpdateProduct> {
  @override
  Widget build(BuildContext context) {
    final controllerUpdate = Get.put(UpdateProductController());
    final controllerComputer = Get.put(ComputerAccessoriesController());
    
    controllerUpdate.getProduct(widget.productId);
    return Obx(() {
      if (controllerUpdate.isLoading.value) {
        return const Center(child: CircularProgressIndicator());
      }
      return AlertDialog(
        backgroundColor: AppColors.backgroundCard,
        title: const TextWidget(
          text: 'Chỉnh sửa sản phẩm',
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
                            sizeText: 30,
                            isNameMain: true,
                            label: '',
                            note: 'Nhập tên sản phẩm',
                            screenWidth: Get.width,
                            controllerNote: controllerUpdate.name),
                        Padding(
                          padding: EdgeInsets.only(left: 20.w),
                          child: TaskTitle(
                              sizeText: 18,
                              isNameMain: true,
                              label: '',
                              note: 'Thêm link ảnh',
                              screenWidth: Get.width,
                              controllerNote: controllerUpdate.image),
                        ),
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
                        TaskTitle(
                            label: 'Trọng lượng',
                            note: '',
                            screenWidth: Get.width,
                            isNumber: true,
                            controllerNote: controllerUpdate.weight),
                        CustomSelect(
                          label1: 'Thương hiệu',
                          hint: controllerUpdate.brandList
                              .map((e) => controllerUpdate.brandId.text == e.id
                                  ? e.name
                                  : '')
                              .join(''),
                          selectList: controllerUpdate.brandList
                              .map((e) =>
                                  Item(id: e.id ?? '', name: e.name ?? ''))
                              .toList(),
                          onProjectSelected: (value) {
                            controllerUpdate.brandId.text = value ?? "";
                          },
                        ),
                        CustomSelect(
                          label1: 'Loại sản phẩm',
                          hint: controllerUpdate.categoryList
                              .map((e) => controllerUpdate.categoryId.text == e.id
                                  ? e.name
                                  : '')
                              .join(''),
                          selectList: controllerUpdate.categoryList
                              .map((e) => Item(id: e.id, name: e.name))
                              .toList(),
                          onProjectSelected: (value) {
                            controllerUpdate.categoryId.text = value ?? "";
                          },
                        ),
                     widget.categoryKey == 'linh-kien'
                          ? CustomSelect(
                              label1: 'Chon Linh Kien',
                              hint: controllerUpdate.subCategoryList
                                  .map((e) => controllerUpdate.subCategoryId.text == e.id
                                      ? e.name
                                      : '')
                                  .join(''),
                              selectList: controllerUpdate.subCategoryList
                                  .map((e) => Item(id: e.id, name: e.name))
                                  .toList(),
                              onProjectSelected: (value) {
                                controllerUpdate.subCategoryId.text = value ?? "";
                              },
                            )
                          : SizedBox.shrink(),
                      widget.categoryKey == 'phu-kien'
                          ? Column(
                              children: [
                                CustomSelect(
                                  label1: 'Chọn phụ kiện',
                                  hint: controllerComputer.accessoriesList
                                      .map((e) => controllerUpdate.subCategoryId.text == e.id
                                          ? e.name
                                          : '')
                                      .join(''),
                                  selectList: controllerComputer.accessoriesList
                                      .map((e) => Item(id: e.id, name: e.name))
                                      .toList(),
                                  onProjectSelected: (value) {
                                    controllerUpdate.subCategoryId.text =
                                        value ?? "";
                                  },
                                ),
                              ],
                            )
                          : SizedBox.shrink(),
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
