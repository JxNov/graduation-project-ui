export function extractValue<T, K extends keyof T>(values: T[], propertyName: K): Array<{
    label: string;
    value: string
}> {
    return values
        .flatMap(item => {
            const propertyValue = item[propertyName];
            return Array.isArray(propertyValue) ? propertyValue : [propertyValue];
        })
        .map((value: string) => ({label: value, value}))
        .filter((item, index, self) => self.findIndex(t => t.value === item.value) === index);
}