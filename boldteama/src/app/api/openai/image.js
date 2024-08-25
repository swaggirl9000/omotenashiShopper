// import OpenAI from "openai";

// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
// });

// export async function POST(request) {
//     const { prompt } = await request.json();
//     const response = await openai.images.generate({
//         model: "dall-e-2",
//         prompt: prompt || "a frog riding a bike", 
//         n: 6,
//         size: "1024x1024",
//     });
//     console.log('API response:', response.data);
//     const image_url = response.data[0].url;
//     return new Response(JSON.stringify({ image_url }));
// }
import OpenAI from "openai";

// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
// });

export async function POST(request) {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });
    
    try {
        const { prompt } = await request.json();
        const response = await openai.images.generate({
            model: "dall-e-2",
            prompt: prompt || "a frog riding a bike", 
            n: 6,
            size: "1024x1024",
        });

        console.log('API response:', response.data);

        const image_url = response.data[0]?.url;
        const description = response.data[0]?.description || "No description provided"; // Replace with the actual field name if it's different

        if (!image_url) throw new Error("No image URL found");

        return new Response(
            JSON.stringify({ image_url, description }), 
            { status: 200 }
        );
    } catch (error) {
        console.error('Error generating image:', error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

