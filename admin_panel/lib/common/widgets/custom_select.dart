import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_web/common/widgets/text_widget.dart';
import 'package:flutter_web/core/configs/theme/app_colors.dart';

class Item {
  final String id;
  final String name;

  Item({required this.id, required this.name});
}

class CustomSelect extends StatefulWidget {
  final String? label1;
  final String? name;
  final String? hint;
  final List<Item>? selectList;
  final List<String>? selectValue;
  final int? height;
  final void Function(String?)? onProjectSelected;

  CustomSelect({
    Key? key,
    this.label1,
    this.name,
    this.hint,
    this.selectList,
    this.onProjectSelected,
    this.selectValue,
    this.height = 200,
  }) : super(key: key);

  @override
  State<CustomSelect> createState() => _CustomSelectState();
}

class _CustomSelectState extends State<CustomSelect> {
  String? _selectedUser;

  @override
  void initState() {
    super.initState();
    // Cập nhật giá trị mặc định nếu có
    if (widget.selectValue != null && widget.selectValue!.isNotEmpty) {
      _selectedUser = widget.selectValue!.first;
    }
  }

  @override
  Widget build(BuildContext context) {
    final screenWidth = MediaQuery.of(context).size.width;
    return Container(
      padding: EdgeInsets.only(bottom: 16.h),
      width: screenWidth,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          widget.label1 != null
              ? TextWidget(
                  text: widget.label1!,
                  fontSize: 12, // Giảm kích thước font xuống 12
                  fontWeight: FontWeight.w400, // Độ đậm của chữ
                  color: AppColors.white,
                )
              : SizedBox.shrink(), // Nếu không có label, không hiển thị gì
          8.verticalSpace,
          Container(
            width: screenWidth,
            decoration: BoxDecoration(
              color: AppColors.white,
              borderRadius: BorderRadius.circular(12),
            ),
            child: DropdownButtonFormField<String>(
              decoration: InputDecoration(
                contentPadding:
                    EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                  borderSide: BorderSide(color: AppColors.primary),
                ),
                focusedBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                  borderSide: BorderSide(color: AppColors.primary),
                ),
                enabledBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                  borderSide: BorderSide(color: AppColors.primary),
                ),
              ),
              isExpanded: true,
              value: _selectedUser,
              hint: TextWidget(
                text: widget.hint ?? "",
                fontSize: 14,
                fontWeight: FontWeight.w400,
                color: AppColors.backgroundCard,
              ),
              onChanged: (String? newValue) {
                setState(() {
                  _selectedUser = newValue;
                  if (widget.onProjectSelected != null) {
                    widget.onProjectSelected!(newValue);
                  }
                });
              },
              items: widget.selectList is List<Item>
                  ? (widget.selectList as List<Item>).map((Item item) {
                      return DropdownMenuItem<String>(
                        value: item.id,
                        child: Text(
                          item.name,
                          style: TextStyle(
                              color: AppColors.backgroundCard, fontSize: 14),
                        ),
                      );
                    }).toList()
                  : (widget.selectList as List<String>).map((String item) {
                      return DropdownMenuItem<String>(
                        value: item,
                        child: Text(
                          item,
                          style: TextStyle(
                              color: AppColors.backgroundCard, fontSize: 14),
                        ),
                      );
                    }).toList(),
            ),
          ),
        ],
      ),
    );
  }
}
