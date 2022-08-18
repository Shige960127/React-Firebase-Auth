import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { useTailwind } from "tailwind-rn/dist";
import { db } from "../firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { useDispatch } from "react-redux";
import { handleSignOut } from "../stores/user";
import { AppDispatch } from "../stores/index";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen = ({ navigation }: Props) => {
  const tailwind = useTailwind();
  const [email, setEmail] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        const q = query(collection(db, "users"), where("id", "==", user?.uid));
        const querySnapShot = await getDocs(q);
        querySnapShot.forEach((doc) => {
          console.log(doc.id, "=>", doc.data());
          setEmail(doc.data().email);
        });
      } catch (error) {
        console.log({ error });
      }
    };
    fetchData();
  }, []);
  return (
    <SafeAreaView style={tailwind("flex-1")}>
      <View style={tailwind("flex flex-col items-start")}>
        <Text>Email:{email}</Text>
      </View>
      <TouchableOpacity onPress={() => dispatch(handleSignOut())}>
        <Text>SignOut</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default HomeScreen;
