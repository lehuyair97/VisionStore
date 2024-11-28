import 'package:flutter/material.dart';
import 'package:flutter_web/common/widgets/text_widget.dart';
import 'package:flutter_web/core/configs/theme/app_colors.dart';
import 'package:flutter_web/feature/auth/model/user.dart';
import 'package:flutter_web/feature/brand_update/view/brand_update.dart';
import 'package:flutter_web/feature/create_product/controller/create_product_controller.dart';
import 'package:flutter_web/feature/create_product/model/brand_model.dart';
import 'package:flutter_web/feature/products/model/product_model.dart';
import 'package:get/get.dart';
import 'package:syncfusion_flutter_datagrid/datagrid.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class BrandGridCell {
  static const String id = 'id';
  static const String logo = 'logo';
  static const String name = 'name';
  static const String description = 'description';
  static const String brandType = 'brandType';
  //edit
  static const String edit = 'edit';
  static const String delete = 'delete';
}

class BrandGridDataSource extends DataGridSource {
  BrandGridDataSource({required List<Brand> brands}) {
    _employees = brands.map<DataGridRow>((e) {
      return DataGridRow(cells: [
        DataGridCell<String>(columnName: BrandGridCell.id, value: e.id ?? ''),
        DataGridCell<String>(
            columnName: BrandGridCell.logo, value: e.logo ?? ''),
        DataGridCell<String>(
            columnName: BrandGridCell.name, value: e.name ?? ''),
        DataGridCell<String>(
            columnName: BrandGridCell.description, value: e.description ?? ''),
        DataGridCell<String>(
            columnName: BrandGridCell.edit, value: ''),
        DataGridCell<String>(
            columnName: BrandGridCell.delete, value: ''),
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
      color: isEvenRow ? AppColors.grey.withOpacity(0.2) : AppColors.white,
      cells: row.getCells().map<Widget>((dataGridCell) {
        switch (dataGridCell.columnName) {
          case BrandGridCell.logo:
            String imageUrl = dataGridCell.value ?? '';
            if (imageUrl
                .startsWith('http://localhost:3000/api/images/brands/')) {
              imageUrl = imageUrl.replaceFirst(
                  'http://localhost:3000/api/images/brands/', '');
            }
            return Container(
              height: 80.0,
              alignment: Alignment.center,
              padding: EdgeInsets.all(8.0),
              child: imageUrl.isNotEmpty
                  ? ClipRRect(
                      borderRadius: BorderRadius.circular(6),
                      child: Image.network(
                        imageUrl,
                        width: 50,
                        height: 50,
                        fit: BoxFit.cover,
                        errorBuilder: (context, error, stack) {
                          print("Error loading image: $error");
                          return Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Icon(Icons.error),
                            ],
                          );
                        },
                      ),
                    )
                  : Icon(Icons.error),
            );
          case BrandGridCell.description:
            return Center(
              child: TextWidget(
                text: dataGridCell.value.toString(),
                fontSize: 14,
                fontWeight: FontWeight.w600,
                maxLines: 2,
              ),
            );
          case BrandGridCell.name:
          case BrandGridCell.brandType:
            return Center(
              child: TextWidget(
                text: dataGridCell.value.toString(),
                fontSize: 14,
                fontWeight: FontWeight.w600,
              ),
            );
          case BrandGridCell.edit:
            return Center(
              child: IconButton(
                onPressed: () {
                  final brandId = row.getCells().firstWhere((element) => element.columnName == BrandGridCell.id).value;
                  Get.dialog(BrandUpdate(brandId: brandId));
                },
                icon: Icon(Icons.edit),
              ),
            );
          case BrandGridCell.delete:
            return Center(
              child: IconButton(
                onPressed: () {},
                icon: Icon(
                  Icons.delete,
                  color: AppColors.primary,
                ),
              ),
            );
          default:
            return Container(
              height: 80.0,
              alignment: Alignment.center,
              padding: EdgeInsets.all(16.0),
              child: Text(dataGridCell.value.toString()),
            );
        }
      }).toList(),
    );
  }
}
