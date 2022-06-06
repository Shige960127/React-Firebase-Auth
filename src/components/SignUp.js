import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = getAuth();

  const navigate = useNavigate();

  const signUp = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        alert("ログインが完了しました。ログインしたユーザーのIDは" + user.uid);
        navigate("/home"); // 画面遷移
      })
      .catch((error) => {
        console.log({ error });
        alert("エラーが発生しました。");
      });
  };
  return (
    <>
      <div>ログイン</div>
      <div>
        <label>メールアドレス：</label>
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
      <button onClick={signUp}>ログインする</button>
    </>
  );
};

export default SignUp