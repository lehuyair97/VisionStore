import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_web/common/widgets/text_widget.dart';
import 'package:flutter_web/core/configs/theme/app_colors.dart';

class TaskDate extends StatelessWidget {
  final String label;
  final DateTime selectedDate;
  final Function(DateTime) onDateSelected; // Chỉ cần ngày

  const TaskDate({
    required this.label,
    required this.selectedDate,
    required this.onDateSelected,
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return _buildDateDetailColumn(label, selectedDate, context);
  }

  Widget _buildDateDetailColumn(
      String label, DateTime dateTime, BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        TextWidget(
          text: label,
          fontWeight: FontWeight.bold,
          color: AppColors.white,
          fontSize: 14.sp,
        ),
        SizedBox(height: 8.h),
        GestureDetector(
          onTap: () {
            _selectDate(context, dateTime);
          },
          child: Container(
            width: double.infinity, // Đảm bảo chiếm toàn bộ chiều rộng
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(16.r),
              border: Border.all(
                width: 1.w,
                color: Colors.grey.shade400,
              ),
            ),
            child: Padding(
              padding: EdgeInsets.all(16.w),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  TextWidget(
                    text: _formatDate(dateTime),
                    fontWeight: FontWeight.w500,
                    color: AppColors.colorIcon,
                    fontSize: 14.sp,
                  ),
                  Icon(
                    Icons.calendar_today, // Biểu tượng lịch
                    color: AppColors.colorIcon,
                  ),
                ],
              ),
            ),
          ),
        )
      ],
    );
  }

  String _formatDate(DateTime dateTime) {
    return DateFormat('dd/MM/yyyy').format(dateTime);
  }

  Future<void> _selectDate(BuildContext context, DateTime initialDate) async {
    final DateTime? pickedDate = await showDatePicker(
      context: context,
      initialDate: initialDate,
      firstDate: DateTime(2000),
      lastDate: DateTime(2100),
    );

    if (pickedDate != null) {
      onDateSelected(pickedDate); // Chỉ cập nhật ngày
    }
  }
}
