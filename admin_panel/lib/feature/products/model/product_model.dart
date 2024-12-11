import 'dart:convert';

class Product {
  final int? totalProducts;
  final int? totalPages;
  final int? currentPage;
  final List<ProductItem>? products;

  Product({
    this.totalProducts,
    this.totalPages,
    this.currentPage,
    this.products,
  });

  factory Product.fromJson(Map<String, dynamic> json) {
    var productList = json['products'] as List?;
    List<ProductItem> productItems = productList != null
        ? productList.map((i) => ProductItem.fromJson(i)).toList()
        : [];

    return Product(
      totalProducts: json['totalProducts'] ?? 0,
      totalPages: json['totalPages'] ?? 0,
        currentPage: json['currentPage'] ?? 0,
      products: productItems,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'totalProducts': totalProducts,
      'totalPages': totalPages,
      'currentPage': currentPage,
      'products': products?.map((product) => product.toJson()).toList() ?? [],
    };
  }
}

class ProductItem {
  final String? id;
  final String? sku;
  final String? name;
  final double? price;
  final double? weight;
  final String? descriptions;
  final String? thumbnail;
  final String? image;
  final Map<String, dynamic>? option;
  final String? categoryId;
  final String? subCategoryId;
  final String? optionId;
  final DateTime? createDate;
  final int? stock;
  final String? warrantyPeriod;
  final String? description;
  final String? brand;

  ProductItem({
    this.id,
    this.sku,
    this.name,
    this.price,
    this.weight,
    this.descriptions,
    this.thumbnail,
    this.image,
    this.option,
    this.categoryId,
    this.subCategoryId,
    this.optionId,
    this.createDate,
    this.stock,
    this.warrantyPeriod,
    this.description,
    this.brand,
  });

  factory ProductItem.fromJson(Map<String, dynamic> json) {
    return ProductItem(
      id: json['_id'] ?? '',
      sku: json['sku'] ?? '',
      name: json['name'] ?? '',
      price: (json['price']?.toDouble() ?? 0),
      weight: (json['weight']?.toDouble() ?? 0),
      descriptions: json['descriptions'] ?? '',
      thumbnail: json['thumbnail'] ?? '',
      image: json['image'] ?? '',
      option: json['option'] as Map<String, dynamic>?,
      categoryId: json['category_id'] ?? '',
      subCategoryId: json['sub_category_id'] ?? '',
      optionId: json['option_id'] ?? '',
      createDate: DateTime.parse(json['create_date'] ?? DateTime.now().toString()),
      stock: json['stock'] ?? 0,
      warrantyPeriod: json['warrantyPeriod'] ?? '',
      description: json['description'] ?? '',
      brand: json['brand'] ?? '',
    );
  }

  Map<String, dynamic> toJson() {
    return {
      '_id': id,
      'sku': sku,
      'name': name,
      'price': price,
      'weight': weight,
      'descriptions': descriptions,
      'thumbnail': thumbnail,
      'image': image,
      'option': option,
      'category_id': categoryId,
      'sub_category_id': subCategoryId,
      'option_id': optionId,
      'create_date': createDate?.toIso8601String(),
      'stock': stock,
      'warrantyPeriod': warrantyPeriod,
      'description': description,
      'brand': brand,
    };
  }
}
