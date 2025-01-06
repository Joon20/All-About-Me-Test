const OpenAI = require("openai");
const express = require("express");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());


// api key 가져오기
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const openai = new OpenAI({apikey: OPENAI_API_KEY});

app.post("/chat", async(req,res)=>{
    try{
  // 프론트엔드에서 들고온 메시지 받아서
  const{message, boyfriendType} = req.body;
  // 챗지피티에 전달해주기
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
        { role: "system", content: boyfriendType }, // 역할을 부여하는 것
        {
            role: "user",
            content: message, // 역할을 부여하는 것 
        },
    ],
});
    console.log(completion.choices[0].message);    
    const reply = completion.choices[0].message;
    res.status(200).json({reply});
    }catch(error){
     // 에러 나면 에러 던지기
     res.status(400).json({error:"api request fail",rawError:error});
    }
});

app.listen(5001, ()=>{
    console.log("server is running on 5001");
});




