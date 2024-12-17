class BrandDetail {
  String? id;
  String? name;
  String? description;
  String? logo;
  String? brandType;
  String? banner;
  int? version;

  BrandDetail({
    this.id,
    this.name,
    this.description,
    this.logo,
    this.brandType,
    this.banner,
    this.version,
  });

  factory BrandDetail.fromJson(Map<String, dynamic> json) {
    return BrandDetail(
      id: json['_id'] ?? '',
      name: json['name'] ?? 'Unknown',
      description: json['description'] ?? 'No description available',
      logo: json['logo'] ?? '',
      brandType: json['brandType'] ?? 'Unknown',
      banner: json['banner'] ?? '',
      version: json['__v'] ?? 0,
    );
  }
}
class ProductBrand {
  String? id;
  String? sku;
  String? name;
  double? price;
  double? weight;
  String? descriptions;
  String? thumbnail;
  String? image;
  String? categoryId;
  String? subCategoryId;
  String? optionId;
  String? createDate;
  int? stock;
  String? warrantyPeriod;
  String? description;
  String? brand;
  List<ProductOption>? options;

  ProductBrand({
    this.id,
    this.sku,
    this.name,
    this.price,
    this.weight,
    this.descriptions,
    this.thumbnail,
    this.image,
    this.categoryId,
    this.subCategoryId,
    this.optionId,
    this.createDate,
    this.stock,
    this.warrantyPeriod,
    this.description,
    this.brand,
    this.options,
  });

  factory ProductBrand.fromJson(Map<String, dynamic> json) {
    return ProductBrand(
      id: json['_id'] ?? '',
      sku: json['sku'] ?? 'Unknown SKU',
      name: json['name'] ?? 'No Name',
      price: (json['price'] ?? 0).toDouble(),
      weight: (json['weight'] ?? 0).toDouble(),
      descriptions: json['descriptions'] ?? 'No description',
      thumbnail: json['thumbnail'] ?? '',
      image: json['image'] ?? '',
      categoryId: json['category_id'] ?? '',
      subCategoryId: json['sub_category_id'] ?? '',
      optionId: json['option_id'] ?? '',
      createDate: json['create_date'] ?? '',
      stock: json['stock'] ?? 0,
      warrantyPeriod: json['warrantyPeriod'] ?? 'No warranty',
      description: json['description'] ?? 'No description',
      brand: json['brand'] ?? '',
      options: (json['option'] != null)
          ? (json['option']['configuration'] as List)
              .map((e) => ProductOption.fromJson(e))
              .toList()
          : [],
    );
  }
}
class ProductOption {
  int? ram;
  String? chip;
  double? extraPrice;

  ProductOption({
    this.ram,
    this.chip,
    this.extraPrice,
  });

  factory ProductOption.fromJson(Map<String, dynamic> json) {
    return ProductOption(
      ram: json['ram'] ?? 0,
      chip: json['chip'] ?? 'Unknown',
      extraPrice: (json['extraPrice'] ?? 0).toDouble(),
    );
  }
}
