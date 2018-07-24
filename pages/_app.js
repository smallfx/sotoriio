import React from 'react';
import App, {Container} from 'next/app';

import {createStore} from "redux";
import { Provider } from 'react-redux';
import withRedux from "next-redux-wrapper";
import reducer from '../reducer';

import styled, { injectGlobal } from 'styled-components';
import reset from 'styled-reset';

import Header from '../components/Header';

const baseStyles = () => injectGlobal`
  ${ reset }
  * {
    box-sizing: border-box;
    font-family: "Work Sans", sans-serif !important;
  }
`;

const makeStore = (initState, options) => {
    return createStore(
      reducer,
      initState,
      (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__)
       ? window.__REDUX_DEVTOOLS_EXTENSION__() : undefined
    );
};

class NextApp extends App {
  constructor() {
    super();
    this.state = { show: false };
  }
  
  componentDidMount() {
    this.setState({ show: true });
  }

  render() {
    const {Component, pageProps, store} = this.props;

    baseStyles();

    return (
      <Container>
        <Provider store={store}>
          <div>
            <Header />
            <Component {...pageProps} />
          </div>
        </Provider>
      </Container>
    );
  }
};

export default withRedux(makeStore)(NextApp);
