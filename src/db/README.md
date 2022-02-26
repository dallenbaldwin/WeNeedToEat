# DB

## Entities

```typescript
class Price {
  // enum
  CHEAP = '💲';
  AFFORDABLE = '💲💲';
  PRICEY = '💲💲💲';
  BOUGIE = '💲💲💲💲';
  EXPENSIVE = '💲💲💲💲💲';
}
class Meal {
  id!: uuid;
  name!: string;
  tags!: string[];
}
class Restaurant extends Meal {
  price?: Price;
  city?: string;
}
class AtHome extends Meal {
  prepTime?: number; // minutes
  serves?: number;
  ingredients?: Ingredient[];
  steps?: Step[];
}
class Ingredient {
  name!: string;
  quantity?: number | string;
  measure?: string;
}
class Step {
  number!: number;
  description!: string;
}
```
