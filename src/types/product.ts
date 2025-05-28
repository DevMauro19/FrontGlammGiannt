export interface Product {
    id: string;
    name: string;
    category: 'Lipstick' | 'Foundation' | 'Eyeshadow' | 'etc';
    stock: number;
    warehouseLocation: string;
    durabilityScore: number;
  }