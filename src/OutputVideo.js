import React from 'react';

export const OutputVideo = ({url}) => (
    <div className="form">
        <video controls src={url} className="output__video"/>
        <a className="button button--secondary form__field" href={url} download={true}>Download</a>
    </div>
)