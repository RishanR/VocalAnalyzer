import React, {useState, useEffect} from 'react'
import youtubeApi from '../api/youtube'
import VideoCard from './VideoCard'


const ChooseSong = () => {

    const[title, setTitle]=useState("");
    const[videoInfo,setVideoInfo]=useState([]);
    const[display, setDisplay]=useState(false)
    //const[selectedId,setSelectedId]=useState(0);


    const onSearchChanged = async (event) => {
        const _title = event.target.value
        console.log(_title)
        setTitle(_title)
    }

    const onSubmit = async (event) => {
        event.preventDefault();

        //Fix if title is empty case
        setDisplay(true);
        const response = await youtubeApi.get("/search",{
            params:{
                q:title
            }
        })
        .then(result => {
            return result.data.items.map(e => {return {"id":e.id.videoId,"title":e.snippet.title,"thumbnail":e.snippet.thumbnails.medium.url}})
        })
        .catch(err => {console.log(err)})

        setVideoInfo(response);
        console.log(response)
    }

    return (
        <div className='card-container'>
            <div>
                <form onSubmit={onSubmit}>
                    <div class="form-controls">
                        <input class="video-search" value ={title} onChange={onSearchChanged} id="video-search" type = "text" placeholder="Song title.."></input>
                    </div>
                </form>
                {display && (
                            <div class="video-container">
                                {videoInfo.map((value,index)=>{
                                    return <VideoCard value={value}/>
                                })}
                            </div>
                    )}
            </div>

            {/* <button class="button">
                Upload
           </button> */}
        </div>
    )
}

export default ChooseSong;
