// client/src/components/products/SortSelect.jsx
// Sort dropdown styled as a pill. Controlled.

import { Select } from '@chakra-ui/react';

export const SORT_OPTIONS = [
  { value: 'featured',   label: 'Sort: Featured' },
  { value: 'newest',     label: 'Newest' },
  { value: 'price-asc',  label: 'Price: low → high' },
  { value: 'price-desc', label: 'Price: high → low' },
  { value: 'rating',     label: 'Best rated' },
];

const SortSelect = ({ value, onChange }) => (
  <Select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    fontFamily='body'
    fontSize='sm'
    bg='paper'
    borderColor='line'
    borderRadius='full'
    width='auto'
    minW='180px'
    _hover={{ borderColor: 'ink' }}
    _focusVisible={{ borderColor: 'accent.green', boxShadow: '0 0 0 1px #1F3A2E' }}
  >
    {SORT_OPTIONS.map((o) => (
      <option key={o.value} value={o.value}>{o.label}</option>
    ))}
  </Select>
);

export default SortSelect;
