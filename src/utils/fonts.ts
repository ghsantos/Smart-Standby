// npx react-native-asset
import { Platform } from 'react-native'

const isIOS = Platform.OS === 'ios'

export type FontType = {
  name: string
  family: string
}

export const fonts: FontType[] = [
  { name: '8-Bit Madness', family: '8-Bit Madness' },
  { name: 'BitMap', family: 'BitMap' },
  { name: 'Intellecta Digital', family: 'Intellecta Digital' },
  { name: 'Josefin Sans', family: 'Josefin Sans' },
  {
    name: 'KG Second Chances Sketch',
    family: isIOS ? 'KG Second Chances Sketch' : 'kg-second-chances.ketch',
  },
  {
    name: 'KG Second Chances Solid',
    family: isIOS ? 'KG Second Chances Solid' : 'kg-second-chances.olid',
  },
  { name: 'LCDDot TR', family: 'LCDDot TR' },
  { name: 'LED Dot-Matrix', family: 'LED Dot-Matrix' },
  { name: 'Open 24 Display St', family: 'Open 24 Display St' },
  ///
  { name: '2Peas 4th of July', family: '2Peas 4th of July' },
  { name: '3D Isometric', family: '3D Isometric' },
  { name: 'Amadeus', family: 'Amadeus' },
  { name: 'AristotelianNBP', family: 'AristotelianNBP' },
  { name: 'Brewsky', family: 'Brewsky' },
  { name: 'Cute Aurora', family: 'Cute Aurora' },
  // { name: 'Dreamland Stars', family: 'Dreamland Stars' }, // not complete
  { name: 'Dreamland', family: 'Dreamland' },
  { name: 'E1234', family: 'E1234' },
  { name: 'Edge Of The Galaxy', family: 'Edge Of The Galaxy' },
  { name: 'Erbos Draco 1st Open NBP', family: 'Erbos Draco 1st Open NBP' },
  { name: 'Help Me', family: 'Help Me' },
  { name: 'Hexcore', family: 'Hexcore' },
  { name: 'Killen', family: 'Killen' },
  { name: 'Library 3 AM Soft', family: 'Library 3 AM Soft' },
  { name: 'NBP Readout', family: 'NBP Readout' },
  { name: 'Neon Sans', family: 'Neon Sans' },
  { name: 'Neoneon', family: 'Neoneon' },
  { name: 'New Walt Disney Ui', family: 'New Walt Disney Ui' },
  { name: 'Novem', family: 'Novem' },
  { name: 'Nugo Sans', family: 'Nugo Sans' },
  { name: 'Parisienne', family: 'Parisienne' },
  { name: 'Rock', family: 'Rock' },
  { name: 'Ryujin Attack', family: isIOS ? 'Ryujin Attack' : 'RyujinAttack' },
  { name: 'Sacramento', family: 'Sacramento' },
  { name: 'Siti Maesaroh', family: 'Siti Maesaroh' },
  {
    name: 'Star Trek Future',
    family: isIOS ? 'StarTrekFuture' : 'Star Trek Future',
  },
  { name: 'Time Burner', family: isIOS ? 'TimeBurner' : 'Time Burner' },
  { name: 'VFD Hypernova', family: 'VFD Hypernova' },
  { name: 'Wanders', family: 'Wanders' },
  { name: 'Znikomitno25', family: 'Znikomitno25' },
  { name: 'a dripping marker', family: 'a dripping marker' },
  { name: 'moonhouse', family: 'moonhouse' },
]
