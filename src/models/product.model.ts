export interface ProductData {
  slug: string;
  displayName: string;
}

export interface IProducts {
  [key: string]: ProductData;
}
