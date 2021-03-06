import React from 'react';
import App, { Container } from 'next/app';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import firebase from 'firebase/app';
import 'firebase/messaging';

import initStore from '../src/store';

const theme = {
  grey: '#343434',
  lightgrey: '#cccccc',
  lightblue: '#94DCF2',
};

const GlobalStyle = createGlobalStyle`
  @import url('/static/react-datepicker.min.css');
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

class EnhancedApp extends App {
  static async getInitialProps({ Component, ctx }) {
    return {
      pageProps: Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {},
    };
  }

  componentDidMount() {
    navigator.serviceWorker
      .register('/static/service-worker.js')
      .then(registration => {
        firebase.messaging().useServiceWorker(registration);
        firebase.messaging().onMessage(function(payload) {
          registration.showNotification('Google Keep', payload.notification);
        });
      });
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
