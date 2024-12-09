import 'package:flutter/material.dart';
import 'package:flutter_web/common/widgets/text_widget.dart';
import 'package:flutter_web/core/configs/theme/app_colors.dart';
import 'package:flutter_web/feature/product_create/controller/create_product_controller.dart';
import 'package:flutter_web/feature/product_create/model/brand_model.dart';
import 'package:flutter_web/feature/product_create/model/categoty_model.dart';
import 'package:flutter_web/feature/products/controller/products_controller.dart';
import 'package:flutter_web/feature/products/model/product_model.dart';
import 'package:flutter_web/feature/product_update/view/update_product.dart';
import 'package:get/get.dart';
import 'package:syncfusion_flutter_datagrid/datagrid.dart';

class ProductGridCell {
  static const String id = 'id';
  static const String image = 'image';
  static const String name = 'name';
  static const String price = 'price';
  static const String edit = 'edit';
  static const String delete = 'delete';
  static const String introduce = 'introduce';
  static const String brand = 'brand';
  static const String type = 'type';
}

class ProductGridDataSource extends DataGridSource {
  ProductGridDataSource({required List<ProductItem> products}) {
    final controller = Get.put(CreateProductController());
    _employees = products
        .map<DataGridRow>((e) => DataGridRow(cells: [
              DataGridCell<String>(
                  columnName: ProductGridCell.id, value: e.id ?? ''),
              DataGridCell<String>(
                  columnName: ProductGridCell.image, value: e.image ?? ''),
              DataGridCell<String>(
                  columnName: ProductGridCell.name, value: e.name ?? ''),
              DataGridCell<double>(
                  columnName: ProductGridCell.price, value: e.price ?? 0.0),
              DataGridCell<String>(
                  columnName: ProductGridCell.introduce,
                  value: e.description ?? ''),
              DataGridCell<String>(
                  columnName: ProductGridCell.brand,
                  value: controller.brandList
                          .firstWhere(
                            (element) => element.id == e.brand,
                            orElse: () => Brand(name: 'Unknown'),
                          )
                          .name ??
                      ''),
              DataGridCell<String>(
                  columnName: ProductGridCell.type,
                  value: controller.categoryList
                          .firstWhere(
                            (element) => element.id == e.categoryId,
                            orElse: () => CategoryModel(
                                id: '', name: 'Unknown', type: ''),
                          )
                          .name ??
                      ''),
              DataGridCell<IconData>(
                  columnName: ProductGridCell.edit, value: Icons.edit),
              DataGridCell<IconData>(
                  columnName: ProductGridCell.delete, value: Icons.delete),
            ]))
        .toList();
    print("Number of products: ${products.length}");
  }

  void updatePageSize(int newSize) {
    notifyListeners();
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
        final controllerProducts = Get.put(ProductsController());

        switch (dataGridCell.columnName) {
          case ProductGridCell.image:
            print("dataGridCell.value: ${dataGridCell.value}");
            String imageUrl = dataGridCell.value ?? '';
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
          case ProductGridCell.name:
            return Center(
              child: TextWidget(
                text: dataGridCell.value.toString(),
                fontSize: 14,
                fontWeight: FontWeight.w600,
              ),
            );
          case ProductGridCell.edit:
            return IconButton(
              onPressed: () {
                String productId = row
                    .getCells()
                    .firstWhere((cell) => cell.columnName == ProductGridCell.id)
                    .value
                    .toString();
                Get.dialog(UpdateProduct(productId: productId));
              },
              icon: Icon(Icons.edit),
            );
          case ProductGridCell.delete:
            return IconButton(
              onPressed: () {
                String productId = row
                    .getCells()
                    .firstWhere((cell) => cell.columnName == ProductGridCell.id)
                    .value
                    .toString();
                controllerProducts.deleteProductById(productId);
              },
              icon: Icon(Icons.delete),
              color: AppColors.colorRed,
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
