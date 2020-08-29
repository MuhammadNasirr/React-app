/* eslint-disable */
import React, { Component } from 'react';

import { withStyles } from '@material-ui/core';
import { orderStyle } from './styles';
import Select from 'react-select';

const customStyles = {
    control: base => ({
        ...base,
        minHeight: 70,
        backgroundColor: '#2f2449',
        color: 'white',
        border: 'none',
        '[type="text"]': {
            color: 'white'
        },
        marginTop: 6,
    }),
    option: (provided, state) => ({
        color: state.isSelected ? 'blue' : 'black',
        padding: 20
    }),
    dropdownIndicator: base => ({
        ...base,
        padding: 4,
        color: 'white',
    }),
    clearIndicator: base => ({
        ...base,
        padding: 4
    }),
    valueContainer: base => ({
        ...base,
        padding: '0px 6px'
    }),
    input: (base) => ({
        ...base,
        height: '68px',
        minHeight: '64px',
        color: '#ffffff',
        margin: 0,
        paddingTop: 20
    }),
    singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';
        const color = '#ffffff'
        return { ...provided, opacity, transition, color };
    }
}


class CustomSelect extends Component {

    state = {};

    componentDidMount() {
        const name = this.props.markets[0].name
        const selectedOption = [{ label: name, value: this.props.markets[0].base_unit }]
        // this.props.fetchDepth(name.replace('/', '').toLowerCase());
        this.setState({ selectedOption });
        this.props.fetchTickers(selectedOption[0].label.replace('/', '').toLowerCase())                     // Getting price value
        // this.fetchTickers()                 // fetch after every 60 sec
    }

    handleChange = selectedOption => {
        const market = selectedOption.label.replace('/', '').toLowerCase();
        const selectedMarket = this.props.markets.filter(x => x.name === selectedOption.label)[0]
        this.props.marketSelection(selectedOption.value)                                        // Selecting ask value
        this.props.setMarket(selectedMarket)
        this.props.fetchDepth(selectedMarket.id);                                                          // Getting asks and bid depths
        this.props.setBase(selectedMarket.quote_unit)                                             // Setting bid value
        // this.props.setFee(selectedMarket.ask_fee, selectedMarket.bid_fee)                       // Setting ask fee and bid fee
        this.props.setFee(0, 0);
        this.props.setPrecision(selectedMarket.amount_precision, selectedMarket.price_precision)     // Setting ask fee and bid fee
        this.props.fetchTickers(market)                                                         // Getting price value
        this.setState({ selectedOption });
    };

    render() {
        const { options } = this.props;
        const { selectedOption } = this.state;

        return (
            <Select
                value={selectedOption}
                onChange={this.handleChange.bind(this)}
                options={options}
                styles={customStyles}
            />
        );
    }
}

export default withStyles(orderStyle)(CustomSelect);
