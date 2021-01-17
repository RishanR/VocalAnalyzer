import React, { useState } from 'react'
import { ReactMic } from 'react-mic';
import AudioAnalyser from './AudioAnalyser';
import AudioNone from './AudioNone';

const RecordVocals = () => {
    const [record, setRecord] = useState(false);
    const [iAudio, setIAudio] = useState(null);

    const getMicrophone = async () => {
      const audio = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false
      });
      setIAudio(audio)
    }
  
    const stopMicrophone = () => {
      iAudio.getTracks().forEach(track => track.stop());
      setIAudio(null);
    }
  
    const toggleMicrophone = () => {
      if (iAudio) {
        stopMicrophone();
      } else {
        getMicrophone();
      }
    }

    const startRecording = () => {
        setRecord(true);
        toggleMicrophone();
      }
     
    const stopRecording = () => {
        setRecord(false);
        toggleMicrophone();
      }
     
    const onData = (recordedBlob) => {
        console.log('chunk of real-time data is: ', recordedBlob);
      }
     
    const onStop = (recordedBlob) => {
        console.log('recordedBlob is: ', recordedBlob);
      }

    return (
        <div className='card-container'>
            <h1 className='subheading-text'>Record your vocals.</h1>
            <ReactMic
                record={record}
                visualSetting="frequencyBars"
                onStop={onStop}
                onData={onData}
                strokeColor="#ffffff00"
                backgroundColor="#ffffff00"
                channelCount={1} 
                height={0}
                width={0} />
            {iAudio ? <AudioAnalyser audio={iAudio} /> : <AudioNone />}
            {(record) ? 
              <div className='mic-loading-button' onClick={stopRecording} type="button">
                <div className='loadingContainer'>
                  <div class="ball1"></div>
                  <div class="ball2"></div>
                  <div class="ball3"></div>
                  <div class="ball4"></div>
                </div>
              </div> : 
              
              <div className='mic-button' onClick={startRecording} type="button"></div>}
        </div>
    )
}

export default RecordVocals;
