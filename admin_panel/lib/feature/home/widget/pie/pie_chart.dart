import 'package:flutter/material.dart';
import 'package:flutter_web/common/widgets/text_widget.dart';
import 'package:flutter_web/core/configs/theme/app_colors.dart';
import 'package:flutter_web/feature/home/model/revenue_month.dart';
import 'package:flutter_web/feature/home/widget/pie/build_indicator.dart';
import 'package:flutter_web/feature/home/widget/pie/pie_chart_sections.dart';
import 'package:get/get.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class PieChartWidget extends StatefulWidget {
  final Color color;
  final double width;
  final int userCount;
  final int productCount;
  final String title;
  final RevenueMonth revenueMonth;
  const PieChartWidget(
      {super.key,
      this.color = AppColors.colorIcon,
      this.width = 1,
      this.userCount = 0,
      this.productCount = 0,
      this.title = '',
      required this.revenueMonth});
  @override
  State<PieChartWidget> createState() => _PieChartWidgetState();
}

class _PieChartWidgetState extends State<PieChartWidget> {
  late double currentMonth;
  late double previousMonth;
  double growthcurrentMonth = 0.0;
  double theRestpreviousMonth = 0.0;
  double totalRevenue = 0.0;
  int touchedIndex = -1;

  @override
  void initState() {
    super.initState();
    currentMonth = widget.revenueMonth.currentMonth.totalRevenue.toDouble();
    previousMonth = widget.revenueMonth.previousMonth.totalRevenue.toDouble();
    totalRevenue = currentMonth + previousMonth;
    growthcurrentMonth = (currentMonth / totalRevenue) * 100;
    theRestpreviousMonth = 100 - growthcurrentMonth;
  }

  @override
  Widget build(BuildContext context) {
    return AspectRatio(
      aspectRatio: 0.64,
      child: Card(
        elevation: 8, // Tăng bóng đổ để tạo độ sâu
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(15), // Bo góc cho card
        ),
        color: widget.color,
        child: Padding(
          padding: const EdgeInsets.all(16.0), // Thêm padding cho card
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Tiêu đề
              TextWidget(
                text: "${widget.title}",
                fontSize: 20,
                fontWeight: FontWeight.bold, // Tăng độ đậm cho tiêu đề
                color: AppColors.white,
                textAlign: TextAlign.center,              ),
              const SizedBox(height: 20), // Khoảng cách giữa tiêu đề và biểu đồ
              Center(
                child: Card(
                  elevation: 8, // Tăng bóng đổ để tạo độ sâu
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(15), // Bo góc cho card
                  ),
                  color: AppColors.backgroundCard,
                  child: Padding(
                    padding: const EdgeInsets.all(16.0), // Thêm padding cho card
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.start,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                      TextWidget(
                        text:
                            "Tổng doanh thu tháng cả 2 tháng: ${totalRevenue.toStringAsFixed(0)} VND",
                        fontSize: 18,
                        fontWeight: FontWeight.w600, // Tăng độ đām cho tiêu đề
                        color: AppColors.white, // Màu sắc cho tiêu đề
                      ),
                      18.verticalSpace,
                      TextWidget(
                        text:
                            "Tổng doanh thu tháng hiện tại: ${currentMonth.toStringAsFixed(0)} VND",
                        fontSize: 18,
                        fontWeight: FontWeight.w600, // Tăng độ đām cho tiêu đề
                        color: AppColors.white, // Màu sắc cho tiêu đề
                      ),
                      18.verticalSpace,
                      TextWidget(
                        text:
                            "Tổng doanh thu tháng trước: ${previousMonth.toStringAsFixed(0)} VND",
                        fontSize: 18,
                        fontWeight: FontWeight.w600, // Tăng độ đām cho tiêu đề
                        color: AppColors.white, // Màu sắc cho tiêu đề
                      )
                    ]),
                  ),
                ),
              ),

              Row(
                children: <Widget>[
                  Expanded(
                    child: AspectRatio(
                      aspectRatio: 1,
                      child: PieChart(
                        PieChartData(
                          pieTouchData: PieTouchData(
                            touchCallback:
                                (FlTouchEvent event, pieTouchResponse) {
                              setState(() {
                                if (!event.isInterestedForInteractions ||
                                    pieTouchResponse == null ||
                                    pieTouchResponse.touchedSection == null) {
                                  touchedIndex = -1;
                                  return;
                                }
                                touchedIndex = pieTouchResponse
                                    .touchedSection!.touchedSectionIndex;
                              });
                            },
                          ),
                          borderData: FlBorderData(show: false),
                          sectionsSpace: 0,
                          centerSpaceRadius:
                              50, // Tăng không gian giữa các phần
                          sections: PieChartSections.showingSections(
                              touchedIndex,
                              double.parse(
                                  growthcurrentMonth.toStringAsFixed(2)),
                              double.parse(
                                  theRestpreviousMonth.toStringAsFixed(2))),
                        ),
                      ),
                    ),
                  ),
                ],
              ),
              _buildIndicators(),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildIndicators() {
    return Column(
      mainAxisAlignment: MainAxisAlignment.end,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        BuildIndicator(
          color: AppColors.white,
          text: 'Tháng trước',
          textColor: AppColors.white,
        ),
        const SizedBox(height: 8), // Thêm khoảng cách giữa các indicator
        BuildIndicator(
          color: AppColors.primary,
          text: 'Tháng hiện tại',
          textColor: AppColors.white,
        ),
      ],
    );
  }
}
