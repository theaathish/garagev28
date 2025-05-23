import { type SchemaTypeDefinition } from "sanity";

import { carType } from "./car";
import { reviewType } from "./review";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [carType, reviewType],
};
