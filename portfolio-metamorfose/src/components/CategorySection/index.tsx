import { ICategory } from "@/types/types";

export const CategoryComponent: React.FC<{ categories: ICategory[] }> = ({
  categories,
}) => {
  return (
    <div>
      {categories.map((category) => {
        return (
          <div key={category.id}>
            <p>{category.name}</p>
          </div>
        );
      })}
    </div>
  );
};