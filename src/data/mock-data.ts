// ============ USERS ============
export type UserRole = 'admin' | 'rep' | 'doctor';

export interface User {
  id: string;
  name: string;
  initials: string;
  email: string;
  role: UserRole;
  territory?: string;
  specialty?: string;
  practice?: string;
  npi?: string;
  phone?: string;
  avatar?: string;
}

export const users: User[] = [
  { id: 'u1', name: 'Kelly M.', initials: 'KM', email: 'kelly@medflow.com', role: 'admin', territory: 'All' },
  { id: 'u2', name: 'Clint M.', initials: 'CM', email: 'clint@medflow.com', role: 'rep', territory: 'Southeast' },
  { id: 'u3', name: 'Sara L.', initials: 'SL', email: 'sara@medflow.com', role: 'rep', territory: 'Northeast' },
  { id: 'u4', name: 'James R.', initials: 'JR', email: 'james@medflow.com', role: 'rep', territory: 'Midwest' },
  { id: 'u5', name: 'Priya N.', initials: 'PN', email: 'priya@medflow.com', role: 'rep', territory: 'West' },
  { id: 'u6', name: 'Dr. Renata Osei', initials: 'RO', email: 'rosei@uatampa.com', role: 'doctor', specialty: 'Urology', practice: 'Urology Associates', npi: '1234567890', phone: '(813) 555-0101' },
  { id: 'u7', name: 'Dr. Jin Park', initials: 'JP', email: 'jpark@parkderm.com', role: 'doctor', specialty: 'Dermatology', practice: 'Park Derm Group', npi: '2345678901', phone: '(212) 555-0102' },
  { id: 'u8', name: 'Dr. Marcus Webb', initials: 'MW', email: 'mwebb@coastalwh.com', role: 'doctor', specialty: 'OB/GYN', practice: 'Coastal Women\'s Health', npi: '3456789012', phone: '(305) 555-0103' },
  { id: 'u9', name: 'Dr. Elena Cruz', initials: 'EC', email: 'ecruz@cruzassoc.com', role: 'doctor', specialty: 'Urology', practice: 'Cruz & Associates', npi: '4567890123', phone: '(415) 555-0104' },
  { id: 'u10', name: 'Dr. Samuel Addo', initials: 'SA', email: 'saddo@tampasurg.com', role: 'doctor', specialty: 'Surgery', practice: 'Tampa Surgery Ctr', npi: '5678901234', phone: '(813) 555-0105' },
  { id: 'u11', name: 'Dr. Anika Rao', initials: 'AR', email: 'arao@raoortho.com', role: 'doctor', specialty: 'Orthopedics', practice: 'Rao Ortho Group', npi: '6789012345', phone: '(617) 555-0106' },
  { id: 'u12', name: 'Dr. Kwame Diallo', initials: 'KD', email: 'kdiallo@bostonmed.com', role: 'doctor', specialty: 'Internal Medicine', practice: 'Boston Med Group', npi: '7890123456', phone: '(617) 555-0107' },
  { id: 'u13', name: 'Dr. Lisa Kim', initials: 'LK', email: 'lkim@kimcardio.com', role: 'doctor', specialty: 'Cardiology', practice: 'Kim Cardiology', npi: '8901234567', phone: '(212) 555-0108' },
  { id: 'u14', name: 'Dr. David Foster', initials: 'DF', email: 'dfoster@fosterfm.com', role: 'doctor', specialty: 'Family Medicine', practice: 'Foster Family Med', npi: '9012345678', phone: '(312) 555-0109' },
  { id: 'u15', name: 'Dr. Yuki Tanaka', initials: 'YT', email: 'ytanaka@tanakaent.com', role: 'doctor', specialty: 'ENT', practice: 'Tanaka ENT', npi: '0123456789', phone: '(503) 555-0110' },
  { id: 'u16', name: 'Dr. Huy Nguyen', initials: 'HN', email: 'hnguyen@nguyenim.com', role: 'doctor', specialty: 'Internal Medicine', practice: 'Nguyen Internal Med', npi: '1122334455', phone: '(312) 555-0111' },
  { id: 'u17', name: 'Dr. Rachel Adams', initials: 'RA', email: 'radams@adamssurg.com', role: 'doctor', specialty: 'Surgery', practice: 'Adams Surgical', npi: '2233445566', phone: '(312) 555-0112' },
  { id: 'u18', name: 'Dr. Vikram Patel', initials: 'VP', email: 'vpatel@patelderm.com', role: 'doctor', specialty: 'Dermatology', practice: 'Patel Dermatology', npi: '3344556677', phone: '(415) 555-0113' },
  { id: 'u19', name: 'Dr. Maria Reyes', initials: 'MR', email: 'mreyes@reyesmed.com', role: 'doctor', specialty: 'Internal Medicine', practice: 'Reyes Medical', npi: '4455667788', phone: '(813) 555-0114' },
  { id: 'u20', name: 'Dr. Thomas Hill', initials: 'TH', email: 'thill@hillclinic.com', role: 'doctor', specialty: 'Urology', practice: 'Hill Clinic', npi: '5566778899', phone: '(813) 555-0115' },
  { id: 'u21', name: 'Dr. Wei Chen', initials: 'WC', email: 'wchen@chenpractice.com', role: 'doctor', specialty: 'Gastroenterology', practice: 'Chen Practice', npi: '6677889900', phone: '(813) 555-0116' },
];

