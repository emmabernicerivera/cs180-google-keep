import React from 'react';
import App, { Container } from 'next/app';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

import initStore from '../src/store';

const theme = {
  grey: '#343434',
  lightgrey: '#cccccc',
};

const GlobalStyle = createGlobalStyle`
  * {
    @import url('https://fonts.googleapis.com/css?family=Montserrat');
    font-family: 'Montserrat', sans-serif;
  }
`;

class EnhancedApp extends App {
  static async getInitialProps({ Component, ctx }) {
    return {
      pageProps: Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {},
    };
  }

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
