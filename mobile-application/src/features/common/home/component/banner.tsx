import { Block } from "@components";
import { navigate } from "@navigation/config/navigation-service";
import { ROUTES } from "@navigation/config/routes";
import { Image, TouchableOpacity } from "react-native";
import Swiper from "react-native-swiper";

interface BannerProps {
  borderRadius?: number;
  nums?: number;
  data: any[];   
}

const Banner = ({ data, borderRadius = 16, nums = 3 }: BannerProps) => {
  const height = 135;

  return (
    <Block height={height} style={{ borderRadius }} my={"_20"}>
      <Swiper
        style={{ height }}
        autoplay
        autoplayTimeout={nums}
        showsPagination
        dotColor="#90A4AE"
        activeDotColor="#FFEE58"
      >
        {data.map((banner, index) => (
          <Block justifyContent={"center"} alignItems={"center"} key={index}>
            <TouchableOpacity
              onPress={() => {
                navigate(ROUTES.DetailProduct, { productId: banner.productId });
              }}
              style={{ width: "100%", height: height }}  
            >
              <Image
                source={{ uri: banner?.image }}  
                style={{
                  width: "100%",
                  height: "100%",  
                  borderRadius: borderRadius, 
                }}
                resizeMode="cover"
              />
            </TouchableOpacity>
          </Block>
        ))}
      </Swiper>
    </Block>
  );
};

export default Banner;