export const reps = users.filter(u => u.role === 'rep');
export const doctors = users.filter(u => u.role === 'doctor');

// ============ PRODUCTS ============
export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  unit: string;
  stock: number;
  reorderThreshold: number;
  status: 'OK' | 'Low' | 'Critical';
  tag?: string;
}

export const products: Product[] = [
  { id: 'p1', name: 'MedGlide Pro 100mL', sku: 'MG-100', price: 48, unit: 'per unit', stock: 234, reorderThreshold: 100, status: 'OK', tag: 'Most Ordered' },
  { id: 'p2', name: 'MedGlide Pro 50mL', sku: 'MG-050', price: 28, unit: 'per unit', stock: 87, reorderThreshold: 150, status: 'Low' },
  { id: 'p3', name: 'MedGlide Sterile Single Use', sku: 'MG-SU', price: 12, unit: 'per 10-pack', stock: 12, reorderThreshold: 200, status: 'Critical', tag: 'New' },
  { id: 'p4', name: 'MedGlide OR Kit', sku: 'MG-ORK', price: 94, unit: 'per kit', stock: 156, reorderThreshold: 75, status: 'OK' },
];

// ============ REP PERFORMANCE ============
export interface RepPerformance {
  userId: string;
  activityScore: number;
  pipeline: number;
  dealCount: number;
  callsToday: number;
  statusBadge: 'Hot' | 'Warm' | 'Cold';
  aiBadge: string;
  goalProgress: number;
  quarterlyTarget: number;
  revenue: number;
  streak?: number;
}

export const repPerformance: RepPerformance[] = [
  { userId: 'u2', activityScore: 94, pipeline: 2840000, dealCount: 12, callsToday: 8, statusBadge: 'Hot', aiBadge: 'Crushing it', goalProgress: 82, quarterlyTarget: 300000, revenue: 284000 },
  { userId: 'u3', activityScore: 78, pipeline: 1920000, dealCount: 8, callsToday: 5, statusBadge: 'Warm', aiBadge: 'On track', goalProgress: 67, quarterlyTarget: 300000, revenue: 192000 },
  { userId: 'u4', activityScore: 61, pipeline: 1100000, dealCount: 5, callsToday: 3, statusBadge: 'Cold', aiBadge: 'Falling behind', goalProgress: 41, quarterlyTarget: 300000, revenue: 110000 },
  { userId: 'u5', activityScore: 88, pipeline: 3200000, dealCount: 14, callsToday: 9, statusBadge: 'Hot', aiBadge: 'Crushing it', goalProgress: 91, quarterlyTarget: 300000, revenue: 320000, streak: 14 },
];

// ============ DOCTOR ACCOUNTS ============
export interface DoctorAccount {
  userId: string;
  lastContact: string;
  lastContactDays: number;
  cadenceStatus: 'green' | 'amber' | 'red';
  lifetimeValue: number;
  tier: 'Top' | 'Repeat' | 'At Risk' | 'Cold';
  assignedRep: string;
  cadenceRule: number;
}

export const doctorAccounts: DoctorAccount[] = [
  { userId: 'u6', lastContact: '3 days ago', lastContactDays: 3, cadenceStatus: 'green', lifetimeValue: 48000, tier: 'Repeat', assignedRep: 'u2', cadenceRule: 21 },
  { userId: 'u7', lastContact: 'Today', lastContactDays: 0, cadenceStatus: 'green', lifetimeValue: 92000, tier: 'Top', assignedRep: 'u5', cadenceRule: 14 },
  { userId: 'u8', lastContact: 'Never', lastContactDays: 999, cadenceStatus: 'red', lifetimeValue: 0, tier: 'Cold', assignedRep: 'u2', cadenceRule: 30 },
  { userId: 'u9', lastContact: '31 days ago', lastContactDays: 31, cadenceStatus: 'red', lifetimeValue: 28000, tier: 'At Risk', assignedRep: 'u3', cadenceRule: 10 },
  { userId: 'u10', lastContact: '8 days ago', lastContactDays: 8, cadenceStatus: 'amber', lifetimeValue: 67000, tier: 'Repeat', assignedRep: 'u2', cadenceRule: 21 },
];

// ============ PIPELINE ============
export interface PipelineStage {
  name: string;
  deals: number;
  value: number;
}

