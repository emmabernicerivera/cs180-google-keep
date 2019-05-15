import React from 'react';
import App, { Container } from 'next/app';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

import initStore from '../src/store';

const theme = {
  grey: '#343434',
  lightgrey: '#cccccc',
  lightblue: '#94DCF2',
};

const GlobalStyle = createGlobalStyle`
  html {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  body, *:before, *:after {
    @import url('https://fonts.googleapis.com/css?family=Montserrat');
    font-family: 'Montserrat', sans-serif;
    margin: 0;
    -webkit-box-sizing: inherit;
    -moz-box-sizing: inherit;
    box-sizing: inherit;
  }
`;

// This is causing the ERROR FIXME EMMA --> margin: 0

class EnhancedApp extends App {
  static async getInitialProps({ Component, ctx }) {
    return {
      pageProps: Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {},
    };
  }

  // componentDidMount() {
  //   firebase.auth.onAu
  // }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Container>
        <GlobalStyle />
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </Provider>
      </Container>
    );
  }
}

export default withRedux(initStore)(EnhancedApp);
