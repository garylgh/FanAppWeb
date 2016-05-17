import React from 'react';
import { createDevTools } from '../../node_modules/redux-devtools/lib/createDevTools.js';
import LogMonitor from '../../node_modules/redux-devtools-log-monitor/lib/LogMonitor.js';
import DockMonitor from '../../node_modules/redux-devtools-dock-monitor/lib/DockMonitor.js';

export default createDevTools(
    <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-w">
        <LogMonitor />
    </DockMonitor>
);
