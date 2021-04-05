import React from 'react';

export const UploadButton = ({onChange, text}) => {
    return (
        <div className="form__field overflow-hidden relative bg-purple-500 hover:bg-purple-900">
            <button
                className="button--upload">
                <svg fill="#FFF" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0h24v24H0z" fill="none"/>
                    <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"/>
                </svg>
                <span className="ml-2">{text}</span>
            </button>
            <input type="file" accept="image/jpeg" multiple={true}
                   className="form__input--upload"
                    onChange={onChange}/>
        </div>
    );
}