import React from 'react';

export const OutputVideo = ({url}) => (
    <div className="form">
        <video controls src={url} className="output__video"/>
        <a className="form__field button button--secondary" href={url} download={true}>Download</a>
    </div>
)