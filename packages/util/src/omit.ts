
export default function omit<T extends Object, K extends keyof T>(obj: T, fields: K[]| readonly K[]) {
  const clone = Object.assign({}, obj);
  for (let i = 0; i < fields.length; i++) {
    const key = fields[i];
    delete clone[key];
  }

  return clone
}