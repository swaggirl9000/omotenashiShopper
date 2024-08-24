import OpenAI from "openai";
import fs from "fs";
import { IncomingForm } from 'formidable';
import path from "path";
import { promisify } from "util";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const parseForm = promisify(new IncomingForm().parse);

export async function POST(req, res) {
  try {
    const { fields, files } = await parseForm(req);
    const imagePath = files.image.filepath; 

    const response = await openai.images.createVariation({
      model: "dall-e-2",
      image: fs.createReadStream(imagePath),
      n: 6,
      size: "1024x1024",
    });

    const imageUrl = response.data[0].url;

    res.status(200).json({ imageUrl });
  } catch (error) {
    console.error("Error creating image variation:", error);
    res.status(500).json({ error: "Failed to create image variation" });
  }
}

export const config = {
  api: {
    bodyParser: false, 
  },
};
