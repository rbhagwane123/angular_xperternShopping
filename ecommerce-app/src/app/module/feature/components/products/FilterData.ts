export const color = ['white', 'Black', 'Red', 'Marum', 'Being', 'Pink', 'Green', 'Yellow'];

export const filters = [
  {
    id: 'color',
    name: 'Color',
    options: [
      {
        value: 'white',
        label: 'white',
      },
      {
        value: 'beige',
        label: 'Beige',
      },
      {
        value: 'blue',
        label: 'Blue',
      },
      {
        value: 'green',
        label: 'Green',
      },
      {
        value: 'brown',
        label: 'Brown',
      },
      {
        value: 'purple',
        label: 'Purple',
      },
      {
        value: 'yellow',
        label: 'Yellow',
      },
    ],
  },
  {
    id: 'size',
    name: 'Size',
    options: [
      {
        value: 'S',
        label: 'S',
      },
      {
        value: 'M',
        label: 'M',
      },
      {
        value: 'L',
        label: 'L',
      },
    ],
  },
];

export const singleFilter = [
  {
    id: 'price',
    name: 'Price',
    options: [
      { value: '159-399', lebels: '₹159 to ₹399' },
      { value: '399-999', lebels: '₹399-₹999' },
      { value: '999-1999', lebels: '₹999-₹1999' },
      { value: '1999-2999', lebels: '₹1999-₹2999' },
      { value: '3999-4999', lebels: '₹3999-₹4999' },
    ],
  },
  {
    id: 'discount',
    name: 'DISCOUNT RANGE',
    options: [
      { value: '10', lebels: '10% And Above' },
      { value: '20', lebels: '20% And Above' },
      { value: '30', lebels: '30% And Above' },
      { value: '40', lebels: '40% And Above' },
      { value: '50', lebels: '50% And Above' },
      { value: '60', lebels: '60% And Above' },
      { value: '70', lebels: '70% And Above' },
      { value: '80', lebels: '80% And Above' },
    ],
  },
  {
    id: 'stock',
    name: 'Availability',
    options: [
      { value: 'in_stock', lebels: 'In Stock' },
      { value: 'out_of_stock', lebels: 'Out of Stock' },
    ],
  },
];