export const pipelineStages: PipelineStage[] = [
  { name: 'Conference Lead', deals: 47, value: 940000 },
  { name: 'Contacted', deals: 31, value: 1550000 },
  { name: 'Sample Sent', deals: 18, value: 1800000 },
  { name: 'In Evaluation', deals: 9, value: 2250000 },
  { name: 'Contract Out', deals: 4, value: 1600000 },
  { name: 'Closed Won', deals: 2, value: 800000 },
];

export interface Deal {
  id: string;
  doctorId: string;
  doctorName: string;
  practice: string;
  value: number;
  stage: string;
  daysInStage: number;
  winProbability: number;
  repId: string;
  aiFlag?: string;
}

export const deals: Deal[] = [
  { id: 'd1', doctorId: 'u6', doctorName: 'Dr. Osei', practice: 'Urology Associates', value: 120000, stage: 'In Evaluation', daysInStage: 6, winProbability: 72, repId: 'u2' },
  { id: 'd2', doctorId: 'u7', doctorName: 'Dr. Park', practice: 'Park Derm Group', value: 92000, stage: 'Closed Won', daysInStage: 0, winProbability: 100, repId: 'u5' },
  { id: 'd3', doctorId: 'u8', doctorName: 'Dr. Webb', practice: 'Coastal Women\'s Health', value: 80000, stage: 'Sample Sent', daysInStage: 18, winProbability: 48, repId: 'u2', aiFlag: '18 days. Avg 9. Suggest visit.' },
  { id: 'd4', doctorId: 'u9', doctorName: 'Dr. Cruz', practice: 'Cruz & Associates', value: 55000, stage: 'Contacted', daysInStage: 12, winProbability: 35, repId: 'u2' },
  { id: 'd5', doctorName: 'St. Luke\'s Hospital', doctorId: '', practice: 'St. Luke\'s Hospital', value: 180000, stage: 'Contract Out', daysInStage: 4, winProbability: 85, repId: 'u2' },
  { id: 'd6', doctorName: 'Dr. Reyes', doctorId: '', practice: 'Reyes Medical', value: 40000, stage: 'Conference Lead', daysInStage: 3, winProbability: 22, repId: 'u2' },
  { id: 'd7', doctorName: 'Dr. Hill', doctorId: '', practice: 'Hill Clinic', value: 28000, stage: 'Conference Lead', daysInStage: 7, winProbability: 18, repId: 'u2' },
  { id: 'd8', doctorName: 'Dr. Chen', doctorId: '', practice: 'Chen Practice', value: 32000, stage: 'Contacted', daysInStage: 5, winProbability: 41, repId: 'u2' },
  { id: 'd9', doctorName: 'Dr. Rao', doctorId: '', practice: 'Rao Ortho Group', value: 95000, stage: 'In Evaluation', daysInStage: 8, winProbability: 65, repId: 'u3', aiFlag: 'High engagement on last visit. Push for trial.' },
  { id: 'd10', doctorName: 'Dr. Diallo', doctorId: '', practice: 'Boston Med Group', value: 48000, stage: 'Sample Sent', daysInStage: 5, winProbability: 52, repId: 'u3' },
  { id: 'd11', doctorName: 'Dr. Kim', doctorId: '', practice: 'Kim Cardiology', value: 135000, stage: 'Contract Out', daysInStage: 2, winProbability: 88, repId: 'u3' },
  { id: 'd12', doctorName: 'Dr. Foster', doctorId: '', practice: 'Foster Family Medicine', value: 35000, stage: 'Conference Lead', daysInStage: 4, winProbability: 20, repId: 'u3' },
  { id: 'd13', doctorName: 'Dr. Tanaka', doctorId: '', practice: 'Tanaka ENT', value: 62000, stage: 'Contacted', daysInStage: 9, winProbability: 38, repId: 'u3' },
  { id: 'd14', doctorName: 'Dr. Nguyen', doctorId: '', practice: 'Nguyen Internal Med', value: 78000, stage: 'In Evaluation', daysInStage: 3, winProbability: 60, repId: 'u4' },
  { id: 'd15', doctorName: 'Dr. Adams', doctorId: '', practice: 'Adams Surgical', value: 110000, stage: 'Sample Sent', daysInStage: 11, winProbability: 45, repId: 'u4', aiFlag: '11 days in stage. Follow up recommended.' },
  { id: 'd16', doctorName: 'Dr. Patel', doctorId: '', practice: 'Patel Dermatology', value: 42000, stage: 'Contacted', daysInStage: 6, winProbability: 33, repId: 'u5' },
];

// ============ ORDERS ============
export interface Order {
  id: string;
  doctorId: string;
  date: string;
  items: { productId: string; name: string; qty: number; price: number }[];
  total: number;
  status: 'Delivered' | 'Processing' | 'Shipped';
}

