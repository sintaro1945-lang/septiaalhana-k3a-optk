export interface ContainerItem {
  id: string;
  containerNo: string;
  size: '20ft' | '40ft' | '45ft';
  type: 'Dry' | 'Reefer' | 'Open Top' | 'Tank' | 'Flat Rack';
  status: 'Full' | 'Empty';
  grossWeight: number; // in tons
  yardLocation: string; // e.g. A-02-04
  owner: string; // Shipping line e.g. Maersk, MSC, Evergreen
  voyageNo: string;
  arrivalDate: string;
  isoCode: string;
}

export interface VesselItem {
  id: string;
  vesselName: string;
  voyageCode: string;
  eta: string;
  etd: string;
  berthNo: string;
  status: 'Scheduled' | 'Berthing' | 'Working' | 'Departed';
  totalTeus: number;
  handledTeus: number;
  shippingAgent: string;
}

export interface YardBlockItem {
  id: string;
  blockName: string;
  capacity: number;
  currentOccupied: number;
  blockType: 'General' | 'Reefer' | 'Dangerous' | 'Empty';
}

export interface GateTransactionItem {
  id: string;
  ticketNo: string;
  truckPlate: string;
  driverName: string;
  containerNo: string;
  direction: 'GATE_IN' | 'GATE_OUT';
  status: 'Approved' | 'Inspected' | 'Completed' | 'Pending';
  timestamp: string;
  operator: string;
}

export interface OperationActivityItem {
  id: string;
  containerNo: string;
  vesselCode: string;
  activityType: 'DISCHARGE' | 'LOAD' | 'SHIFT' | 'GATE_IN' | 'GATE_OUT';
  status: 'Completed' | 'In Progress' | 'Scheduled';
  equipmentNo: string;
  timestamp: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'danger';
  timestamp: string;
  read: boolean;
}

export interface UserProfileItem {
  id: string;
  email: string;
  name: string;
  role: 'Admin' | 'Yard Operator' | 'Gate Officer' | 'Operations Manager';
  status: 'Active' | 'Inactive';
}
