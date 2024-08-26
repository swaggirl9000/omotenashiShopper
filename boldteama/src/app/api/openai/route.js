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
//         size: "512x512",
//     });

//     const image_urls = response.data.map(image => ({ url: image.url }));

//     return new Response(JSON.stringify({ data: image_urls }));
// }

//with description
// import OpenAI from "openai";

// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
// });

// export async function POST(request) {
//     try {
//         const { prompt } = await request.json();
//         const response = await openai.images.generate({
//             model: "dall-e-2",
//             prompt: prompt || "a frog riding a bike", 
//             n: 6,
//             size: "1024x1024",
//         });

//         console.log('API response:', response.data);

//         const image_url = response.data[0].url;
//         const description = response.data[0].description; 

//         if (!image_url) throw new Error("No image URL found");

//         return new Response(
//             JSON.stringify({ image_url, description }), 
//             { status: 200 }
//         );
//     } catch (error) {
//         console.error('Error generating image:', error);
//         return new Response(JSON.stringify({ error: error.message }), { status: 500 });
//     }
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
            prompt: prompt,
            n: 6,
            size: "512x512",
        });

        const image_urls = response.data.map(image => ({ url: image.url }));
        if (image_urls.length === 0) throw new Error("No image URLs found");

        // generate a summary for each image description
        const summaries = await Promise.all(
            response.data.map(async (image) => {
                const summaryResponse = await openai.chat.completions.create({
                    model: "gpt-3.5-turbo",
                    messages: [
                        { role: "system", content: "Summarize the following description of the image into a short product title that can be used on a webpage." },
                        { role: "user", content: image.url }
                    ]
                });
                return summaryResponse.choices[0].message.content.trim();
            })
        );

        // combine image URLs and summaries into a single response
        const result = image_urls.map((image, index) => ({
            url: image.url,
            summary: summaries[index],
        }));

        return new Response(JSON.stringify({ result }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}


