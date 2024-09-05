export interface Link {
    title: string;
    url: string;
    relatedLink?: Link;
  }
  
  export interface AllPaper {
    title: string;
    links: Link[];
    year: number;
  }
  export interface SortedContent {
    units: Record<string, Link[]>;
    tutorials: Record<string, Link[]>;
  }