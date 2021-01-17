import axios from 'axios'

const KEY ="AIzaSyDesyVuFY3mkmpn2fkPnadjK39wW9Rj8r4";

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params:{
        part:'snippet',
        maxResults: 3,
        key: KEY,
        type:'video',
    },
    headers:{}
})