import React from 'react';
import { LineChart, Line } from 'recharts';
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../../../styles/main';


class CurrencyCard extends React.Component {
  static defaultProps = { currency: 'DAI' }

  constructor(props) {
    super(props)
    this.state = {
      rate: 0, tick: 0, xchg: 0
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.currencyCard} style={Object.assign({ backgroundColor: this.props.color })}>
        <div style={{ margin: 0, flexDirection: 'column' }}>
          <p style={{ textAlign: 'start' }}>{this.props.currency}</p>
          <p style={{ textAlign: 'start' }}>{`$ ${this.state.rate}`}</p>
          <div style={{ margin: 0, display: "flex", justifyContent: 'space-between' }} >
            <p>{this.state.tick}</p>
            <p>{`${this.state.xchg} %`}</p>
          </div>
        </div>

        <LineChart width={120} height={100} data={[{ uv: 400 }, { uv: 300 }, { uv: 500 }, { uv: 700 }, { uv: 500 }, { uv: 500 }]}>
          <Line type="monotone" dataKey="uv" stroke="#ffffff" />
        </LineChart>
      </div>
    )
  }
}
export default withStyles(styles)(CurrencyCard)
