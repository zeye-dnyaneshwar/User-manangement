import { useEffect, useState } from "react";
import axios from 'axios';
import { Box, Heading } from "@chakra-ui/react";
import Profile from "../components/Profile";

function HomePage() {
  const [userData, setUserData] = useState({});

  const getAccessToken = async (code) => {
    try {
      const response = await axios.get(`https://user-manangement-1.onrender.com/api/v1/git/accessToken?code=${code}`);
      console.log(response.data.msg.access_token, response.data.email);
      localStorage.setItem("email", response.data.email);
      const accessToken = response.data.msg.access_token;
      localStorage.setItem("accessToken", accessToken);
      return accessToken;
    } catch (error) {
      console.error('Error fetching access token:', error.message);
      throw error;
    }
  };

  const getUserData = async (accessToken, email) => {
    try {
      const response = await axios.get(`https://user-manangement-1.onrender.com/api/v1/git/getUserData?email=${email}`, {
        headers: {
          accessToken: accessToken,
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
      return response.data.newUser
    } catch (error) {
      console.error('Error fetching user data:', error.message);
      throw error;
    }
  };

  const getUserDataById = async (token, userId) => {
    try {
      const response = await axios.get(`https://user-manangement-1.onrender.com/api/v1/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching user data by ID:', error.message);
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
      const email = localStorage.getItem("email");

      if (storedToken) {
        const data = await getUserData(storedToken, email);
        setUserData(data);
      }
    };

    const fetchUserDataById = async () => {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem("userId");
      const storedToken = localStorage.getItem('accessToken');
      if (!storedToken&&token && userId) {
        const data = await getUserDataById(token, userId);
        console.log(data)
        setUserData(data.msg);
      }
    };

    fetchUserData();
    fetchUserDataById();
  }, []);

  return (
    <Box>
      <Heading>HomePage</Heading>
      <Profile userData={userData} />
    </Box>
  );
}

export default HomePage;
