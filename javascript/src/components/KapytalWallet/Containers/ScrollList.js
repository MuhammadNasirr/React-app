import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../../../styles/main';


class ScrollList extends React.Component {

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.scrollList}>
        <div className={classes.listContainer}>
          {this.props.elements()}
        </div>
      </div>
    )
  }
}
export default withStyles(styles)(ScrollList)

