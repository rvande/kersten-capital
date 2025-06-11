import { StrapiImage } from './global';

export interface SubMenuItem {
  id: number;
  url?: string;
  newTab: boolean;
  text: string;
}

export interface ButtonLink {
  id: number;
  url?: string;
  newTab: boolean;
  text: string;
  type: 'primary' | 'secondary';
}

export interface NavbarLink {
  id: number;
  url?: string;
  newTab: boolean;
  text: string;
  subMenuItems?: SubMenuItem[];
}

export interface Navbar {
  id: number;
  logo?: StrapiImage;
  button?: ButtonLink | null;
  menu?: {
    id: number;
    title: string;
    links?: {
      id: number;
      url?: string;
      newTab: boolean;
      text: string;
      subMenuItems?: SubMenuItem[];
    }[];
  }[];
}

export interface FooterLink {
  id: number;
  url?: string;
  newTab: boolean;
  text: string;
  subMenuItems?: SubMenuItem[];
}

export interface FooterColumn {
  id: number;
  title: string;
  links: FooterLink[];
}

export interface Footer {
  id: number;
  logo?: StrapiImage;
  columns: FooterColumn[];
} 