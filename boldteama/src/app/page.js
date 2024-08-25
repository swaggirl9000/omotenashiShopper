// "use client";
// import { useRef, useState } from "react";

// export default function Home() {
//   const promptRef = useRef();
//   const [images, setImages] = useState([]);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // generate images from a prompt
//   const generateImage = async () => {
//     setLoading(true);
//     try {
//       const resp = await fetch("/api/openai", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ prompt: promptRef.current.value })
//       });

//       if (!resp.ok) {
//         throw new Error("Unable to generate the image");
//       }

//       const data = await resp.json();
//       setImages([data.image_url]); 
//     } catch (error) {
//       console.error(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // handle image upload
//   const uploadImage = async (e) => {
//     const file = e.target.files[0];
//     setSelectedImage(file);
//     e.target.value = null; 
//   };

//   //  generate variations from the uploaded image
//   const generateVariations = async () => {
//     if (!selectedImage) return;

//     setLoading(true);
//     try {
//       const formData = new FormData();
//       formData.append('file', selectedImage);

//       const response = await fetch('/api/image', {
//         method: 'POST',
//         body: formData
//       });

//       if (!response.ok) {
//         throw new Error("Unable to generate variations");
//       }

//       const data = await response.json();
//       setImages(data.images); 
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="container max-w-4xl mx-auto">
//       <section className="flex items-center gap-2 px-6 py-6">
//         <h2>Prompt</h2>
//         <input
//           type="text"
//           className="w-full outline-none py-2 px-6 bg-gray-600 rounded-3xl text-small"
//           placeholder="Describe the image you want to generate"
//           defaultValue="a frog driving a car"
//           ref={promptRef}
//         />
//       </section>

//       <section className="flex flex-col gap-6 px-6 py-6">
//         <button
//           className="hover:opacity-80 py-2 px-6 bg-lime-600 rounded-3xl text-xs uppercase"
//           onClick={generateImage}
//           disabled={loading}
//         >
//           {loading ? 'Generating...' : 'Generate'}
//         </button>

//         <input
//           onChange={uploadImage}
//           id="files"
//           accept="image/*"
//           type="file"
//           hidden
//         />
        
//         <label htmlFor="files" className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded">
//           Upload an image
//         </label>
        
//         <button
//           className="hover:opacity-80 py-2 px-6 bg-yellow-600 rounded-3xl text-xs uppercase"
//           onClick={generateVariations}
//           disabled={loading || !selectedImage}
//         >
//           {loading ? 'Generating...' : 'Generate Variations'}
//         </button>
//       </section>

//       <section className="grid grid-cols-2 gap-4 px-6 py-6">
//         {images.length === 0 && !loading && (
//           <div className="bg-gray-600 aspect-square flex items-center justify-center">
//             Image will show up here
//           </div>
//         )}
//         {images.map((image, index) => (
//           <img key={index} src={image.url} alt={`Generated image ${index}`} />
//         ))}
//       </section>
//     </main>
//   );
// }



"use client";
import { useRef, useState } from "react";

export default function Home() {
  const promptRef = useRef();
  const [renderedImage, setRenderedImage] = useState(null);
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

      setRenderedImage({ url: data.image_url, description: data.description });
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };


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
            className="hover:opacity-80 py-2 px-6 bg-lime-600 rounded-3xl text-xs uppercase"
            onClick={generateImage}
          >
            Generate
          </button>
          {loading && (
            <div className="bg-gray-600 aspect-square flex items-center justify-center">
              Loading...
            </div>
          )}

          {!renderedImage && !loading && (
            <div className="bg-gray-600 aspect-square flex items-center justify-center">
              Image will show up here
            </div>
          )}

          {renderedImage && (
            <img src={renderedImage} alt="Generated" />
          )}
        </div>
      </section>
    </main>
  );
}
