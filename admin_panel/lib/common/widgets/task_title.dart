import 'package:flutter/material.dart';
import 'package:flutter_web/common/widgets/text_widget.dart';
import 'package:flutter_web/core/configs/theme/app_colors.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter/services.dart';
import 'package:flutter_web/feature/auth/widget/custom_text_field.dart';

class TaskTitle extends StatefulWidget {
  final TextEditingController controllerNote;
  final String label;
  final String note;
  final double screenWidth;
  final bool? isNumber;
  final int? minLines;
  final bool? isNameMain;
  final double? sizeText;
  final Function(String)? onTextChanged;
  TaskTitle({
    required this.label,
    required this.note,
    required this.screenWidth,
    required this.controllerNote,
    this.isNumber = false,
    this.minLines = 1,
    this.isNameMain = false,
    this.onTextChanged,
    this.sizeText,
  });

  @override
  _TaskTitleState createState() => _TaskTitleState();
}

class _TaskTitleState extends State<TaskTitle> {
  @override
  void initState() {
    super.initState();
    _onTextChanged();
  }

  @override
  void dispose() {
    widget.controllerNote.removeListener(_onTextChanged);
    super.dispose();
  }

  void _onTextChanged() {
    if (widget.isNumber == true) {
      final text = widget.controllerNote.text;
      if (text.isNotEmpty) {
        final intValue = int.tryParse(text.replaceAll('.', ''));
        if (intValue != null) {
          final formattedText = _formatNumber(intValue.toString());
          if (formattedText != text) {
            widget.controllerNote.value = TextEditingValue(
              text: formattedText,
              selection: TextSelection.collapsed(offset: formattedText.length),
            );
          }
        }
      }
    }
  }

  String _formatNumber(String s) {
    return s.replaceAllMapped(
        RegExp(r'(\d)(?=(\d{3})+(?!\d))'), (Match m) => '${m[1]}.');
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.only(bottom: 16.h),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          TextWidget(
            text: widget.label,
            fontSize: 14,
            fontWeight: FontWeight.w500,
            color: AppColors.white,
          ),
          8.verticalSpace,
          CustomTextField(
            sizeText: widget.sizeText,
            isNameMain: widget.isNameMain ?? false,
            controller: widget.controllerNote,
            hintText: widget.note,
            onTextChanged: widget.onTextChanged as dynamic Function(String)?,
          )
        ],
      ),
    );
  }
}

class ThousandsSeparatorInputFormatter extends TextInputFormatter {
  @override
  TextEditingValue formatEditUpdate(
      TextEditingValue oldValue, TextEditingValue newValue) {
    final text = newValue.text.replaceAll('.', '');
    final newText = _formatNumber(text);
    print('New Text: $newText');
    return newValue.copyWith(
      text: newText,
      selection: TextSelection.collapsed(offset: newText.length),
    );
  }

  String _formatNumber(String s) {
    return s.replaceAllMapped(
        RegExp(r'(\d)(?=(\d{3})+(?!\d))'), (Match m) => '${m[1]}.');
  }
}
