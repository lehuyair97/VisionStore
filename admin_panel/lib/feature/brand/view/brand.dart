import 'package:flutter/material.dart';
import 'package:flutter_web/common/widgets/custom_button.dart';
import 'package:flutter_web/common/widgets/text_widget.dart';
import 'package:flutter_web/core/configs/theme/app_colors.dart';
import 'package:flutter_web/feature/brand/controller/brand_controller.dart';
import 'package:flutter_web/feature/brand/widget/brand_gridRow.dart';
import 'package:flutter_web/feature/brand_create/view/brand_create.dart';
import 'package:flutter_web/common/widgets/search_field.dart';
import 'package:flutter_web/feature/home/widget/custom_appbar.dart';
import 'package:get/get.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:syncfusion_flutter_datagrid/datagrid.dart';

class BrandView extends StatelessWidget {
  const BrandView({super.key});

  @override
  Widget build(BuildContext context) {
    final controller = Get.find<BrandController>();

    return Scaffold(
      body: Padding(
        padding: EdgeInsets.symmetric(horizontal: 40.w, vertical: 30.h),
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              CustomAppBar(),
              30.verticalSpace,
              Container(
                alignment: Alignment.center,
                width: Get.width * 0.8,
                decoration: BoxDecoration(
                  color: AppColors.backgroundCard.withOpacity(0.5),
                  borderRadius: BorderRadius.circular(16),
                ),
                child: Padding(
                  padding:
                      EdgeInsets.symmetric(horizontal: 20.w, vertical: 30.h),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const TextWidget(
                        text: "Danh sách thương hiệu",
                        fontSize: 24,
                        fontWeight: FontWeight.bold,
                        color: AppColors.white,
                      ),
                      20.verticalSpace,
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          SizedBox(
                            width: Get.width * 0.3,
                            child: SearchField(
                              controller: controller.searchController.value,
                              onChanged: (value) {},
                            ),
                          ),
                          const Spacer(),
                          CustomButton(
                            horizontalPadding: 30,
                            verticalPadding: 15,
                            textColor: AppColors.white,
                            color: AppColors.primary,
                            text: "+ Thêm thương hiệu",
                            onPressed: () {
                              Get.dialog(BrandCreate());
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
                          child: Obx(() {
                            if (controller.isLoading.value) {
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
                                    source: controller.brandGridDataSource,
                                    columns: <GridColumn>[
                                      GridColumn(
                                        visible: false,
                                        columnName: BrandGridCell.id,
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
                                        columnName: BrandGridCell.logo,
                                        width: Get.width * 0.1,
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
                                        columnName: BrandGridCell.name,
                                        width: Get.width * 0.2,
                                        label: Container(
                                          padding: EdgeInsets.all(16.0),
                                          alignment: Alignment.center,
                                          child: TextWidget(
                                              text: 'Tên thương hiệu',
                                              fontSize: 16,
                                              fontWeight: FontWeight.bold),
                                        ),
                                      ),
                                      GridColumn(
                                        columnName: BrandGridCell.description,
                                        width: Get.width * 0.3,
                                        label: Container(
                                          padding: EdgeInsets.all(16.0),
                                          alignment: Alignment.center,
                                          child: TextWidget(
                                              text: 'Mô tả',
                                              fontSize: 16,
                                              fontWeight: FontWeight.bold),
                                        ),
                                      ),
                                      GridColumn(
                                        columnName: BrandGridCell.edit,
                                        width: Get.width * 0.1,
                                        label: Container(
                                          padding: EdgeInsets.all(16.0),
                                          alignment: Alignment.center,
                                          child: TextWidget(
                                            text: 'Sửa',
                                            fontSize: 16,
                                            fontWeight: FontWeight.bold,
                                          ),
                                        ),
                                      ),
                                      GridColumn(
                                        columnName: BrandGridCell.delete,
                                        width: Get.width * 0.05,
                                        label: Container(
                                          padding: EdgeInsets.all(16.0),
                                          alignment: Alignment.center,
                                          child: TextWidget(
                                            text: 'Xóa',
                                            fontSize: 16,
                                            fontWeight: FontWeight.bold,
                                          ),
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
                                      borderRadius: BorderRadius.circular(16),
                                    ),
                                    child: SfDataPager(
                                      pageCount: controller.brands.length / 7,
                                      visibleItemsCount: 7,
                                      delegate: controller.brandGridDataSource,
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
                          }),
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
    );
  }
}
