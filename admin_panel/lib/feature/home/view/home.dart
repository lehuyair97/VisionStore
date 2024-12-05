import 'package:flutter/material.dart';
import 'package:flutter_web/common/img/img.dart';
import 'package:flutter_web/common/widgets/text_widget.dart';
import 'package:flutter_web/core/configs/theme/app_colors.dart';
import 'package:flutter_web/feature/home/controller/home_contrioller.dart';
import 'package:flutter_web/feature/home/widget/LineChart/line_chart_sample%20.dart';
import 'package:flutter_web/feature/home/widget/activity_details_card.dart';
import 'package:flutter_web/common/widgets/search_field.dart';
import 'package:flutter_web/feature/home/widget/custom_appbar.dart';
import 'package:flutter_web/feature/home/widget/pie/pie_chart.dart';
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
    return Scaffold(
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
                                  crossAxisAlignment: CrossAxisAlignment.start,
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
                      ],
                    ),
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