export const orders: Order[] = [
  { id: 'ORD-0091', doctorId: 'u6', date: 'Mar 6', items: [{ productId: 'p1', name: 'MedGlide Pro 100mL', qty: 24, price: 48 }], total: 1152, status: 'Delivered' },
  { id: 'ORD-0084', doctorId: 'u6', date: 'Feb 18', items: [{ productId: 'p1', name: 'MedGlide Pro 100mL', qty: 12, price: 48 }, { productId: 'p4', name: 'MedGlide OR Kit', qty: 4, price: 94 }], total: 952, status: 'Delivered' },
  { id: 'ORD-0077', doctorId: 'u6', date: 'Jan 29', items: [{ productId: 'p1', name: 'MedGlide Pro 100mL', qty: 24, price: 48 }, { productId: 'p3', name: 'MedGlide Sterile Single Use', qty: 10, price: 12 }], total: 1272, status: 'Delivered' },
  { id: 'ORD-0069', doctorId: 'u6', date: 'Jan 5', items: [{ productId: 'p1', name: 'MedGlide Pro 100mL', qty: 12, price: 48 }], total: 576, status: 'Delivered' },
  { id: 'ORD-0090', doctorId: 'u7', date: 'Yesterday', items: [{ productId: 'p1', name: 'MedGlide Pro 100mL', qty: 30, price: 48 }], total: 1440, status: 'Delivered' },
  { id: 'ORD-0089', doctorId: 'u10', date: 'Mar 6', items: [{ productId: 'p4', name: 'MedGlide OR Kit', qty: 8, price: 94 }], total: 752, status: 'Delivered' },
];

// ============ COMMS / ACTIVITY ============
export interface CommEntry {
  id: string;
  repId: string;
  repName: string;
  target: string;
  type: 'call' | 'text' | 'email' | 'video' | 'presentation';
  duration?: string;
  message?: string;
  outcome?: string;
  outcomeBadge?: 'Ordered' | 'Interested' | 'Voicemail' | 'Follow-up' | 'Not Interested';
  time: string;
  isLive?: boolean;
  slideCount?: number;
  engagement?: string;
}

export const commEntries: CommEntry[] = [
  { id: 'c1', repId: 'u2', repName: 'Clint M.', target: 'St. Luke\'s Hospital', type: 'call', time: 'Now', isLive: true, message: 'In progress...' },
  { id: 'c2', repId: 'u5', repName: 'Priya N.', target: 'Dr. Jin Park', type: 'call', duration: '11m 18s', outcomeBadge: 'Ordered', time: '10:02 AM' },
  { id: 'c3', repId: 'u5', repName: 'Priya N.', target: 'Dr. Jin Park', type: 'text', message: 'Pricing sheet sent as promised!', time: '9:31 AM' },
  { id: 'c4', repId: 'u2', repName: 'Clint M.', target: 'Dr. Renata Osei', type: 'call', duration: '6m 42s', outcomeBadge: 'Interested', time: '9:14 AM' },
  { id: 'c5', repId: 'u2', repName: 'Clint M.', target: 'Dr. Osei', type: 'presentation', slideCount: 8, duration: '12 min', engagement: 'High', time: '9:00 AM', message: 'Product Overview — 8 slides, 12 min, High engagement' },
  { id: 'c6', repId: 'u3', repName: 'Sara L.', target: 'Dr. Marcus Webb', type: 'call', duration: '2m 05s', outcomeBadge: 'Voicemail', time: 'Yesterday' },
  { id: 'c7', repId: 'u4', repName: 'James R.', target: 'Dr. Nguyen', type: 'call', duration: '8m 32s', outcomeBadge: 'Interested', time: 'Yesterday' },
  { id: 'c8', repId: 'u3', repName: 'Sara L.', target: 'Dr. Rao', type: 'email', message: 'Sent clinical trial results for MedGlide Pro', time: 'Yesterday' },
  { id: 'c9', repId: 'u2', repName: 'Clint M.', target: 'Dr. Elena Cruz', type: 'call', duration: '1m 12s', outcomeBadge: 'Voicemail', time: 'Yesterday' },
  { id: 'c10', repId: 'u5', repName: 'Priya N.', target: 'Dr. Patel', type: 'video', duration: '22m 10s', outcomeBadge: 'Ordered', time: 'Yesterday', message: 'Virtual demo — placed 50-unit order' },
  { id: 'c11', repId: 'u4', repName: 'James R.', target: 'Dr. Adams', type: 'text', message: 'Following up on sample kit — any feedback?', time: 'Yesterday' },
  { id: 'c12', repId: 'u3', repName: 'Sara L.', target: 'Dr. Kim', type: 'call', duration: '14m 45s', outcomeBadge: 'Ordered', time: '2 days ago' },
  { id: 'c13', repId: 'u2', repName: 'Clint M.', target: 'Dr. Reyes', type: 'presentation', slideCount: 12, duration: '18 min', engagement: 'Medium', time: '2 days ago', message: 'Full product line overview — 12 slides, 18 min, Medium engagement' },
  { id: 'c14', repId: 'u5', repName: 'Priya N.', target: 'Tampa Surgery Center', type: 'call', duration: '5m 20s', outcomeBadge: 'Follow-up', time: '2 days ago' },
  { id: 'c15', repId: 'u4', repName: 'James R.', target: 'Dr. Foster', type: 'email', message: 'Bulk pricing proposal attached for Q2', time: '2 days ago' },
  { id: 'c16', repId: 'u3', repName: 'Sara L.', target: 'Dr. Diallo', type: 'call', duration: '9m 55s', outcomeBadge: 'Interested', time: '3 days ago' },
  { id: 'c17', repId: 'u2', repName: 'Clint M.', target: 'Dr. Webb', type: 'text', message: 'Sample kit tracking #: shipped via FedEx', time: '3 days ago' },
  { id: 'c18', repId: 'u5', repName: 'Priya N.', target: 'Dr. Tanaka', type: 'call', duration: '3m 40s', outcomeBadge: 'Not Interested', time: '3 days ago' },
  { id: 'c19', repId: 'u4', repName: 'James R.', target: 'Chicago Med Group', type: 'video', duration: '30m 00s', outcomeBadge: 'Follow-up', time: '4 days ago', message: 'Group demo for surgical team — scheduling trial' },
  { id: 'c20', repId: 'u3', repName: 'Sara L.', target: 'Dr. Foster', type: 'call', duration: '7m 15s', outcomeBadge: 'Interested', time: '4 days ago' },
];

