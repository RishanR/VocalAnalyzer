import React from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom';

const VideoCard = (props) => {
    let history = useHistory();

    const sendInfo = () => {

        axios.post('/api/choosesong', {
            url: props.value.id,
            title: props.value.title
          })
          .then(function (response) {
            console.log(response);
            history.push('/record')
          })
    }

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