export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  age: number
  image?: string
  department?: string
  company?: {
    title: string
    department?: string
  }
  address: {
    address: string
    city: string
    state?: string
    postalCode?: string
  }
  university?: string
  rating?: number
  skills?: string[]
}
