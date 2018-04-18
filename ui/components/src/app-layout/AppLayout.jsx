import React, { Component, Fragment } from 'react';
import glamorous from 'glamorous';
import Content from './Content.jsx';
import Test from '../test/Test.jsx';

const Wrapper = glamorous.div({
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  overflow: 'hidden',
  zIndex: 1,
});

const NavBar = glamorous.div({
  position: 'fixed',
  top: 0,
  bottom: 0,
  left: 0,
  width: 40,
  overflow: 'auto',
  zIndex: 5,

  background: 'silver',
});
const NavContent = glamorous.div(
  {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    width: 360,
    maxWidth: '100vw',
    overflow: 'auto',
    transform: 'translateX(0px)',
    zIndex: 4,
    borderLeft: '40px solid transparent',
    boxSizing: 'border-box',
    padding: 15,

    background: 'silver',
  },
  ({ expanded }) => ({
    transition: expanded
      ? 'transform .3s cubic-bezier(0.19, 1, 0.22, 1)'
      : 'transform .45s cubic-bezier(.5, 0, 0, 1)',
    transform: expanded ? 'translateX(0px)' : 'translateX(-360px)',
  })
);
const LeftBar = glamorous.div({
  position: 'fixed',
  top: 0,
  bottom: 0,
  left: 40,
  width: 360,
  zIndex: 3,
  background: 'rgba(0,0,0,0.2)',
  boxSizing: 'border-box',
  padding: 15,
});
const ContentPanel = glamorous.div({
  position: 'fixed',
  top: 0,
  bottom: 0,
  left: 400,
  right: 0,
  zIndex: 2,
  boxSizing: 'border-box',
  padding: 5,
});

class AppLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.toggleExpanded = () => this.setState({ expanded: !this.state.expanded });
  }
  render() {
    const { expanded } = this.state;
    const { children } = this.props;
    const { toggleExpanded } = this;

    return (
      <Wrapper>
        <link
          type="text/css"
          rel="stylesheet"
          href="https://rawgit.com/ndelangen/golden-layout/modern/src/css/goldenlayout-base.css"
        />
        <link
          type="text/css"
          rel="stylesheet"
          href="https://rawgit.com/ndelangen/golden-layout/modern/src/css/goldenlayout-light-theme.css"
        />

        <Test />
        <NavBar onClick={toggleExpanded} />
        <NavContent expanded={expanded}>nav content</NavContent>
        <LeftBar>Hello</LeftBar>
        <ContentPanel>
          <Content />
        </ContentPanel>
      </Wrapper>
    );
  }
}

export default AppLayout;
