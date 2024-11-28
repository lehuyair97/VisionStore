import 'package:flutter/material.dart';
import 'package:flutter_web/common/widgets/text_widget.dart';
import 'package:flutter_web/core/configs/theme/app_colors.dart';
import 'package:flutter_web/feature/products/widget/search_field.dart';
import 'package:flutter_web/feature/voucher/controller/voucher_controller.dart';
import 'package:flutter_web/feature/voucher/widget/voucher_gridRow.dart';
import 'package:get/get.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:syncfusion_flutter_datagrid/datagrid.dart';

class VoucherView extends StatelessWidget {
  const VoucherView({super.key});

  @override
  Widget build(BuildContext context) {
    final controller = Get.find<VoucherController>();

    return Obx(() {
      if (controller.isLoading.value) {
        return const Center(child: CircularProgressIndicator());
      }
      return Scaffold(
        body: Padding(
          padding: EdgeInsets.symmetric(horizontal: 40.w, vertical: 30.h),
          child: SingleChildScrollView(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                TextWidget(
                  text: "Danh sách Voucher",
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                  color: AppColors.primary,
                ),
                20.verticalSpace,
                Container(
                  alignment: Alignment.center,
                  width: Get.width * 0.8,
                  decoration: BoxDecoration(
                    color: AppColors.backgroundTab,
                    borderRadius: BorderRadius.circular(16),
                  ),
                  child: Padding(
                    padding:
                        EdgeInsets.symmetric(horizontal: 20.w, vertical: 10.h),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
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
                          ],
                        ),
                        30.verticalSpace,
                        Container(
                          height: Get.height * 1,
                          width: Get.width * 0.8,
                          alignment: Alignment.center,
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            crossAxisAlignment: CrossAxisAlignment.center,
                            children: [
                              Expanded(
                                flex: 4,
                                child: SfDataGrid(
                                  headerRowHeight: 80,
                                  rowHeight: 80,
                                  gridLinesVisibility: GridLinesVisibility.none,
                                  headerGridLinesVisibility:
                                      GridLinesVisibility.none,
                                  source: VoucherGridDataSource(
                                      vouchers: controller.vouchers),
                                  columns: <GridColumn>[
                                    GridColumn(
                                      columnName: VoucherGridCell.id,
                                      visible: false,
                                      width: Get.width * 0.1, // Adjusted width
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
                                      width: Get.width * 0.08, // Adjusted width
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
                                      width: Get.width * 0.2, // Adjusted width
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
                                      width: Get.width * 0.25, // Adjusted width
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
                                      width: Get.width * 0.1, // Adjusted width
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
                                      width: Get.width * 0.1, // Adjusted width
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
                            ],
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
    });
  }
}
