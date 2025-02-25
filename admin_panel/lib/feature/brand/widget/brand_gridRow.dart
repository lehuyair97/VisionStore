import 'package:flutter/material.dart';
import 'package:flutter_web/common/widgets/text_widget.dart';
import 'package:flutter_web/core/configs/theme/app_colors.dart';
import 'package:flutter_web/feature/brand/controller/brand_controller.dart';
import 'package:flutter_web/feature/brand_update/view/brand_update.dart';
import 'package:flutter_web/feature/product_create/model/brand_model.dart';
import 'package:flutter_web/router/app_router.dart';
import 'package:get/get.dart';
import 'package:syncfusion_flutter_datagrid/datagrid.dart';

class BrandGridCell {
  static const String id = 'id';
  static const String logo = 'logo';
  static const String name = 'name';
  static const String description = 'description';
  static const String brandType = 'brandType';
  //edit
  static const String detail = 'detail';
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
                    DataGridCell<String>(columnName: BrandGridCell.detail, value: ''),
        DataGridCell<String>(columnName: BrandGridCell.edit, value: ''),
        DataGridCell<String>(columnName: BrandGridCell.delete, value: ''),
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

       case BrandGridCell.detail:
            return Center(
              child: IconButton(
                onPressed: () {
                  final brandId = row
                      .getCells()
                      .firstWhere(
                          (element) => element.columnName == BrandGridCell.id)
                      .value;
                  Get.toNamed(AppRouter.brandDetail, arguments: brandId);
                },
                icon: Icon(Icons.remove_red_eye, color: AppColors.white),
              ),
            );



          case BrandGridCell.edit:
            return Center(
              child: IconButton(
                onPressed: () {
                  final brandId = row
                      .getCells()
                      .firstWhere(
                          (element) => element.columnName == BrandGridCell.id)
                      .value;
                  Get.dialog(BrandUpdate(brandId: brandId));
                },
                icon: Icon(Icons.edit, color: AppColors.white),
              ),
            );
          case BrandGridCell.delete:
            return Center(
              child: IconButton(
                onPressed: () {
                  final brandId = row
                      .getCells()
                      .firstWhere(
                          (element) => element.columnName == BrandGridCell.id)
                      .value;
                  Get.put(BrandController()).deleteBrand(brandId);
                },
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
