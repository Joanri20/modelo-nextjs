// This file contains type defitaxIdions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.

enum Enum_DocumentType {
  CC = 'CC',
  CE = 'CE',
  TI = 'TI',
  PASSPORT = 'PASSPORT',
}

enum Enum_ProcessStatus {
  Open = 'Open',
  Closed = 'Closed',
  InProcess = 'InProceso',
}

enum Enum_UserType {
  Administrator = 'Administrator',
  Manager = 'Manager',
}

enum Enum_GeneralStatus {
  Active = 'Active',
  Disabled = 'Disabled',
}

enum Enum_QuotationStatus {
  Open = 'Open',
  Closed = 'Closed',
}

type AssetGroup = {
  id: bigint;
  description: string;
  createdAt: Date | null;
  updatedAt?: Date | null;
};

type Asset = {
  id: bigint;
  description: string;
  assetGroup: AssetGroup;
  assetGroupId: bigint;
  currentValue?: number | null;
  assetQuantities: AssetQuantity[];
  createdAt: Date;
  updatedAt?: Date;
};

type AssetQuantity = {
  id: bigint;
  asset: Asset;
  assetId: bigint;
  quantity: number;
  purchasePlan?: PurchasePlan | null;
  purchasePlanId?: bigint | null;
  createdAt: Date;
  updatedAt?: Date | null;
  assetSuppliers: AssetSupplier[];
};

type PurchasePlan = {
  id: bigint;
  assetQuantities: AssetQuantity[];
  date: Date;
  status: Enum_ProcessStatus;
  department: Department;
  user: User;
  totalValue?: number;
  departmentId: bigint;
  userId: string;
  hiringCycle?: HiringCycle;
  hiringCycleId?: bigint;
  createdAt: Date;
  updatedAt: Date;
};

type AssetSupplier = {
  asset: AssetQuantity;
  supplier: Supplier;
  value: number;
  quotation: Quotation;
  assetQuantityId: bigint;
  supplierId: bigint;
  createdAt: Date;
  updatedAt?: Date;
  quotationId: bigint;
};

type Supplier = {
  id: bigint;
  name: string;
  taxId: string;
  address: string;
  email: string;
  phone: string;
  password: string;
  namePersonResponsible: string;
  webside: string;
  quotationSuppliers: QuotationSupplier[];
  createdAt: Date;
  updatedAt: Date;
  assetSuppliers: AssetSupplier[];
};

type QuotationSupplier = {
  supplier: Supplier;
  quotation: Quotation;
  totalValue: number;
  supplierId: bigint;
  quotationId: bigint;
  createdAt: Date;
  updatedAt?: Date;
};

type Quotation = {
  id: bigint;
  startDate: Date;
  endDate: Date;
  user: User;
  entity: Entity;
  status: Enum_QuotationStatus;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  entityId: bigint;
  assetSuppliers: AssetSupplier[];
  quotationSuppliers: QuotationSupplier[];
};

type HiringCycle = {
  id: bigint;
  startDate: Date;
  endDate: Date;
  purchasePlans: PurchasePlan[];
  user: User;
  status: Enum_ProcessStatus;
  entity: Entity;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  entityId: bigint;
  quotation?: Quotation;
  quotationId?: bigint;
};

type Entity = {
  id: bigint;
  name: string;
  taxId: string;
  address?: string;
  phone?: string;
  city: string;
  state: string;
  country: string;
  website?: string;
  email?: string;
  possessionResolution?: string;
  possessionDate?: Date;
  status: Enum_GeneralStatus;
  availableBalance: number;
  createdAt: Date;
  updatedAt: Date;
  departments: Department[];
  hiringCycles: HiringCycle[];
  members: User[];
  quotations: Quotation[];
};

type Department = {
  id: bigint;
  name: string;
  taxId: string;
  address?: string;
  phone?: string;
  city: string;
  state: string;
  country: string;
  website?: string;
  email?: string;
  possessionResolution?: string;
  possessionDate?: Date;
  status: Enum_GeneralStatus;
  parentEntity: Entity;
  availableBalance: number;
  createdAt: Date;
  updatedAt: Date;
  entityId: bigint;
  purchasePlans: PurchasePlan[];
  user: User;
  userId: string;
};

type User = {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  secondLastName?: string;
  documentType: Enum_DocumentType;
  document: string;
  phone?: string;
  mobile: string;
  email: string;
  address?: string;
  status: Enum_GeneralStatus;
  type: Enum_UserType;
  createdAt: Date;
  updatedAt: Date;
  entities: Entity[];
  departments: Department[];
  purchasePlans: PurchasePlan[];
  hiringCycles: HiringCycle[];
  password: string;
  quotations: Quotation[];
};
