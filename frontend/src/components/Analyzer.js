import React from 'react'
import Waveform from './Waveform'

export default class Analyzer extends React.Component {
    render() {
      return (
         <div className='waveform-container'>
           <Waveform url ={'https://www.mfiles.co.uk/mp3-downloads/gs-cd-track2.mp3'}/>
        </div>
      )
    }
  }