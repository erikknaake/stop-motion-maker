import React from 'react';

export const OutputVideo = ({url}) => (
    <div>
        <video controls src={url}/>
        <a className="button button--secondary" href={url} download={true}>Download</a>
    </div>
)