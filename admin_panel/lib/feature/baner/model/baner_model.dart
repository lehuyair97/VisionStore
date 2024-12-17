class BanerModel {
  String id;
  String name;
  String description;
  String logo;
  String brandType;
  int v;
  String banner;

  BanerModel({
    required this.id,
    required this.name,
    required this.description,
    required this.logo,
    required this.brandType,
    required this.v,
    required this.banner,
  });

  factory BanerModel.fromJson(Map<String, dynamic> json) {
    return BanerModel(
      id: json['_id'],
      name: json['name'],
      description: json['description'],
      logo: json['logo'],
      brandType: json['brandType'],
      v: json['__v'],
      banner: json['banner'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      '_id': id,
      'name': name,
      'description': description,
      'logo': logo,
      'brandType': brandType,
      '__v': v,
      'banner': banner,
    };
  }
}

class BrandResponse {
  List<BanerModel> data;

  BrandResponse({required this.data});

  factory BrandResponse.fromJson(List<dynamic> json) {
    return BrandResponse(
      data: json.map((item) => BanerModel.fromJson(item)).toList(),
    );
  }

  List<Map<String, dynamic>> toJson() {
    return data.map((brand) => brand.toJson()).toList();
  }
}
