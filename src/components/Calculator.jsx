import React, { useCallback, useEffect, useState } from "react";
import './../styles/calculator.scss'

import box from './../assets/box.png'
import arrow from './../assets/arrow.png'
import yuan from './../assets/yuan.png'
import ruble from './../assets/ruble.png'
import equal from './../assets/equal.png'
import { getYuan } from "../http/yuanAPI";

const Calculator = () => {
    const [isChoosing, setIsChoosing] = useState(false)
    const [isChosen, setIsChosen] = useState(false)
    const [type, setType] = useState()
    const [yuanCost, setYuanCost] = useState('')
    const [yuanCourse, setYuanCourse] = useState(0)
    const [totalCost, setTotalCost] = useState(0)
    const [comission, setComission] = useState(0)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchYuan()
    }, [])

    const chooseType = () => {
        const arrow = document.querySelector('.Arrow')
        const list = document.querySelector('.TypesList')
        if (isChoosing) {
            setIsChoosing(false)
            arrow.classList.remove('Active')
            list.classList.add('None')
        } else {
            setIsChoosing(true)
            arrow.classList.add('Active')
            list.classList.remove('None')
        }
    }

    const chooseTypeItem = (e) => {
        const items = document.getElementsByClassName('TypeItem')
        for (let i of items) {
            i.classList.remove('Active')
        }
        e.target.classList.add('Active')
        setIsChoosing(false)
        document.querySelector('.TypesList').classList.add('None')
        document.querySelector('.Arrow').classList.remove('Active')
        document.querySelector('.Type').classList.add('Active')
        document.querySelector('.TypeText').innerHTML = `${e.target.innerText}`
        setIsChosen(true)
        setType(e.target.id)
    }

    const calculateCost = useCallback((e) => {
        if (!yuanCourse.course) {
            setLoading(true)
        } else {
            setLoading(false)
        }
        let cleanedCost = ''
        if (e.target) {
            cleanedCost = e.target.value.replace(/\D/g, '')
        } else {
            cleanedCost = e.replace(/\D/g, '')
        }
        setYuanCost(cleanedCost)
        if (cleanedCost > 0) {
            let totalcost = 0
            if (type === 'item1' && yuanCourse.course) {
                if (Number(cleanedCost) <= 400) {
                    totalcost = Number(yuanCourse.course) * Number(cleanedCost) * 1.05 + 1250 + 500 
                    setComission(499)
                }
                else {
                    totalcost = Number(yuanCourse.course) * Number(cleanedCost) * 1.05 + 1250 + 750
                    setComission(999)
                }
            }
            if (type === 'item2' && yuanCourse.course) {
                if (Number(cleanedCost) <= 400) {
                    totalcost = Number(yuanCourse.course) * Number(cleanedCost) * 1.05 + 900 + 500
                    setComission(499)
                }
                else {
                    totalcost = Number(yuanCourse.course) * Number(cleanedCost) * 1.05 + 900 + 750
                    setComission(999)
                }
            }
            if (type === 'item3' && yuanCourse.course) {
                if (Number(cleanedCost) <= 400) {
                    totalcost = Number(yuanCourse.course) * Number(cleanedCost) * 1.05 + 300 + 500
                    setComission(499)
                }
                else {
                    totalcost = Number(yuanCourse.course) * Number(cleanedCost) * 1.05 + 300 + 750
                    setComission(999)
                }
            }
            if (type === 'item4' && yuanCourse.course) {
                if (Number(cleanedCost) <= 400) {
                    totalcost = Number(yuanCourse.course) * Number(cleanedCost) * 1.05  + 500 + 500
                    setComission(499)
                }
                else {
                    totalcost = Number(yuanCourse.course) * Number(cleanedCost) * 1.05 + 500 + 750
                    setComission(999)
                }
            }
            setTotalCost(Math.ceil(totalcost))
        } else {
            setTotalCost(0)
            setComission(0)
        }
        if (cleanedCost.length > 0 && Number(cleanedCost) < 99) {
            document.querySelector('.Sale').classList.remove('None')
        } else {
            document.querySelector('.Sale').classList.add('None')
        }
    }, [yuanCourse, type])

    const fetchYuan = async () => {
        try {
            getYuan().then((data) => setYuanCourse(data))
        } catch (e) {

        }
    }

    useEffect(() => {
        const input = document.getElementById('costinput')
        if (input) {
            input.value && calculateCost(input.value)
        }
    }, [yuanCourse, calculateCost])

    return (
        <div className="CalculatorContainer">
            <div className="Type" onClick={chooseType}>
                <div className="BoxImgContainer">
                    <img src={box} alt="box" />
                </div>
                <div className="TypeTextContainer">
                    <div className="TypeText">Выберите вид посылки</div>
                    <img className="Arrow" src={arrow} alt="arrow" />
                </div>
            </div>
            <div className="TypesList None">
                <div className="TypeItem ItemFirst" id="item1" onClick={chooseTypeItem}>
                    <div className="ItemText" id="item1">Кроссовки</div>
                    <div className="CircleContainer" id="item1">
                        <div className="ItemCircle" id="item1"></div>
                    </div>
                </div>
                <div className="TypeItem" id="item2" onClick={chooseTypeItem}>
                    <div className="ItemText" id="item2">Куртки</div>
                    <div className="CircleContainer" id="item2">
                        <div className="ItemCircle" id="item2"></div>
                    </div>
                </div>
                <div className="TypeItem" id="item3" onClick={chooseTypeItem}>
                    <div className="ItemText" id="item3">Футболки</div>
                    <div className="CircleContainer" id="item3">
                        <div className="ItemCircle" id="item3"></div>
                    </div>
                </div>
                <div className="TypeItem ItemLast" id="item4" onClick={chooseTypeItem}>
                    <div className="ItemText" id="item2">Брюки, кофты</div>
                    <div className="CircleContainer" id="item2">
                        <div className="ItemCircle" id="item2"></div>
                    </div>
                </div>
            </div>
            {isChosen &&
                <>
                    <div className="TotalCostContainer">
                        <div className="CostContainer Yuan">
                            <div className="CostSimbol">
                                <img src={yuan} alt="yuan" />
                            </div>
                            <input className="CostInput" id="costinput" type="text" placeholder="Цена в юанях" value={yuanCost} onChange={calculateCost} />
                        </div>
                        <div className="EqualSimbol">
                            <img src={equal} alt="equal" />
                        </div>
                        <div className="CostContainer Ruble">
                            <div className="CostSimbol">
                                <img src={ruble} alt="ruble" />
                            </div>
                            {loading ?
                                <div className="Loading">
                                    <span className="LoaderCalc"></span>
                                </div>
                                :
                                <div className="CostInput RubleCost">{totalCost}{comission !== 0 && <span>&nbsp;(Включая нашу комиссию и доставку   )</span>}</div>
                            }
                        </div>
                    </div>
                    <div className="Sale None"></div>
                </>
            }
            <div className="ShipNew">
                <a className="ShipLink" href="https://vk.com/im?sel=416973551" target="_blank" rel="noreferrer">Оформить новый заказ</a>
            </div>
        </div>
    );
}
 
export default Calculator;