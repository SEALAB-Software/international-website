import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import classNames from 'classnames';
import styles from './Livestream.module.scss';
// import { ReactComponent as LivestreamIcon } from '../../../images/sealabIcons/livestream_play.svg';
import LivestreamPlayIcon from '../../img/icon-livestream-play.inline.svg';
import PreviewImage from '../../img/seagull_south_east_crop.jpg';
import './_react-player.scss';

const Livestream = () => {
  const [playerKey, setPlayerKey] = useState(null);
  const siteUID = process.env.GATSBY_UID;

  function buildStreamUri(user, passwd, host, port, app, stream) {
    return `https://${user}:${passwd}@${host}:${port}/${app}/${stream}.stream_overlay/playlist.m3u8`;
  }

  return (
    <ReactPlayer
      key={playerKey}
      className={classNames('react-player', styles.video)}
      url={buildStreamUri(
        'sealab',
        'teamgaeff',
        'cdn.sealab.no',
        '1936',
        'bluethink-go',
        siteUID,
      )}
      light={PreviewImage}
      playing
      muted
      controls
      width="100%"
      height="100%"
      playIcon={<LivestreamPlayIcon />}
      onError={(err, errorDetails) => {
        try {
          if (errorDetails.fatal) setPlayerKey(playerKey + 1);
        } catch (error) {
          console.error(error);
        }
      }}
    />
  );
};

export default Livestream;
