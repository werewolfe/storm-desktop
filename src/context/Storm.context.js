import React from 'react';

export const defaultValue = {
  data: {
    darkThemeIsActive: true,
    torrentsList: null,
    torrentSelected: null,
    torrentSearch: '',
    socket: null,
  },
  actions: {
    updateAppTheme: () => undefined,
    updateTorrentSelected: () => undefined,
    updateTorrentSearch: () => undefined,
    clearTorrentSelection: () => undefined,
  },
};

const StormContext = React.createContext(defaultValue);

export default StormContext;
