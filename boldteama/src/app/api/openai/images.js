import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
    const { prompt } = await request.json();
    const response = await openai.images.generate({
        model: "dall-e-2",
        prompt: prompt || "a frog riding a bike", 
        n: 6,
        size: "1024x1024",
    });

    const image_url = response.data[0].url;
    return new Response(JSON.stringify({ image_url }));
}