// ============ TASKS ============
export interface RepTask {
  id: string;
  repId: string;
  doctorName: string;
  practice: string;
  description: string;
  time: string;
  urgency: 'high' | 'medium' | 'low';
  type: 'call' | 'email' | 'visit' | 'video' | 'presentation' | 'auto';
  aiTip?: string;
  completed: boolean;
}

export const repTasks: RepTask[] = [
  { id: 't1', repId: 'u2', doctorName: 'Dr. Renata Osei', practice: 'Urology Associates', description: 'Follow up on pricing — ready to reorder', time: '9:00 AM', urgency: 'high', type: 'call', aiTip: 'She mentioned running low last call. Lead with bulk pricing.', completed: false },
  { id: 't2', repId: 'u2', doctorName: 'St. Luke\'s Hospital', practice: 'St. Luke\'s Hospital', description: 'GPO contract renewal', time: '3:00 PM', urgency: 'high', type: 'call', completed: false },
  { id: 't3', repId: 'u2', doctorName: 'Tampa Surgery Center', practice: 'Tampa Surgery Center', description: 'Send Q3 pricing sheet', time: '10:30 AM', urgency: 'medium', type: 'email', completed: false },
  { id: 't4', repId: 'u2', doctorName: 'Dr. Marcus Webb', practice: 'Coastal Women\'s Health', description: 'OB/GYN cold intro visit', time: '1:00 PM', urgency: 'low', type: 'visit', aiTip: 'First visit. Bring Product Overview deck and sample kit.', completed: false },
  { id: 't5', repId: 'u2', doctorName: 'Dr. Elena Cruz', practice: 'Cruz & Associates', description: '31 days overdue (At Risk, cadence: 10 days)', time: '', urgency: 'high', type: 'auto', completed: false },
  { id: 't6', repId: 'u3', doctorName: 'Dr. Jin Park', practice: 'Park Derm Group', description: 'Follow up on sample results', time: '9:30 AM', urgency: 'high', type: 'call', aiTip: 'Dr. Park loved the samples. Push for bulk order.', completed: false },
  { id: 't7', repId: 'u3', doctorName: 'Dr. Elena Cruz', practice: 'Cruz & Associates', description: 'Send clinical study data', time: '11:00 AM', urgency: 'medium', type: 'email', completed: false },
  { id: 't8', repId: 'u3', doctorName: 'Boston Med Group', practice: 'Boston Med Group', description: 'Intro call with Dr. Diallo', time: '2:00 PM', urgency: 'low', type: 'call', completed: false },
];

// ============ NOTIFICATIONS ============
export interface Notification {
  id: string;
  text: string;
  icon: 'destructive' | 'success' | 'warning' | 'info' | 'offline';
  time: string;
  read: boolean;
  forRole: UserRole;
  forUserId?: string;
}

