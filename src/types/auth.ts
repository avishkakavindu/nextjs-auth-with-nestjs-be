import { JwtPayload } from 'jwt-decode';

export interface ITokenPayload extends JwtPayload {
  id: string;
  email: string;
}
