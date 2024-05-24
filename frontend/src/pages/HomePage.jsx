import { useEffect } from "react";
import axios from 'axios';

function HomePage() {
  const getAccessToken = async (code) => {
    try {
      const response = await axios.get(`https://user-manangement.onrender.com/api/v1/git/accessToken?code=${code}`);
      console.log(response.data.msg.access_token,response.data.email);
      localStorage.setItem("email",response.data.email)
      const accessToken = response.data.msg.access_token;
      localStorage.setItem("accessToken", accessToken);
      return accessToken;
    } catch (error) {
      console.error('Error fetching access token:', error.message);
      throw error;
    }
  };

  const getUserData = async (accessToken,email) => {
    try {
      const response = await axios.get(`https://user-manangement.onrender.com/api/v1/git/getUserData?email=${email}`, {
        headers: {
          accessToken: accessToken,
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching user data:', error.message);
      throw error;
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const url = window.location.search;
      const urlParams = new URLSearchParams(url);
      const code = urlParams.get("code");

      if (code && !localStorage.getItem("accessToken")) {
        await getAccessToken(code);
      }

      const storedToken = localStorage.getItem('accessToken');
      const email = localStorage.getItem("email")
      console.log(storedToken,"tokenhere")
      
      if (storedToken) {
        await getUserData(storedToken,email);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>HomePage</div>
  );
}

export default HomePage;
