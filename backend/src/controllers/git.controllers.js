const axios=require("axios")
const authContext=require("../db/context/auth.context")
const getAcccessTokenController=async(req,res)=>{
    const { code } = req.query;
    try {
        const response = await axios.post(
            `https://github.com/login/oauth/access_token`,
            null,
            {
              params: {
                client_id: process.env.CLIENT_ID,
                client_secret: process.env.CLIENT_SECRET,
                code: code,
                scope: 'user:email'
              },
              headers: {
                Accept: "application/json",
              },
            }
          );
    //console.log(response.data.access_token)   
    const accessToken = response.data.access_token;
    //console.log(accessToken)
    const userEmailResponse = await axios.get(
      'https://api.github.com/user/emails',
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    const emails = userEmailResponse.data;
    const primaryEmail = emails.find(email => email.primary).email;
    //console.log(primaryEmail)
    return res.status(200).json({msg:response.data,email:primaryEmail})
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({msg:"Internal Server Error",error:error.message})
    }
}

const getUserDataController=async(req,res)=>{
    //console.log(req.headers,"headers")
    const { accesstoken } = req.headers;
    const {email}=req.query
    console.log(email)
    //console.log(accesstoken)
    try {
      const userData = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accesstoken}`,
        Accept: "application/json",
      },
     });
     console.log(userData.data)
     const userObj={
        name:userData.data.login,
        email,
        image:userData.data.avatar_url
     }
     const newUser=await authContext.createNewUser(userObj)
     return res.status(200).json({msg:"Login Successfull",newUser})
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({msg:"Internal Server Error",error:error.message})
    }
}

module.exports={getAcccessTokenController,getUserDataController}