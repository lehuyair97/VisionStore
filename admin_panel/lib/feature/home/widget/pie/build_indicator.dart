import 'package:flutter/material.dart';
import 'package:flutter_web/feature/home/widget/indicator.dart'; // Đảm bảo đường dẫn đúng

class BuildIndicator extends StatelessWidget {
  final Color color;
  final String text;

  const BuildIndicator({super.key, required this.color, required this.text}); // Sửa lỗi ở đây

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Indicator(
          color: color,
          text: text,
          isSquare: true,
        ),
        const SizedBox(height: 4),
      ],
    );
  }
}