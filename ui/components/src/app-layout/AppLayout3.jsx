import React, { Component } from 'react';

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

import Page from '@atlaskit/page';

import SearchDrawer from './SearchDrawer.jsx';
import CreateDrawer from './CreateDrawer.jsx';

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

export const asChildren = obj =>
  Object.keys(obj).map(
    key =>
      Array.isArray(obj[key])
        ? {
            text: key,
            examples: obj[key],
          }
        : {
            text: key,
            children: obj[key] ? asChildren(obj[key]) : [],
          }
  );

export const examplesToStack = examples =>
  asChildren(
    examples.reduce((acc, [key, value]) => {
      const p = key.split('/').filter(i => !i.match(/\./));
      setOnPath(acc, p, value.examples);

      return acc;
    }, {})
  );

export default class NavigationPanel extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    return { stack: [examplesToStack(nextProps.examples)] };
  }

  constructor(props: {}) {
    super(props);

    this.state = {
      containerThemeName: 'container',
      globalThemeName: 'dark',
      isOpen: true,
      openDrawer: false,
      width: 304,

      stack: [
        [
          {
            text: 'Category 1',
            children: [
              {
                text: 'Component A',
                children: [
                  {
                    text: 'bar',
                  },
                ],
              },
            ],
          },
          {
            text: 'Category 2',
            subText: 'the best category',
            children: [
              {
                text: 'Component B',
                children: [
                  {
                    text: 'bar',
                  },
                ],
              },
            ],
          },
        ],
      ],
    };
  }

  stackPush = (item: any) => {
    const stack = [...this.state.stack, item];
    this.setState({ stack });
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

  renderItem = (item: any) => {
    const onClick = item.children && (() => this.stackPush(item.children));

    return <AkNavigationItem {...item} onClick={onClick} key={item.title} />;
  };

  renderStack = () => this.state.stack.map(page => page.map(item => this.renderItem(item)));
  openSearchDrawer = () => this.setState({ openDrawer: 'searchDrawer' });
  openCreateDrawer = () => this.setState({ openDrawer: 'createDrawer' });
  closeDrawer = () => this.setState({ openDrawer: false });

  handleResize = (pr: { isOpen: boolean, width: number }) => this.setState(pr);
  toggleNavCollapse = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    const {
      isOpen,
      openDrawer,
      compactItems,
      showIcon,
      width,
      globalThemeName,
      containerThemeName,
    } = this.state;

    const { children } = this.props;

    return (
      <Page
        navigation={
          <Navigation
            isOpen={isOpen}
            width={width}
            onResize={this.handleResize}
            containerHeaderComponent={this.renderHeader}
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
              <AkGlobalItem>
                <Tooltip key="1" position="right" content="Let's Search">
                  <CreateIcon label="other" />
                </Tooltip>
              </AkGlobalItem>,
              <AkGlobalItem>
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
            <AkContainerNavigationNested
              stack={this.renderStack()}
              onAnimationEnd={(...args) => console.log('animation end', args)}
            />
          </Navigation>
        }
      >
        {children}
      </Page>
    );
  }
}
