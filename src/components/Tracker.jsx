import React, { useState } from "react";
import './../styles/tracker.scss'

import loop from './../assets/loop.png'
import { getOrder } from "../http/orderAPI";

const Tracker = () => {
    const [trackNumber, setTrackNumber] = useState('')
    const [status, setStatus] = useState(0)
    const [loading, setLoading] = useState(false)

    const changeTrackNumber = (e) => {
        if (!status) {
            setLoading(true)
        } else {
            setLoading(false)
        }
        if (e.target.value.length <= 20) setTrackNumber(e.target.value)
        if (e.target.value.length > 0) {
            document.querySelector('.TrackInputContainer').classList.add('Active')
        } else {
            document.querySelector('.TrackInputContainer').classList.remove('Active')
        }
        fetchOrder(e.target.value)
    }

    const fetchOrder = async (track) => {
        try {
            setLoading(true)
            setStatus(-1)
            await getOrder(track).then((data) => {
                if (data) {
                    setStatus(Number(data))
                    setLoading(false)
                }
                else {
                    setStatus(0)
                    setLoading(false)
                }
            })
        } catch (e) {

        }
    }

    return (
        <div className="TrackerContainer">
            <div className="TrackInputContainer ">
                <div className="TrackSimbol">
                    <img src={loop} alt="ruble" />
                </div>
                <input className="TrackInput" type="text" placeholder="Поиск заказов..." value={trackNumber} onChange={changeTrackNumber} />
            </div>
            {trackNumber.length > 0 &&
                <div className="SearchContainer">
                    <div className="SearchSub">
                        <div className="SearchText">Трек-номер</div>
                        <div className="SearchNumber">#{trackNumber}</div>
                    </div>
                    <div className="SearchLine"></div>
                    {loading &&
                        <div className="LoadingTrack">
                            <span className="LoaderTrack"></span>
                        </div>
                    }
                    {status === 0 &&
                        <div className="NotFound">
                            Заказ не найден
                        </div>
                    }
                    {status > 0 &&
                        <div className={`StatusItem ${status === 1 ? 'Active' : ''}`} id="status1">
                            <div className="StatusCircle"></div>
                            <div className="StatusText">Выкуплен, ожидается на складе в Китае</div>
                        </div>
                    }
                    {status > 1 &&
                        <div className={`StatusItem ${status === 2 ? 'Active' : ''}`} id="status2">
                            <div className="StatusCircle"></div>
                            <div className="StatusText">Принят на складе в Китае</div>
                        </div>
                    }
                    {status > 2 &&
                        <div className={`StatusItem ${status === 3 ? 'Active' : ''}`} id="status3">
                            <div className="StatusCircle"></div>
                            <div className="StatusText">Заказ едет в Москву</div>
                        </div>
                    }
                    {status > 3 &&
                        <div className={`StatusItem ${status === 4 ? 'Active' : ''}`} id="status4">
                            <div className="StatusCircle"></div>
                            <div className="StatusText">Прибыл на склад в Москве</div>
                        </div>
                    }
                    {status > 4 && 
                        <div className={`StatusItem ${status === 5 ? 'Active' : ''}`} id="status5">
                            <div className="StatusCircle"></div>
                            <div className="StatusText">Передано в CDEK / Самовывоз</div>
                        </div>
                    }
                    {status > 5 &&
                        <div className={`StatusItem ${status === 6 ? 'Active' : ''}`} id="status6">
                            <div className="StatusCircle"></div>
                            <div className="StatusText">Получен клиентом</div>
                        </div>
                    }
                </div>
            }
        </div>
    );
}
 
export default Tracker;