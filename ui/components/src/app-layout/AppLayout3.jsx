import React, { Component, Fragment } from 'react';

import Navigation, {
  AkContainerNavigationNested,
  AkContainerTitle,
  AkCreateDrawer,
  AkNavigationItem,
  AkNavigationItemGroup,
  AkGlobalNavigation,
  AkSearch,
  AkGlobalItem,
  AkSearchDrawer,
  presetThemes,
} from '@atlaskit/navigation';
import Tooltip from '@atlaskit/tooltip';
import SearchIcon from '@atlaskit/icon/glyph/search';
import CreateIcon from '@atlaskit/icon/glyph/add';
import TableTree from '@atlaskit/table-tree';

import Page from '@atlaskit/page';

import SearchDrawer from './SearchDrawer.jsx';
import CreateDrawer from './CreateDrawer.jsx';
import Content from './Content.jsx';
import Preview from '../preview/Preview.jsx';

export const setOnPath = (obj, keyList, value) => {
  const [head, ...tail] = keyList;

  if (tail.length === 0) {
    obj[head] = value;
  } else if (obj[head]) {
    obj[head] = Object.assign(obj[head], setOnPath(obj[head], tail, value));
  } else {
    obj[head] = setOnPath({}, tail, value);
  }
  return obj;
};

export const asChildren = (obj, p = []) =>
  Object.keys(obj).map(
    key =>
      obj[key] && obj[key].examples
        ? {
            text: key,
            key: p.concat(key).join('/'),
            value: obj[key],
          }
        : {
            text: key,
            key: p.concat(key).join('/'),
            children: obj[key] ? asChildren(obj[key], p.concat(key)) : [],
          }
  );

export const examplesToStack = examples =>
  asChildren(
    examples.reduce((acc, [key, value]) => {
      const p = key.split('/').filter(i => !i.match(/\./));
      setOnPath(acc, p, { key, ...value });

      return acc;
    }, {})
  );

export const AppContext = React.createContext();

export class MyGoldenPanel extends React.Component {
  state = {
    value: this.props.value || "bla"
  };
  setValue = e => {
    this.setState({ value: e.target.value });
  };

  setContainerTitle = () => {
    this.props.glContainer.setTitle(this.state.value);
  };

  render() {
    return (
      <div>
        <p>This is my panel</p>
        <input type="text" value={this.state.value} onChange={this.setValue} />
        <button onClick={this.setContainerTitle}>set title</button>
        <AppContext.Consumer>
          {value => {
            return <div>Context value: <pre>{JSON.stringify(value, null, 2)}</pre></div>;
          }}
        </AppContext.Consumer>
      </div>
    );
  }
}

export class MyGoldenPreview extends React.Component {
  state = {
    value: this.props.value || "bla"
  };
  setValue = e => {
    this.setState({ value: e.target.value });
  };

  setContainerTitle = () => {
    this.props.glContainer.setTitle(this.state.value);
  };

  render() {
    return (
      <AppContext.Consumer>
        {value => {
          return <Preview url={`http://localhost:1337/${value.selected}.html`} />;
        }}
      </AppContext.Consumer>
    );
  }
}

