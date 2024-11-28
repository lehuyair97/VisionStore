import 'package:flutter/material.dart';
import 'package:flutter_web/common/img/img.dart';
import 'package:flutter_web/common/widgets/text_widget.dart';
import 'package:flutter_web/core/configs/theme/app_colors.dart';
import 'package:flutter_web/feature/home/controller/home_contrioller.dart';
import 'package:flutter_web/feature/home/widget/LineChart/line_chart_sample%20.dart';
import 'package:flutter_web/feature/home/widget/activity_details_card.dart';
import 'package:flutter_web/feature/products/widget/search_field.dart';
import 'package:flutter_web/feature/profile/profile.dart';
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
      backgroundColor: AppColors.white,
      body: Center(
        child: ResponsiveBuilder(builder: (context, sizingInformation) {
          return SingleChildScrollView(
            child: Container(
              height: Get.height * 2,
              width: Get.width,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.start,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Expanded(
                        flex: 5,
                        child: Padding(
                            padding: EdgeInsets.symmetric(horizontal: 20.w),
                            child: Column(
                                crossAxisAlignment: CrossAxisAlignment.center,
                                children: [
                                  10.verticalSpace,
                                  SizedBox(
                                    width: Get.width,
                                    child: SearchField(
                                      controller: controller.searchController,
                                      onChanged: (value) {},
                                    ),
                                  ),
                                  20.verticalSpace,
                                  ActivityDetailsCard(
                                      healthDetails: controller.healthDetails),
                                  30.verticalSpace,
                                  Container(
                                    width: Get.width,
                                    child: Column(
                                      crossAxisAlignment:
                                          CrossAxisAlignment.start,
                                      children: [
                                        TextWidget(
                                          text: 'Biểu đồ doanh thu',
                                          fontSize: 20,
                                          fontWeight: FontWeight.bold,
                                          color: AppColors.primary,
                                        ),
                                        10.verticalSpace,
                                        LineChartSample2(
                                          color: AppColors.backgroundTab,
                                        ),
                                      ],
                                    ),
                                  ),
                                ])),
                      ),
                      Expanded(
                          flex: 2,
                          child: Profile(
                              cardBackgroundColor: AppColors.white,
                              avatar: Img.avatar)),
                    ],
                  ),
                ],
              ),
            ),
          );
        }),
      ),
    );
  }
}
