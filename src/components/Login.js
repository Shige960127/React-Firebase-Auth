import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { db } from "../firebase";
import { collection, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      alert("ログインが完了しました。ログインしたユーザーのIDは" + user.uid);
      const docRef = await getDoc(collection(db, "users"), {
        id: user.uid,
        email: email,
        password: password,
      });

      alert("Document read with ID: ", docRef.id);
      navigate("http://localhost:3000/login/home");
    } catch (error) {
      console.log({ error });
      alert("エラーが発生しました。");
    }
  };
  return (
    <>
      <div>
        <h1>ログインするためのページです</h1>
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
      <button onClick={login}>ログイン</button>
    </>
  );
};

export default Login;
