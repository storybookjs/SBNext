
import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import InboxIcon from 'material-ui-icons/Assignment';
import DraftsIcon from 'material-ui-icons/Drafts';
import DeveloperBoardIcon from 'material-ui-icons/DeveloperBoard';
import DescriptionIcon from 'material-ui-icons/Description';
import BubbleChartIcon from 'material-ui-icons/BubbleChart';
import AnnouncementIcon from 'material-ui-icons/Announcement';
import AddonIcon from 'material-ui-icons/ChromeReaderMode';

export const mailFolderListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <DeveloperBoardIcon />
      </ListItemIcon>
      <ListItemText primary="Components" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <DescriptionIcon />
      </ListItemIcon>
      <ListItemText primary="Documentation" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <BubbleChartIcon />
      </ListItemIcon>
      <ListItemText primary="Designs" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AnnouncementIcon />
      </ListItemIcon>
      <ListItemText primary="Issues" />
    </ListItem>
  </div>
);

export const otherMailFolderListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <AddonIcon />
      </ListItemIcon>
      <ListItemText primary="Panel addon 1" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AddonIcon />
      </ListItemIcon>
      <ListItemText primary="Panel addon 2" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AddonIcon />
      </ListItemIcon>
      <ListItemText primary="Panel addon 3" />
    </ListItem>
  </div>
);
