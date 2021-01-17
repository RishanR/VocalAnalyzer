import React from 'react'

const sendInfo = () => {

    axios.post('/api/choosesong', {
        url: props.value.id,
        title: props.value.title
      })
      .then(function (response) {
        console.log(response);
      })
}

const VideoCard = (props) => {
    return (
        <div className='video-card' onClick={sendInfo}>
            <img className="videoImage" src={props.value.thumbnail}/>
            
            <div class="video-label">
                <span className="videoName">{props.value.title}</span>
            </div>
        </div>
    )
}

export default VideoCard;