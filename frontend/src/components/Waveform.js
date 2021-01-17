import React, { useEffect, useRef, useState } from "react";
// import * as d3 from 'd3';
import { csv } from 'd3';
import axios from 'axios'
import data from  '../../static/frontend/src/spreadsheets/music_analysis.csv';
import WaveSurfer from "wavesurfer.js";


var linGrad = document.createElement('canvas').getContext('2d').createLinearGradient(0, 0, 1000, 128);
linGrad.addColorStop(0, '#ff8934');
linGrad.addColorStop(0.5, '#971e63'); 
linGrad.addColorStop(1, '#ef0348');

const formWaveSurferOptions = ref => ({
  container: ref,
  waveColor: "#eee",
  progressColor: linGrad,
  cursorColor: "OrangeRed",
  barHeight:1.4,
  barWidth: 3,
  barRadius: 3,
  responsive: true,
  height:150,
  // If true, normalize by the maximum peak instead of 1.0.
  normalize: true,
  // Use the PeakCache to improve rendering speed of large waveforms.
  partialRender: true
});


export default function Waveform({ url }) {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [playing, setPlay] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [notes, setNotes] = useState([]);

  // create new WaveSurfer instance
  // On component mount and when url changes
  useEffect(() => {
    setPlay(false);

    var csv_file;

    axios.get('/api/vocalanalysis')
      .then(function (response) {
        // handle success
        csv('../static/frontend/src/spreadsheets/music_analysis.csv').then(data => {
          setNotes(data);
          console.log(data);
        }).catch(function(err){
          throw err
        })
      console.log(response);
    })
    

    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);

    wavesurfer.current.load(url);

    wavesurfer.current.on("ready", function() {

      if (wavesurfer.current) {
        wavesurfer.current.setVolume(volume);
        setVolume(volume);
      }
    });

    //replace data with csv
    

    return () => wavesurfer.current.destroy();
  }, [url]);

  const handlePlayPause = () => {
    setPlay(!playing);
    wavesurfer.current.playPause();
  };

  return (
    <>
    <div className="waveform">
      <div className="mic-loading-button play-pause" onClick={handlePlayPause}>{!playing ? 'Play' :'Pause' }</div>
      <div className="wave" id="waveform" ref={waveformRef} />
    </div>
    <div className="wave-container">
      <div class="element">TimeStamp</div>
      <div class="element">Correct Note</div>
      <div class="element">Your Note</div>
    </div>
      { notes.map(row => {
            return (<div className="wave-container"><div>{row['Time']}</div>
                   <div>{row['Artist Notes']}</div>
                  <div>{row['Singer Notes']}</div></div>)
          
      }) }
    
    </>
  );
}