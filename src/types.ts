
export enum Sender {
  React,
  Content
}

export interface ChromeMessage {
  from: Sender,
  message: any
}

export type PetInfo = {
  id: string,
  name: string,
  bio: string,
  bornOn?: number,
  level: number
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
  statEffects: WhenThenNumberGroup[]
}

// export type PetStatusesDict = {
//   [key: string]: PetStatusDefinition
// }
export type AlertType = 'alert' | 'warning' | 'reward';
export type PetStatusDefinition = {
  id: string,
  label: string,
  message: string,
  alertType?: AlertType
}
export type PetBehaviorDefinition = {
  id: string,
  image: string
}
export type WhenNumber = {
  condition: ConditionOperator,
  criteria: number,
  isPercent: boolean
}
export type RawWhenThen = {
  when: string[],
  then: string
}
export type WhenThenNumberGroup = {
  when: WhenNumber[],
  then: string
}

export type WhenThenStringGroup = {
  when: string[],
  then: string
}
export type PetLogicGroup = {
  stats: PetStatDefinition[],
  statuses: PetStatusDefinition[],
  behaviors: PetBehaviorDefinition[],
  behaviorRules: WhenThenStringGroup[]
}

export type RawPetJSON = {
  id: string,
  name: string,
  bio: string,
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
  bio: string,
  bornOn?: number,
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
  bornOn?: number,
  stats: SavedStat[]
}

export type LocalStorageState = {
  config: {
    activePet?: string,
    haveSaved?: boolean
  },
  pets: SavedPetState[]
}

export type ConditionOperator = '='|'<'|'<='|'>'|'>=';

export type DeltaStat = {
  id: string,
  value: number,
  max: number,
  label: string
}
