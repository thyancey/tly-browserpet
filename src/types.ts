
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