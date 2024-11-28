import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';

class BottomTitleWidgets extends StatelessWidget {
  final double value;
  final TitleMeta meta;
  const BottomTitleWidgets(
      {super.key, required this.value, required this.meta});

  @override
  Widget build(BuildContext context) {
    final TextStyle style = TextStyle(
      fontWeight: FontWeight.bold,
      fontSize: 16,
    );
    Widget text;
    switch (value.toInt()) {
      case 1:
        text = Text('Th 1', style: style);
        break;
      case 3:
        text = Text('Th 2', style: style);
        break;
      case 5:
        text = Text('Th 3', style: style);
        break;
      case 7:
        text = Text('Th 4', style: style);
        break;
      case 9:
        text = Text('Th 5', style: style);
        break;
      case 11:
        text = Text('Th 8', style: style);
        break;
      case 13:
        text = Text('Th 9', style: style);
        break;
      case 15:
        text = Text('Th 11', style: style);
        break;
      case 17:
        text = Text('Th 12', style: style);
        break;
      default:
        text = Text('', style: style);
        break;
    }

    return SideTitleWidget(
      axisSide: meta.axisSide,
      child: text,
    );
  }
}
