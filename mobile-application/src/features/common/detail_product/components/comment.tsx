import { Button, Icon, MainContainer, Row, Text } from "@components";
import Block from "@components/block";
import CommentItem from "@features/common/components/comment-item";
import useGetComment from "@hooks/common/use-get-comment-by-productID";
import { Helper } from "@utils/helper";
import { FlatList } from "react-native-gesture-handler";
import useWebSocket from "@hooks/common/use-web-socket-custom";
import { useState, useEffect } from "react";
import useLikeComment from "@hooks/common/use-like-comment";
import { Alert } from "react-native";
export default function Comment({ productID }: { productID: string }) {
  const [lastLikedTime, setLastLikedTime] = useState<number | null>(null);

  const { data } = useGetComment(productID);
  const { comment } = useWebSocket();
  const [combinedComments, setCombinedComments] = useState(
    data?.comments ?? []
  );
  const { likeComment } = useLikeComment(productID);
  const [averageRating, setAverageRating] = useState(data?.averageRating || 0);
  const [count, setCount] = useState(data?.count || 0);

  useEffect(() => {
    if (data?.comments) {
      setCombinedComments(data?.comments);
      setCount(data?.count);
      setAverageRating(data?.averageRating);
    }
    if (comment?.comments?.productID === productID) {
      setCombinedComments(comment?.comments);
      setCount(comment?.count);
      setAverageRating(comment?.averageRating);
    }
  }, [comment, data]);
  const handleLike = async (commentId: string) => {
    const currentTime = Date.now(); 
    if (lastLikedTime && currentTime - lastLikedTime < 30000) {
      Alert.alert("Thông báo", "Bạn chỉ được thích 1 lần trong 30 giây!");
    } else {
      setLastLikedTime(currentTime);
      await likeComment(commentId);
    }
  };
  return (
    <MainContainer>
      <Block mb={"_80"}>
        <Row between center my={"_20"}>
          <Block>
            <Text fontSize={15} fontWeight={"bold"} color={"black"}>
              Đánh giá sản phẩm
            </Text>
            <Row>
              <Text color="black">
                {averageRating?.toFixed(1)}/5 ({count} Đánh giá)
              </Text>
            </Row>
          </Block>
          <Button noneStyle>
            <Row center gap={"_10"}>
              <Text color={"primary"}>Xem Tất cả</Text>
              <Icon type="antDesign" name="right" size={14} color="red" />
            </Row>
          </Button>
        </Row>
        <FlatList
          data={combinedComments}
          keyExtractor={Helper.getKeyExtractor}
          renderItem={({ item }: { item: any }) => (
            <CommentItem
              avatar={item?.userID?.avatar}
              color="white"
              comment={item?.text}
              images={item?.images}
              likes={item?.likes}
              onLike={() => handleLike(item?._id)}
              name={item?.userID?.userName}
              timestamp={item?.created_at}
              rating={item?.rating}
            />
          )}
        />
      </Block>
    </MainContainer>
  );
}
