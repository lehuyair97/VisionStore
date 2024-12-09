import 'package:flutter/material.dart';
import 'package:flutter_web/feature/home/widget/indicator.dart'; // Đảm bảo đường dẫn đúng

class BuildIndicator extends StatelessWidget {
  final Color color;
  final String text;
  final Color textColor;

  const BuildIndicator({
    super.key,
    required this.color,
    required this.text,
    required this.textColor,
  }); // Sửa lỗi ở đây

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Indicator(
          color: color,
          text: text,
          textColor: textColor,
          isSquare: true,
        ),
        const SizedBox(height: 4),
      ],
    );
  }
}