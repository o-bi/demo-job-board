import * as migration_20260102_032529 from './20260102_032529';

export const migrations = [
  {
    up: migration_20260102_032529.up,
    down: migration_20260102_032529.down,
    name: '20260102_032529'
  },
];
