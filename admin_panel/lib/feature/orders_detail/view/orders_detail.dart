import 'package:flutter/material.dart';
import 'package:flutter_web/common/widgets/text_widget.dart';
import 'package:flutter_web/core/configs/theme/app_colors.dart';
import 'package:flutter_web/feature/orders_detail/controller/oder_detail_controller.dart';
import 'package:get/get.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class OrdersDetail extends StatelessWidget {
  OrdersDetail({super.key});

  @override
  Widget build(BuildContext context) {
    final String orderID = Get.arguments;
    final OderDetailController orderController = Get.find();
    orderController.fetchOrdersID(orderID);

    return Scaffold(
      appBar: AppBar(
        title: TextWidget(text: "Chi tiết lịch sử mua hàng",color: AppColors.backgroundCard,),
        centerTitle: true,
        backgroundColor: AppColors.white,
      ),
      body: Obx(
        () => orderController.isLoading.value
            ? const Center(child: CircularProgressIndicator())
            : Padding(
                padding: EdgeInsets.symmetric(horizontal: 60.w, vertical: 40.h),
                child: SingleChildScrollView(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      // Thông tin người dùng
                      Container(
                        padding: EdgeInsets.symmetric(horizontal: 40.w, vertical: 20.h),
                        width: Get.width,
                        decoration: BoxDecoration(
                          color: AppColors.backgroundCard,
                          borderRadius: BorderRadius.circular(16),
                        ),
                        child: Row(
                          crossAxisAlignment: CrossAxisAlignment.center,
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            SizedBox(
                              width: Get.width * 0.4,
                              height: Get.height * 0.3,
                              child: Card(
                                color: AppColors.backgroundCard,
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(10),
                                ),
                                elevation: 4,
                                child: Padding(
                                  padding: EdgeInsets.all(20.0.w),
                                  child: Column(
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    mainAxisAlignment: MainAxisAlignment.center,
                                    children: [
                                      TextWidget(
                                        text: "Thông tin khách hàng",
                                        fontSize: 24,
                                        fontWeight: FontWeight.bold,
                                        color: AppColors.white,
                                      ),
                                      SizedBox(height: 10.h),
                                      if (orderController.order.isNotEmpty) ...[
                                        TextWidget(
                                          text:
                                              "Tên người dùng: ${orderController.order[0].customerName}",
                                          fontSize: 16,
                                          color: AppColors.white,
                                        ),
                                        TextWidget(
                                          text:
                                              "Email: ${orderController.order[0].customerEmail}",
                                          fontSize: 16,
                                          color: AppColors.white,
                                        ),
                                        TextWidget(
                                          text:
                                              "Số điện thoại: ${orderController.order[0].customerPhoneNumber}",
                                          fontSize: 16,
                                          color: AppColors.white,
                                        ),
                                        TextWidget(
                                          text:
                                              "Địa chỉ: ${orderController.order[0].customerAddress}",
                                          fontSize: 16,
                                          color: AppColors.white,
                                        ),
                                      ] else
                                        Center(
                                          child: TextWidget(
                                            text:
                                                "Không có thông tin khách hàng.",
                                            fontSize: 16,
                                            color: AppColors.white,
                                          ),
                                        ),
                                      SizedBox(height: 20.h),
                                    ],
                                  ),
                                ),
                              ),
                            ),
                            SizedBox(width: 200.h),

                            // Thông tin đơn hàng
                            SizedBox(
                              width: Get.width * 0.4,
                              height: Get.height * 0.3,
                              child: Card(
                                color: AppColors.backgroundCard,
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(10),
                                ),
                                elevation: 4,
                                child: Padding(
                                  padding: EdgeInsets.all(20.0.w),
                                  child: Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    mainAxisAlignment: MainAxisAlignment.center,

                                    children: [
                                      TextWidget(
                                        text: "Thông tin đơn hàng",
                                        fontSize: 24,
                                        fontWeight: FontWeight.bold,
                                        color: AppColors.white,
                                      ),
                                      SizedBox(height: 10.h),
                                      if (orderController.order.isNotEmpty) ...[
                                        TextWidget(
                                          text:
                                              "Phương thức thanh toán: ${orderController.order[0].paymentMethod}",
                                          fontSize: 16,
                                          color: AppColors.white,
                                        ),
                                        TextWidget(
                                          text:
                                              "Phương thức giao hàng: ${orderController.order[0].deliveryMethod?.method} (${orderController.order[0].deliveryMethod?.description})",
                                          fontSize: 16,
                                          color: AppColors.white,
                                        ),
                                        TextWidget(
                                          text:
                                              "Ngày giao dự kiến: ${orderController.order[0].deliveryMethod?.estimatedDeliveryTime}",
                                          fontSize: 16,
                                          color: AppColors.white,
                                        ),
                                        TextWidget(
                                          text:
                                              "Tổng hóa đơn: ${orderController.order[0].totalBill} VND",
                                          fontSize: 16,
                                          color: AppColors.white,
                                        ),
                                        TextWidget(
                                          text:
                                              "Trạng thái đơn hàng: ${orderController.order[0].status}",
                                          fontSize: 16,
                                          color: AppColors.white,
                                        ),
                                      ] else
                                        Center(
                                          child: TextWidget(
                                            text: "Không có thông tin đơn hàng.",
                                            fontSize: 16,
                                            color: AppColors.white,
                                          ),
                                        ),
                                      SizedBox(height: 20.h),
                                    ],
                                  ),
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),

                      SizedBox(height: 30.h),

                      // Danh sách sản phẩm đã mua
                      if (orderController.order.isNotEmpty &&
                          orderController.order[0].items != null) ...[
                        Card(
                          color: AppColors.backgroundCard,
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(10),
                          ),
                          elevation: 4,
                          child: Padding(
                            padding: EdgeInsets.all(20.0.w),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                TextWidget(
                                  text: "Danh sách sản phẩm đã mua",
                                  fontSize: 24,
                                  fontWeight: FontWeight.bold,
                                  color: AppColors.white,
                                ),
                                SizedBox(height: 10.h),
                                ListView.builder(
                                  shrinkWrap: true,
                                  physics: NeverScrollableScrollPhysics(),
                                  itemCount:
                                      orderController.order[0].items?.length,
                                  itemBuilder: (context, index) {
                                    final item =
                                        orderController.order[0].items?[index];
                                    return item != null
                                        ? Column(
                                            children: [
                                              ListTile(
                                                leading: Image.network(
                                                  item.image ?? "",
                                                  width: 80.w,
                                                  height: 80.h,
                                                  errorBuilder: (context, error,
                                                      stackTrace) {
                                                    return const Icon(
                                                      Icons.error,
                                                      color: Colors.red,
                                                    );
                                                  },
                                                ),
                                                title: TextWidget(
                                                  text: item.productName ?? "",
                                                  fontSize: 16,
                                                  color: AppColors.white,
                                                ),
                                                subtitle: Column(
                                                  crossAxisAlignment:
                                                      CrossAxisAlignment.start,
                                                  children: [
                                                    TextWidget(
                                                      text:
                                                          "Giá: ${item.price} VND",
                                                      fontSize: 14,
                                                      color: AppColors.white,
                                                    ),
                                                    TextWidget(
                                                      text:
                                                          "Số lượng: ${item.quantity}",
                                                      fontSize: 14,
                                                      color: AppColors.white,
                                                    ),
                                                  ],
                                                ),
                                              ),
                                              Divider(color: AppColors.white),
                                            ],
                                          )
                                        : SizedBox.shrink();
                                  },
                                ),
                              ],
                            ),
                          ),
                        ),
                      ] else
                        Center(
                          child: TextWidget(
                            text: "Không có sản phẩm nào trong đơn hàng.",
                            fontSize: 16,
                            color: AppColors.white,
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
