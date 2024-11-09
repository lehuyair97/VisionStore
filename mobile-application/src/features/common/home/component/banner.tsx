import { Block } from "@components";
import React from "react";
import { View, Image, Dimensions } from "react-native";
import Swiper from "react-native-swiper";

interface BannerProps {
  borderRadius?: number;
  nums?: number;
  images: any[];
}

const Banner = ({ images, borderRadius = 16, nums = 3 }: BannerProps) => {
  const height = 135;
  return (
    <Block height={height} style={{ borderRadius: borderRadius }} my={'_20'}>
      <Swiper
        style={{ height: height }}
        autoplay
        autoplayTimeout={nums}
        showsPagination
        dotColor="#90A4AE"
        activeDotColor="#FFEE58"
      >
        {images.map((image, index) => (
          <Block justifyContent={'center'} alignItems={'center'} key={index}>
            <Image
              source={image}
              style={{
                width: "100%",
                height: height,
                borderRadius: borderRadius,
              }} 
              resizeMode="cover" 
            />
          </Block>
        ))}
      </Swiper>
    </Block>
  );
};

export default Banner;
