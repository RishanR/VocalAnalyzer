import React from 'react'


const VideoCard = (props) => {
    return (
        <div className='video-card'>
            <img className="videoImage" src={props.value.thumbnail}/>
            
            <div class="video-label">
                <span className="videoName">{props.value.title}</span>
            </div>
        </div>
    )
}

export default VideoCard;