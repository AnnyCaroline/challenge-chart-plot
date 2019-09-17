import React, { Component } from 'react';

import GlobalStyle from './styles/global';

import Main from './components/Main/';

export default class App extends Component {
  render() {
    return (
      <>
        <GlobalStyle />
        <Main
          offSetTop={100}
          offSetBottom={100}
          offSetLeft={100}
          offSetRight={100}
        />
      </>
    );
  }
}
