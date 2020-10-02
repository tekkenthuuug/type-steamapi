function simplifyObject(object: any) {
  let clearedObject = null;

  while (!clearedObject) {
    const [firstValue, ...restValues] = Object.values(object);

    if (
      restValues.length === 0 &&
      typeof firstValue === 'object' &&
      !Array.isArray(firstValue)
    ) {
      object = firstValue;
      continue;
    }

    clearedObject = object;
  }

  return clearedObject;
}

export default simplifyObject;
