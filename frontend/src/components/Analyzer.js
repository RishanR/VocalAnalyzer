import React from 'react'
import Waveform from './Waveform'

export default class Analyzer extends React.Component {
    render() {
      return (
         <div className='waveform-container'>
           <Waveform url ={'./static/frontend/src/userVocals.wav'}/>
        </div>
      )
    }
  }