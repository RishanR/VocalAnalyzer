import React, { useState, useEffect } from 'react'
import { ReactMic } from 'react-mic';
import AudioAnalyser from './AudioAnalyser';
import AudioNone from './AudioNone';
import MicRecorder from 'mic-recorder-to-mp3';

const Mp3Recorder = new MicRecorder({ bitRate: 128 })

const RecordVocalsNew = () => {
    const [record, setRecord] = useState(false);
    const [iAudio, setIAudio] = useState(null);
    const [blocked, setBlocked] = useState(false);
    const [instAudio, setInstAudio] = useState(new Audio('/static/frontend/src/Output/mp3/accompaniment.wav'))
    console.log(instAudio);

    const useEffect = (() => {
        navigator.getUserMedia({ audio: true },
            () => {
              console.log('Permission Granted');
              setBlocked(false);
            },
            () => {
              console.log('Permission Denied');
              setBlocked(true);
            },
          );
    }, [])

    const sendBlob = async (data) => {
      let response = await fetch("/api/recordvocals", {
        method: "post",
        body: data
      })
    }

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
        if (blocked) {
          console.log('Permission Denied');
        } else {
          Mp3Recorder
            .start()
            .then(() => {
              setRecord(true);
              toggleMicrophone();
              instAudio.play();
            }).catch((e) => console.error(e));
        }
      };

     const stopRecording = () => {
        Mp3Recorder
          .stop()
          .getMp3()
          .then(([buffer, blob]) => {
            const blobURL = URL.createObjectURL(blob)
            setRecord(false);
            toggleMicrophone();
            instAudio.pause();
            instAudio.currentTime = 0;
            sendBlob(blob);
          }).catch((e) => console.log(e));
      };

    return (
        <div className='card-container'>
            <h1 className='subheading-text'>Record your vocals.</h1>
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

export default RecordVocalsNew;
