class SubCategory {
  final String id;
  final String name;
  final String image;
  final String childType;

  SubCategory({
    required this.id,
    required this.name,
    required this.image,
    required this.childType,
  });

  factory SubCategory.fromJson(Map<String, dynamic> json) {
    return SubCategory(
      id: json['_id'] ?? '',
      name: json['name'] ?? 'Chưa có tên',
      image: json['image'] ?? '',
      childType: json['child_type'] ?? '',
    );
  }

  Map<String, dynamic> toJson() {
    return {
      '_id': id,
      'name': name,
      'image': image,
      'child_type': childType,
    };
  }
}

