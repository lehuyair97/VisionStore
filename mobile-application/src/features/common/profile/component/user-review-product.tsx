import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { MainContainer } from "@components";
import { EDGES, Helper } from "@utils/helper";
import Block from "@components/block";
import AppBarCustom from "@features/common/home/component/appbar_custom";
import useGetCommnetByUserId from "@hooks/common/use-get-comment-by-user-id";
import { useAuth } from "@hooks/auth";
import { FlatList } from "react-native-gesture-handler";
import CommentItem from "@features/common/components/comment-item";
export default function UserReviewProduct() {
  const { userInfo } = useAuth();
  const { data } = useGetCommnetByUserId(userInfo?._id);
  return (
    <MainContainer edges={EDGES.LEFT_RIGHT}>
      <AppBarCustom
        title="Đánh giá của bạn"
        iconLeft
        titleCenter
        isBackground
        paddingHorizontal={20}
        paddingVertical={10}
      />
      <Block backgroundColor={"gray_profile"} flex={1} mx={"_20"}>
        <FlatList
          data={data?.comments}
          keyExtractor={Helper.getKeyExtractor}
          renderItem={({ item }: { item: any }) => {
            return (
              <CommentItem
                isUserReview
                product={item?.productID}
                avatar={item?.userID?.avatar}
                color="white"
                comment={item?.text}
                images={item?.images}
                likes={item?.likes}
                name={item?.userID?.userName}
                timestamp={item?.created_at}
                rating={item?.rating}
              />
            );
          }}
        />
      </Block>
    </MainContainer>
  );
}

const styles = StyleSheet.create({});
