import 'package:flutter/material.dart';
import 'package:flutter_web/common/widgets/text_widget.dart';
import 'package:flutter_web/core/configs/theme/app_colors.dart';
import 'package:flutter_web/feature/home/controller/home_contrioller.dart';
import 'package:flutter_web/feature/home/widget/LineChart/line_chart_sample%20.dart';
import 'package:flutter_web/feature/home/widget/activity_details_card.dart';
import 'package:flutter_web/feature/home/widget/custom_appbar.dart';
import 'package:flutter_web/feature/home/widget/pie/pie_chart.dart';
import 'package:flutter_web/feature/home/widget/product_item_top.dart';
import 'package:get/get.dart';
import 'package:responsive_builder/responsive_builder.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

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
    return Scaffold(
      body: Center(
        child: ResponsiveBuilder(builder: (context, sizingInformation) {
          return SingleChildScrollView(
              child: Container(
            height: Get.height * 3,
            width: Get.width,
            child: Obx(
              () => controller.isLoading.value
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
                                  healthDetails: controller.healthDetails),
                              30.verticalSpace,
                              Row(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  const Expanded(
                                    flex: 2,
                                    child: Card(
                                      color: AppColors.backgroundCard,
                                      elevation: 3,
                                      child: Column(
                                        crossAxisAlignment:
                                            CrossAxisAlignment.start,
                                        children: [
                                          LineChartSample2(
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
                                        const PieChartWidget(
                                          width: 1.5,
                                          color: AppColors.backgroundCard,
                                        ),
                                        25.verticalSpace,
                                        const PieChartWidget(
                                          width: 1.5,
                                          color: AppColors.backgroundCard,
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
                                                text: 'Sản phẩm bán chạy',
                                                fontSize: 24,
                                                fontWeight: FontWeight.bold,
                                              ),
                                              30.verticalSpace,
                                              Container(
                                                height: Get.height * 0.8,
                                                width: Get.width,
                                                child: ListView.builder(
                                                  shrinkWrap: true,
                                                  itemCount: controller
                                                      .products.length,
                                                  itemBuilder:
                                                      (context, index) =>
                                                          Padding(
                                                    padding:
                                                        EdgeInsets.symmetric(
                                                            vertical: 10.w),
                                                    child: ProductItemTop(
                                                      product: controller
                                                          .products[index],
                                                    ),
                                                  ),
                                                ),
                                              )
                                            ],
                                          ),
                                        ),
                                      ),
                                    ),
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
                                                text:
                                                    'Thang 6 sản phẩm bán chạy',
                                                fontSize: 24,
                                                fontWeight: FontWeight.bold,
                                              ),
                                              30.verticalSpace,
                                              Container(
                                                height: Get.height * 0.8,
                                                width: Get.width,
                                                child: ListView.builder(
                                                  shrinkWrap: true,
                                                  itemCount: controller
                                                      .products.length,
                                                  itemBuilder:
                                                      (context, index) =>
                                                          Padding(
                                                    padding:
                                                        EdgeInsets.symmetric(
                                                            vertical: 10.w),
                                                    child: ProductItemTop(
                                                      product: controller
                                                          .products[index],
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
