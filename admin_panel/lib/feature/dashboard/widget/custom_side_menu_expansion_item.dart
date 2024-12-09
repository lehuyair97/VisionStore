import 'package:flutter/material.dart';
import 'package:easy_sidemenu/easy_sidemenu.dart';

class CustomSideMenuExpansionItem extends SideMenuExpansionItem {
  CustomSideMenuExpansionItem({
    Key? key,
    String? title,
    Icon? icon,
    Widget? iconWidget,
    required List<SideMenuItem> children,
  }) : super(
          key: key,
          title: title,
          icon: icon,
          iconWidget: iconWidget,
          children: children.map((child) => SideMenuItem(
                title: child.title,
                onTap: child.onTap,
                iconWidget: Container(
                  margin: EdgeInsets.only(left: 20),
                  child: child.icon ?? const Icon(Icons.circle),
                ),
              )).toList(),
        );
}