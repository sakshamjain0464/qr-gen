import { useState } from "react";
import { SketchPicker } from "react-color";
import { IoMdColorFilter } from "react-icons/io";
import { QRCodeCanvas } from "qrcode.react";

function App() {
  const [currentBgColor, setCurrentBgColor] = useState("#000000");
  const [currentFgColor, setCurrentFgColor] = useState("#ffffff");
  const [BgColorPickerActive, setBgColorPickerActive] = useState(false);
  const [FgColorPickerActive, setFgColorPickerActive] = useState(false);
  const [url, setUrl] = useState("");
  const [image, setImage] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const handleDownload = () => {
    const qrCanvas = document.getElementById('x')

    qrCanvas.style.height = '100000000px'
    qrCanvas.style.width = '1000000000px'

    const qrURL = qrCanvas.toDataURL('image/png');

    qrCanvas.style.height = '200px'
    qrCanvas.style.width = '200px'

    const qrlink = document.createElement('a');
    qrlink.href = qrURL;
    qrlink.download = 'my_qr.png'

    qrlink.click()
    
  }

  return (
    <>
      <div className="w-screen h-screen flex flex-col items-center p-5 pt-2">
        <h1 className="mt-5 font-bold md:text-3xl text-3xl tracking-wider text-center">
          Welcome to QR-Gen
        </h1>
        <h2 className="mt-1 text-md text-center">Generate Your QR now</h2>
        <div className="md:w-fit w-[90%] h-fit border-[1px] rounded-lg border-gray-900 my-2 mx-auto pt-3 pb-6 px-5">
          <div className="flex flex-col">
            <label htmlFor="url" className="text-md">
              Enter Url
            </label>
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              type="text"
              id="url"
              className="focus:outline-none active:outline-none border-[1px] mt-1 px-3 py-2 border-gray-900 rounded-md md:w-[500px] w-full"
            />
          </div>
          <div className="flex flex-col mt-2">
            <label htmlFor="bg" className="text-md">
              Background Color
            </label>
            <div>
              <input
                value={currentBgColor}
                onChange={(e) => {
                  setCurrentBgColor(e.target.value);
                }}
                type="text"
                id="bg"
                maxLength={8}
                className="focus:outline-none active:outline-none border-[1px] mt-1 px-3 py-2 border-gray-900 rounded-md md:w-[500px] w-[80%]"
              />
              <IoMdColorFilter
                onClick={() => setBgColorPickerActive(true)}
                className="text-3xl inline ml-3"
              />
              {BgColorPickerActive && (
                <SketchPicker
                  color={currentBgColor}
                  className="absolute"
                  onChange={(color) => {
                    setCurrentBgColor(color.hex);
                  }}
                  onChangeComplete={() => setBgColorPickerActive(false)}
                />
              )}
            </div>
          </div>
          <div className="flex flex-col mt-2">
            <label htmlFor="fg" className="text-md">
              QR Color
            </label>
            <div>
              <input
                value={currentFgColor}
                onChange={(e) => {
                  setCurrentFgColor(e.target.value);
                }}
                type="text"
                id="fg"
                maxLength={8}
                className="focus:outline-none active:outline-none border-[1px] mt-1 px-3 py-2 border-gray-900 rounded-md md:w-[500px] w-[80%]"
              />
              <IoMdColorFilter
                onClick={() => setFgColorPickerActive(true)}
                className="text-3xl inline ml-3"
              />
              {FgColorPickerActive && (
                <SketchPicker
                  color={currentFgColor}
                  className="absolute"
                  onChange={(color) => {
                    setCurrentFgColor(color.hex);
                  }}
                  onChangeComplete={() => setFgColorPickerActive(false)}
                />
              )}
            </div>
            <label htmlFor="fg" className="text-md">
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-2"
            />
          </div>
        </div>
        <div className="mt-4 h-fit w-fit">
          <QRCodeCanvas
            value={url}
            bgColor={currentFgColor}
            fgColor={currentBgColor}
            style={{
              height: "200px",
              width: "200px",
            }}
            level="H"
            imageSettings={{
              src: image,
              x: undefined,
              y: undefined,
              height: 34,
              width: 34,
              excavate: true,
            }}
            id="x"
          />
        </div>
        <div className="mt-5 py-3 font-semibold tracking-wider rounded-lg cursor-pointer px-5 flex items-center justify-center bg-zinc-200 hover:bg-zinc-300 active:bg-zinc-200 text-xl" onClick={handleDownload}>
          <p>Download QR</p>
        </div>
      </div>
    </>
  );
}

export default App;
