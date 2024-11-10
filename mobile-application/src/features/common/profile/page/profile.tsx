import { MainContainer } from "@components";
import Block from "@components/block";
import Colors from "@theme/colors";
import { EDGES } from "@utils/helper";
import { ScrollView, StyleSheet } from "react-native";
import FeaturesProfile from "../component/features_profile";
import HeaderProfile from "../component/header_profile";
import OrderManagement from "../component/order_management";
import Trademark from "../component/trademark";
import { useAuth } from "@hooks/auth";

const data = [
  // Tạo dữ liệu cho FlatList
  { id: "1", title: "Chờ thanh toán", icon: "credit-card" },
  { id: "2", title: "Đang Xử lý", icon: "user" },
  { id: "3", title: "Đang vận chuyển", icon: "truck" },
  { id: "4", title: "Đã giao", icon: "clipboard" },
  { id: "5", title: "Đổi trả", icon: "rotate-left" },
  // Thêm các mục khác nếu cần
];

const dataTrademark = [
  // Tạo dữ liệu cho FlatList
  {
    id: "1",
    title: "Asus",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU9uWRAuTwzHZXLCKjD_p-DrJqLbYcjQVlKg&s",
  },
  {
    id: "2",
    title: "Dell",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOlpCfzsaHmQd-Ph0XaBqTGPbpfAY4qmg8bQ&s",
  },
  {
    id: "3",
    title: "Acer",
    image:
      "https://static.vecteezy.com/system/resources/previews/019/136/299/non_2x/acer-logo-acer-icon-free-free-vector.jpg",
  },
  {
    id: "4",
    title: "HP",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiTKPS7AES9C41BuuHsJLeEeoCoyC1AoQ6hA&s",
  },
  {
    id: "5",
    title: "Apple ",
    image:
      "https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8ed3d547-94ff-48e1-9f20-8c14a7030a02_2000x2000.jpeg",
  },
  // Thêm các mục khác nếu cần
];

export default function Profile() {
  const { userInfo } = useAuth();

  return (
    <MainContainer
      edges={EDGES.LEFT_RIGHT}
      style={{ backgroundColor: Colors.gray_profile }}
    >
      <ScrollView>
        <HeaderProfile
          avatar={userInfo?.avatar}
          displayName={userInfo?.userName}
          email={userInfo?.email}
        />
        <Block mt={"_12"} />
        <OrderManagement data={data} />
        <Block mt={"_12"} />
        <Trademark data={dataTrademark} />
        <Block mt={"_12"} />
        <FeaturesProfile />
      </ScrollView>
    </MainContainer>
  );
}

const styles = StyleSheet.create({});
