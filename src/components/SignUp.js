import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // const signUp = () => {
  //   createUserWithEmailAndPassword(auth, email, password)
  //     .then((userCredential) => {
  //       const user = userCredential.user;
  //       alert("ログインが完了しました。ログインしたユーザのIDは" + user.uid);
  //     })
  //     .catch((error) => {
  //       console.log({ error });
  //       alert("エラーが発生しました。");
  //     });
  // };
  const signUp = async () => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      alert(
        "サインアップが完了しました。サインアップしたユーザのIDは" + user.uid
      );
      // ここでfirestore databaseにサインアップしたユーザーを追加している
      const docRef = await addDoc(collection(db, "users"), {
        id: user.uid,
        email: email,
        pasword: password,
      });
      alert("Document written with ID: ", docRef.id);
      navigate("/home");
    } catch (error) {
      console.log({ error });
      alert("エラーが発生しました。");
    }
  };
  return (
    <>
      <div>
        <h1>サインアップするためのページです。</h1>
        <label>メールアドレス:</label>
        <input
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </div>
      <div>
        <label>パスワード:</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>
      <button onClick={signUp}>サインアップする</button>
      <a href="http://localhost:3000/login">ログイン画面に移動します</a>
    </>
  );
};

export default SignUp;
