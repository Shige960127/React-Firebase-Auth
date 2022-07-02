import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase/firebase";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useTailwind } from "tailwind-rn";

const SignUpScreen = () => {
  const tailwind = useTailwind();
  const auth = getAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = async () => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      alert(
        "サインアップが完了しました。サインアップしたユーザーのIDは" + user.uid
      );
      const docRef = await addDoc(collection(db, "users"), {
        id: user.uid,
        email: email,
        password: password,
      });
      alert("Document written with ID:" + docRef.id);
    } catch (error) {
      console.log({ error });
      alert("エラーが発生しました。");
    }
  };
  return (
    <SafeAreaView style={tailwind("flex-1")}>
      <View style={tailwind("flex flex-col items-start")}>
        <Text>メールアドレス：</Text>
        <TextInput
          style={tailwind("w-40 border-4")}
          onChange={(e) => setEmail(e.nativeEvent.text)}
          value={email}
        />
      </View>
      <View style={tailwind("flex flex-col items-start")}>
        <Text>パスワード：</Text>
        <TextInput
          style={tailwind("w-40 border-4")}
          onChange={(e) => setPassword(e.nativeEvent.text)}
          value={password}
        />
      </View>
      <TouchableOpacity onPress={signUp}>
        <Text>サインアップする</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SignUpScreen;
