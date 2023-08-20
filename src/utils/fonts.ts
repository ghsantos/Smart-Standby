// npx react-native-asset
import { Platform } from 'react-native'

const isIOS = Platform.OS === 'ios'

export const fonts = [
  { name: '8-Bit Madness', value: '8-Bit Madness' },
  { name: 'BitMap', value: 'BitMap' },
  { name: 'Intellecta Digital', value: 'Intellecta Digital' },
  { name: 'Josefin Sans', value: 'Josefin Sans' },
  {
    name: 'KG Second Chances Sketch',
    value: isIOS ? 'KG Second Chances Sketch' : 'kg-second-chances.ketch',
  },
  {
    name: 'KG Second Chances Solid',
    value: isIOS ? 'KG Second Chances Solid' : 'kg-second-chances.olid',
  },
  { name: 'LCDDot TR', value: 'LCDDot TR' },
  { name: 'LED Dot-Matrix', value: 'LED Dot-Matrix' },
  { name: 'Open 24 Display St', value: 'Open 24 Display St' },
]
