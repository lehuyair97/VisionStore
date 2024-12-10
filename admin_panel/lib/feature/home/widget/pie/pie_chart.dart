import 'package:flutter/material.dart';
import 'package:flutter_web/common/widgets/text_widget.dart';
import 'package:flutter_web/core/configs/theme/app_colors.dart';
import 'package:flutter_web/feature/home/widget/pie/build_indicator.dart';
import 'package:flutter_web/feature/home/widget/pie/pie_chart_sections.dart';
import 'package:get/get.dart';
import 'package:fl_chart/fl_chart.dart';

class PieChartWidget extends StatefulWidget {
  final Color color;
  final double width;
  final int userCount;
  final int productCount;
  final String title;
  const PieChartWidget(
      {super.key,
      this.color = AppColors.colorIcon,
      this.width = 1,
      this.userCount = 0,
      this.productCount = 0,
      this.title = ''});
  @override
  State<PieChartWidget> createState() => _PieChartWidgetState();
}

class _PieChartWidgetState extends State<PieChartWidget> {
  late int userAge;
  late int theRest;
  late int totalUsers;
  int touchedIndex = -1;

  @override
  void initState() {
    super.initState();

    totalUsers = 100;

    userAge = ((widget.userCount / totalUsers) * 100).toInt();

    theRest = (100 - userAge).toInt();
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
            children: [
              // Tiêu đề
              TextWidget(
                text: "${widget.title} (${totalUsers})",
                fontSize: 20,
                fontWeight: FontWeight.bold, // Tăng độ đậm cho tiêu đề
                color: AppColors.white, // Màu sắc cho tiêu đề
              ),
              const SizedBox(height: 12), // Khoảng cách giữa tiêu đề và biểu đồ
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
                              userAge.toDouble(),
                              theRest.toDouble()),
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
          text: 'Số người dùng mong muốn sử dụng',
          textColor: AppColors.white,
        ),
        const SizedBox(height: 8), // Thêm khoảng cách giữa các indicator
        BuildIndicator(
          color: AppColors.primary,
          text: 'Số người dùng đã đăng ký',
          textColor: AppColors.white,
        ),
      ],
    );
  }
}
