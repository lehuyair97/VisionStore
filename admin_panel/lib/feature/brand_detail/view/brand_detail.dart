import 'package:flutter/material.dart';
import 'package:flutter_web/common/widgets/custom_select.dart';
import 'package:flutter_web/feature/brand_detail/controller/brand_detail_controller.dart';
import 'package:flutter_web/feature/home/widget/custom_appbar.dart';
import 'package:flutter_web/feature/product_create/controller/create_product_controller.dart';
import 'package:flutter_web/feature/products/widget/product_gridRow.dart';
import 'package:get/get.dart';
import 'package:get/get_connect/http/src/utils/utils.dart';
import 'package:syncfusion_flutter_datagrid/datagrid.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_web/common/widgets/custom_button.dart';
import 'package:flutter_web/common/widgets/text_widget.dart';
import 'package:flutter_web/core/configs/theme/app_colors.dart';
import 'package:flutter_web/feature/product_create/view/create_product.dart';
import 'package:flutter_web/feature/products/controller/products_controller.dart';
import 'package:flutter_web/common/widgets/search_field.dart';

class BrandDetailView extends StatelessWidget {
  const BrandDetailView({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    final String brandId = Get.arguments;
    final controller = Get.find<ProductsController>();
    final brandController = Get.find<BrandDetailController>();
    final controllerCategory = Get.put(CreateProductController());

    brandController.fetchProductsGroupedByBrand(brandId);

    return Scaffold(
      appBar: AppBar(
        title: TextWidget(
          text: 'Chi tiết thương hiệu',
          fontSize: 24,
        ),
        leading: IconButton(
          icon: Icon(
            Icons.arrow_back_ios,
            color: AppColors.white,
            size: 24,
          ),
          onPressed: () {
            Get.back();
          },
        ),
        centerTitle: true,
        backgroundColor: AppColors.backgroundCard,
      ),
      body: Center(
        child: Padding(
          padding: EdgeInsets.symmetric(horizontal: 40.w, vertical: 30.h),
          child: SingleChildScrollView(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Obx(() {
                  if (brandController.isLoading.value) {
                    return Center(child: CircularProgressIndicator());
                  } else if (brandController.brandDetail == null) {
                    return Center(child: Text("Dữ liệu không khả dụng"));
                  } else {
                    return Container(
                      width: Get.width *
                          0.85, // Giảm kích thước card một chút để tạo không gian
                      padding: const EdgeInsets.all(16.0),
                      child: Card(
                        elevation: 5, // Tăng độ đổ bóng nhẹ cho card
                        color: AppColors.backgroundCard,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(
                              20), // Bo tròn góc card để mềm mại hơn
                        ),
                        child: Column(
                          crossAxisAlignment:
                              CrossAxisAlignment.center, // Căn giữa nội dung
                          children: [
                            // Banner hình ảnh thương hiệu
                            ClipRRect(
                              borderRadius: BorderRadius.only(
                                topLeft: Radius.circular(
                                    20), // Bo tròn phần trên của hình ảnh
                                topRight: Radius.circular(20),
                              ),
                              child: Image.network(
                                brandController.brandDetail!.banner ?? '',
                                width: double.infinity,
                                height: 150, // Tăng chiều cao để banner nổi bật
                                fit: BoxFit.cover,
                                errorBuilder: (context, error, stackTrace) =>
                                    const Icon(Icons.error, size: 30),
                              ),
                            ),
                            SizedBox(height: 16),

                            // Tên thương hiệu
                            Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Text(
                                  "Tên thương hiệu: ${brandController.brandDetail!.name ?? 'Không có tên'}",
                                  style: TextStyle(
                                    fontSize: 18, // Tăng kích thước chữ
                                    fontWeight: FontWeight.bold,
                                    color: AppColors.white,
                                    letterSpacing:
                                        1.1, // Thêm khoảng cách giữa các chữ
                                  ),
                                  textAlign: TextAlign.center,
                                ),
                                10.horizontalSpace,
                            // Logo thương hiệu
                            ClipRRect(
                              borderRadius: BorderRadius.circular(
                                  10), // Bo tròn logo cho mềm mại
                              child: Image.network(
                                brandController.brandDetail!.logo ?? '',
                                width:
                                    60, // Tăng kích thước logo một chút để dễ nhận diện
                                height: 60,
                                fit: BoxFit.contain,
                                errorBuilder: (context, error, stackTrace) =>
                                    const Icon(Icons.error, size: 30),
                              ),
                            ),
                              ],
                            ),
                            SizedBox(height: 8),

                            // Mô tả về thương hiệu
                            Padding(
                              padding:
                                  const EdgeInsets.symmetric(horizontal: 16.0),
                              child: Text(
                                "Giới thiệu về thương hiệu: ${brandController.brandDetail!.description ?? 'Không có mô tả'}",
                                style: TextStyle(
                                  fontSize: 14,
                                  fontWeight: FontWeight.normal,
                                  color: Colors.white,
                                  height:
                                      1.5, // Tăng chiều cao dòng để văn bản dễ đọc hơn
                                ),
                                textAlign: TextAlign.center,
                              ),
                            ),

                            SizedBox(height: 16),
                          ],
                        ),
                      ),
                    );
                  }
                }),
                Container(
                  alignment: Alignment.center,
                  width: Get.width * 0.8,
                  decoration: BoxDecoration(
                    color: AppColors.backgroundCard.withOpacity(0.5),
                    borderRadius: BorderRadius.circular(16),
                  ),
                  child: Padding(
                    padding:
                        EdgeInsets.symmetric(horizontal: 20.w, vertical: 20.h),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const TextWidget(
                          text: "Danh sách sản phẩm",
                          fontSize: 24,
                          fontWeight: FontWeight.bold,
                          color: AppColors.white,
                        ),
                        30.verticalSpace,
                        Row(
                          mainAxisAlignment: MainAxisAlignment.center,
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
                            // Container(
                            //   width: Get.width * 0.2,
                            //   child: CustomSelect(
                            //     hint: "PC",
                            //     selectList: controllerCategory.categoryList
                            //         .map((e) =>
                            //             Item(id: e.id ?? '', name: e.name ?? ''))
                            //         .toList(),
                            //     onProjectSelected: (value) {
                            //       controller
                            //           .fetchProductsGroupedByBrand(value ?? '');
                            //     },
                            //   ),
                            // ),
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
                                      productsController: controller,
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
                                if (brandController.isLoading.value) {
                                  return const Center(
                                      child: CircularProgressIndicator());
                                }
                                return Column(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  crossAxisAlignment: CrossAxisAlignment.center,
                                  children: [
                                    Expanded(
                                      flex: 5,
                                      child: SfDataGrid(
                                        headerRowHeight: 80,
                                        rowHeight: 80,
                                        gridLinesVisibility:
                                            GridLinesVisibility.none,
                                        headerGridLinesVisibility:
                                            GridLinesVisibility.none,
                                        source:
                                            brandController.brandDetailGridRow,
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
                                      child: Card(
                                        color: AppColors.white,
                                        elevation: 3,
                                        child: SfDataPager(
                                          itemHeight: 50,
                                          itemWidth: 50,
                                          pageCount: brandController
                                                      .productBrand.length /
                                                  7 +
                                              1,
                                          visibleItemsCount: 7,
                                          delegate: brandController
                                              .brandDetailGridRow,
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
              ],
            ),
          ),
        ),
      ),
    );
  }
}
