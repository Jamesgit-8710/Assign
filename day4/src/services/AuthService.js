import React, { useState, useEffect } from "react";
import axios from "axios";

const gitHubUrl = "https://dummyjson.com/products";

function AuthService() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    getGiHubUserWithAxios();
  }, []);

  const getGiHubUserWithAxios = async () => {
    const response = await axios.get(gitHubUrl);
    setUserData(response.data.products);
  };

  return (
    <div>
        {userData.map((e)=>{
            return <h5>{e.title}</h5>
        })}
    </div>
  );
}

export default AuthService;