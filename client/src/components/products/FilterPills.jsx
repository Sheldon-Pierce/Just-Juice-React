// client/src/components/products/FilterPills.jsx
// Horizontal pill row for category filtering. Controlled — parent owns active state.

import { HStack, Button } from '@chakra-ui/react';
import { CATEGORIES } from '../../data/productMockData';

const FilterPills = ({ active, onChange }) => (
  <HStack spacing='8px' flexWrap='wrap' rowGap='8px'>
    {CATEGORIES.map((c) => {
      const isActive = active === c.key;
      return (
        <Button
          key={c.key}
          onClick={() => onChange(c.key)}
          variant={isActive ? 'primary' : 'ghost'}
          size='sm'
          borderColor={isActive ? 'accent.green' : 'line'}
          color={isActive ? 'cream' : 'ink'}
          _hover={isActive
            ? { bg: 'accent.greenHover' }
            : { bg: 'cream', borderColor: 'ink' }
          }
          bg={isActive ? 'accent.green' : 'paper'}
        >
          {c.label}
        </Button>
      );
    })}
  </HStack>
);

export default FilterPills;
