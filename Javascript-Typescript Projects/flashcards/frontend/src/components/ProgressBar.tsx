import React from "react";

interface progressBarprops{
    currentIndex: number;
    total: number;
}

const ProgressBar: React.FC<progressBarprops> = ({currentIndex, total}) => {
    return(
        <div className="prog-bar-cont">
            <div className="prog-bar" style={{width: `${((currentIndex+1) / total) * 100}%`}}></div>
        </div>
    )
}

export default ProgressBar