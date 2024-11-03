import React from 'react';
import { View, Image, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';

interface BannerProps {
  borderRadius?: number;
  nums?: number;
  images: any[];
}


const Banner = ({ images, borderRadius=16, nums=3 }: BannerProps) => {
  const height = 135;
    return (
        <View style={{ height: height , borderRadius:borderRadius}}>
        <Swiper
            style={{ height: height }}
            autoplay
            autoplayTimeout={nums}
            showsPagination
            dotColor="#90A4AE"
            activeDotColor="#FFEE58"
        >
            {images.map((image, index) => (
                <View key={index} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        source={image}
                        style={{ width: '100%', height: height , borderRadius:borderRadius}} // Đặt kích thước cụ thể cho ảnh
                        resizeMode="cover" // Đảm bảo ảnh giữ nguyên tỷ lệ
                    />
                </View>
            ))}
        </Swiper>
      </View>

    );
}

export default Banner;