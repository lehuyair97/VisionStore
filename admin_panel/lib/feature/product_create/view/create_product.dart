import 'package:flutter/material.dart';
import 'package:flutter_web/common/widgets/custom_button.dart';
import 'package:flutter_web/common/widgets/custom_select.dart';
import 'package:flutter_web/common/widgets/task_title.dart';
import 'package:flutter_web/common/widgets/text_widget.dart';
import 'package:flutter_web/core/configs/theme/app_colors.dart';
import 'package:flutter_web/feature/computer_accessories/controller/computer_accessories_controller.dart';
import 'package:flutter_web/feature/product_create/controller/create_product_controller.dart';
import 'package:flutter_web/feature/products/controller/products_controller.dart';
import 'package:get/get.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class CreateProduct extends StatefulWidget {
  final ProductsController productsController;

  const CreateProduct({super.key, required this.productsController});

  @override
  State<CreateProduct> createState() => _CreateProductState();
}

class _CreateProductState extends State<CreateProduct> {
  final controller = Get.find<CreateProductController>();
  final controllerComputer = Get.put(ComputerAccessoriesController());
  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      backgroundColor: AppColors.backgroundCard,
      title: const TextWidget(
        text: 'Thêm sản phẩm',
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
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Expanded(
                flex: 2,
                child: Padding(
                  padding: EdgeInsets.symmetric(horizontal: 20.w),
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      TaskTitle(
                          sizeText: 30,
                          isNameMain: true,
                          label: '',
                          note: 'Nhập tên sản phẩm',
                          screenWidth: Get.width,
                          controllerNote: controller.name),
                      Padding(
                        padding: EdgeInsets.only(left: 20.w),
                        child: TaskTitle(
                            sizeText: 18,
                            isNameMain: true,
                            label: '',
                            note: 'Thêm link ảnh',
                            screenWidth: Get.width,
                            controllerNote: controller.image.value),
                      ),
                    ],
                  ),
                ),
              ),
              Expanded(
                flex: 3,
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
                      TaskTitle(
                          label: 'Trọng lượng',
                          note: '',
                          screenWidth: Get.width,
                          isNumber: true,
                          controllerNote: controller.weight),
                      CustomSelect(
                        label1: 'Thương hiệu',
                        hint: 'Chọn thương hiệu',
                        selectList: controller.brandList
                            .map(
                                (e) => Item(id: e.id ?? '', name: e.name ?? ''))
                            .toList(),
                        onProjectSelected: (value) {
                          controller.brand.text = value ?? "";
                        },
                      ),
                      CustomSelect(
                        label1: 'Loại sản phẩm',
                        hint: 'Chọn loại sản phẩm',
                        selectList: controller.categoryList
                            .map((e) => Item(id: e.id, name: e.name))
                            .toList(),
                        onProjectSelected: (value) {
                          controller.categoryId.value.text = value ?? "";
                        },
                      ),
                      Obx(() {
                        print("controller.categoryId.value.text: ${controller.categoryId.value.text}");
                        // Kiểm tra nếu có dữ liệu và id là laptop hoặc pc, không hiển thị sản phẩm con
                        if (controller.categoryId.value.text == 'laptop' ||
                            controller.categoryId.value.text == 'pc') {
                          return SizedBox
                              .shrink(); // Nếu id là laptop hoặc pc, không hiển thị sản phẩm con
                        } else if (controller.categoryId.value.text == 'linh kien') {
                          // Nếu id là linh kien, hiển thị loại sản phẩm phụ kiện
                          return CustomSelect(
                            label1: 'Loại sản phẩm con 2',
                            hint: 'Chọn loại sản phẩm phụ kiện',
                            selectList: controllerComputer.accessoriesList
                                .map((e) => Item(id: e.id, name: e.name))
                                .toList(),
                            onProjectSelected: (value) {
                              controller.subCategoryId.text = value ?? "";
                            },
                          );
                        } else {
                          // Nếu id khác, hiển thị loại sản phẩm con 1
                          return Column(
                            children: [
                              CustomSelect(
                                label1: 'Loại sản phẩm con 1',
                                hint: 'Chọn loại sản phẩm linh kiện',
                                selectList: controller.subCategoryList
                                    .map((e) => Item(id: e.id, name: e.name))
                                    .toList(),
                                onProjectSelected: (value) {
                                  controller.subCategoryId.text = value ?? "";
                                },
                              ),
                              CustomSelect(
                                label1: 'Loại sản phẩm con 2',
                                hint: 'Chọn loại sản phẩm phụ kiện',
                                selectList: controllerComputer.accessoriesList
                                    .map((e) => Item(id: e.id, name: e.name))
                                    .toList(),
                                onProjectSelected: (value) {
                                  controller.subCategoryId.text = value ?? "";
                                },
                              ),
                            ],
                          );
                        }
                      }),
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
                controller.postAddProduct(widget.productsController);
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
