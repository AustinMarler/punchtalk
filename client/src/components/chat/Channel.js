import React from 'react';

import ChannelSelectionList from './ChannelSelectionList'
import ChannelChatArea from './ChannelChatArea'
import ChannelUserList from './ChannelUserList'
import HeaderBar from '../HeaderBar';

function Channel (props) {
  return (
    <div id="channel-container" className="flex-column">
      <HeaderBar props={props} />

      <div id="channel-content" className="flex-row">
        <div className="channel-content-bar">
          <ChannelSelectionList />
        </div>

        <div id="channel-center">
          <ChannelChatArea />
        </div>

        <div className="channel-content-bar">
          <ChannelUserList />
        </div>
      </div>
    </div>
  )
}

export default Channel