"use client";
import { useRef, useState } from "react";

export default function Home() {
  const promptRef = useRef();
  const [renderedImage, setRenderedImage] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    setLoading(true);
    try {
      const resp = await fetch("/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: promptRef.current.value }),
      });

      if (!resp.ok) {
        throw new Error("Unable to generate the image");
      }

      const data = await resp.json();
      console.log(data);

      setRenderedImage(data.result);
      // setRenderedImage(data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };


//   const generateImage = async () => {
//     setLoading(true);
//     try {
//       const resp = await fetch("/api/openai", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ prompt: promptRef.current.value }),
//       });

//       if (!resp.ok) {
//         throw new Error("Unable to generate the image");
//       }

//       const data = await resp.json();
//       console.log(data);

//       setRenderedImage({ url: data.image_url});
//     } catch (error) {
//       console.log(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };


  return (
    <main className="container max-w-4xl mx-auto">
      <section className="flex items-center gap-2 px-6 py-6">
        <h2>Prompt</h2>
        <input
          type="text"
          className="w-full outline-none py-2 px-6 bg-gray-600 rounded-3xl text-small"
          placeholder="ramen eating a person, a bike riding a person"
          defaultValue="a frog driving a car"
          ref={promptRef}
        />
      </section>

      <section className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-6 px-6 py-6">
          <button
            disabled={loading}
            onClick={generateImage}
            className="hover:opacity-80 py-2 px-6 bg-lime-600 rounded-3xl text-xs uppercase"
          >
            {loading ? "Generating, please wait" : "Generate"}
          </button>

          {renderedImage.length === 0 && (
            <div className="bg-gray-600 aspect-square flex items-center justify-center">
              Image will show up here
            </div>
          )}

          {renderedImage.map((image, index) => {
            return <img key={image.url} src={image.url} />;
          })}
        </div>
      </section>
    </main>
  );
}
