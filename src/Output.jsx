import React from 'react';
import {ConvertProgress} from "./ConvertProgress";
import {OutputVideo} from "./OutputVideo";
import {SelectedFiles} from "./SelectedFiles";
export const Output = ({progress, videoUrl, images}) => {
    return (
        <div className="output">
            {progress && <ConvertProgress progress={progress}/>}
            {videoUrl && <OutputVideo url={videoUrl}/>}
            <SelectedFiles images={images}/>
        </div>
    );
}