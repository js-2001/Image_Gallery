import React, { useState, useEffect } from 'react'
import Card from "./components/Card";
import Search from "./components/Search";
function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(async () => {
    try {
      // const data = await fetch(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${searchTerm}&image_type=photo&pretty=true`)
      const data = await fetch(`https://pixabay.com/api/?key=21128084-5a9748f7652d09174ea9e6ba9&q=${searchTerm}&image_type=photo&pretty=true`).then( result=>result.json() )
      console.log(data)
      setImages(data.hits);
      setIsLoading(false);
    } catch (e) {
      console.log("error: ", e);
    }
  }, [searchTerm])

  return (
      <div className="container flex flex-col items-center justify-center ">
        {!isLoading && images.length === 0 && <h1 className="text-5xl text-center mx-auto mt-32">No Images Found</h1> }
        <Search searchText={(text) => setSearchTerm(text)} />
        {isLoading ? <h1 className="text-6xl text-center mx-auto mt-32">Loading...</h1> : <div className="grid grid-cols-3 gap-4">
          { 
            images && images.map( image => (
              <Card key={image.id} image={image} />
            ))
          }
        </div>}
      </div>
  );
}

export default App;