export interface Paper {
  published: string;
  link: string;
  year: string;
}

export interface Subject {
  name: string;
  code: string;
  regulation: string;
  papers: Paper[];
}

export interface Regulation {
  regulation: string;
  subjects: Subject[];
}
