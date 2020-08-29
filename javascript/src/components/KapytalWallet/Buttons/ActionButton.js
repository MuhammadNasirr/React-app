import React from 'react';
import { Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../../../styles/main';

class ActionButton extends React.Component {
  static defaulProps = {
    onClick: () => { },
    Icon: 'square',
    fullWidth: false,
    hint: 'undefined'
  }

  render() {
    const { classes } = this.props;
    return (
      <Button className={classes.ActionButton} size="large" fullWidth={this.props.fullWidth} variant="contained" onClick={this.props.onClick}>
        {this.props.Icon}
        {this.props.hint}
      </Button>
    )
  }
}
export default withStyles(styles)(ActionButton);
