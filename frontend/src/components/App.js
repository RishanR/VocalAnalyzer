import React from 'react'
import { render } from 'react-dom'
import '../css/App.css'
import ChooseSong from './ChooseSong'
import RecordVocals from './RecordVocals'
import RecordVocalsNew from './RecordVocalsNew'
import Analyzer from './Analyzer'
import regeneratorRuntime from "regenerator-runtime";
import "regenerator-runtime/runtime.js";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const App = () => {
    return (
        <Router>
            <div className='main-container'>
                <h1 className='heading-text'>Voice Analyzer</h1>
                <Switch>
                    <Route exact path='/analyze' component={Analyzer} />
                    <Route exact path='/record' component={RecordVocals} />
                    <Route exact path='/' component={ChooseSong}  />
                </Switch>
            </div>
        </Router>
    )
}

export default App;

const appDiv = document.getElementById("app");
render(<App />, appDiv);