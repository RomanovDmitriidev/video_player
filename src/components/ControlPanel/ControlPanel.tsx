import React from 'react';
import styles from './ControlPanel.module.scss';

import PlayPauseButton from '../buttons/PlayPauseButton/PlayPauseButton';
import FullscreenButton from '../buttons/FullscreenButton/FullscreenButton';
import VolumeControls from '../VolumeControls/VolumeControls';
import QualitySelect from '../buttons/QualitySelect/QualitySelect';
import ProgressControl from '../ProgressControl/ProgressControl';

import { getHlsLevels } from '../../utils/hlsManager';

interface Props {
  isControlsVisible: boolean;
}

const ControlPanel: React.FC<Props> = ({ isControlsVisible }) => {
  const levels = getHlsLevels();

  return (
    <div className={`${styles.controls} ${!isControlsVisible ? styles.hidden : ''}`}>
      <PlayPauseButton />
      <ProgressControl />
      <VolumeControls />

      {levels.length > 0 && <QualitySelect />}
      <FullscreenButton />
    </div>
  );
};

export default ControlPanel;
