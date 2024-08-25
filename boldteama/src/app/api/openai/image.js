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

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
    try {
        const { prompt } = await request.json();
        const response = await openai.images.generate({
            model: "dall-e-2",
            prompt: prompt || "a frog riding a bike", 
            n: 6,
            size: "1024x1024",
        });

        console.log('API response:', response.data);

        const image_url = response.data[0].url;
        const description = response.data[0].description; 

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

// import OpenAI from "openai";

// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
// });

// export async function POST(request) {
//     try {
//         const { prompt } = await request.json();
//         const imageResponse = await openai.images.generate({
//             model: "dall-e-2",
//             prompt: prompt || "a frog riding a bike", 
//             n: 6,
//             size: "1024x1024",
//         });

//         const image_url = imageResponse.data[0]?.url;
//         const description = imageResponse.data[0]?.description || "No description provided";

//         if (!image_url) throw new Error("No image URL found");

//         // generate a summary
//         const summaryResponse = await openai.chat.completions.create({
//             model: "gpt-3.5-turbo",
//             messages: [
//                 { role: "system", content: "Summarize the following description into a few words." },
//                 { role: "user", content: description }
//             ]
//         });

//         const summary = summaryResponse.choices[0]?.message.content || "No summary available";

//         return new Response(JSON.stringify({ image_url, description, summary }), { status: 200 });
//     } catch (error) {
//         return new Response(JSON.stringify({ error: error.message }), { status: 500 });
//     }
// }

