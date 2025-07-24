import React from "react";

// Sidebar with filter (handled in CarListPage, this displays only placeholders)
function Sidebar() {
  return (
    <aside className="sidebar-root">
      <h3>Filters</h3>
      <div className="sidebar-filters">
        {/* The actual filters are managed in CarListPage and passed as props */}
        <span>Use main page filters.</span>
      </div>
    </aside>
  );
}

export default Sidebar;
