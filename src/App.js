import React, { useState } from 'react'
import './index.css';


export const App = () => {
  const [img,setimg]=useState("")
  
  const [load,success]=useState(false)
  const [set,put]=useState("www.youtube.com")
  const [size,setSize] = useState("150")
  async function generateQr(){
    success(true)
    try{
      const url= `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(set)}`
      setimg(url)

    }catch(error){
      console.log("Error Generating QR code",error);
      

    }finally{
      success(false)

    }
    console.log(img);
    


  }
  function downLoad(){
    fetch(img).then((response)=>response.blob()).then((blob)=>{
      const link = document.createElement("a")
      link.href=URL.createObjectURL(blob)
      link.download="QR.png"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

    });
  }

  return (
    <>
    <div className="qr-container">
      <h2>QR-generator</h2>
      {load && <p>Please Wait...</p>}
      {img && <img src={img} alt="" />}

      <div className='qr-input'>
      <label htmlFor="code">label for QR-code</label>
      <input type="text" htmlFor="code"     placeholder='Enter data for QR-code' value={set}    onChange={(e) => put(e.target.value)}/><br />
      <label htmlFor="down">Image-size(eg.150)</label>
      <input type="text" htmlFor="down"placeholder='Enter Image-size'  value={size}
          onChange={(event) => setSize(event.target.value)}/><br />
      </div>
      <button className='gene' disabled={load } onClick={generateQr}>Generate QR</button><br />
      <button className='dwn' onClick={downLoad}>Download QR</button><br />
    </div>

    </>
  )
}
