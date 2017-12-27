import React, {Component, Fragment} from 'react';
import Router from 'next/router';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

import pink from 'material-ui/colors/pink';
import green from 'material-ui/colors/green';
import red from 'material-ui/colors/red';

import Layout from '../components/drawer';
import Hierarchy from '../components/hierarchy';
import Previews from '../components/previews';
import withRoot from '../components/withRoot';

const theme = createMuiTheme({
  palette: {
    primary: pink,
    secondary: {
      ...green,
      A400: '#00e677',
    },
    error: red,
  },
});

class Index extends Component {
  static getInitialProps () {
    return {};
  }

  go(id) {
    [...window.document.getElementsByTagName('iframe')]
      .map(el => el.contentWindow)
      .forEach(frame => frame.postMessage(id, 'http://localhost:1337'))
  }

  render () {
    const { url } = this.props

    return (
      <MuiThemeProvider theme={theme}>
      <div>
      <Layout
        head={null}
        aside={(
          <Hierarchy go={target => this.go(target)} />
        )}
        main={(
          <div>
            <iframe src="/preview-1" className='iframe1' />
            <iframe src="/preview-1" className='iframe2' />
          </div>          
        )}
      />
        <style>
          {`body {
            padding: 0;
            margin: 0;
            overflow: hidden;
          }`}
        </style>

        <style jsx>{`
          .iframe1 {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 300px;
            width: calc(40% - 300px);
            height: calc(100vh - 64px);
            margin: 0;
            border: 0 none;
            box-sizing: border-box;
            overflow: auto;
            box-shadow: inset 0 0 40vh rgba(0,0,0,0.2);
          }
          .iframe2 {
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
            width: calc(60% - 10px);
            height: calc(100vh - 64px);
            margin: 0;
            border: 0 none;
            box-sizing: border-box;
            overflow: auto;
            box-shadow: inset 0 0 40vh rgba(0,0,0,0.2);
          }
        `}</style>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default withRoot(Index);
