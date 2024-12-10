import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:flutter_web/core/configs/theme/app_colors.dart';

class PieChartSections {
  static List<PieChartSectionData> showingSections(
    int touchedIndex,
    double value1,
    double value2,
  ) {
    return List.generate(2, (i) {
      final isTouched = i == touchedIndex;
      final fontSize = isTouched ? 25.0 : 16.0;
      final radius = isTouched ? 60.0 : 50.0;
      const shadows = [Shadow(color: Colors.black, blurRadius: 2)];

      switch (i) {
        case 0:
          return PieChartSectionData(
            color: AppColors.primary,
            value: value1,
            title: '${value1}%',
            radius: radius,
            titleStyle: TextStyle(
              fontSize: fontSize,
              fontWeight: FontWeight.bold,
              color: AppColors.backgroundCard,
              shadows: shadows,
            ),
          );
        case 1:
          return PieChartSectionData(
            color: AppColors.backgroundDoing,
            value: value2,
            title: '${value2}%',
            radius: radius,
            titleStyle: TextStyle(
              fontSize: fontSize,
              fontWeight: FontWeight.bold,
              color: AppColors.backgroundCard,
              shadows: shadows,
            ),
          );
        default:
          throw Error();
      }
    });
  }
}
