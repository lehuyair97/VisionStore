// Định nghĩa component Im

import { localImages } from "@assets/icons/images";
import Block from "@components/block";
import { Image } from "react-native";
import { StyleSheet } from "react-native";

interface ImgDetailProps {
    width: number;
    height: number;
    source?: any; 
    isBackground?: boolean;
}

const ImgDetail = ({ width, height, source = localImages().ic_mac, isBackground = false }: ImgDetailProps) => {
    const dynamicStyles = StyleSheet.create({
        Im: {
            alignSelf: "center",
            borderRadius: (width + 20) / 2, // Tính toán động borderRadius cho Block lớn
        },
        circularImageContainer: {
            width: width, // Sử dụng width từ props
            height: height, // Sử dụng height từ props
            borderRadius: width / 2, // Tính toán động borderRadius cho Block chứa hình ảnh
            borderColor: 'white', // Màu viền trắng
            borderWidth: 2, // Độ dày của viền
            justifyContent: "center",
            alignItems: "center",
        },
        circularImage: {
            width: width - 4, // Trừ đi 2 * borderWidth để hình ảnh nằm gọn trong viền
            height: height - 4, 
            borderRadius: (width - 4) / 2, // Tính toán động borderRadius cho hình ảnh
            resizeMode: "center",
            alignSelf: "center",
        },
    });

    return (
        <Block 
            backgroundColor={isBackground ? "white255" : "transparent"} 
            height={height + 20} 
            width={width + 20} 
            borderColor={"whiteF3"} 
            borderWidth={1} 
            style={dynamicStyles.Im} 
            justifyContent="center" 
            alignItems="center"
        >
            <Block 
                backgroundColor="white255" 
                height={height} 
                width={width} 
                style={dynamicStyles.circularImageContainer} 
                justifyContent="center" 
                alignItems="center"
            >
                <Image 
                    source={source} 
                    style={dynamicStyles.circularImage} 
                />
            </Block>
        </Block>
    );
};

// Xuất component Im
export default ImgDetail;
