// import 'package:flutter/material.dart';
// import 'package:flutter_web/core/configs/theme/app_colors.dart';
// import 'package:flutter_web/feature/home/widget/LineChart/line_chart_sample%20.dart';
// import 'package:flutter_screenutil/flutter_screenutil.dart';
// import 'package:flutter_web/feature/home/widget/pie/pie_chart.dart';

// class CustomLinePieMobile extends StatelessWidget {
//   final RevenueData data;
//   const CustomLinePieMobile({super.key, required this.data});

//   @override
//   Widget build(BuildContext context) {
//     return Column(
//       mainAxisAlignment: MainAxisAlignment.center,
//       children: [
//         AspectRatio(
//           aspectRatio: 1.7.h,
//           child: Container(
//             height: 200.h,
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
//         SizedBox(height: 30.w),
//         AspectRatio(
//           aspectRatio: 1.7.h,
//           child: Container(
//             height: 200.h,
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
