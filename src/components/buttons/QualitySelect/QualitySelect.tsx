import React, { useEffect, useState } from 'react';
import { Select, MenuItem } from '@mui/material';
import { DEFAULT_QUALITY } from '../../../utils/constants';
import { getHlsLevels, getSelectedQuality, setQuality } from '../../../utils/hlsManager';
import type { Level } from 'hls.js';
import { useVideo } from '../../../context/VideoElementContext';

const QualitySelect: React.FC = () => {
  const { containerRef } = useVideo();
  const [levels, setLevels] = useState<Level[]>([]);
  const [selectedQuality, setSelectedQuality] = useState<number>(DEFAULT_QUALITY);

  useEffect(() => {
    setLevels(getHlsLevels());
    setSelectedQuality(getSelectedQuality());
  }, []);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const level = Number(event.target.value);
    setSelectedQuality(level);
    setQuality(level);
  };

  return (
    <Select
      value={String(selectedQuality)}
      onChange={handleChange}
      size="small"
      sx={theme => ({
        color: theme.palette.primary.main,
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.palette.primary.main
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.palette.primary.light
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.palette.primary.dark
        },
        '& .MuiSelect-icon': {
          color: theme.palette.primary.main
        }
      })}
      MenuProps={{ container: containerRef.current }}
    >
      <MenuItem value={DEFAULT_QUALITY}>Auto</MenuItem>
      {levels.map((lvl, idx) => (
        <MenuItem key={idx} value={idx}>
          {lvl.height}p
        </MenuItem>
      ))}
    </Select>
  );
};

export default QualitySelect;
