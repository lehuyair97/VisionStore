import 'package:flutter/material.dart';
import 'package:flutter_web/common/img/lottie.dart';
import 'package:flutter_web/common/widgets/text_widget.dart';
import 'package:flutter_web/core/configs/theme/app_colors.dart';
import 'package:flutter_web/feature/auth/controller/login_comtroller.dart';
import 'package:flutter_web/feature/brand/controller/brand_controller.dart';
import 'package:flutter_web/feature/home/controller/home_contrioller.dart';
import 'package:flutter_web/feature/home/model/health_model.dart';
import 'package:flutter_web/feature/home/widget/LineChart/line_chart_sample%20.dart';
import 'package:flutter_web/feature/home/widget/activity_details_card.dart';
import 'package:flutter_web/feature/home/widget/custom_appbar.dart';
import 'package:flutter_web/feature/home/widget/pie/pie_chart.dart';
import 'package:flutter_web/feature/home/widget/product_item_top.dart';
import 'package:flutter_web/feature/orders/controller/oder_controller.dart';
import 'package:flutter_web/feature/products/controller/products_controller.dart';
import 'package:flutter_web/feature/user/controller/user_controller.dart';
import 'package:get/get.dart';
import 'package:responsive_builder/responsive_builder.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lottie/lottie.dart';

class HomeView extends StatefulWidget {
  const HomeView({super.key});

  @override
  State<HomeView> createState() => _HomeViewState();
}

class _HomeViewState extends State<HomeView> {
  int touchedIndex = -1;

