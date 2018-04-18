import React, { Component } from 'react';

import ArrowLeft from '@atlaskit/icon/glyph/arrow-left';

import { AkSearchDrawer, AkNavigationItem, AkSearch } from '@atlaskit/navigation';

const items = ['cat', 'dog', 'fish', 'lizard'];

export default class SearchDrawer extends Component {
  state = {
    value: '',
  };

  render() {
    const { drawerIsOpen = false, closeDrawer = () => {} } = this.props;

    return (
      <AkSearchDrawer
        backIcon={<ArrowLeft label="Back" />}
        primaryIcon={null}
        isOpen={drawerIsOpen}
        onBackButton={closeDrawer}
      >
        <AkSearch
          onSearchClear={() => this.setState({ value: '' })}
          onInput={e => this.setState({ value: e.target.value })}
          value={this.state.value}
        >
          {items
            .filter(item => item.includes(this.state.value))
            .map(item => <AkNavigationItem key={item} text={item} />)}
        </AkSearch>
      </AkSearchDrawer>
    );
  }
}
