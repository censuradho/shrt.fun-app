export interface SignUpRequestPayload {
  email: string
  password: string
  firstName: string
  lastName: string
}

export interface Me {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  isActive: boolean
  createdAt: Date
  plan: {
    name: string
    monthlyLinkLimit: number
  }
}