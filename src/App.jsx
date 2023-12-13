import './styles/base.scss'
import './styles/app.scss'
import { useState } from 'react'
import Calculator from './components/Calculator'
import Tracker from './components/Tracker'

import logo from './assets/logo.png'
import background from './assets/background.png'

function App() {
    const [tab, setTab] = useState('calc')

    const tabClick = (e) => {
        const tabs = document.getElementsByClassName('Tab')
        for (let i of tabs) {
            i.classList.remove('Active')
        }
        e.target.classList.add('Active')
        setTab(e.target.id)
    }

    return (
        <div className="App">
            <img className='AppBackground' src={background} alt="background" />
            <div className='AppLogo'>
                <img src={logo} alt="logo" />
            </div>
            <div className='Tabs'>
                <div className='Tab Active' id='calc' onClick={tabClick}>КАЛЬКУЛЯТОР</div>
                <div className='Tab' id='track' onClick={tabClick}>ОТСЛЕЖИВАНИЕ</div>
            </div>
            {tab === 'calc' ?
                <Calculator />
                : tab === 'track' &&
                <Tracker />
            }
        </div>
    );
}

export default App;