export const notifications: Notification[] = [
  // Admin-only
  { id: 'n1', text: 'MedGlide Sterile Single Use — CRITICAL stock (12 units)', icon: 'destructive', time: '2m ago', read: false, forRole: 'admin' },
  { id: 'n4', text: 'James R. — no activity logged in 24 hours', icon: 'offline', time: '2h ago', read: true, forRole: 'admin' },
  { id: 'n5', text: 'Clint M. submitted expense — $42 lunch with Dr. Osei', icon: 'info', time: '3h ago', read: true, forRole: 'admin' },
  { id: 'n6', text: '3 Top-tier doctors overdue for contact', icon: 'destructive', time: '4h ago', read: true, forRole: 'admin' },
  { id: 'n7', text: 'Priya N. hit 75% of Q1 revenue target', icon: 'success', time: '5h ago', read: true, forRole: 'admin' },
  { id: 'n8', text: 'Product Overview deck expires in 7 days', icon: 'warning', time: '6h ago', read: true, forRole: 'admin' },
  // Rep — Clint
  { id: 'n10', text: 'Dr. Jin Park placed an order — 30 units MedGlide Pro', icon: 'success', time: '15m ago', read: false, forRole: 'rep', forUserId: 'u2' },
  { id: 'n11', text: 'Dr. Elena Cruz going cold — no contact in 31 days', icon: 'warning', time: '1h ago', read: false, forRole: 'rep', forUserId: 'u2' },
  { id: 'n12', text: 'New training module available: Objection Handling 201', icon: 'info', time: '3h ago', read: true, forRole: 'rep', forUserId: 'u2' },
  // Rep — Sara
  { id: 'n13', text: 'Dr. Anika Rao requested a quote', icon: 'success', time: '20m ago', read: false, forRole: 'rep', forUserId: 'u3' },
  { id: 'n14', text: 'Route updated — 2 new stops added for tomorrow', icon: 'info', time: '2h ago', read: true, forRole: 'rep', forUserId: 'u3' },
  // Doctor — Dr. Osei
  { id: 'n20', text: 'Your order #1042 has shipped', icon: 'success', time: '10m ago', read: false, forRole: 'doctor', forUserId: 'u5' },
  { id: 'n21', text: 'New product guide available: MedGlide Pro tips', icon: 'info', time: '1h ago', read: true, forRole: 'doctor', forUserId: 'u5' },
  // Doctor — Dr. Park
  { id: 'n22', text: 'Your rep Clint M. shared a new brochure', icon: 'info', time: '30m ago', read: false, forRole: 'doctor', forUserId: 'u6' },
];

// ============ APPROVALS ============
export interface Approval {
  id: string;
  type: 'compliance' | 'expense' | 'discount' | 'content' | 'deal';
  title: string;
  description: string;
  amount?: string;
  repName: string;
  status: 'pending' | 'approved' | 'rejected';
  aiSuggested?: boolean;
}

export const approvals: Approval[] = [
  { id: 'a1', type: 'compliance', title: 'Lunch with Dr. Osei', description: 'Detected from call notes', amount: '$38', repName: 'Clint M.', status: 'pending', aiSuggested: true },
  { id: 'a2', type: 'expense', title: 'Mileage reimbursement', description: '101 miles Tampa route', amount: '$67.50', repName: 'Clint M.', status: 'pending' },
  { id: 'a3', type: 'discount', title: '10% off bulk order for Dr. Webb', description: '$2,400 order', amount: '$240', repName: 'Sara L.', status: 'pending' },
  { id: 'a4', type: 'content', title: 'Q1 Clinical Study deck', description: 'New deck uploaded — needs review', repName: 'Kelly M.', status: 'pending' },
  { id: 'a5', type: 'deal', title: 'St. Luke\'s $180K deal', description: 'Above $100K approval threshold', amount: '$180K', repName: 'Priya N.', status: 'pending' },
];

// ============ LEADERBOARD ============
export interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  initials: string;
  score: string;
  trend: 'up' | 'down' | 'same';
  trendAmount?: number;
  streak?: number;
}

export const leaderboard: LeaderboardEntry[] = [
  { rank: 1, userId: 'u5', name: 'Priya N.', initials: 'PN', score: '$320K', trend: 'up', trendAmount: 2, streak: 14 },
  { rank: 2, userId: 'u2', name: 'Clint M.', initials: 'CM', score: '$284K', trend: 'up', trendAmount: 1 },
  { rank: 3, userId: 'u3', name: 'Sara L.', initials: 'SL', score: '$192K', trend: 'down', trendAmount: 1 },
  { rank: 4, userId: 'u4', name: 'James R.', initials: 'JR', score: '$110K', trend: 'same' },
];

// ============ REVENUE ============
export const revenueData = [
  { month: 'Jan', actual: 98000, projected: null },
  { month: 'Feb', actual: 112000, projected: null },
  { month: 'Mar', actual: 124000, projected: null },
  { month: 'Apr', actual: null, projected: 138000 },
  { month: 'May', actual: null, projected: 145000 },
];

// ============ NPI SEARCH MOCK ============
export interface NPIResult {
  name: string;
  specialty: string;
  city: string;
  state: string;
  npi: string;
  practice: string;
  phone: string;
  credential: string;
}

