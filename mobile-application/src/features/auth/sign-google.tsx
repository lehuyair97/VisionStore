// import { StatusBar } from "expo-status-bar";
// import { Button, StyleSheet, Text, View } from "react-native";
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import { useEffect, useState } from "react";

// export default function SignUp() {
//   const [error, setError] = useState();
  const [userInfo, setUserInfo] = useState();
//   const [apiData, setApiData] = useState(); // Thêm state để lưu dữ liệu từ API


  useEffect(() => {
    GoogleSignin.configure({
      webClientId: "796239183008-229vcarahasokpb1hm3nnve5jl3s5vse.apps.googleusercontent.com", // Sử dụng client_id từ Firebase
    });
  }, []);

  

//     // Hàm gọi API để lấy dữ liệu người dùng
//     const fetchUserData = async () => {
//       try {
//         const response = await fetch("http://192.168.1.2:3000/api/users", {
//           method: "GET",
//           headers:{
//             Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzE0YjVhN2Q5Y2MxZTExNWUyY2E0MjUiLCJlbWFpbCI6InRoYW9AZ21haWwuY29tIiwiaWF0IjoxNzI5NDEzMTYxLCJleHAiOjE3Mjk0MTQwNjF9.qPj1riaK3pY0-lSk9O5ZxJhzFoRcDNDqo64bfNLpIkI
// `
//           }
//         });
  
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
  
//         const data = await response.json();
//         setApiData(data); // Lưu dữ liệu API vào state
//       } catch (error) {
//         console.error("Error fetching user data: ", error);
//         setError(error.message);
//       }
//     };
  
  

  const signin = async () => {
    console.log("Attempting to sign in...");
    fetchUserData();
    try {
      await GoogleSignin.hasPlayServices();
      const user = await GoogleSignin.signIn();
      console.log("User data: ", user);

      setUserInfo(user);
      setError(null);
    } catch (e) {
      console.error("Sign in error: ", e);
    }
  };

//   const logout = async () => {
//     await GoogleSignin.revokeAccess();
//     await GoogleSignin.signOut();
//     setUserInfo(null);
//   };

//   return (
//     <View style={styles.container}>
//       {apiData && (
//         <>
//           <Text>User Info: {JSON.stringify(apiData)}</Text>
//           {/* <Text>Access Token: {userInfo.data.idToken}</Text> */}
//         </>
//       )}
//       {apiData ? (
//         <Button title="Logout" onPress={logout} />
//       ) : (
//         <GoogleSigninButton
//           size={GoogleSigninButton.Size.Standard}
//           color={GoogleSigninButton.Color.Dark}
//           onPress={signin}
//         />
//       )}
//       <StatusBar style="auto" />
//     </View>
//   );
// };


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
