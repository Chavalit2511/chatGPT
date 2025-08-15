let dotenv = require('dotenv');
dotenv.config();
let express = require('express');
let bodyParser = require('body-parser');
let OpenAI = require('openai');


const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY, // This is the default and can be omitted
});

const app = express();

app.use(bodyParser.json());

app.post('/chatbot', async (req, res) => {
    let userPrompt = req.body.user_prompt;
    console.log(userPrompt);
    let content = await mainChat(userPrompt);
    res.send(content);
});

let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is run on http://localhost:${port}`); // Alt 96 is backtrick
})

async function mainChat(userPrompt) {
  const completion = await openai.chat.completions.create({
    messages: [
        { role: "developer", content: "You are a helpful assistant." },
        { role: "user", content: userPrompt}
    ],
    model: "gpt-3.5-turbo",
    max_tokens:100
  });

  return(completion.choices[0].message.content);
}