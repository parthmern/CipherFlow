
const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");

require('dotenv').config()

const AZURE_OPENAI_KEY = process.env.AZURE_OPENAI_KEY ;
const AZURE_OPENAI_ENDPOINT = "https://parth.openai.azure.com/";

const client = new OpenAIClient(
  AZURE_OPENAI_ENDPOINT,
  new AzureKeyCredential(AZURE_OPENAI_KEY)
);

async function runPrompt(user_prompt, system_prompt, max_tokens, temp = 0.5) {
  const messages = [
    {
      role: "system",
      content: system_prompt,
    },
    {
      role: "user",
      content: user_prompt,
    },
  ];

  try {
    const deploymentName = 'CipherFlow';

    const result = await client.getChatCompletions(deploymentName, messages, {
      maxTokens: max_tokens, // Each model has a different max tokens limit
      temperature: temp, // 0.1 0.2 .... 1
    });

    console.log(result);

    return result.choices[0].message.content;
  } catch (error) {
    console.error("Error during API call or JSON parsing:", error);
  }
}

module.exports = runPrompt;