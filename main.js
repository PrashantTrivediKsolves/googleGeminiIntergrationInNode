import fetch, { Headers } from 'node-fetch'; // For Node.js versions < 18
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

// Polyfill fetch and Headers globally for Node.js < 18
if (!global.fetch) {
  global.fetch = fetch;
}

if (!global.Headers) {
  global.Headers = Headers;
}

import express from 'express';

import bodyParser from 'body-parser';

const app=express();
app.use(express.json());
app.use(bodyParser.json());


app.get("/",(req,res)=>
{
  res.send("Hello, World ! Gemini");
})


app.get("/api/content",async(req,res)=>
{
  try{
    const data = req.body.question;
    const result= await generate(data);
    res.send(result);
  }
  catch(err)
  {
console.log(err);
  }
})


const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// const prompt = " What is chatgpt";

const generate = async (prompt) => {
  try {
    const result = await model.generateContent(prompt);
    console.log(result.response.text());
    return result.response.text();
  } catch (error) {
    console.error(error);
  }
};


app.listen(3000,()=>
{
  console.log("server is Up and running on port 3000");
})

//generate();
