import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";

const Home = () => {
  const [idList, setIdList] = useState([]);
  const [emailList, setEmailList] = useState([]);
  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    console.log(user);
    setIdList(user.uid);
    setEmailList(user.email);
  }, []);
  return (
    <>
      <h1>ID:{idList}</h1>
      <h1>EMAIL:{emailList}</h1>
    </>
  );
};

export default Home;
