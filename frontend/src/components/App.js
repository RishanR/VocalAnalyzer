import React from 'react'
import { render } from 'react-dom'
import '../css/App.css'
import ChooseSong from './ChooseSong'
import RecordVocals from './RecordVocals'
import regeneratorRuntime from "regenerator-runtime";
import "regenerator-runtime/runtime.js";

const App = () => {
    return (
        <div className='main-container'>
            <RecordVocals />
            {/* <ChooseSong /> */}
        </div>
    )
}

export default App;

const appDiv = document.getElementById("app");
render(<App />, appDiv);