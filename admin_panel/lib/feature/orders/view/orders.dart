import 'package:flutter/material.dart';
import 'package:flutter_web/common/widgets/text_widget.dart';
import 'package:flutter_web/core/configs/theme/app_colors.dart';
import 'package:flutter_web/feature/orders/controller/oder_controller.dart';
import 'package:flutter_web/feature/orders/widget/orders_gridRow.dart';
import 'package:flutter_web/common/widgets/search_field.dart';
import 'package:get/get.dart';
import 'package:syncfusion_flutter_datagrid/datagrid.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class OrdersView extends StatelessWidget {
  const OrdersView({super.key});

  @override
  Widget build(BuildContext context) {
    final controller = Get.find<OrderController>();

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
                  text: "Danh sách đơn hàng",
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
                                  source: OrdersGridDataSource(
                                      orders: controller.orders),
                                  columns: <GridColumn>[
                                    GridColumn(
                                      visible: false,
                                      columnName: OrdersGridCell.id,
                                      width: Get.width * 0.8 / 6.5,
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
                                      columnName: OrdersGridCell.user,
                                      width: Get.width * 0.8 / 7,
                                      label: Container(
                                        padding: EdgeInsets.all(16.0),
                                        alignment: Alignment.center,
                                        child: TextWidget(
                                            text: 'Tên khách hàng',
                                            fontSize: 16,
                                            fontWeight: FontWeight.bold),
                                      ),
                                    ),
                                    GridColumn(
                                      columnName: OrdersGridCell.phone,
                                      width: Get.width * 0.8 / 7,
                                      label: Container(
                                        padding: EdgeInsets.all(16.0),
                                        alignment: Alignment.center,
                                        child: TextWidget(
                                            text: 'Số điện thoại',
                                            fontSize: 16,
                                            fontWeight: FontWeight.bold),
                                      ),
                                    ),
                                    GridColumn(
                                      columnName: OrdersGridCell.email,
                                      width: Get.width * 0.8 / 7,
                                      label: Container(
                                        padding: EdgeInsets.all(16.0),
                                        alignment: Alignment.center,
                                        child: TextWidget(
                                            text: 'Email',
                                            fontSize: 16,
                                            fontWeight: FontWeight.bold),
                                      ),
                                    ),
                                    GridColumn(
                                      columnName: OrdersGridCell.address,
                                      width: Get.width * 0.8 / 5.5,
                                      label: Container(
                                        padding: EdgeInsets.all(16.0),
                                        alignment: Alignment.center,
                                        child: TextWidget(
                                            text: 'Địa chỉ',
                                            fontSize: 16,
                                            fontWeight: FontWeight.bold),
                                      ),
                                    ),
                                    GridColumn(
                                      columnName: OrdersGridCell.paymentMethod,
                                      width: Get.width * 0.8 / 7,
                                      label: Container(
                                        padding: EdgeInsets.all(16.0),
                                        alignment: Alignment.center,
                                        child: TextWidget(
                                            text: 'Phương thức thanh toán',
                                            fontSize: 16,
                                            maxLines: 2,
                                            fontWeight: FontWeight.bold),
                                      ),
                                    ),
                                    GridColumn(
                                      columnName: OrdersGridCell.deliveryMethod,
                                      width: Get.width * 0.8 / 6.5,
                                      label: Container(
                                        padding: EdgeInsets.all(16.0),
                                        alignment: Alignment.center,
                                        child: TextWidget(
                                            text: 'Phương thức giao hàng',
                                            fontSize: 16,
                                            maxLines: 2,
                                            fontWeight: FontWeight.bold),
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
