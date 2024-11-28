class Brand {
  final String? id;
  final String? name;
  final String? description;
  final String? logo;
  final String? brandType;
  final int? version;

  Brand({
    this.id,
    this.name,
    this.description,
    this.logo,
    this.brandType,
    this.version,
  });

  factory Brand.fromJson(Map<String, dynamic> json) {
    return Brand(
      id: json['_id'] ?? '',
      name: json['name'] ?? '',
      description: json['description'] ?? '',
      logo: json['logo'] ?? '',
      brandType: json['brandType'] ?? '',
      version: json['__v'] ?? 0,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      '_id': id,
      'name': name,
      'description': description,
      'logo': logo,
      'brandType': brandType,
      '__v': version,
    };
  }
}