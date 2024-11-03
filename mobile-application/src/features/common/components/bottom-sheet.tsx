import React from "react";
import RBSheet from "react-native-raw-bottom-sheet";

export type RBSheetRef = {
  open: () => void;
  close: () => void;
};
export default function BottomSheet({
  children,
  refRBSheet,
  height,
}: {
  children: React.ReactNode;
  refRBSheet: React.RefObject<RBSheetRef>;
  height?: number;
}) {
  return (
    <RBSheet
      height={height}
      ref={refRBSheet}
      useNativeDriver={false}
      customStyles={{
        wrapper: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        draggableIcon: {
          backgroundColor: "#000",
        },
        container: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
      }}
      customModalProps={{
        animationType: "slide",
        statusBarTranslucent: true,
      }}
      customAvoidingViewProps={{
        enabled: false,
      }}
    >
      {children}
    </RBSheet>
  );
}
