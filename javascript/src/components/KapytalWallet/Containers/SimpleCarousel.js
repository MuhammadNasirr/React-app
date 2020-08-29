import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../../../styles/main';


class SimpleCarousel extends React.Component {

  render() {
    const { classes } = this.props;
    return (
      <div  className={classes.currencyContainer}>
        <div style={{ display: 'flex' }}>
          {this.props.elements()}
        </div>
      </div>
    )
  }
}
export default withStyles(styles)(SimpleCarousel)
