import React from 'react'
import { render } from 'react-dom'
import '../css/App.css'

const App = () => {
    return (
        <div className='main-container'>
           <button class="button">
                Upload
           </button>
        </div>
    )
}

export default App;

const appDiv = document.getElementById("app");
render(<App />, appDiv);

