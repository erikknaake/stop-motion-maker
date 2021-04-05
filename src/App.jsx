import React from "react";
import {Dots} from "./dots";
import {useFFMPEG} from "./useFFMPEG";
import {UploadButton} from "./UploadButton";
import {Output} from "./Output";

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
            <div className="app app__content">
                <div className="card">
                    <header className="card__header">
                        Stop motion maker
                    </header>
                    <div className="card__content">
                        <div className="form">
                            <UploadButton onChange={(e) => setImages(Array.from(e.target.files))}
                                          text="Choose files to convert"/>
                            <div className="form__field">
                                <label className="form__label">Framerate</label>
                                <input type="number" id="framerate" name="framerate" value={framerate}
                                       onChange={(e) => setFramerate(parseFloat(e.target.value))}
                                       className="form__input"/>
                            </div>
                            <button onClick={convertToStopMotion} disabled={converting}
                                    className={"button button--secondary " + (converting ? 'button--disabled' : '')}>Convert
                            </button>
                        </div>
                        <Output progress={progress} images={images} videoUrl={videoUrl}/>
                    </div>
                </div>
            </div>
        ) :
        (
            <div>
                <p>
                    Make sure you are running a browser that <a href="https://caniuse.com/sharedarraybuffer">supports
                    SharedArrayBuffer</a>
                </p>
                <p>
                    Loading FFMPEG module, this can take some time<Dots maxNumber={3} interval={250}/>
                </p>
            </div>
        );
}

export default App;
