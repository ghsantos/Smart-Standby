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
  ///
  { name: '2Peas 4th of July', value: '2Peas 4th of July' },
  { name: '3D Isometric', value: '3D Isometric' },
  { name: 'Amadeus', value: 'Amadeus' },
  { name: 'AristotelianNBP', value: 'AristotelianNBP' },
  { name: 'Brewsky', value: 'Brewsky' },
  { name: 'Cute Aurora', value: 'Cute Aurora' },
  // { name: 'Dreamland Stars', value: 'Dreamland Stars' }, // not complete
  { name: 'Dreamland', value: 'Dreamland' },
  { name: 'E1234', value: 'E1234' },
  { name: 'Edge Of The Galaxy', value: 'Edge Of The Galaxy' },
  { name: 'Erbos Draco 1st Open NBP', value: 'Erbos Draco 1st Open NBP' },
  { name: 'Help Me', value: 'Help Me' },
  { name: 'Hexcore', value: 'Hexcore' },
  { name: 'Killen', value: 'Killen' },
  { name: 'Library 3 AM Soft', value: 'Library 3 AM Soft' },
  { name: 'NBP Readout', value: 'NBP Readout' },
  { name: 'Neon Sans', value: 'Neon Sans' },
  { name: 'Neoneon', value: 'Neoneon' },
  { name: 'New Walt Disney Ui', value: 'New Walt Disney Ui' },
  { name: 'Novem', value: 'Novem' },
  { name: 'Nugo Sans', value: 'Nugo Sans' },
  { name: 'Parisienne', value: 'Parisienne' },
  { name: 'Rock', value: 'Rock' },
  { name: 'Ryujin Attack', value: isIOS ? 'Ryujin Attack' : 'RyujinAttack' },
  { name: 'Sacramento', value: 'Sacramento' },
  { name: 'Siti Maesaroh', value: 'Siti Maesaroh' },
  {
    name: 'Star Trek Future',
    value: isIOS ? 'StarTrekFuture' : 'Star Trek Future',
  },
  { name: 'Time Burner', value: isIOS ? 'TimeBurner' : 'Time Burner' },
  { name: 'VFD Hypernova', value: 'VFD Hypernova' },
  { name: 'Wanders', value: 'Wanders' },
  { name: 'Znikomitno25', value: 'Znikomitno25' },
  { name: 'a dripping marker', value: 'a dripping marker' },
  { name: 'moonhouse', value: 'moonhouse' },
]
