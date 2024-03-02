type User = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  role: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
};

type Product = {
  _id: string;
  name: string;
  price: number;
  images: string[];
  category: string;
  stock: number;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type { User, Product };
