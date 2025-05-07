import { Color } from './Color';
import { Product } from './Product';
import { Size } from './Size';

export type Variant = Models.Document & {
  product: Product;
  size: Size;
  color: Color;
  stock: number;
};
