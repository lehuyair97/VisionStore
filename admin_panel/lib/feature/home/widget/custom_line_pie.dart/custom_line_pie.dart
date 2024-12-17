// import 'package:flutter/material.dart';
// import 'package:flutter_web/core/configs/theme/app_colors.dart';
// import 'package:flutter_web/feature/home/widget/LineChart/line_chart_sample%20.dart';
// import 'package:flutter_screenutil/flutter_screenutil.dart';
// import 'package:flutter_web/feature/home/widget/pie/pie_chart.dart';
// import 'package:get/get.dart';

// class CustomLinePie extends StatelessWidget {
//     final Map<String, dynamic> data;

//   const CustomLinePie({super.key, required this.data});

//   @override
//   Widget build(BuildContext context) {
//     return Row(
//       mainAxisAlignment: MainAxisAlignment.center,
//       children: [
//         AspectRatio(
//           aspectRatio: 1.7.h,
//           child: Container(
//             height: Get.height * 0.3,
//             width: Get.width * 0.5,
//             child: Row(
//               children: <Widget>[
//                 Expanded(
//                     child: LineChartSample2(
//                       jsonData: data,
//                   color: AppColors.backgroundTab,
//                 )),
//               ],
//             ),
//           ),
//         ),
//         SizedBox(width: 20.w),
//         AspectRatio(
//           aspectRatio: 1.7.h,
//           child: Container(
//             height: Get.height * 0.3,
//             width: Get.width * 0.5,
//             decoration: BoxDecoration(
//               color: AppColors.backgroundTab,
//               borderRadius: BorderRadius.circular(30),
//             ),
//             child: Row(
//               children: <Widget>[
//                 Expanded(
//                   child: PieChartWidget(
//                     color: AppColors.backgroundTab,
//                   ),
//                 ),
//               ],
//             ),
//           ),
//         ),
//       ],
//     );
//   }
// }
