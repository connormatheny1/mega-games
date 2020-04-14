import React from "react"
import ReactDOM from 'react-dom'
import "@blueprintjs/core/lib/css/blueprint.css"
import App from './App';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const AppContainer = () => (
    <Router>
        <App />
    </Router>
)

ReactDOM.render(<AppContainer />, document.querySelector('#root'))