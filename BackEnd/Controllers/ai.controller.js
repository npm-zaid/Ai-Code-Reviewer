import { generateContent } from "../Services/service.js";

const AiController = async (req, res) => {
  try {
    const code = req.body.code;
    const reviewCode = await generateContent(code);
    return res.status(200).json({ success: true, reviewCode });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export default AiController;