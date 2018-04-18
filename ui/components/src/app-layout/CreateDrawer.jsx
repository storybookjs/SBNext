import React from 'react';
import ArrowLeft from '@atlaskit/icon/glyph/arrow-left';

import Navigation, {
  AkContainerNavigationNested,
  AkContainerTitle,
  AkCreateDrawer,
  AkNavigationItem,
  AkNavigationItemGroup,
  AkSearch,
  AkSearchDrawer,
  presetThemes,
} from '@atlaskit/navigation';

const CreateDrawer = ({
  drawerIsOpen,
  closeDrawer,
}: {
  drawerIsOpen: boolean,
  closeDrawer: () => mixed,
}) => (
  <AkCreateDrawer
    backIcon={<ArrowLeft label="Back" />}
    isOpen={drawerIsOpen}
    onBackButton={closeDrawer}
    primaryIcon={null}
    header="Welcome to a create drawer"
  >
    Some Content
  </AkCreateDrawer>
);

export default CreateDrawer;
