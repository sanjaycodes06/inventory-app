import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import InventoryPage from "./pages/InventoryPage.jsx";
import ItemDetailPage from "./pages/ItemDetailPage.jsx";
import BillingPage from "./pages/BillingPage.jsx";
import InvoiceDetailPage from "./pages/InvoiceDetailPage.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/inventory/:id" element={<ItemDetailPage />} />
        <Route path="/billing" element={<BillingPage />} />
        <Route path="/billing/invoices/:id" element={<InvoiceDetailPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
