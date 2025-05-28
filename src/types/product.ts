export interface Product {
  id: string;
  name: string;
  description: string; // ✅ propiedad que faltaba
  price: number;        // ✅ propiedad que faltaba
  category: 'Lipstick' | 'Foundation' | 'Eyeshadow' | 'etc';
  stock: number;
  warehouseLocation: string;
  durabilityScore: number;
}