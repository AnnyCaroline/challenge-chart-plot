import React, { Component } from 'react';

import GlobalStyle from './styles/global';

import Main from './components/Main/';

export default class App extends Component {
  render() {
    return (
      <>
        <GlobalStyle />
        <Main
          offSetTop={0}
          offSetBottom={0}
          offSetLeft={0}
          offSetRight={0}
        />
      </>
    );
  }
}
