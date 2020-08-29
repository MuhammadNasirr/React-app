import React, { Component } from 'react'
import { AcUnit } from '@material-ui/icons'
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../../../styles/main';


class DepositCard extends Component {
  state = { isVisible: true }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.depositCard}
        onClick={() => { this.props.history.push(this.props.config.goto) }}>
        <AcUnit className={classes.depositIcon} />
        <div className={classes.depositText} >
          <p>{this.props.meta.title}</p>
          <p>{this.props.meta.descr}</p>
        </div>
      </div>
    )
  }
}

export default withRouter(withStyles(styles)(DepositCard))