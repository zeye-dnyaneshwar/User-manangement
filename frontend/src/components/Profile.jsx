import { Box, Flex, Heading, Text, Image, useColorModeValue } from "@chakra-ui/react";

function Profile({ userData }) {
  const bg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg={bg}
      borderColor={borderColor}
      boxShadow="lg"
      p={6}
      m="auto"
      mt={8}
    >
      <Flex direction="column" align="center">
        <Image
          borderRadius="full"
          boxSize="150px"
          src={userData.image || "https://via.placeholder.com/150"}
          alt={userData.name}
          mb={4}
        />
        <Heading fontSize="2xl" mb={2}>
          {userData.name}
        </Heading>
        <Text fontSize="lg" color="gray.500" mb={2}>
          {userData.email}
        </Text>
        <Text fontSize="md" textAlign="center" mb={2}>
          {userData.bio}
        </Text>
        <Text fontSize="md" color="gray.500">
          {userData.phone}
        </Text>
      </Flex>
    </Box>
  );
}

export default Profile;
