import React, { Component } from "react";
import './Counter.css';

import Display from "./Display";

import ButtonsPanel from "./ButtonsPanel";

// import Clock from './Clock';
import ClockFunctional from './ClockFunctional';

// KOMPONENT KLASOWY- ma zawierać metodę render, a w niej return z kodem 
// metoda super wywołuje konstruktor w klasie z której dziedziczymy, a którą rozszeżamy. Czyli tu wywoła konstruktor w klasie Component.

class Counter extends Component {

    constructor(props) {
        super(props);

        this.state = {
            counterValue: this.props.initValue,
            showClock: true,
        };
        // Binding needed if this.changeValue is ES5 method. Sposób na reczne dodanie kontekstu this do funkcji niestrzałeczkowej:
        // this.changeValue = this.changeValue.bind(this);
    }

    // changeValue() {  ES5 method (no this context by default)
    changeValue = (action) => {   // ES6 method

        // przekazanie funkcji,która zwróci nam obiekt zawierający stan aktualnego obiektu. prevState jest obiektem poprzedniego stanu, czyli tego przed tą zmianą, którą właśnie wykonujemy
        this.setState((prevState, prevProps) => {

            let currentCounterValue = prevState.counterValue;

            if (action === 'add') {
                currentCounterValue += 1;
            } else if (action === 'reinit') {
                currentCounterValue = prevProps.initValue;
            } else {
                currentCounterValue = 0;
            }

            return ({
                counterValue: currentCounterValue
            });
        })


        // uproszczony zapis ustawiania stanu, który przekazuje obiekt, bez uzycia funkcji strzałkowej:
        // this.setState({
        //     counterValue: currentCounterValue
        // })


        // this.setState((prevState) => {
        //     return ({
        //         counterValue: prevState.counterValue + 1
        //     });
        // })

        /*    this.setState({
               // przekazanie bezpośrednio obiektu:
               counterValue: this.state.counterValue + 1
           }) */


        // console.log('changeValue clicked!');
    }

    toggleClock = () => {
        this.setState((prevState) => {
            return ({
                showClock: !prevState.showClock
            });
        })
    }

    render() {

        let clockElement = '';

        if (this.state.showClock) {
            // clockElement = <Clock toggleClockMethod ={this.toggleClock}/>;
            clockElement = <ClockFunctional toggleClockMethod={this.toggleClock} />;
        } else {
            clockElement = <span onClick={this.toggleClock} className="show-clock">show clock</span>
        }

        return (
                <div className="counter">
                    Counter:
                    <Display displayValue={this.state.counterValue} />
                    <ButtonsPanel buttonMethod={this.changeValue} />
                    {clockElement}
                </div>
        );
    }
}

export default Counter;


// KOMPONENT FUNKCYJNY - to funkcja która ma zawierać return z kodem JSX
/* function Counter(props) {

    let randomNumber = Math.floor(Math.random() * (108 - 1 +1) +1);
    
    return (
        <div className="counter">
        Counter:
        <span className="value">
            {props.initValue}
        </span>
    </div>
    );
}

export default Counter; */