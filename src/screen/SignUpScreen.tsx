import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

type Props = NativeStackScreenProps<RootStackParamList, "SignUp">;

const SignUpScreen = ({ navigation }: Props) => {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const tailwind = useTailwind();

  const signUp = async () => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      alert(
        "サインアップが完了しました、サインアップしたユーザのIDは" + user.uid
      );
      await addDoc(collection(db, "users"), {
        id: user.uid,
        email: email,
        password: password,
      });
    } catch ({ error }) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView style={tailwind("flex-1 bg-stone-200")}>
      <View style={tailwind("bg-white w-3/4 h-2/4 mt-20 ml-12 pt-2 pl-2")}>
        <View style={tailwind("items-center m-4 p-4")}>
          <Text style={tailwind("text-2xl font-bold")}>Sign Up</Text>
        </View>
        <View style={tailwind("")}>
          <View>
            <Text>Email:</Text>
          </View>
          <TextInput
            style={tailwind("w-40 border rounded")}
            onChange={(e) => setEmail(e.nativeEvent.text)}
            value={email}
            autoCapitalize={"none"}
          />
        </View>
        <View>
          <View>
            <Text>Password:</Text>
          </View>
          <TextInput
            style={tailwind("w-40 border rounded")}
            onChange={(e) => setPassword(e.nativeEvent.text)}
            value={password}
            autoCapitalize={"none"}
            secureTextEntry
          />
        </View>
        <TouchableOpacity onPress={signUp}>
          <Text>サインアップする</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
          <Text>すでにアカウントをお持ちの方はこちらをクリック</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignUpScreen;
