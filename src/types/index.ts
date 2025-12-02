export interface Product {
  id: string;
  category: string;
  title: string;
  description: string;
  price?: number;
  image: string;
}

export interface AuthProps {
  handleAuthorization: (isAuthorized: boolean) => void;
}

export interface GoogleCredentialResponse {
  credential: string;
  clientId?: string;
  select_by?: string;
}

export interface DecodedToken {
  email: string;
  name: string;
  picture?: string;
  sub: string;
  iat?: number;
  exp?: number;
}
