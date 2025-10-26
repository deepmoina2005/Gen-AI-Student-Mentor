const axios = require("axios");
const ResourceSearch = require("../models/ResourceSearch.js");

const getResources = async (req, res) => {
  try {
    const { topic } = req.query;

    if (!topic) return res.status(400).json({ error: "Topic is required" });

    const apiKey = process.env.GOOGLE_API_KEY || "AIzaSyDf2r2bFN656d52MOPAisTRIB3oyrQ2IfE";
    const cx = process.env.CSE_ID || "017576662512468239146:omuauf_lfve";

    const query = encodeURIComponent(topic);

    const response = await axios.get(
      `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${query}`
    );

    const data = response.data;

    const resources =
      data.items?.map((item, index) => ({
        id: index + 1,
        title: item.title,
        description: item.snippet,
        url: item.link,
        author: item.displayLink,
      })) || [];

    const searchEntry = new ResourceSearch({
      topic,
      results: resources,
    });

    await searchEntry.save();

    res.json({
      topic,
      totalFound: resources.length,
      results: resources,
    });
  } catch (err) {
    console.error("Error fetching resources:", err.message);
    res.status(500).json({ error: "Something went wrong while fetching results" });
  }
};

module.exports = { getResources };
