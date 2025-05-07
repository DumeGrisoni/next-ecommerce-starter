import { useEffect, useState } from 'react';
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
  name: string;
  id: string;
  onChange: (items: { key: string; value: string }[]) => void;
  defaultValues?: { key: string; value: string }[];
}
const MultiSelect = ({
  values,
  name,
  onChange,
  defaultValues,
}: ISelectProps) => {
  const [selectedItems, setSelectedItems] = useState<
    { key: string; value: string }[]
  >(
    (defaultValues || []).map((defaultValue) => ({
      key: defaultValue.key,
      value: defaultValue.value,
    }))
  );
  const handleSelectChange = (value: { key: string; value: string }) => {
    let newItems = [...selectedItems];
    const existingItem = newItems.find((item) => item.key === value.key);
    if (existingItem) {
      newItems = newItems.filter((item) => item.key !== value.key);
    } else {
      newItems.push({ key: value.key, value: value.value });
    }
    // Si la valeur est une valeur par défaut, on l'enlève des valeurs par défaut
    if (defaultValues?.find((item) => item.key === value.key)) {
      const newDefaultValues = defaultValues.filter(
        (item) => item.key !== value.key
      );
      // Mettre à jour les valeurs par défaut
      defaultValues = newDefaultValues;
    }
    setSelectedItems(newItems);
    onChange(newItems);
  };

  useEffect(() => {
    setSelectedItems(
      (defaultValues || []).map((defaultValue) => ({
        key: defaultValue.key,
        value: defaultValue.value,
      }))
    );
  }, [defaultValues]);

  const isOptionSelected = (key: string): boolean => {
    return selectedItems.find((item) => item.key === key) !== undefined;
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex gap-2">
            <span>Choisir les {name}</span>
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
                  handleSelectChange(value);
                  // Appel de la fonction onChange avec les items sélectionnés
                  // onChange(selectedItems);
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
