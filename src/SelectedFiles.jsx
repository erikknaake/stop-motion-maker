import React from 'react';

export const SelectedFiles = ({images}) => (
    <div className="flex">
        {images.map(image => {
            return (
                <div key={image.name} className="image-preview">
                    <img src={URL.createObjectURL(image)} className="image-preview__thumbnail" alt=""/>
                    <p className="image-preview__image-name">{image.name}</p>
                </div>
            );
        })}
    </div>
)