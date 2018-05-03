import AppLayout from '@sb/components/src/app-layout/AppLayout3.jsx';
import Preview from '@sb/components/src/preview/Preview.jsx';

import { registerComponent } from './src/registry';
import { MAIN_APP_LAYOUT, PREVIEW } from './src/keys';

registerComponent(MAIN_APP_LAYOUT, AppLayout);
registerComponent(PREVIEW, Preview);
