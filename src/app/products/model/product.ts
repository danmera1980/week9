export interface Product {
  id: number;
  slug: string;
  name: string;
  description: string;
  likes_up_count: number;
  likes_down_count: number;
  master: {
    price: number;
    stock: number;
  };
  category: {
    id: number;
    slug: string;
    name: string;
  };
  image: {
    id: number;
    url: string;
  };

}
