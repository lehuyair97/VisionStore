import 'package:flutter/material.dart';
import 'package:flutter_web/common/widgets/text_widget.dart';

class Indicator extends StatelessWidget {
  const Indicator({
    super.key,
    required this.color,
    required this.text,
    required this.isSquare,
    this.size = 16,
    this.textColor,
  });
  final Color color;
  final String text;

  final bool isSquare;
  final double size;
  final Color? textColor;

  @override
  Widget build(BuildContext context) {
    return Row(
      children: <Widget>[
        Container(
          width: size,
          height: size,
          decoration: BoxDecoration(
            shape: isSquare ? BoxShape.rectangle : BoxShape.circle,
            color: color,
          ),
        ),
        const SizedBox(
          width: 4,
        ),
        TextWidget(
          text: text,
          fontSize: 14,
          fontWeight: FontWeight.w500,
          color: textColor,
          maxLines: 3,
        ),
      ],
    );
  }
}
