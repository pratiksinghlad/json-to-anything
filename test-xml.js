import { XMLBuilder } from 'fast-xml-parser';
const builder = new XMLBuilder({
  attributeNamePrefix: '@_',
  ignoreAttributes: false,
  format: true,
  indentBy: '  ',
  suppressEmptyNode: false,
  suppressBooleanAttributes: false
});
const data = {
  person: {
    '@_id': '1',
    name: 'John Doe',
    age: 30,
    address: {
      street: '123 Main St',
      city: 'New York',
      zip: '10001'
    },
    hobbies: ['reading', 'gaming', 'coding']
  }
};
console.log(builder.build(data));
