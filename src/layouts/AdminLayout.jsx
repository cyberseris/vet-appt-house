import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <header className="admin-header">Admin Dashboard</header>
      <div className="admin-content">
        <aside className="admin-sidebar">
          <nav>
            <ul>
              <li><a href="/admin/manage-users">Manage Users</a></li>
              <li><a href="/admin/manage-vets">Manage Vets</a></li>
              <li><a href="/admin/reports">Reports</a></li>
            </ul>
          </nav>
        </aside>
        <main className="admin-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
