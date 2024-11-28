// models/voucher.dart
class Voucher {
  final String? id;
  final String? code;
  final int? discount;
  final DateTime? expirationDate;
  final String? title;
  final String? description;
  final String? status;
  final String? type;
  final List<String>? usedBy;

  Voucher({
    this.id,
    this.code,
    this.discount,
    this.expirationDate,
    this.title,
    this.description,
    this.status,
    this.type,
    this.usedBy,
  });

  factory Voucher.fromJson(Map<String, dynamic> json) {
    return Voucher(
      id: json['_id'] as String?,
      code: json['code'] as String?,
      discount: json['discount'] as int?,
      expirationDate: json['expiration_date'] != null
          ? DateTime.parse(json['expiration_date'] as String)
          : null,
      title: json['title'] as String?,
      description: json['description'] as String?,
      status: json['status'] as String?,
      type: json['type'] as String?,
      usedBy: json['usedBy'] != null
          ? List<String>.from(json['usedBy'] as List)
          : null,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      '_id': id,
      'code': code,
      'discount': discount,
      'expiration_date': expirationDate?.toIso8601String(),
      'title': title,
      'description': description,
      'status': status,
      'type': type,
      'usedBy': usedBy,
    };
  }
}