const assetGroups = [
  { id: 1, description: 'Living Animal and Plant Material' },
  { id: 2, description: 'Raw Materials' },
  {
    id: 3,
    description: 'Machinery, Tools, Industrial Equipment, and Vehicles',
  },
  { id: 4, description: 'Components and Supplies' },
  { id: 5, description: 'Final Use Goods' },
  { id: 6, description: 'Services' },
  { id: 7, description: 'Land, Buildings, Structures, and Roads' },
];

const assets = [
  { id: 1, description: 'Laptop', assetGroupId: 5, currentValue: 1500 },
  { id: 2, description: 'Office Chair', assetGroupId: 5, currentValue: 200 },
  { id: 3, description: 'Projector', assetGroupId: 5, currentValue: 800 },
];

const assetQuantities = [
  { id: 1, assetId: 1, quantity: 10, purchasePlanId: 1 },
  { id: 2, assetId: 2, quantity: 20, purchasePlanId: 2 },
  { id: 3, assetId: 3, quantity: 5, purchasePlanId: 3 },
];

const purchasePlans = [
  {
    id: 1,
    date: new Date(),
    status: 'Open',
    departmentId: 1,
    userId: 'user1',
    totalValue: 10000,
  },
  {
    id: 2,
    date: new Date(),
    status: 'Closed',
    departmentId: 2,
    userId: 'user2',
    totalValue: 5000,
  },
  {
    id: 3,
    date: new Date(),
    status: 'InProcess',
    departmentId: 3,
    userId: 'user3',
    totalValue: 2000,
  },
];

const assetSuppliers = [
  { assetQuantityId: 1, supplierId: 1, value: 15000, quotationId: 1 },
  { assetQuantityId: 2, supplierId: 2, value: 3000, quotationId: 2 },
  { assetQuantityId: 3, supplierId: 3, value: 4000, quotationId: 3 },
];

const suppliers = [
  {
    id: 1,
    name: 'Supplier One',
    taxId: '123456789',
    address: '123 Main St',
    email: 'supplier1@example.com',
    phone: '555-1234',
    password: '$1234',
    namePersonResponsible: 'Responsable',
    website: 'www.',
  },
  {
    id: 2,
    name: 'Supplier Two',
    taxId: '987654321',
    address: '456 Elm St',
    email: 'supplier2@example.com',
    phone: '555-5678',
    password: '$1234',
    namePersonResponsible: 'Responsable',
    website: 'www.',
  },
  {
    id: 3,
    name: 'Supplier Three',
    taxId: '111222333',
    address: '789 Oak St',
    email: 'supplier3@example.com',
    phone: '555-9101',
    password: '$1234',
    namePersonResponsible: 'Responsable',
    website: 'www.',
  },
];

const quotationSuppliers = [
  { supplierId: 1, quotationId: 1, totalValue: 15000 },
  { supplierId: 2, quotationId: 2, totalValue: 3000 },
  { supplierId: 3, quotationId: 3, totalValue: 4000 },
];

const quotations = [
  {
    id: 1,
    startDate: new Date(),
    endDate: new Date(),
    userId: 'user1',
    entityId: 1,
    status: 'Open',
  },
  {
    id: 2,
    startDate: new Date(),
    endDate: new Date(),
    userId: 'user2',
    entityId: 2,
    status: 'Closed',
  },
  {
    id: 3,
    startDate: new Date(),
    endDate: new Date(),
    userId: 'user3',
    entityId: 3,
    status: 'Open',
  },
];

const hiringCycles = [
  {
    id: 1,
    startDate: new Date(),
    endDate: new Date(),
    status: 'Open',
    entityId: 1,
    userId: 'user1',
  },
  {
    id: 2,
    startDate: new Date(),
    endDate: new Date(),
    status: 'Closed',
    entityId: 2,
    userId: 'user2',
  },
  {
    id: 3,
    startDate: new Date(),
    endDate: new Date(),
    status: 'InProcess',
    entityId: 3,
    userId: 'user3',
  },
];

const entities = [
  {
    id: 1,
    name: 'Entity One',
    taxId: '123456789',
    address: '123 Main St',
    city: 'City A',
    state: 'State A',
    country: 'Country A',
    status: 'Active',
    availableBalance: 10000,
  },
  {
    id: 2,
    name: 'Entity Two',
    taxId: '987654321',
    address: '456 Elm St',
    city: 'City B',
    state: 'State B',
    country: 'Country B',
    status: 'Disabled',
    availableBalance: 5000,
  },
  {
    id: 3,
    name: 'Entity Three',
    taxId: '111222333',
    address: '789 Oak St',
    city: 'City C',
    state: 'State C',
    country: 'Country C',
    status: 'Active',
    availableBalance: 2000,
  },
];

const departments = [
  {
    id: 1,
    name: 'Department One',
    taxId: '123456789',
    city: 'City A',
    state: 'State A',
    country: 'Country A',
    status: 'Active',
    entityId: 1,
    availableBalance: 10000,
  },
  {
    id: 2,
    name: 'Department Two',
    taxId: '987654321',
    city: 'City B',
    state: 'State B',
    country: 'Country B',
    status: 'Disabled',
    entityId: 2,
    availableBalance: 5000,
  },
  {
    id: 3,
    name: 'Department Three',
    taxId: '111222333',
    city: 'City C',
    state: 'State C',
    country: 'Country C',
    status: 'Active',
    entityId: 3,
    availableBalance: 2000,
  },
];

const users = [
  {
    id: 'user1',
    firstName: 'John',
    middleName: 'A',
    lastName: 'Doe',
    secondLastName: 'Smith',
    documentType: 'CC',
    document: '123456789',
    mobile: '555-1234',
    email: 'john.doe@example.com',
    status: 'Active',
    type: 'Manager',
    password: 'password123',
  },
  {
    id: 'user2',
    firstName: 'Jane',
    middleName: 'B',
    lastName: 'Doe',
    secondLastName: 'Johnson',
    documentType: 'CE',
    document: '987654321',
    mobile: '555-5678',
    email: 'jane.doe@example.com',
    status: 'Disabled',
    type: 'Administrator',
    password: 'password123',
  },
  {
    id: 'user3',
    firstName: 'Alice',
    middleName: 'C',
    lastName: 'Smith',
    secondLastName: 'Brown',
    documentType: 'TI',
    document: '1122334455',
    mobile: '555-9101',
    email: 'alice.smith@example.com',
    status: 'Active',
    type: 'Manager',
    password: 'password123',
  },
];

module.exports = {
  assetGroups,
  assets,
  assetQuantities,
  purchasePlans,
  assetSuppliers,
  suppliers,
  quotationSuppliers,
  quotations,
  hiringCycles,
  entities,
  departments,
  users,
};
