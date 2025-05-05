import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
interface ISelectProps {
  values: {
    key: string;
    value: string;
  }[];
  onChange: (selectedItems: { key: string; value: string }[]) => void;
}
const MultiSelect = ({ values, onChange }: ISelectProps) => {
  const [selectedItems, setSelectedItems] = useState<
    { key: string; value: string }[]
  >([]);
  const handleSelectChange = (value: { key: string; value: string }) => {
    let newItems = [...selectedItems];
    const existingItem = newItems.find((item) => item.key === value.key);
    if (existingItem) {
      newItems = newItems.filter((item) => item.key !== value.key);
    } else {
      newItems.push(value);
    }
    setSelectedItems(newItems);
    onChange(newItems);
  };

  const isOptionSelected = (key: string): boolean => {
    return selectedItems.find((item) => item.key === key) !== undefined;
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex gap-2">
            <span>Choisir les catégories</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-full"
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <DropdownMenuLabel>Appearance</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {values.map((value: ISelectProps['values'][0], index: number) => {
            return (
              <DropdownMenuCheckboxItem
                onSelect={(e) => e.preventDefault()}
                key={index}
                checked={isOptionSelected(value.key)}
                onCheckedChange={() => {
                  handleSelectChange({ key: value.key, value: value.value });
                  // Appel de la fonction onChange avec les items sélectionnés
                }}
              >
                {value.value}
              </DropdownMenuCheckboxItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default MultiSelect;
