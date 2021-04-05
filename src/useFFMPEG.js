import {createFFmpeg, fetchFile} from "@ffmpeg/ffmpeg";
import {useEffect, useState} from "react";

let wasmEnabled = true;
let ffmpeg;
if (window.isSecureContext) {
    ffmpeg = createFFmpeg({log: true});
} else {
    wasmEnabled = false;
    // TODO
}

export const useFFMPEG = () => {
    const [loaded, setLoaded] = useState(false);
    const [converting, setConverting] = useState(false);
    const [progress, setProgress] = useState(null);
    const [videoUrl, setVideoUrl] = useState(null);
    const [images, setImages] = useState([]);
    const [framerate, setFramerate] = useState(1);
    let convertToStopMotion = wasmEnabled ?
        async () => {
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
        : async () => {
        // TODO
        };
    useEffect(() => {
        if (wasmEnabled) {
            (async () => {
                if (!ffmpeg.isLoaded()) {
                    await ffmpeg.load();
                    ffmpeg.setProgress(({ratio}) => {
                        setProgress(ratio * 100);
                    });
                    setLoaded(true);
                }
            })();
        } else {
            // TODO
        }
    }, []);
    return {
        loaded,
        converting,
        progress,
        framerate,
        setFramerate,
        videoUrl,
        images,
        setImages,
        convertToStopMotion,
    }
}