export const npiDatabase: NPIResult[] = [
  { name: 'Dr. Renata Osei', specialty: 'Urology', city: 'Tampa', state: 'FL', npi: '1234567890', practice: 'Urology Associates', phone: '(813) 555-0101', credential: 'MD' },
  { name: 'Dr. Jin Park', specialty: 'Dermatology', city: 'New York', state: 'NY', npi: '2345678901', practice: 'Park Derm Group', phone: '(212) 555-0102', credential: 'MD' },
  { name: 'Dr. Marcus Webb', specialty: 'OB/GYN', city: 'Miami', state: 'FL', npi: '3456789012', practice: 'Coastal Women\'s Health', phone: '(305) 555-0103', credential: 'DO' },
  { name: 'Dr. Elena Cruz', specialty: 'Urology', city: 'San Francisco', state: 'CA', npi: '4567890123', practice: 'Cruz & Associates', phone: '(415) 555-0104', credential: 'MD' },
  { name: 'Dr. Samuel Addo', specialty: 'Surgery', city: 'Tampa', state: 'FL', npi: '5678901234', practice: 'Tampa Surgery Ctr', phone: '(813) 555-0105', credential: 'MD' },
  { name: 'Dr. Maria Diallo', specialty: 'Internal Medicine', city: 'Boston', state: 'MA', npi: '6789012345', practice: 'Boston Med Group', phone: '(617) 555-0106', credential: 'MD' },
  { name: 'Dr. Carlos Reyes', specialty: 'Orthopedics', city: 'Chicago', state: 'IL', npi: '7890123456', practice: 'Reyes Ortho', phone: '(312) 555-0107', credential: 'MD' },
];

// ============ EXPENSES ============
export interface Expense {
  id: number;
  repId: string;
  date: string;
  type: string;
  amount: number;
  desc: string;
  status: 'Pending' | 'Approved' | 'Draft';
}

export const expenses: Expense[] = [
  { id: 1, repId: 'u2', date: 'Mar 6', type: 'Meal', amount: 42, desc: 'Lunch with Dr. Osei', status: 'Pending' },
  { id: 2, repId: 'u2', date: 'Mar 5', type: 'Mileage', amount: 67.50, desc: '101 mi · Tampa route', status: 'Approved' },
  { id: 3, repId: 'u2', date: 'Mar 4', type: 'Supplies', amount: 24, desc: 'Shipping materials', status: 'Draft' },
  { id: 4, repId: 'u2', date: 'Mar 3', type: 'Meal', amount: 38, desc: 'Coffee with Dr. Addo', status: 'Approved' },
  { id: 5, repId: 'u3', date: 'Mar 6', type: 'Meal', amount: 55, desc: 'Dinner with Dr. Cruz', status: 'Pending' },
  { id: 6, repId: 'u3', date: 'Mar 4', type: 'Mileage', amount: 89, desc: '132 mi · Northeast loop', status: 'Approved' },
  { id: 7, repId: 'u3', date: 'Mar 2', type: 'Supplies', amount: 31, desc: 'Sample packaging', status: 'Approved' },
  { id: 8, repId: 'u4', date: 'Mar 5', type: 'Meal', amount: 36, desc: 'Lunch with Dr. Reyes', status: 'Draft' },
  { id: 9, repId: 'u4', date: 'Mar 3', type: 'Mileage', amount: 45, desc: '67 mi · Chicago route', status: 'Pending' },
  { id: 10, repId: 'u5', date: 'Mar 6', type: 'Meal', amount: 62, desc: 'Dinner with Dr. Park', status: 'Approved' },
  { id: 11, repId: 'u5', date: 'Mar 5', type: 'Mileage', amount: 112, desc: '166 mi · West Coast run', status: 'Approved' },
  { id: 12, repId: 'u5', date: 'Mar 4', type: 'Supplies', amount: 48, desc: 'Demo materials', status: 'Pending' },
];

// ============ ROUTE STOPS ============
export interface RouteStop {
  num: number;
  repId: string;
  time: string;
  name: string;
  address: string;
  drive: string | null;
}

export const routeStops: RouteStop[] = [
  { num: 1, repId: 'u2', time: '9:00 AM', name: 'Dr. Osei', address: '4812 N Dale Mabry Hwy', drive: null },
  { num: 2, repId: 'u2', time: '10:30 AM', name: 'Tampa Surgery Ctr', address: '2901 W Swann Ave', drive: '12 min' },
  { num: 3, repId: 'u2', time: '1:00 PM', name: 'Dr. Webb', address: '509 S Armenia Ave', drive: '8 min' },
  { num: 4, repId: 'u2', time: '3:00 PM', name: "St. Luke's Hospital", address: '4801 Van Dyke Rd', drive: '22 min' },
  { num: 1, repId: 'u3', time: '8:30 AM', name: 'Dr. Cruz', address: '120 E 56th St', drive: null },
  { num: 2, repId: 'u3', time: '10:00 AM', name: 'Boston Med Group', address: '300 Longwood Ave', drive: '18 min' },
  { num: 3, repId: 'u3', time: '12:30 PM', name: 'Dr. Diallo', address: '55 Fruit St', drive: '10 min' },
  { num: 1, repId: 'u4', time: '9:30 AM', name: 'Dr. Reyes', address: '680 N Lake Shore Dr', drive: null },
  { num: 2, repId: 'u4', time: '11:30 AM', name: 'Midwest Clinic', address: '1500 S Michigan Ave', drive: '15 min' },
  { num: 1, repId: 'u5', time: '9:00 AM', name: 'Dr. Park', address: '233 Sansome St', drive: null },
  { num: 2, repId: 'u5', time: '11:00 AM', name: 'Pacific Health Ctr', address: '450 Sutter St', drive: '14 min' },
  { num: 3, repId: 'u5', time: '1:30 PM', name: 'Bay Area Surgical', address: '100 S Ellsworth Ave', drive: '20 min' },
  { num: 4, repId: 'u5', time: '3:30 PM', name: 'Dr. Tanaka', address: '795 Folsom St', drive: '11 min' },
];

