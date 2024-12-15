import 'package:flutter/material.dart';
import 'package:flutter_web/common/widgets/custom_button.dart';
import 'package:flutter_web/common/widgets/text_widget.dart';
import 'package:flutter_web/core/configs/theme/app_colors.dart';
import 'package:flutter_web/common/widgets/search_field.dart';
import 'package:flutter_web/feature/home/widget/custom_appbar.dart';
import 'package:flutter_web/feature/voucher/controller/voucher_controller.dart';
import 'package:flutter_web/feature/voucher/widget/voucher_gridRow.dart';
import 'package:flutter_web/feature/voucher_create/view/voucher_create.dart';
import 'package:get/get.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:syncfusion_flutter_datagrid/datagrid.dart';

class VoucherView extends StatelessWidget {
  const VoucherView({super.key});

  @override
  Widget build(BuildContext context) {
    final controller = Get.find<VoucherController>();
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
                      EdgeInsets.symmetric(horizontal: 20.w, vertical: 10.h),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      TextWidget(
                        text: "Danh sách Voucher",
                        fontSize: 24,
                        fontWeight: FontWeight.bold,
                        color: AppColors.white,
                      ),
                      20.verticalSpace,
                      Row(
                        mainAxisAlignment: MainAxisAlignment.start,
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
                            text: "+ Thêm voucher",
                            onPressed: () {
                              showDialog(
                                context: context,
                                builder: (BuildContext context) {
                                  return const VoucherCreate();
                                },
                              );
                            },
                          ),
                        ],
                      ),
                      30.verticalSpace,
                      Card(
                        elevation: 5,
                        color: AppColors.backgroundCard.withOpacity(0.5),
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
                                  flex: 4,
                                  child: SfDataGrid(
                                    headerRowHeight: 80,
                                    rowHeight: 80,
                                    gridLinesVisibility:
                                        GridLinesVisibility.none,
                                    headerGridLinesVisibility:
                                        GridLinesVisibility.none,
                                    source: controller.voucherGridDataSource,
                                    columns: <GridColumn>[
                                      GridColumn(
                                        columnName: VoucherGridCell.id,
                                        visible: false,
                                        width:
                                            Get.width * 0.1, // Adjusted width
                                        label: Container(
                                          padding: EdgeInsets.all(16.0),
                                          alignment: Alignment.center,
                                          child: TextWidget(
                                            text: 'ID',
                                            fontSize: 16,
                                            fontWeight: FontWeight.bold,
                                          ),
                                        ),
                                      ),
                                      GridColumn(
                                        columnName: VoucherGridCell.code,
                                        width:
                                            Get.width * 0.1, // Adjusted width
                                        label: Container(
                                          padding: EdgeInsets.all(16.0),
                                          alignment: Alignment.center,
                                          child: TextWidget(
                                            text: 'Mã voucher',
                                            fontSize: 16,
                                            fontWeight: FontWeight.bold,
                                          ),
                                        ),
                                      ),
                                      GridColumn(
                                        columnName: VoucherGridCell.title,
                                        width:
                                            Get.width * 0.2, // Adjusted width
                                        label: Container(
                                          padding: EdgeInsets.all(16.0),
                                          alignment: Alignment.center,
                                          child: TextWidget(
                                            text: 'Tên voucher',
                                            fontSize: 16,
                                            fontWeight: FontWeight.bold,
                                          ),
                                        ),
                                      ),
                                      GridColumn(
                                        columnName: VoucherGridCell.description,
                                        width:
                                            Get.width * 0.25, // Adjusted width
                                        label: Container(
                                          padding: EdgeInsets.all(16.0),
                                          alignment: Alignment.center,
                                          child: TextWidget(
                                            text: 'Mô tả',
                                            fontSize: 16,
                                            fontWeight: FontWeight.bold,
                                          ),
                                        ),
                                      ),
                                      GridColumn(
                                        columnName: VoucherGridCell.status,
                                        width:
                                            Get.width * 0.1, // Adjusted width
                                        label: Container(
                                          padding: EdgeInsets.all(16.0),
                                          alignment: Alignment.center,
                                          child: TextWidget(
                                            text: 'Trạng thái',
                                            fontSize: 16,
                                            fontWeight: FontWeight.bold,
                                          ),
                                        ),
                                      ),
                                      GridColumn(
                                        columnName: VoucherGridCell.type,
                                        width:
                                            Get.width * 0.1, // Adjusted width
                                        label: Container(
                                          padding: EdgeInsets.all(16.0),
                                          alignment: Alignment.center,
                                          child: TextWidget(
                                            text: 'Loại voucher',
                                            fontSize: 16,
                                            fontWeight: FontWeight.bold,
                                          ),
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                                Expanded(
                                  flex: 1,
                                  child: Container(
                                    decoration: BoxDecoration(
                                      color: AppColors.white,
                                      borderRadius: BorderRadius.circular(16),
                                    ),
                                    child: SfDataPager(
                                      pageCount: controller.vouchers.length / 6,
                                      visibleItemsCount: 7,
                                      delegate:
                                          controller.voucherGridDataSource,
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
