import { Button, Container, FormControl, FormLabel, Heading, Input, useToast } from "@chakra-ui/react"
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
const CLIENT_ID="Ov23liuSjWinYPDdNRHm"
import axios from "axios"

function Login() {
  const toast = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const handleClick=()=>{
    window.location.assign(`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user:email`)
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(formData);
    try {
      const response = await axios.post('https://user-manangement-1.onrender.com/api/v1/auth/login', formData);
      console.log(response.data)
      localStorage.removeItem("accessToken")
      localStorage.removeItem("email")
      localStorage.setItem("token", response.data.user.token);
      localStorage.setItem("userId", response.data.user._id);
      setLoading(false);
      toast({
        title: "User Login",
        description: "User Login Successfull",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate('/home');
    } catch (error) {
      setLoading(false);
      toast({
        title: "An error occurred.",
        description: error.response.data.error?error.response.data.error:error.response.data.msg,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.error(error);
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Container
        bg="white"
        p={8}
        rounded="md"
        boxShadow="lg"
        maxW="md"
        width="100%"
        mt={"200px"}
      >
        <Heading textAlign="center" mb={4}>
          LOGIN
        </Heading>
        <form onSubmit={handleSubmit}>
          <FormControl mb={4}>
            <FormLabel>Email</FormLabel>
            <Input
              placeholder="Enter Your Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Password</FormLabel>
            <Input
              placeholder="Enter Your Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </FormControl>
          <Button type="submit" colorScheme="teal" width={"100%"} mb={5} isLoading={loading}>
            LOGIN
          </Button>
        </form>
        <Button onClick={handleClick} w={"100%"} colorScheme="blue">Login With GitHub</Button>
        <p>
          Dont Have An Account ?
          <span color="blue">
            <Link style={{ color: "blue" }} to={"/signup"}>
              Sign Up
            </Link>
          </span>
        </p>
      </Container>
  )
}

export default Login