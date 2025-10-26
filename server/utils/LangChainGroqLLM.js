const { BaseLanguageModel } = require("langchain/schema");
const { GroqLLM } = require("./groqLLM");

class LangChainGroqLLM extends BaseLanguageModel {
  constructor() {
    super();
    this.groqLLM = new GroqLLM();
  }

  _llmType() {
    return "groq";
  }

  /** input: { prompt: string } */
  async _call(prompt, options) {
    // Use your existing GroqLLM call method
    return await this.groqLLM.call({ input: prompt });
  }

  // Required by BaseLanguageModel
  async generate(prompts, options) {
    const generations = [];
    for (const prompt of prompts) {
      const text = await this._call(prompt);
      generations.push([{ text }]);
    }
    return { generations };
  }
}

module.exports = { LangChainGroqLLM };