import express from "express"

const app = express()

app.use(express.json())
app.use(express.static("."))

const API_KEY = "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"

app.post("/chat", async (req,res)=>{

const userText = req.body.message

const response = await fetch("https://api.openai.com/v1/chat/completions",{
method:"POST",
headers:{
"Content-Type":"application/json",
"Authorization":"Bearer "+API_KEY
},
body:JSON.stringify({
model:"gpt-4o-mini",
messages:[
{role:"system",content:"Ты космический помощник."},
{role:"user",content:userText}
]
})
})

const data = await response.json()

res.json({
answer:data.choices[0].message.content
})

})

app.listen(3000,()=>console.log("Server started"))
