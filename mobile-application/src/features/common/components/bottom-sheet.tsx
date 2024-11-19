import React, { useEffect } from "react";
import RBSheet from "react-native-raw-bottom-sheet";

export type RBSheetRef = {
  open: () => void;
  close: () => void;
  isOpen: boolean;
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
  useEffect(() => {
    if (refRBSheet?.current) {
      refRBSheet.current.isOpen = false; 
    }
  }, [refRBSheet]);


  const handleClose = () => {
    if (refRBSheet?.current) {
      refRBSheet.current.isOpen = false;
    }
  };

  return (
    <RBSheet
      height={height}
      ref={refRBSheet}
      useNativeDriver={false}
      onClose={handleClose} 
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
