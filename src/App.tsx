import React, { useState, useEffect } from 'react';
import { 
  collection, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs 
} from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { db, auth, OperationType, handleFirestoreError } from './firebase';
import { 
  ContainerItem, 
  VesselItem, 
  YardBlockItem, 
  GateTransactionItem, 
  OperationActivityItem, 
  NotificationItem, 
  UserProfileItem 
} from './types';
import { 
  INITIAL_CONTAINERS, 
  INITIAL_VESSELS, 
  INITIAL_YARD_BLOCKS, 
  INITIAL_GATE_TRANSACTIONS, 
  INITIAL_OPERATIONS, 
  INITIAL_NOTIFICATIONS, 
  INITIAL_USERS 
} from './seedData';

import { Login } from './components/Login';
import { Navbar } from './components/Navbar';
import { Sidebar, TabType } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { MasterDataView } from './components/MasterDataView';
import { TransactionView } from './components/TransactionView';
import { ReportView } from './components/ReportView';
import { TrackingView } from './components/TrackingView';
import { AIAssistantView } from './components/AIAssistantView';

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [currentTab, setCurrentTab] = useState<TabType>('dashboard');

  // Firestore data states
  const [containers, setContainers] = useState<ContainerItem[]>([]);
  const [vessels, setVessels] = useState<VesselItem[]>([]);
  const [yardBlocks, setYardBlocks] = useState<YardBlockItem[]>([]);
  const [gateTransactions, setGateTransactions] = useState<GateTransactionItem[]>([]);
  const [operations, setOperations] = useState<OperationActivityItem[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [users, setUsers] = useState<UserProfileItem[]>([]);
  const [seeding, setSeeding] = useState(false);

  // Check Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        const localUserEmail = localStorage.getItem('terminal_user');
        if (localUserEmail) {
          setUser({ email: localUserEmail, uid: 'local-user' });
        } else {
          setUser(null);
        }
      }
      setAuthChecked(true);
    });
    return () => unsubscribe();
  }, []);

  // Real-time Firestore Listeners
  useEffect(() => {
    if (!user) return;

    const unsubContainers = onSnapshot(collection(db, 'containers'), (snapshot) => {
      const list: ContainerItem[] = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as ContainerItem));
      setContainers(list);
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'containers'));

    const unsubVessels = onSnapshot(collection(db, 'vessels'), (snapshot) => {
      const list: VesselItem[] = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as VesselItem));
      setVessels(list);
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'vessels'));

    const unsubYard = onSnapshot(collection(db, 'yardBlocks'), (snapshot) => {
      const list: YardBlockItem[] = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as YardBlockItem));
      setYardBlocks(list);
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'yardBlocks'));

    const unsubGate = onSnapshot(collection(db, 'gateTransactions'), (snapshot) => {
      const list: GateTransactionItem[] = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as GateTransactionItem));
      setGateTransactions(list);
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'gateTransactions'));

    const unsubOps = onSnapshot(collection(db, 'operations'), (snapshot) => {
      const list: OperationActivityItem[] = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as OperationActivityItem));
      setOperations(list);
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'operations'));

    const unsubNotif = onSnapshot(collection(db, 'notifications'), (snapshot) => {
      const list: NotificationItem[] = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as NotificationItem));
      setNotifications(list);
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'notifications'));

    const unsubUsers = onSnapshot(collection(db, 'users'), (snapshot) => {
      const list: UserProfileItem[] = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as UserProfileItem));
      setUsers(list);
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'users'));

    return () => {
      unsubContainers();
      unsubVessels();
      unsubYard();
      unsubGate();
      unsubOps();
      unsubNotif();
      unsubUsers();
    };
  }, [user]);

  // Seed Initial Data function
  const handleSeedData = async () => {
    setSeeding(true);
    try {
      // Check if containers exist, if not seed all
      const cSnap = await getDocs(collection(db, 'containers'));
      if (cSnap.empty) {
        for (const item of INITIAL_CONTAINERS) {
          await addDoc(collection(db, 'containers'), item);
        }
        for (const item of INITIAL_VESSELS) {
          await addDoc(collection(db, 'vessels'), item);
        }
        for (const item of INITIAL_YARD_BLOCKS) {
          await addDoc(collection(db, 'yardBlocks'), item);
        }
        for (const item of INITIAL_GATE_TRANSACTIONS) {
          await addDoc(collection(db, 'gateTransactions'), item);
        }
        for (const item of INITIAL_OPERATIONS) {
          await addDoc(collection(db, 'operations'), item);
        }
        for (const item of INITIAL_NOTIFICATIONS) {
          await addDoc(collection(db, 'notifications'), item);
        }
        for (const item of INITIAL_USERS) {
          await addDoc(collection(db, 'users'), item);
        }
      }
      alert('Data contoh berhasil dimuat ke database Firestore!');
    } catch (error) {
      console.error(error);
      alert('Gagal memuat seed data.');
    } finally {
      setSeeding(false);
    }
  };

  // CRUD Handlers for Containers
  const handleAddContainer = async (item: Omit<ContainerItem, 'id'>) => {
    try {
      await addDoc(collection(db, 'containers'), item);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'containers');
    }
  };

  const handleUpdateContainer = async (id: string, item: Partial<ContainerItem>) => {
    try {
      await updateDoc(doc(db, 'containers', id), item);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `containers/${id}`);
    }
  };

  const handleDeleteContainer = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'containers', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `containers/${id}`);
    }
  };

  // CRUD Handlers for Vessels
  const handleAddVessel = async (item: Omit<VesselItem, 'id'>) => {
    try {
      await addDoc(collection(db, 'vessels'), item);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'vessels');
    }
  };

  const handleUpdateVessel = async (id: string, item: Partial<VesselItem>) => {
    try {
      await updateDoc(doc(db, 'vessels', id), item);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `vessels/${id}`);
    }
  };

  const handleDeleteVessel = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'vessels', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `vessels/${id}`);
    }
  };

  // CRUD Handlers for Yard Blocks
  const handleAddYardBlock = async (item: Omit<YardBlockItem, 'id'>) => {
    try {
      await addDoc(collection(db, 'yardBlocks'), item);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'yardBlocks');
    }
  };

  const handleUpdateYardBlock = async (id: string, item: Partial<YardBlockItem>) => {
    try {
      await updateDoc(doc(db, 'yardBlocks', id), item);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `yardBlocks/${id}`);
    }
  };

  const handleDeleteYardBlock = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'yardBlocks', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `yardBlocks/${id}`);
    }
  };

  // CRUD Handlers for Gate Transactions
  const handleAddGateTransaction = async (item: Omit<GateTransactionItem, 'id'>) => {
    try {
      await addDoc(collection(db, 'gateTransactions'), item);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'gateTransactions');
    }
  };

  const handleDeleteGateTransaction = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'gateTransactions', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `gateTransactions/${id}`);
    }
  };

  // CRUD Handlers for Operations
  const handleAddOperation = async (item: Omit<OperationActivityItem, 'id'>) => {
    try {
      await addDoc(collection(db, 'operations'), item);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'operations');
    }
  };

  const handleDeleteOperation = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'operations', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `operations/${id}`);
    }
  };

  // CRUD Handlers for Users
  const handleAddUser = async (item: Omit<UserProfileItem, 'id'>) => {
    try {
      await addDoc(collection(db, 'users'), item);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'users');
    }
  };

  const handleDeleteUser = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'users', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `users/${id}`);
    }
  };

  // Mark notification read
  const handleMarkNotificationRead = async (id: string) => {
    try {
      await updateDoc(doc(db, 'notifications', id), { read: true });
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem('terminal_user');
    try {
      await signOut(auth);
    } catch (e) {
      // ignore
    }
    setUser(null);
  };

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-cyan-400">
        <div className="animate-pulse font-medium">Memuat PortTerminal Pro OS...</div>
      </div>
    );
  }

  if (!user) {
    return <Login onLoginSuccess={(email) => setUser({ email: email || 'admin@terminal.id', uid: 'local-user' })} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navbar */}
      <Navbar 
        currentUserEmail={user.email}
        notifications={notifications}
        onMarkNotificationRead={handleMarkNotificationRead}
        onLogout={handleLogout}
        onSeedData={handleSeedData}
        seeding={seeding}
      />

      {/* Main Body */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar currentTab={currentTab} onTabChange={setCurrentTab} />

        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          {currentTab === 'dashboard' && (
            <DashboardView 
              containers={containers}
              vessels={vessels}
              yardBlocks={yardBlocks}
              gateTransactions={gateTransactions}
              operations={operations}
            />
          )}

          {currentTab === 'master' && (
            <MasterDataView 
              containers={containers}
              vessels={vessels}
              yardBlocks={yardBlocks}
              users={users}
              onAddContainer={handleAddContainer}
              onUpdateContainer={handleUpdateContainer}
              onDeleteContainer={handleDeleteContainer}
              onAddVessel={handleAddVessel}
              onUpdateVessel={handleUpdateVessel}
              onDeleteVessel={handleDeleteVessel}
              onAddYardBlock={handleAddYardBlock}
              onUpdateYardBlock={handleUpdateYardBlock}
              onDeleteYardBlock={handleDeleteYardBlock}
              onAddUser={handleAddUser}
              onDeleteUser={handleDeleteUser}
            />
          )}

          {currentTab === 'transaction' && (
            <TransactionView 
              gateTransactions={gateTransactions}
              operations={operations}
              onAddGateTransaction={handleAddGateTransaction}
              onDeleteGateTransaction={handleDeleteGateTransaction}
              onAddOperation={handleAddOperation}
              onDeleteOperation={handleDeleteOperation}
            />
          )}

          {currentTab === 'report' && (
            <ReportView 
              containers={containers}
              vessels={vessels}
              yardBlocks={yardBlocks}
              gateTransactions={gateTransactions}
            />
          )}

          {currentTab === 'tracking' && (
            <TrackingView 
              containers={containers}
              gateTransactions={gateTransactions}
              operations={operations}
            />
          )}

          {currentTab === 'ai' && (
            <AIAssistantView 
              containers={containers}
              vessels={vessels}
              yardBlocks={yardBlocks}
            />
          )}
        </main>
      </div>
    </div>
  );
}
