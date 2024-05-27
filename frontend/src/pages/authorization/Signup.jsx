import { Button, Container, FormControl, FormLabel, Heading, Input, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

function Signup() {
  const navigate = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(formData);
    try {
      const response = await axios.post('https://user-manangement-2.onrender.com/api/v1/auth/register', formData);
      localStorage.removeItem("accessToken")
      localStorage.removeItem("email")
      localStorage.setItem("token", response.data.user.token);
      localStorage.setItem("userId", response.data.user._id);
      setLoading(false);
      toast({
        title: "Account created.",
        description: "Your account has been successfully created.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate('/home');
    } catch (error) {
      setLoading(false);
      toast({
        title: "An error occurred.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.error(error.message);
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
        SIGNUP
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl mb={4}>
          <FormLabel>Name</FormLabel>
          <Input
            placeholder="Enter Your Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </FormControl>
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
        <Button type="submit" colorScheme="teal" width={"100%"} mb={5} isLoading={loading} >
          SIGNUP
        </Button>
      </form>
      <p>
        Already Have An Account?
        <span color="blue">
          <Link style={{ color: "blue" }} to={"/"}>
            Login
          </Link>
        </span>
      </p>
    </Container>
  );
}

export default Signup;
