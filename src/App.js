import React from "react";
import {SelectedFiles} from "./SelectedFiles";
import {OutputVideo} from "./OutputVideo";
import {ConvertProgress} from "./ConvertProgress";
import {Dots} from "./dots";
import {useFFMPEG} from "./useFFMPEG";

function App() {
    const {
        loaded,
        framerate,
        setFramerate,
        images,
        setImages,
        converting,
        convertToStopMotion,
        progress,
        videoUrl,
    } = useFFMPEG();

    return loaded ? (
            <div className="flex flex-col items-center w-full h-full">
                <div>
                    <label>Framerate</label>
                    <input type="number" id="framerate" name="framerate" value={framerate} onChange={(e) => setFramerate(e.target.value)}/>
                    <input multiple={true} type="file" onChange={(e) => setImages(Array.from(e.target.files))}
                           className="button button--primary" accept="image/jpeg"/>
                    <button onClick={convertToStopMotion} disabled={converting}
                            className={"button button--secondary " + (converting ? 'button--disabled' : '')}>Convert
                    </button>
                </div>
                <div>
                    {progress && <ConvertProgress progress={progress}/>}
                    {videoUrl && <OutputVideo url={videoUrl}/>}
                    <SelectedFiles images={images}/>
                </div>
            </div>
        ) :
        (
            <p>
                Loading FFMPEG module, this can take some time <Dots maxNumber={3} interval={250}/>
            </p>
        );
}

export default App;
