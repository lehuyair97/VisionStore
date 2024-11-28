import 'package:flutter/material.dart';
import 'package:flutter_web/core/configs/theme/app_colors.dart';
import 'package:flutter_web/feature/home/widget/pie/build_indicator.dart';
import 'package:flutter_web/feature/home/widget/pie/pie_chart_sections.dart';
import 'package:get/get.dart';
import 'package:fl_chart/fl_chart.dart';

class PieChartWidget extends StatefulWidget {
  final Color color;
  final double width;
  const PieChartWidget(
      {super.key, this.color = AppColors.colorIcon, this.width = 1});
  @override
  State<PieChartWidget> createState() => _PieChartWidgetState();
}

class _PieChartWidgetState extends State<PieChartWidget> {
  int touchedIndex = -1;
  @override
  Widget build(BuildContext context) {
    return AspectRatio(
      aspectRatio: 1.3,
      child: Container(
        width: Get.width * widget.width,
        decoration: BoxDecoration(
            color: widget.color, borderRadius: BorderRadius.circular(16)),
        child: Row(
          children: <Widget>[
            Expanded(
              child: AspectRatio(
                aspectRatio: 1,
                child: PieChart(
                  PieChartData(
                    pieTouchData: PieTouchData(
                      touchCallback: (FlTouchEvent event, pieTouchResponse) {
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
                    centerSpaceRadius: 40,
                    sections: PieChartSections.showingSections(
                        touchedIndex, 20, 20, 20, 40),
                  ),
                ),
              ),
            ),
            _buildIndicators(),
            const SizedBox(width: 28),
          ],
        ),
      ),
    );
  }

  Widget _buildIndicators() {
    return const Column(
      mainAxisAlignment: MainAxisAlignment.end,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        BuildIndicator(color: AppColors.primary, text: 'First'),
        BuildIndicator(color: AppColors.black, text: 'Second'),
        BuildIndicator(color: AppColors.colorRed, text: 'Third'),
        BuildIndicator(color: AppColors.colorRed, text: 'Fourth'),
      ],
    );
  }
}
