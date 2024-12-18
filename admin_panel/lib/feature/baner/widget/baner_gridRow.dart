import 'package:flutter/material.dart';
import 'package:flutter_web/common/widgets/text_widget.dart';
import 'package:flutter_web/core/configs/theme/app_colors.dart';
import 'package:flutter_web/feature/baner/model/baner_model.dart';
import 'package:flutter_web/feature/product_create/controller/create_product_controller.dart';
import 'package:get/get.dart';
import 'package:syncfusion_flutter_datagrid/datagrid.dart';

class BanerGridrow {
  static const String id = '_id';
  static const String name = 'name';
  static const String description = 'description';
  static const String logo = 'logo';
  static const String brandType = 'brandType';
  static const String banner = 'banner';
}

class BanerGridDataSource extends DataGridSource {
  BanerGridDataSource({required List<BanerModel> brands}) {
    final controller = Get.put(CreateProductController());
    _brands = brands.map<DataGridRow>((e) {
      return DataGridRow(cells: [
        DataGridCell<String>(columnName: BanerGridrow.id, value: e.id),
        DataGridCell<String>(columnName: BanerGridrow.name, value: e.name),
        DataGridCell<String>(
            columnName: BanerGridrow.banner, value: e.banner),
        DataGridCell<String>(columnName: BanerGridrow.brandType, value: e.brandType),
        DataGridCell<String>(
            columnName: BanerGridrow.logo, value: e.logo),
        DataGridCell<String>(columnName: BanerGridrow.description, value: e.description),
      ]);
    }).toList();
  }

  List<DataGridRow> _brands = [];

  @override
  List<DataGridRow> get rows => _brands;

  @override
  DataGridRowAdapter? buildRow(DataGridRow row) {
    int rowIndex = _brands.indexOf(row);
    bool isEvenRow = rowIndex % 2 == 0;

    return DataGridRowAdapter(
      color: isEvenRow
          ? AppColors.grey.withOpacity(0.2)
          : AppColors.backgroundCard,
      cells: row.getCells().map<Widget>((dataGridCell) {
        switch (dataGridCell.columnName) {
          case BanerGridrow.name:
            return Center(
              child: TextWidget(
                text: dataGridCell.value.toString(),
                fontSize: 14,
                fontWeight: FontWeight.w600,
                maxLines: 2,
              ),
            );
          case BanerGridrow.brandType:
          case BanerGridrow.description:
            return Center(
              child: TextWidget(
                text: dataGridCell.value.toString(),
                fontSize: 14,
                fontWeight: FontWeight.w600,
                maxLines: 4,
              ),
            );
          case BanerGridrow.logo:
            return Container(
              child: Image.network(
                dataGridCell.value.toString(),
                fit: BoxFit.cover,
              ),
            );
          case BanerGridrow.banner:
            return Container(
              child: Image.network(
                dataGridCell.value.toString(),
                fit: BoxFit.cover,
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
