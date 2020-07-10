import React, {useState} from "react";

function Image(props){
  const [loaded, setLoaded] = useState(false)

  function handleImageLoaded() {
    setLoaded(true)
  }

  const imageStyle = !loaded ? { display: "none" } : {};
    return (
      <div className = "imageHolder" >
        {!loaded && <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png" alt="Placeholder" /> }
        <img src ={props.src} style={imageStyle} onLoad={handleImageLoaded} />
      </div>
    )
}

export default Image
