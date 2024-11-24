import React, { useState } from "react";
import { Block, Icon, MainContainer, Button, toast } from "@components";
import AppBarCustom from "@features/common/home/component/appbar_custom";
import { EDGES } from "@utils/helper";
import Colors from "@theme/colors";
import { Alert, TextInput, Text, Image, TouchableOpacity } from "react-native";
import { launchImageLibraryAsync, MediaTypeOptions } from "expo-image-picker";
import StarRating from "@features/common/detail_product/components/start-rating";
import theme from "@theme";
import useAddComment from "@hooks/common/use-add-comment";
import { useRoute } from "@react-navigation/native";
import { useAuth } from "@hooks/auth";
import { goBack } from "@navigation/config/navigation-service";
import useMarkAsCommented from "@hooks/common/use-mark-as-commented";
const ProductReview = () => {
  const route = useRoute();
  const { userInfo } = useAuth();
  const { order } = route.params as any;
  const { addComment } = useAddComment();
  const { markAsCommented } = useMarkAsCommented();
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>("");
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const handleSelectImage = async () => {
    if (imageUrls.length >= 3) {
      Alert.alert("Tối đa 3 ảnh chỉ được chọn.");
      return;
    }

    const result = (await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    })) as any;

    if (result.cancelled) {
      Alert.alert("Bạn đã hủy chọn ảnh.");
      return;
    }

    if (result.assets) {
      const uri = result.assets[0].uri;
      const file = result.assets[0];

      setImageUrls((prev) => [...prev, uri]);
      setImageFiles((prev) => [...prev, file]);
    } else {
      Alert.alert("Không thể chọn ảnh.");
    }
  };

  const handleRemoveImage = (uri: string) => {
    const index = imageUrls.indexOf(uri);
    if (index !== -1) {
      setImageUrls((prev) => prev.filter((_, i) => i !== index));
      setImageFiles((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleSubmitReview = () => {
    if (!rating || !review) {
      Alert.alert("Vui lòng đánh giá và nhập nội dung đánh giá.");
      return;
    }

    const productID = order?.items[0]?.productId;
    setTimeout(async () => {
      await addComment({
        productID,
        rating,
        text: review,
        userID: userInfo?._id,
        image: imageFiles,
      }).then(async (data) => {
        if (data?.isSuccess) {
          toast.success("Gửi đánh giá thành công!");
          await markAsCommented(order._id);
          goBack();
        }
      });
    }, 400);
  };

  const predefinedReviews = [
    "Sản phẩm rất tốt, tôi sẽ mua lại lần sau!",
    "Chất lượng ổn, giá cả hợp lý.",
    "Dịch vụ giao hàng nhanh chóng, tôi hài lòng với sản phẩm!",
  ];

  const handleSelectPredefinedReview = (reviewText: string) => {
    setReview(reviewText);
  };

  return (
    <MainContainer edges={EDGES.LEFT_RIGHT}>
      <Block backgroundColor={"container"} flex={1}>
        <AppBarCustom
          title="Đánh giá sản phẩm"
          iconLeft
          titleCenter
          isBackground
          paddingHorizontal={20}
          paddingVertical={10}
        />

        <Block pt={"_20"} px={"_20"}>
          {/* Star Rating */}
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
            Chọn số sao đánh giá:
          </Text>
          <StarRating
            rating={rating}
            editable={true}
            hasLabel
            onPress={(star) => setRating(star)}
          />

          {/* Review Input */}
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
            Nhập nội dung đánh giá:
          </Text>
          <TextInput
            value={review}
            onChangeText={setReview}
            placeholder="Nhập đánh giá của bạn..."
            multiline
            style={{
              borderColor: Colors.gray136,
              borderWidth: 1,
              borderRadius: 10,
              padding: 15,
              height: 120,
              textAlignVertical: "top",
              marginBottom: 20,
              fontSize: 16,
            }}
          />

          {/* Predefined Reviews */}
          <Text style={{ fontSize: 16, marginBottom: 10 }}>
            Chọn một bình luận mẫu:
          </Text>
          <Block
            flexDirection="row"
            flexWrap="wrap"
            justifyContent="flex-start"
          >
            {predefinedReviews.map((template, index) => (
              <Button
                key={index}
                label={template}
                onPress={() => handleSelectPredefinedReview(template)}
                style={{
                  marginRight: 10,
                  marginBottom: 10,
                  backgroundColor: theme.colors.gray136,
                  paddingHorizontal: 10,
                  paddingVertical: 8,
                  borderRadius: 10,
                }}
              />
            ))}
          </Block>

          {/* Image Upload */}
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
            Thêm hình ảnh (tối đa 3 ảnh):
          </Text>
          <Button
            label="Chọn ảnh"
            onPress={handleSelectImage}
            style={{
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 10,
              marginBottom: 15,
              backgroundColor: theme.colors.primary,
            }}
          />

          {/* Image Previews */}
          <Block
            flexDirection="row"
            flexWrap="wrap"
            justifyContent="flex-start"
          >
            {imageUrls.map((uri, index) => (
              <Block
                key={index}
                style={{
                  position: "relative",
                  marginRight: 10,
                  marginBottom: 10,
                }}
              >
                <Image
                  source={{ uri }}
                  style={{
                    width: 90,
                    height: 90,
                    borderRadius: 8,
                    borderWidth: 2,
                    borderColor: Colors.gray136,
                    marginBottom: 5,
                  }}
                />
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    top: -5,
                    right: -5,
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    borderRadius: 15,
                    padding: 5,
                  }}
                  onPress={() => handleRemoveImage(uri)}
                >
                  <Icon
                    type="fontAwesome"
                    name="remove"
                    size={18}
                    color="white"
                  />
                </TouchableOpacity>
              </Block>
            ))}
          </Block>

          {/* Submit Button */}
          <Button
            label="Gửi đánh giá"
            onPress={handleSubmitReview}
            style={{
              paddingHorizontal: 20,
              paddingVertical: 12,
              borderRadius: 10,
              marginTop: 30,
              backgroundColor: theme.colors.primary,
            }}
          />
        </Block>
      </Block>
    </MainContainer>
  );
};

export default ProductReview;
