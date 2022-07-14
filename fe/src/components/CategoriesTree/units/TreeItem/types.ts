export interface TreeItemProps {
  title: string;
  count: { subCategories: number; items: number };
  onClick: () => void;
}
