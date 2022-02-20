
export enum Sender {
  React,
  Content
}

export interface ChromeMessage {
  from: Sender,
  message: any
}

export type PetData = {
  name: string,
  level: number,
  image: string,
  info: string
}

export type PetStatDefinition = {
  id: string,
  label: string,
  value: number,
  currentValue: number,
  perSecond: number,
  max: number,
  fullIsGood: boolean,
  statEffects?: WhenThen[]
}

// export type PetStatusesDict = {
//   [key: string]: PetStatusDefinition
// }
export type PetStatusDefinition = {
  id: string,
  label: string,
  message: string
}
export type PetBehaviorDefinition = {
  image: string
}
export type WhenThen = {
  when: string[],
  then: string
}
export type PetLogicGroup = {
  stats: PetStatDefinition[],
  statuses: PetStatusDefinition[],
  behaviors: PetBehaviorDefinition[]
  behaviorRules: WhenThen[]
}

export type RawPetJSON = {
  id: string,
  name: string,
  info: string,
  image: string,
  level: number,
  logic: {
    stats: PetStatDefinition[],
    statuses: PetStatusDefinition[],
    behaviors: PetBehaviorDefinition[]
    behaviorRules: WhenThen[]
  },
  timestamp: number
}

export type PetDefinition = {
  id: string,
  name: string,
  info: string,
  image: string,
  level: number,
  logic: PetLogicGroup,
  timestamp: number
}

export type PetListItem = {
  name: string,
  id: string,
  isActive?: boolean
}

export type SavedStat = {
  id: string,
  value: number
}

export type SavedPetState = {
  id: string,
  lastSaved: number,
  stats: SavedStat[]
}

export type LocalStorageState = {
  config: {
    activePet?: string,
    haveSaved?: boolean
  },
  pets: SavedPetState[]
}