import { StyleSheet, Text, View,ScrollView } from "react-native";
import React from "react";
import HeaderProfile from "../component/header_profile";
import { MainContainer } from "@components";
import { EDGES } from "@utils/helper";
import Block from "@components/block";
import Colors from "@theme/colors";
import OrderManagement from "../component/order_management";
import RenderItem from "@features/common/profile/component/renderitem";
import Trademark from "../component/trademark";
import FeaturesProfile from "../component/features_profile";


const data = [ // Tạo dữ liệu cho FlatList
  { id: '1', title: 'Chờ thanh toán', icon: 'credit-card' },
  { id: '2', title: 'Đang Xử lý', icon: 'user' },
  { id: '3', title: 'Đang vận chuyển', icon: 'truck' },
  { id: '4', title: 'Đã giao', icon: 'clipboard' },
  { id: '5', title: 'Đổi trả', icon: 'rotate-left' },
  // Thêm các mục khác nếu cần
];

const dataTrademark = [ // Tạo dữ liệu cho FlatList
  { id: '1', title: 'Asus', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU9uWRAuTwzHZXLCKjD_p-DrJqLbYcjQVlKg&s' },
  { id: '2', title: 'Dell', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOlpCfzsaHmQd-Ph0XaBqTGPbpfAY4qmg8bQ&s' },
  { id: '3', title: 'Acer', image: 'https://static.vecteezy.com/system/resources/previews/019/136/299/non_2x/acer-logo-acer-icon-free-free-vector.jpg' },
  { id: '4', title: 'HP', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiTKPS7AES9C41BuuHsJLeEeoCoyC1AoQ6hA&s' },
  { id: '5', title: 'Apple ', image: 'https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8ed3d547-94ff-48e1-9f20-8c14a7030a02_2000x2000.jpeg' },
  // Thêm các mục khác nếu cần
];
const avatar = "https://yt3.googleusercontent.com/nWSdA9GftPmUUpr9p7-uRmzaBpXJPosI-m7anrP040ixXZdMScrMdyordtkR7XBDtewPancSjZo=s900-c-k-c0x00ffffff-no-rj";
export default function Profile() {
  return (
    <MainContainer edges={EDGES.LEFT_RIGHT} style={{backgroundColor: Colors.gray_profile}}>
      <ScrollView >
        <HeaderProfile avatar={avatar} />
        <Block mt={"_12"}/>
        <OrderManagement data={data} />
        <Block mt={"_12"}/>
        <Trademark data={dataTrademark} />
        <Block mt={"_12"}/>
        <FeaturesProfile />
      </ScrollView>
    </MainContainer>
  );
}

const styles = StyleSheet.create({});
