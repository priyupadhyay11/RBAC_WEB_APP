export interface Role {
   id: number;
  name: string;
  permissions: {
    pages: string[];
    features: string[];
  };
}
