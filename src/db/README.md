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
class Mode {
  // enum
  WALK = '🚶';
  BIKE = '🚲';
  SCOOT = '🛴';
  SKATE = '🛹';
  MOTORCYCLE = '🏍️';
  CAR = '🚗';
  BUS = '🚌';
  RAIL = '🚋';
  PLANE = '✈️';
  BOAT = '⛵';
}
class Meal {
  id!: uuid;
  userId!: uuid;
  name!: string;
  tags!: string[];
}
class Restaurant extends Meal {
  price?: Price;
  distance?: number; // minutes
  mode?: Mode;
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
