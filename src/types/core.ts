export type Slug = string;
export type ID = string;

export interface LinkItem {
  label: string;
  href: string;
}

export interface NavSection {
  title: string;
  links: LinkItem[];
}

export interface CTA {
  label: string;
  href: string;
}

export interface OptionItem<T extends string = string> {
  value: T;
  label: string;
}
