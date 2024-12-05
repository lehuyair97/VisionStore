import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_web/common/widgets/custom_select.dart';
import 'package:flutter_web/feature/accessory/controller/accessory_controller.dart';
import 'package:flutter_web/feature/home/widget/custom_appbar.dart';
import 'package:flutter_web/feature/product_create/controller/create_product_controller.dart';
import 'package:flutter_web/feature/product_create/view/create_product.dart';
import 'package:flutter_web/feature/products/controller/products_controller.dart';
import 'package:flutter_web/feature/products/widget/product_gridRow.dart';
import 'package:get/get.dart';
import 'package:syncfusion_flutter_datagrid/datagrid.dart';
import 'package:flutter_web/common/widgets/custom_button.dart';
import 'package:flutter_web/common/widgets/text_widget.dart';
import 'package:flutter_web/core/configs/theme/app_colors.dart';
import 'package:flutter_web/common/widgets/search_field.dart';

class Accessory extends StatelessWidget {
  const Accessory({super.key});

  @override
  Widget build(BuildContext context) {
    final controller = Get.find<AccessoryController>();
    final controllerProduct = Get.put(CreateProductController());
    final controllerProducts = Get.put(ProductsController());

    if (controllerProduct.subCategoryList.isNotEmpty) {
      controller.subCateId.value =
          controllerProduct.subCategoryList.first.id ?? '';
      controller.fetch_sub_product(controller.subCateId.value);
    }

    return Scaffold(
      body: Padding(
        padding: EdgeInsets.symmetric(horizontal: 40.w, vertical: 30.h),
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              CustomAppBar(),
              30.verticalSpace,
              Card(
                elevation: 3,
                color: AppColors.backgroundCard.withOpacity(0.5),
                child: Container(
                  alignment: Alignment.center,
                  width: Get.width * 0.8,
                  child: Padding(
                    padding:
                        EdgeInsets.symmetric(horizontal: 20.w, vertical: 20.h),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const TextWidget(
                          text: "Danh sách Linh kien",
                          fontSize: 24,
                          fontWeight: FontWeight.bold,
                          color: AppColors.white,
                        ),
                        20.verticalSpace,
                        Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          crossAxisAlignment: CrossAxisAlignment.center,
                          children: [
                            SizedBox(
                              width: Get.width * 0.3,
                              child: SearchField(
                                controller: controller.searchController,
                                onChanged: (value) {},
                                onSearch: (value) {
                                  // controller.searchProduct(value);
                                },
                              ),
                            ),
                            50.horizontalSpace,
                            SizedBox(
                              width: Get.width * 0.2,
                              child: CustomSelect(
                                hint: 'Ram',
                                selectList: controllerProduct.subCategoryList
                                    .map((e) => Item(id: e.id, name: e.name))
                                    .toList(),
                                onProjectSelected: (value) async {
                                  await controller
                                      .fetch_sub_product(value ?? '');
                                  controller.subCateId.value = value ?? '';
                                },
                              ),
                            ),
                            const Spacer(),
                            CustomButton(
                              horizontalPadding: 30,
                              verticalPadding: 15,
                              textColor: AppColors.white,
                              color: AppColors.primary,
                              text: "+ Thêm sản phẩm",
                              onPressed: () {
                                showDialog(
                                  context: context,
                                  builder: (BuildContext context) {
                                    return CreateProduct(
                                      productsController: controllerProducts,
                                    );
                                  },
                                );
                              },
                            ),
                          ],
                        ),
                        30.verticalSpace,
                        Card(
                          elevation: 5,
                          color: AppColors.backgroundCard,
                          child: Container(
                            height: Get.height * 1,
                            width: Get.width * 0.8,
                            alignment: Alignment.center,
                            child: Obx(
                              () {
                                if (controller.isLoading.value) {
                                  return const Center(
                                      child: CircularProgressIndicator());
                                }
                                return Column(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  crossAxisAlignment: CrossAxisAlignment.center,
                                  children: [
                                    Expanded(
                                      flex: 6,
                                      child: SfDataGrid(
                                        headerRowHeight: 80,
                                        rowHeight: 80,
                                        gridLinesVisibility:
                                            GridLinesVisibility.none,
                                        headerGridLinesVisibility:
                                            GridLinesVisibility.none,
                                        source:
                                            controller.productGridDataSource,
                                        columns: <GridColumn>[
                                          GridColumn(
                                            visible: false,
                                            columnName: ProductGridCell.id,
                                            label: Container(
                                              padding: EdgeInsets.all(16.0),
                                              alignment: Alignment.center,
                                              child: TextWidget(
                                                  text: 'Id',
                                                  fontSize: 16,
                                                  fontWeight: FontWeight.bold),
                                            ),
                                          ),
                                          GridColumn(
                                            columnName: ProductGridCell.image,
                                            label: Container(
                                              padding: EdgeInsets.all(16.0),
                                              alignment: Alignment.center,
                                              child: TextWidget(
                                                  text: 'Ảnh',
                                                  fontSize: 16,
                                                  fontWeight: FontWeight.bold),
                                            ),
                                          ),
                                          GridColumn(
                                            columnName: ProductGridCell.name,
                                            width: Get.width * 0.1,
                                            label: Container(
                                              padding: EdgeInsets.all(16.0),
                                              alignment: Alignment.center,
                                              child: TextWidget(
                                                  text: 'Name',
                                                  fontSize: 16,
                                                  fontWeight: FontWeight.bold),
                                            ),
                                          ),
                                          GridColumn(
                                            columnName: ProductGridCell.price,
                                            width: Get.width * 0.1,
                                            label: Container(
                                              padding: EdgeInsets.all(16.0),
                                              alignment: Alignment.center,
                                              child: TextWidget(
                                                  text: 'Price',
                                                  fontSize: 16,
                                                  fontWeight: FontWeight.bold),
                                            ),
                                          ),
                                          GridColumn(
                                            columnName:
                                                ProductGridCell.introduce,
                                            width: Get.width * 0.2,
                                            label: Container(
                                              padding: EdgeInsets.all(16.0),
                                              alignment: Alignment.center,
                                              child: TextWidget(
                                                  text: 'Giới thiệu',
                                                  fontSize: 16,
                                                  fontWeight: FontWeight.bold),
                                            ),
                                          ),
                                          GridColumn(
                                            columnName: ProductGridCell.brand,
                                            width: Get.width * 0.1,
                                            label: Container(
                                              padding: EdgeInsets.all(16.0),
                                              alignment: Alignment.center,
                                              child: TextWidget(
                                                  text: 'Thương hiệu',
                                                  fontSize: 16,
                                                  fontWeight: FontWeight.bold),
                                            ),
                                          ),
                                          GridColumn(
                                            columnName: ProductGridCell.type,
                                            width: Get.width * 0.1,
                                            label: Container(
                                              padding: EdgeInsets.all(16.0),
                                              alignment: Alignment.center,
                                              child: TextWidget(
                                                  text: 'Loại sản phẩm',
                                                  fontSize: 16,
                                                  fontWeight: FontWeight.bold),
                                            ),
                                          ),
                                          GridColumn(
                                            columnName: ProductGridCell.edit,
                                            width: Get.width * 0.05,
                                            label: Container(
                                              padding: EdgeInsets.all(16.0),
                                              alignment: Alignment.center,
                                              child: TextWidget(
                                                  text: 'Sửa',
                                                  fontSize: 16,
                                                  fontWeight: FontWeight.bold),
                                            ),
                                          ),
                                          GridColumn(
                                            columnName: ProductGridCell.delete,
                                            width: Get.width * 0.05,
                                            label: Container(
                                              padding: EdgeInsets.all(16.0),
                                              alignment: Alignment.center,
                                              child: TextWidget(
                                                  text: 'Xóa',
                                                  fontSize: 16,
                                                  fontWeight: FontWeight.bold),
                                            ),
                                          ),
                                        ],
                                      ),
                                    ),
                                    30.verticalSpace,
                                    Expanded(
                                      flex: 1,
                                      child: Container(
                                        decoration: BoxDecoration(
                                          color: AppColors.white,
                                          borderRadius:
                                              BorderRadius.circular(16),
                                        ),
                                        child: SfDataPager(
                                          pageCount:
                                              controller.productSup.length / 7,
                                          visibleItemsCount: 7,
                                          delegate:
                                              controller.productGridDataSource,
                                          onPageNavigationEnd: (pageIndex) {
                                            controller.onPageChanged(pageIndex);
                                          },
                                          itemHeight: 50,
                                          itemWidth: 50,
                                          firstPageItemVisible: false,
                                          lastPageItemVisible: false,
                                          availableRowsPerPage: [7],
                                        ),
                                      ),
                                    ),
                                  ],
                                );
                              },
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