// ============ QUOTES ============
export interface Quote {
  id: string;
  repId: string;
  doctor: string;
  total: number;
  status: 'Sent' | 'Viewed' | 'Signed' | 'Expired';
  date: string;
}

export const quotes: Quote[] = [
  { id: 'Q-0041', repId: 'u2', doctor: 'Dr. Osei', total: 1528, status: 'Sent', date: 'Mar 6' },
  { id: 'Q-0040', repId: 'u2', doctor: 'Dr. Park', total: 2880, status: 'Viewed', date: 'Mar 3' },
  { id: 'Q-0039', repId: 'u2', doctor: "St. Luke's", total: 8460, status: 'Signed', date: 'Feb 28' },
  { id: 'Q-0038', repId: 'u2', doctor: 'Dr. Cruz', total: 960, status: 'Expired', date: 'Feb 15' },
  { id: 'Q-0037', repId: 'u3', doctor: 'Dr. Diallo', total: 3200, status: 'Sent', date: 'Mar 5' },
  { id: 'Q-0036', repId: 'u3', doctor: 'Dr. Cruz', total: 1440, status: 'Signed', date: 'Mar 1' },
  { id: 'Q-0035', repId: 'u3', doctor: 'Boston Med', total: 5100, status: 'Viewed', date: 'Feb 22' },
  { id: 'Q-0034', repId: 'u4', doctor: 'Dr. Reyes', total: 2100, status: 'Sent', date: 'Mar 4' },
  { id: 'Q-0033', repId: 'u4', doctor: 'Midwest Clinic', total: 4500, status: 'Expired', date: 'Feb 10' },
  { id: 'Q-0032', repId: 'u5', doctor: 'Dr. Park', total: 6200, status: 'Signed', date: 'Mar 6' },
  { id: 'Q-0031', repId: 'u5', doctor: 'Bay Area Surgical', total: 9800, status: 'Viewed', date: 'Mar 2' },
  { id: 'Q-0030', repId: 'u5', doctor: 'Dr. Tanaka', total: 1850, status: 'Sent', date: 'Feb 27' },
];

// ============ CALENDAR EVENTS ============
export interface CalendarEvent {
  repId: string;
  day: string;
  time: string;
  title: string;
  type: string;
}

export const calendarEvents: CalendarEvent[] = [
  { repId: 'u2', day: 'Mon', time: '9:00 AM', title: 'Call Dr. Osei', type: 'Call' },
  { repId: 'u2', day: 'Mon', time: '1:00 PM', title: 'Visit Dr. Webb', type: 'Visit' },
  { repId: 'u2', day: 'Thu', time: '11:00 AM', title: 'Presentation Tampa Surgery', type: 'Presentation' },
  { repId: 'u2', day: 'Fri', time: '9:00 AM', title: "Follow-up St. Luke's", type: 'Follow-up' },
  { repId: 'u3', day: 'Tue', time: '9:30 AM', title: 'Call Dr. Cruz', type: 'Call' },
  { repId: 'u3', day: 'Wed', time: '2:00 PM', title: 'Visit Boston Med', type: 'Visit' },
  { repId: 'u3', day: 'Fri', time: '10:00 AM', title: 'Email follow-up Dr. Diallo', type: 'Follow-up' },
  { repId: 'u4', day: 'Mon', time: '10:00 AM', title: 'Call Dr. Reyes', type: 'Call' },
  { repId: 'u4', day: 'Wed', time: '3:00 PM', title: 'Visit Midwest Clinic', type: 'Visit' },
  { repId: 'u5', day: 'Tue', time: '10:00 AM', title: 'Video Demo Dr. Park', type: 'Video Demo' },
  { repId: 'u5', day: 'Wed', time: '2:00 PM', title: 'Training Session', type: 'Training' },
  { repId: 'u5', day: 'Thu', time: '1:00 PM', title: 'Visit Bay Area Surgical', type: 'Visit' },
  { repId: 'u5', day: 'Fri', time: '3:00 PM', title: 'Call Dr. Tanaka', type: 'Call' },
];
