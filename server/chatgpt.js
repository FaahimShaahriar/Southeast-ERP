const { BardAPI } = require("bard-api-node");

const generationConfig = {
  temperature: 0.7,
  topK: 5,
  topP: 0.9,
  maxOutputTokens: 1024,
};

bard.setResponseGenerationConfig(generationConfig);
async function testAssistant() {
  try {
    const bard = new BardAPI();
    const apiKey = "AIzaSyAIZu8eUzphh_dwbORbS3sv0pt8bdQUrZ4";
    await bard.initializeChat(apiKey)
    const response = await bard.getBardResponse(
      "Greetings! What can you do for me?"
    );
    console.log(response);
  } catch (error) {
    console.error("Error:", error);
  }
}

testAssistant();
