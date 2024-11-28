import 'package:flutter/material.dart';

class HealthModel {
  final String icon;
  final String value;
  final String title;
  final Color? color;
  const HealthModel(
      {required this.icon,
      required this.value,
      required this.title,
      this.color});
}
