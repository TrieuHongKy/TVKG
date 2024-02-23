export interface Business {
  [x: string]: any
  id: number
  name: string
  follow: number
  avatar: string
  banner: string
  description: string
  information: Information
  map: Map
}

export interface Information {
  phone: string
  address: string
  website: string
  quantity: string
  taxCode: string
  companyType: string
  field: string
}

export interface Map {
  image: string
  map: string
  link: string
}
