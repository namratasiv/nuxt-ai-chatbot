
import { GoogleGenerativeAI } from "@google/generative-ai";
export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig();
	let messages = [];
	const previosMessages = await readBody(event);
	messages = messages.concat(previosMessages);
	

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);


  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

//   const prompt = "Write a story about a magic backpack."
  let prompt =
		messages.map((message) => `${message.role}: ${message.message}`).join('\n') + `\nAI:`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  var text = response.text();
  text = text.replace("**", "");
  console.log(text);
  console.log(result);
  console.log(response);

	return {
		message: text
	};
});
