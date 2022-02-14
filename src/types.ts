
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
  perSecond: number,
  min: number,
  max: number,
  alignment: number // is more good (1) or is more bad (-1)?well 
}

export type PetDefinition = {
  id: string,
  name: string,
  info: string,
  image: string,
  level: number,
  stats: PetStatDefinition[]
}

export type PetListItem = {
  name: string,
  id: string,
  isActive?: boolean
}