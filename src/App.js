import {createFFmpeg, fetchFile} from "@ffmpeg/ffmpeg";
import React, {useState, useEffect} from "react";
import {SelectedFiles} from "./SelectedFiles";
import {OutputVideo} from "./OutputVideo";
import {ConvertProgress} from "./ConvertProgress";
import {Dots} from "./dots";

const ffmpeg = createFFmpeg({log: true});

function App() {
    const [loaded, setLoaded] = useState(false);
    const [images, setImages] = useState([]);
    const [videoUrl, setVideoUrl] = useState(null);
    const [converting, setConverting] = useState(false);
    const [progress, setProgress] = useState(null);
    const [framerate, setFramerate] = useState(1);
    const load = async () => {
        await ffmpeg.load();
        ffmpeg.setProgress(({ratio}) => {
            setProgress(ratio * 100);
        });
        setLoaded(true);
    }

    useEffect(() => {
        load();
    }, []);

    const convertToStopMotion = async () => {
        setConverting(true);

        const filePromises = images.map(image => fetchFile(image));
        const imageFiles = await Promise.all(filePromises);
        for (let i = 0; i < imageFiles.length; i++) {
            ffmpeg.FS('writeFile', images[i].name, imageFiles[i]);
        }
        await ffmpeg.run('-framerate', `${framerate}`, '-pattern_type', 'glob', '-i', '*.jpg', '-c:v', 'libx264', '-vf', 'scale=1920:1080', 'out.mp4');
        const data = ffmpeg.FS('readFile', 'out.mp4');
        const url = URL.createObjectURL(new Blob([data.buffer], {type: 'video/mp4'}));
        setVideoUrl(url);
        setConverting(false);
    }

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