export default class NavigationPanel extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    let selected;
    const { examples = [] } = nextProps;
    const { selected: prevSelected } = prevState;

    if (examples.length === 0) {
      // there are no examples
      selected = undefined;
    } else if (prevSelected && examples.find(([key]) => key === prevSelected[0])) {
      // previous selected still exists
      [selected] = prevSelected;
    } else {
      // just pick the first example
      [[selected]] = examples;
    }
    return { stack: [examplesToStack(nextProps.examples)], selected };
  }

  constructor(props: {}) {
    super(props);

    this.state = {
      containerThemeName: 'container',
      globalThemeName: 'dark',
      isOpen: true,
      openDrawer: false,
      selected: undefined,
      panel: 'navigator',
      width: 304,

      stack: [],
    };
  }

  stackPush = item => {
    const stack = [...this.state.stack, item];
    this.setState({ stack });
  };
  select = selected => {
    this.setState({ selected });
  };

  stackPop = () => {
    if (this.state.stack.length > 1) {
      const stack = this.state.stack.slice(0, this.state.stack.length - 1);
      this.setState({ stack });
    }
  };

  renderBackButton() {
    return <AkNavigationItem onClick={this.stackPop} text="Back" key="Back" />;
  }

  renderHeader = () => {
    const items = [];

    if (this.state.stack.length > 1) {
      items.push(this.renderBackButton());
    }

    return items;
  };

  renderItem = item => {
    const onClick = () => {
      if (item.children) {
        this.stackPush(item.children);
      } else if (item.value.key) {
        this.select(item.value.key);
      }
    };

    return <AkNavigationItem {...item} onClick={onClick} key={item.key} />;
  };

  renderStack = () => this.state.stack.map(page => page.map(item => this.renderItem(item)));
  openSearchDrawer = () => this.setState({ openDrawer: 'searchDrawer' });
  openCreateDrawer = () => this.setState({ openDrawer: 'createDrawer' });
  closeDrawer = () => this.setState({ openDrawer: false });

  handleResize = pr => this.setState(pr);
  toggleNavCollapse = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    const {
      isOpen,
      openDrawer,
      width,
      globalThemeName,
      containerThemeName,
      selected,
      panel,
    } = this.state;

    const { children } = this.props;

    const Navigator = () => (
      <AkContainerNavigationNested
        stack={this.renderStack()}
        onAnimationEnd={(...args) => console.log('animation end', args)}
      />
    );

    const Other = () => (
      <Fragment>
        <AkNavigationItemGroup title="All Nav Item Options">
          <AkNavigationItem icon={<CreateIcon label="La la" />} text="Auto focused item" />
          <AkNavigationItem icon={<CreateIcon label="La la" />} text="Basic Item" />
        </AkNavigationItemGroup>
        <TableTree
          columns={[({ title }) => <span>{title}</span>, ({ title }) => <span>{title}</span>]}
          columnWidths={['200px', '200px']}
          items={() => [['a', 1], ['b', 2], ['c', 3]]}
        />
      </Fragment>
    );

    return (
      <Page
        navigation={
          <Navigation
            containerHeaderComponent={() => (
              <Tooltip key="1" position="right" content="Header tooltip text">
                <AkContainerTitle icon={<CreateIcon label="Bla" />} text={panel} />
              </Tooltip>
            )}
            isOpen={isOpen}
            width={width}
            onResize={this.handleResize}
            globalTheme={presetThemes[globalThemeName]}
            containerTheme={presetThemes[containerThemeName]}
            globalPrimaryActions={[
              <AkGlobalItem onClick={this.openSearchDrawer}>
                <Tooltip key="1" position="right" content="Let's Search">
                  <SearchIcon label="search" />
                </Tooltip>
              </AkGlobalItem>,
              <AkGlobalItem onClick={this.openCreateDrawer}>
                <Tooltip key="1" position="right" content="Create Stuff">
                  <CreateIcon label="search" />
                </Tooltip>
              </AkGlobalItem>,
            ]}
            globalSecondaryActions={[
              <AkGlobalItem onClick={() => this.setState({ panel: 'navigator' })}>
                <Tooltip key="1" position="right" content="Let's Search">
                  <CreateIcon label="other" />
                </Tooltip>
              </AkGlobalItem>,
              <AkGlobalItem onClick={() => this.setState({ panel: 'other' })}>
                <Tooltip key="1" position="right" content="Create Stuff">
                  <CreateIcon label="other" />
                </Tooltip>
              </AkGlobalItem>,
            ]}
            onSearchDrawerOpen={this.openSearchDrawer}
            onCreateDrawerOpen={this.openCreateDrawer}
            drawers={[
              <SearchDrawer
                drawerIsOpen={openDrawer === 'searchDrawer'}
                closeDrawer={this.closeDrawer}
              />,
              <CreateDrawer
                drawerIsOpen={openDrawer === 'createDrawer'}
                closeDrawer={this.closeDrawer}
              />,
            ]}
          >
            {panel === 'navigator' ? <Navigator /> : null}
            {panel === 'other' ? <Other /> : null}
          </Navigation>
        }
      >
      <AppContext.Provider value={this.state}>
        {selected ? (
          <div style={{ width: '100%', height: '100%', overflow: 'auto' }}>
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
  
            <Content
             //config from simple react example: https://golden-layout.com/examples/#qZXEyv
             htmlAttrs={{ style: { height: '100%', width: '100%' } }}
             config={{
               content: [
                 {
                   type: 'row',
                   content: [
                     {
                       title: 'A react component',
                       type: 'react-component',
                       component: 'testItem',
                       props: { value: "I'm on the left" },
                     },
                     {
                       title: 'Another react component',
                       type: 'react-component',
                       component: 'preview',
                     },
                   ],
                 },
               ],
             }}
             registerComponents={myLayout => {
               myLayout.registerComponent('preview', MyGoldenPreview)
               myLayout.registerComponent('testItem', MyGoldenPanel);
             }} />
             
          </div>
        ) : (
          'loading...'
        )}
        </AppContext.Provider>
      </Page>
    );
  }
}
