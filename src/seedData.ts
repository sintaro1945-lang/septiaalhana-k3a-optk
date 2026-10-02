import { 
  ContainerItem, 
  VesselItem, 
  YardBlockItem, 
  GateTransactionItem, 
  OperationActivityItem, 
  NotificationItem,
  UserProfileItem 
} from './types';

export const INITIAL_CONTAINERS: Omit<ContainerItem, 'id'>[] = [
  {
    containerNo: 'MSCU7849201',
    size: '40ft',
    type: 'Dry',
    status: 'Full',
    grossWeight: 28.5,
    yardLocation: 'BLK-A-01-03',
    owner: 'MSC Mediterranean',
    voyageNo: 'VOY-9021',
    arrivalDate: '2026-10-01 08:30',
    isoCode: '45G1'
  },
  {
    containerNo: 'MSCU8812345',
    size: '20ft',
    type: 'Reefer',
    status: 'Full',
    grossWeight: 21.2,
    yardLocation: 'BLK-B-02-01',
    owner: 'Maersk Line',
    voyageNo: 'VOY-9022',
    arrivalDate: '2026-10-01 09:15',
    isoCode: '22R1'
  },
  {
    containerNo: 'EGLV5541908',
    size: '40ft',
    type: 'Dry',
    status: 'Empty',
    grossWeight: 3.8,
    yardLocation: 'BLK-C-04-02',
    owner: 'Evergreen Marine',
    voyageNo: 'VOY-9021',
    arrivalDate: '2026-10-01 10:00',
    isoCode: '42G0'
  },
  {
    containerNo: 'HLCU9928173',
    size: '20ft',
    type: 'Tank',
    status: 'Full',
    grossWeight: 30.1,
    yardLocation: 'BLK-D-01-01',
    owner: 'Hapag-Lloyd',
    voyageNo: 'VOY-9023',
    arrivalDate: '2026-10-01 11:20',
    isoCode: '20T3'
  },
  {
    containerNo: 'CMAU3391029',
    size: '40ft',
    type: 'Open Top',
    status: 'Full',
    grossWeight: 26.4,
    yardLocation: 'BLK-A-03-02',
    owner: 'CMA CGM',
    voyageNo: 'VOY-9022',
    arrivalDate: '2026-10-01 12:45',
    isoCode: '45U1'
  }
];

export const INITIAL_VESSELS: Omit<VesselItem, 'id'>[] = [
  {
    vesselName: 'MSC LORETTO',
    voyageCode: 'VOY-9021',
    eta: '2026-10-01 06:00',
    etd: '2026-10-01 18:00',
    berthNo: 'Berth 01',
    status: 'Working',
    totalTeus: 1450,
    handledTeus: 920,
    shippingAgent: 'PT MSC Indonesia'
  },
  {
    vesselName: 'MAERSK MC-KINNEY',
    voyageCode: 'VOY-9022',
    eta: '2026-10-01 14:00',
    etd: '2026-10-02 04:00',
    berthNo: 'Berth 02',
    status: 'Berthing',
    totalTeus: 2200,
    handledTeus: 310,
    shippingAgent: 'PT Maersk Indonesia'
  },
  {
    vesselName: 'EVER GIVEN',
    voyageCode: 'VOY-9023',
    eta: '2026-10-02 08:00',
    etd: '2026-10-02 22:00',
    berthNo: 'Berth 03',
    status: 'Scheduled',
    totalTeus: 1800,
    handledTeus: 0,
    shippingAgent: 'PT Evergreen Shipping'
  }
];

export const INITIAL_YARD_BLOCKS: Omit<YardBlockItem, 'id'>[] = [
  { blockName: 'BLK-A (General)', capacity: 1200, currentOccupied: 840, blockType: 'General' },
  { blockName: 'BLK-B (Reefer)', capacity: 400, currentOccupied: 290, blockType: 'Reefer' },
  { blockName: 'BLK-C (Empty)', capacity: 1500, currentOccupied: 1120, blockType: 'Empty' },
  { blockName: 'BLK-D (Dangerous)', capacity: 200, currentOccupied: 65, blockType: 'Dangerous' }
];

export const INITIAL_GATE_TRANSACTIONS: Omit<GateTransactionItem, 'id'>[] = [
  {
    ticketNo: 'GT-2026-8812',
    truckPlate: 'B 9182 UXX',
    driverName: 'Budi Santoso',
    containerNo: 'MSCU7849201',
    direction: 'GATE_IN',
    status: 'Completed',
    timestamp: '2026-10-01 07:30',
    operator: 'Ahmad Gate'
  },
  {
    ticketNo: 'GT-2026-8813',
    truckPlate: 'L 8821 TAA',
    driverName: 'Joko Widodo',
    containerNo: 'EGLV5541908',
    direction: 'GATE_OUT',
    status: 'Approved',
    timestamp: '2026-10-01 09:45',
    operator: 'Ahmad Gate'
  },
  {
    ticketNo: 'GT-2026-8814',
    truckPlate: 'D 3391 ZY',
    driverName: 'Slamet Riyadi',
    containerNo: 'HLCU9928173',
    direction: 'GATE_IN',
    status: 'Inspected',
    timestamp: '2026-10-01 10:15',
    operator: 'Siti Gate'
  }
];

export const INITIAL_OPERATIONS: Omit<OperationActivityItem, 'id'>[] = [
  {
    containerNo: 'MSCU7849201',
    vesselCode: 'VOY-9021',
    activityType: 'DISCHARGE',
    status: 'Completed',
    equipmentNo: 'QC-01',
    timestamp: '2026-10-01 08:30'
  },
  {
    containerNo: 'MSCU8812345',
    vesselCode: 'VOY-9022',
    activityType: 'DISCHARGE',
    status: 'In Progress',
    equipmentNo: 'QC-02',
    timestamp: '2026-10-01 09:20'
  },
  {
    containerNo: 'EGLV5541908',
    vesselCode: 'VOY-9021',
    activityType: 'LOAD',
    status: 'Scheduled',
    equipmentNo: 'QC-01',
    timestamp: '2026-10-01 13:00'
  }
];

export const INITIAL_NOTIFICATIONS: Omit<NotificationItem, 'id'>[] = [
  {
    title: 'Kapal Berlabuh',
    message: 'Kapal MSC LORETTO (VOY-9021) telah berhasil bersandar di Berth 01.',
    type: 'success',
    timestamp: '2026-10-01 06:05',
    read: false
  },
  {
    title: 'Peringatan Reefer Container',
    message: 'Container MSCU8812345 (Blok B) mencatat fluktuasi suhu -18.2°C.',
    type: 'warning',
    timestamp: '2026-10-01 09:30',
    read: false
  },
  {
    title: 'Gate In Truk Baru',
    message: 'Truk B 9182 UXX memasuki Gate 2 membawa peti kemas MSCU7849201.',
    type: 'info',
    timestamp: '2026-10-01 07:30',
    read: true
  }
];

export const INITIAL_USERS: Omit<UserProfileItem, 'id'>[] = [
  { email: 'admin@terminal.id', name: 'Super Administrator', role: 'Admin', status: 'Active' },
  { email: 'operator@terminal.id', name: 'Budi Yard Operator', role: 'Yard Operator', status: 'Active' },
  { email: 'gate@terminal.id', name: 'Siti Petugas Gate', role: 'Gate Officer', status: 'Active' },
  { email: 'manager@terminal.id', name: 'Ir. Haryanto (Manager)', role: 'Operations Manager', status: 'Active' }
];
