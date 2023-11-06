import { useRef, useState } from "react"


export default function Picture({ readablePicture, setReadablePicture, setPicture }) {
    const inputRef = useRef();

    // error state
    const [error, setError] = useState("")

    const handlePicture = (e) => {

        let pic = e.target.files[0];
        if (pic.type !== "image/jpeg"
            && pic.type !== "image/png"
            && pic.type !== "image/webp"
        ) {
            setError(`${pic.name} format is not supported.`)
            return;
        } else if (pic.size > 1024 * 1024 * 5) {   //5mb
            setError(`${pic.name} size is to large, maximum 5mb allowed.`)
            return;
        } else {
            setError("");
            setPicture(pic)
            //reading the picture
            const reader = new FileReader()
            reader.readAsDataURL(pic)
            reader.onload = (e) => {
                setReadablePicture(e.target.result)
            }
        }
    }

    const handleChangePic = () => {
        setPicture("");
        setReadablePicture("");
        // inputRef.current.click();   //(if u want to change the pic just add this line)
    }

    return (
        <div className="mt-8 content-center dark:text-dark_text_1 space-y-1">
            <label htmlFor="picture" className="text-sm font-bold tracking-wide">
                Picture (Optional)
            </label>
            {readablePicture
                ? (
                    <div>
                        {/* which displays image after selecting in register form */}
                        <img className="w-20 h-20 object-cover rounded-full" src={readablePicture} alt="picture" />

                        {/*change pic  */}
                        <div className="mt-2 w-20 py-1  dark:bg-dark_bg_3 
                    rounded-md text-xs flex items-center justify-center 
                    cursor-pointer" onClick={() => handleChangePic()}> Remove</div>
                    </div >
                ) : (
                    <div className="w-full h-12 dark:bg-dark_bg_3 
                    rounded-md font-bold flex items-center justify-center 
                    cursor-pointer"  onClick={() => inputRef.current.click()}>
                        Upload picture
                    </div>
                )}
            <input type="file" name="picture" accept="image/png,image/jpeg,image/webp"
                id="picture" hidden ref={inputRef} onChange={handlePicture} />

            {/* Error */}
            <div className="mt-2">
                <p className="text-red-400">{error}</p>
            </div>
        </div>
    )
}
