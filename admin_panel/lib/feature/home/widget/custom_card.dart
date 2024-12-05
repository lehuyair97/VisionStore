import 'package:flutter/material.dart';
import 'package:flutter_web/core/configs/theme/app_colors.dart';
import 'package:get/get.dart';

class CustomCard extends StatelessWidget {
  final Widget child;
  final Color? color;
  final EdgeInsetsGeometry? padding;

  const CustomCard({super.key, this.color, this.padding, required this.child});
  @override
  Widget build(BuildContext context) {
    return Card(
        elevation: 3,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20.0),
        ),
        color: color ?? AppColors.primary,
        child: Padding(
          padding: padding ?? EdgeInsets.zero,
          child: child,
        ));
  }
}
