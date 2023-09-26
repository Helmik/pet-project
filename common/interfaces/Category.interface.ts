import TagInterface from './Tag.interface';

interface CategoryInterface {
  id: number;
  es: string
  en: string;
  descriptionEs: string;
  descriptionEn: string;
  images: string;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  tags?: TagInterface[];
  name?: string;
  description?: string;
  url?: string;
}

export default CategoryInterface;
