import 'package:flutter/material.dart';
import 'package:flutter_web/common/widgets/text_widget.dart';
import 'package:flutter_web/core/configs/theme/app_colors.dart';
import 'package:flutter_web/feature/product_create/controller/create_product_controller.dart';
import 'package:flutter_web/feature/voucher/model/voucher_model.dart';
import 'package:get/get.dart';
import 'package:syncfusion_flutter_datagrid/datagrid.dart';
import 'package:flutter_web/feature/user/model/user_model.dart';

class VoucherGridCell {
  static const String id = 'id';
  static const String code = 'code';
  static const String title = 'title';
  static const String description = 'description';
  static const String status = 'status';
  static const String type = 'type';
}

class VoucherGridDataSource extends DataGridSource {
  VoucherGridDataSource({required List<Voucher> vouchers}) {
    final controller = Get.put(CreateProductController());
    _employees = vouchers.map<DataGridRow>((e) {
      return DataGridRow(cells: [
        DataGridCell<String>(columnName: VoucherGridCell.id, value: e.id ?? ''),
        DataGridCell<String>(
            columnName: VoucherGridCell.code, value: e.code ?? ''),
        DataGridCell<String>(
            columnName: VoucherGridCell.title, value: e.title ?? ''),
        DataGridCell<String>(
            columnName: VoucherGridCell.description,
            value: e.description ?? ''),
        DataGridCell<String>(
            columnName: VoucherGridCell.status, value: e.status ?? ''),
        DataGridCell<String>(
            columnName: VoucherGridCell.type, value: e.type ?? ''),
      ]);
    }).toList();
  }

  List<DataGridRow> _employees = [];

  @override
  List<DataGridRow> get rows => _employees;

  @override
  DataGridRowAdapter? buildRow(DataGridRow row) {
    int rowIndex = _employees.indexOf(row);
    bool isEvenRow = rowIndex % 2 == 0;

    return DataGridRowAdapter(
      color: isEvenRow
          ? AppColors.grey.withOpacity(0.2)
          : AppColors.backgroundCard,
      cells: row.getCells().map<Widget>((dataGridCell) {
        switch (dataGridCell.columnName) {
          case VoucherGridCell.title:
            return Center(
              child: TextWidget(
                text: dataGridCell.value.toString(),
                fontSize: 14,
                fontWeight: FontWeight.w600,
                maxLines: 2,
              ),
            );
          case VoucherGridCell.description:
          case VoucherGridCell.status:
          case VoucherGridCell.type:
            return Center(
              child: TextWidget(
                text: dataGridCell.value.toString(),
                fontSize: 14,
                fontWeight: FontWeight.w600,
              ),
            );
          default:
            return Container(
              height: 80.0,
              alignment: Alignment.center,
              padding: EdgeInsets.all(16.0),
              child: Text(dataGridCell.value.toString(),
                  style: TextStyle(
                      color: AppColors.white, fontWeight: FontWeight.w600)),
            );
        }
      }).toList(),
    );
  }
}
