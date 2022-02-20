
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

export type RawPetStatDefinition = {
  id: string,
  label: string,
  value: number,
  currentValue: number,
  perSecond: number,
  max: number,
  fullIsGood: boolean,
  statEffects: RawWhenThen[]
}

export type PetStatDefinition = {
  id: string,
  label: string,
  value: number,
  currentValue: number,
  perSecond: number,
  max: number,
  fullIsGood: boolean,
  statEffects: WhenThenNumber[]
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
export type WhenNumber = {
  condition: string, // could remove?
  criteria: number,
  isPercent: boolean,
  direction: -1|0|1
}
export type RawWhenThen = {
  when: string[],
  then: string
}
export type WhenThenNumber = {
  when: WhenNumber[],
  then: string
}

export type WhenThenString = {
  when: string[],
  then: string
}
export type PetLogicGroup = {
  stats: PetStatDefinition[],
  statuses: PetStatusDefinition[],
  behaviors: PetBehaviorDefinition[],
  behaviorRules: WhenThenString[]
}

export type RawPetJSON = {
  id: string,
  name: string,
  info: string,
  image: string,
  level: number,
  logic: {
    stats: RawPetStatDefinition[],
    statuses: PetStatusDefinition[],
    behaviors: PetBehaviorDefinition[]
    behaviorRules: {when:string[], then:string}[]
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