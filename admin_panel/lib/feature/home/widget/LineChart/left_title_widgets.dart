import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';

class LeftTitleWidgets extends StatelessWidget {
  final TitleMeta meta;
  final double value;
  const LeftTitleWidgets({super.key, required this.value, required this.meta});

  @override
  Widget build(BuildContext context) {
    const style = TextStyle(
      fontWeight: FontWeight.bold,
      fontSize: 15,
    );
    String text;
    switch (value.toInt()) {
      case 1:
        text = '10K';
        break;
      case 2:
        text = '20K';
        break;
      case 3:
        text = '30K';
        break;
      case 4:
        text = '40K';
        break;
      case 5:
        text = '50K';
        break;
      case 6:
        text = '60K';
        break;
      default:
        return Container();
    }

    return Text(text, style: style, textAlign: TextAlign.left);
  }
}