  @override
  Widget build(BuildContext context) {
    final controller = Get.find<HomeController>();
    final controllerBrand = Get.put(BrandController());
    final controllerUser = Get.put(UserController());
    final controllerOrder = Get.put(OrderController());
    final controllerProduct = Get.put(ProductsController());
    return Scaffold(
      body: Center(
        child: ResponsiveBuilder(builder: (context, sizingInformation) {
          return SingleChildScrollView(
              child: Container(
            height: Get.height * 3,
            width: Get.width,
            child: Obx(
              () => controller.isLoading.value ||
                      controllerBrand.isLoading.value || controller.isloadingtop.value || controller.productTop == null
                  ? const Center(child: CircularProgressIndicator())
                  : Column(
                      mainAxisAlignment: MainAxisAlignment.start,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Padding(
                          padding: EdgeInsets.symmetric(horizontal: 20.w),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.center,
                            children: [
                              Padding(
                                padding: EdgeInsets.symmetric(vertical: 20.w),
                                child: CustomAppBar(),
                              ),
                              ActivityDetailsCard(
                                healthDetails: [
                                  HealthModel(
                                      icon: 'assets/svg/burn.svg',
                                      value:
                                          "${controller.revenueData?.revenue} VND",
                                      title: "Tổng doanh thu",
                                      color: AppColors.backgroundCard),
                                  HealthModel(
                                      icon: 'assets/svg/steps.svg',
                                      value:
                                          "${controllerOrder.orders.value.length}",
                                      title: "Tổng sản phẩm đã bán",
                                      color: AppColors.backgroundCard),
                                  HealthModel(
                                      icon: 'assets/svg/distance.svg',
                                      value: "${controllerBrand.brands.length}",
                                      title: "Thương hiệu đã đăng ký",
                                      color: AppColors.backgroundCard),
                                  HealthModel(
                                      icon: 'assets/svg/sleep.svg',
                                      value:
                                          "${controllerProduct.productGridRows.length}",
                                      title: "Tổng sản phẩm hiện có",
                                      color: AppColors.backgroundCard),
                                ],
                              ),
                              30.verticalSpace,
                              Row(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Expanded(
                                    flex: 2,
                                    child: Card(
                                      color: AppColors.backgroundCard,
                                      elevation: 3,
                                      child: Column(
                                        crossAxisAlignment:
                                            CrossAxisAlignment.start,
                                        children: [
                                          LineChartSample2(
                                            revenueMonth: controller.revenueMonth!,
                                            color: AppColors.backgroundCard,
                                          ),
                                        ],
                                      ),
                                    ),
                                  ),
                                  30.horizontalSpace,
                                  Expanded(
                                    flex: 1,
                                    child: Column(
                                      children: [
                                        PieChartWidget(
                                          revenueMonth: controller.revenueMonth!,
                                          title: 'Biểu So sanh doanh thu trước và sau',
                                          width: 1.5,
                                          color: AppColors.backgroundCard,
                                          userCount: controllerUser
                                              .userList.value.length,
                                        ),
                                      ],
                                    ),
                                  ),
                                ],
                              ),
                              20.verticalSpace,
                              Container(
                                width: Get.width,
                                height: Get.height,
                                child: Row(
                                  children: [
                                    Expanded(
                                      flex: 1,
                                      child: Card(
                                        elevation: 3,
                                        color: AppColors.backgroundCard,
                                        child: Padding(
                                          padding: EdgeInsets.symmetric(
                                              horizontal: 40.w, vertical: 30.w),
                                          child: Column(
                                            crossAxisAlignment:
                                                CrossAxisAlignment.start,
                                            children: [
                                              TextWidget(
                                                text: 'Top 10 Sản phẩm bán chạy',
                                                fontSize: 24,
                                                fontWeight: FontWeight.bold,
                                              ),
                                              30.verticalSpace,
                                              Container(
                                                height: Get.height * 0.8,
                                                width: Get.width,
                                                child: ListView.builder(
                                                  shrinkWrap: true,
                                                  itemCount: controller.productTop10Model!.length,
                                                  itemBuilder:(context, index) =>
                                                          Padding(
                                                    padding:
                                                        EdgeInsets.symmetric(
                                                            vertical: 10.w),
                                                    child: ProductItemTop(
                                                      product: controller.productTop10Model![index],
                                                    ),
                                                  ),
                                                ),
                                              )
                                            ],
                                          ),
                                        ),
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                              20.verticalSpace,
                              Card(
                                elevation: 3,
                                color: AppColors.backgroundCard,
                                child: Container(
                                  width: Get.width * 0.9,
                                  height: Get.height * 0.5,
                                  child: Row(
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    mainAxisAlignment: MainAxisAlignment.start,
                                    children: [
                                      Expanded(
                                        flex: 1,
                                        child: Lottie.network(
                                            LottieClass.adManagement),
                                      ),
                                      Expanded(
                                        flex: 1,
                                        child: Column(
                                          crossAxisAlignment:
                                              CrossAxisAlignment.start,
                                          mainAxisAlignment:
                                              MainAxisAlignment.start,
                                          children: [
                                            30.verticalSpace,
                                            TextWidget(
                                              text:
                                                  "Cảm ơn sự cố gắng không ngừng trong suốt tháng qua và quá trình phát triển của VisionStore. Dưới đây là tổng kết của tháng vừa qua.",
                                              fontSize: 20,
                                              fontWeight: FontWeight.bold,
                                              maxLines: 2,
                                              color: AppColors.backgroundTab,
                                            ),
                                            60.verticalSpace,
                                           TextWidget(
                                              text:
                                                  '- Tổng doanh thu: ${controller.revenueData?.revenue} VND',
                                              fontSize: 16,
                                              fontWeight: FontWeight.w500,
                                            ),
                                            30.verticalSpace,
                                            TextWidget(
                                              text:
                                                  '- Trung bình mỗi người dùng đã mua khoảng ${(controllerOrder.orders.value.length / controllerUser.userList.value.length).toStringAsFixed(2)} sản phẩm',
                                              fontSize: 16,
                                              fontWeight: FontWeight.w500,
                                            ),
                                            30.verticalSpace,
                                            TextWidget(
                                              text:
                                                  '- Thương hiệu đã đăng ký: ${controllerBrand.brands.length}',
                                              fontSize: 16,
                                              fontWeight: FontWeight.w500,
                                            ),
                                            30.verticalSpace,
                                            TextWidget(
                                              text:
                                                  '- Sản phẩm đã đăng ký: ${controllerProduct.productGridRows.length}',
                                              fontSize: 16,
                                              fontWeight: FontWeight.w500,
                                            ),
                                            30.verticalSpace,
                                            TextWidget(
                                              text:
                                                  '- Người dùng đã đăng ký: ${controllerUser.userList.value.length}',
                                              fontSize: 16,
                                              fontWeight: FontWeight.w500,
                                            ),
                                            30.verticalSpace,
                                            TextWidget(
                                              text:
                                                  '- Tổng sản phẩm đã bán: ${controllerOrder.orders.value.length}',
                                              fontSize: 16,
                                              fontWeight: FontWeight.w500,
                                            ),
                                          ],
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                              )
                            ],
                          ),
                        ),
                      ],
                    ),
            ),
          ));
        }),
      ),
    );
  }
}
