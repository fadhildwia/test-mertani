export interface NavigationItemInterface {
  id: number;
  label: string;
  path: string;
}

export const navigationItems: NavigationItemInterface[] = [
  { id: 1, label: 'Detail Pemantauan', path: '/' },
  { id: 2, label: 'Informasi Device', path: '/information-device' },
  { id: 3, label: 'Sensor Device', path: '/sensor-device' }
]