import React from 'react';
import styles from './app-header-button.module.css';

export default  class AppHeaderButton extends React.Component<any, {}> {

  state = {
    className: 'pl-5 pr-5 pb-4 pt-4 ' + styles.button,
  }
  
  componentDidMount() {
    this.setState({
      ...this.state,
      className: this.state.className + ' ' + this.props.className + ' ' + (this.props.isActive ? styles.active : '')
    })
  }

  render(): React.ReactNode  {
    return (
      <button className={this.state.className}>
        {this.props.children}
      </button>
    )
  }
}
