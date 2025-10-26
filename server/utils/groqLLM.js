import { Groq } from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export class GroqLLM {
  async call({ input }) {
    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: input }],
      model: "moonshotai/kimi-k2-instruct-0905",
      temperature: 0,
      top_p: 1,
      stream: false
    });

    const choice = completion.choices?.[0];
    if (!choice) return "No answer returned by model.";

    if (choice.message?.content) return choice.message.content;
    if (choice.text) return choice.text;

    return "No valid text found in completion";
  }
}