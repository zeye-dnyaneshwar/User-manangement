import { Button, Container } from "@chakra-ui/react"
const CLIENT_ID="Ov23liuSjWinYPDdNRHm"

function Login() {
  const handleClick=()=>{
    window.location.assign(`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user:email`)
  }
  return (
    <Container>
        <h1>Login Here</h1>
        <Button onClick={handleClick}>Login With GitHub</Button>
    </Container>
  )
}

export default Login