import 'package:flutter/material.dart';
import 'package:flutter_web/common/widgets/text_widget.dart';
import 'package:flutter_web/core/configs/theme/app_colors.dart';
import 'package:flutter_web/feature/home/widget/custom_appbar.dart';
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
                        text: "Danh sách đơn hàng",
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
                                    source: controller.ordersGridDataSource,
                                    columns: <GridColumn>[
                                      GridColumn(
                                        visible: false,
                                        columnName: OrdersGridCell.id,
                                        width: Get.width * 0.1,
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
                                        width: Get.width * 0.1,
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
                                        width: Get.width * 0.1,
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
                                        width: Get.width * 0.1,
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
                                        width: Get.width * 0.1,
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
                                        columnName:
                                            OrdersGridCell.paymentMethod,
                                        width: Get.width * 0.1,
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
                                        columnName:
                                            OrdersGridCell.deliveryMethod,
                                        width: Get.width * 0.2,
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
                                      GridColumn(
                                        columnName: OrdersGridCell.detail,
                                        width: Get.width * 0.08,
                                        label: Container(
                                          padding: EdgeInsets.all(16.0),
                                          alignment: Alignment.center,
                                          child: TextWidget(
                                              text: 'Chi tiết', fontSize: 16),
                                        ),
                                      ),
                                      GridColumn(
                                        columnName: OrdersGridCell.delete,
                                        width: Get.width * 0.08,
                                        label: Container(
                                          padding: EdgeInsets.all(16.0),
                                          alignment: Alignment.center,
                                          child: TextWidget(
                                              text: 'Xóa', fontSize: 16),
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
                                      pageCount: controller.orders.length / 7,
                                      visibleItemsCount: 7,
                                      delegate: controller.ordersGridDataSource,
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
