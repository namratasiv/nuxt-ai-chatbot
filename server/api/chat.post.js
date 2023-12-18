
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



	// const req = await fetch('https://api.openai.com/v1/completions', {
	// 	method: 'POST',
	// 	headers: {
	// 		'Content-Type': 'application/json',
	// 		Authorization: `Bearer ${config.OPENAI_API_KEY}`
	// 	},
	// 	body: JSON.stringify({
	// 		model: 'text-davinci-003',
	// 		prompt: prompt,
	// 		temperature: 0.9,
	// 		max_tokens: 512,
	// 		top_p: 1.0,
	// 		frequency_penalty: 0,
	// 		presence_penalty: 0.6,
	// 		stop: [' User:', ' AI:']
	// 	})
	// });

	// const res = await req.json();
	// const result = res.choices[0];
	return {
		message: text
	};
});
