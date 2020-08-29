import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import { MenuItem } from '@material-ui/core'
import { ChevronLeft, Person, Share } from "@material-ui/icons";
const styles = {
  kawNavbar: {
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: 'white'
  },
  kawNavbarItem: {
    padding: '1em'
  }
}

class KawNavbar extends Component {
  constructor(props) {
    super(props)
    this.state = { itemToRender: this.props.location.pathname === '/wallets' ? this.renderProfileButton : this.renderNavigateBack }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      if (this.props.location.pathname === "/wallets")
        this.setState({ itemToRender: this.renderProfileButton })
      else
        this.setState({ itemToRender: this.renderNavigateBack })
    }
  }

  actionNavigateBack = () => {
    this.props.history.goBack()
  }

  renderProfileButton = () => {
    return (
      <MenuItem style={styles['kawNavbarItem']}>
        <Person fontSize="large" />
      </MenuItem>
    )
  }

  renderNavigateBack = () => {
    return (
      <MenuItem style={styles['kawNavbarItem']} onClick={this.actionNavigateBack}>
        <ChevronLeft fontSize="large" style={{color:'#000'}} />
      </MenuItem>
    )
  }

  render() {
    return (
      <nav style={styles['kawNavbar']}>
        {this.state.itemToRender()}

        <MenuItem style={styles['kawNavbarItem']}>
          <Share fontSize="large" />
        </MenuItem>
      </nav>
    )
  }
}

export default withRouter(KawNavbar)