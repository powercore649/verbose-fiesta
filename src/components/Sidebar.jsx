import React, { useState, useRef, useEffect } from 'react';

export default function Sidebar({ user, selectedGuild, onSelectGuild, activePage, setActivePage, mobileMenuOpen, setMobileMenuOpen }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(true); // <-- OUVERT PAR DÉFAUT
  const dropdownRef = useRef(null);
  const accountRef = useRef(null);

  const currentGuild = user?.allowedGuilds?.find(g => g.id === selectedGuild);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (accountRef.current && !accountRef.current.contains(event.target)) {
        setAccountMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('zenith_token');
    window.location.href = '/login';
  };

  const closeMobileMenu = () => {
    if (typeof setMobileMenuOpen === 'function') setMobileMenuOpen(false);
  };

  return (
    <nav className={`sidebar ${mobileMenuOpen ? 'mobile-open' : ''}`}>

      {/* HEADER */}
      <div className="sidebar-header dashboard-sidebar-header">
        <div className="sidebar-brand-block">
          <p className="sidebar-kicker">AI Moderation Platform</p>
          <h2 className="brand-text-glow">zyntra</h2>
        </div>
        <button className="btn-icon mobile-only" onClick={closeMobileMenu}>
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>

      {/* WORKSPACE */}
      <div className="sidebar-section-label">Workspace</div>
      <ul className="nav-links">
        <li className={activePage === 'overview' ? 'active' : ''} onClick={() => { setActivePage('overview'); closeMobileMenu(); }}>
          <i className="fa-solid fa-chart-pie"></i>
          <span>Overview</span>
        </li>
        <li className={activePage === 'moderation' ? 'active' : ''} onClick={() => { setActivePage('moderation'); closeMobileMenu(); }}>
          <i className="fa-solid fa-gavel"></i>
          <span>Moderation</span>
        </li>
        <li className={activePage === 'automod' ? 'active' : ''} onClick={() => { setActivePage('automod'); closeMobileMenu(); }}>
          <i className="fa-solid fa-shield-halved"></i>
          <span>Auto Moderation</span>
        </li>
        <li className={activePage === 'commands' ? 'active' : ''} onClick={() => { setActivePage('commands'); closeMobileMenu(); }}>
          <i className="fa-solid fa-terminal"></i>
          <span>Command Center</span>
        </li>
        <li className={activePage === 'docs' ? 'active' : ''} onClick={() => { setActivePage('docs'); closeMobileMenu(); }}>
          <i className="fa-solid fa-book"></i>
          <span>Docs & Guides</span>
        </li>
      </ul>

      {/* ACCOUNT */}
      <div className="sidebar-section-label">Account</div>

      <div className="advanced-account" ref={accountRef}>
        <div className="account-header" onClick={() => setAccountMenuOpen(!accountMenuOpen)}>
          <i className="fa-solid fa-user-gear"></i>
          <span>Account Settings</span>
          <i className="fa-solid fa-chevron-down" style={{ marginLeft: 'auto' }}></i>
        </div>

        <div className={`account-dropdown ${accountMenuOpen ? 'open' : ''}`}>

          <div className="account-item">
            <i className="fa-solid fa-id-card"></i>
            Username: <strong>{user?.username}</strong>
          </div>

          <div className="account-item">
            <i className="fa-solid fa-hashtag"></i>
            User ID: <strong>{user?.userId}</strong>
          </div>

          <div className="account-item">
            <i className="fa-solid fa-shield"></i>
            Permissions: <strong>{user?.permissions?.length || 0}</strong>
          </div>

          <div className="account-item">
            <i className="fa-solid fa-server"></i>
            Guilds: <strong>{user?.allowedGuilds?.length}</strong>
          </div>

          <div className="account-item danger">
            <i className="fa-solid fa-triangle-exclamation"></i>
            Delete Account
          </div>

        </div>
      </div>

      {/* USER PROFILE */}
      <div className="user-profile" style={{ marginTop: 'auto' }}>
        <img 
          src={user?.avatar ? `https://cdn.discordapp.com/avatars/${user.userId}/${user.avatar}.png` : 'https://cdn.discordapp.com/embed/avatars/0.png'} 
          alt="User" className="user-avatar" 
        />
        <div className="user-info">
          <h4>{user?.username || 'Loading...'}</h4>
          <span className="logout-btn" onClick={handleLogout}>Log out</span>
        </div>
      </div>

      <style>{`
        .advanced-account { padding: 10px; }
        .account-header {
          display: flex; align-items: center; gap: 10px;
          cursor: pointer; padding: 10px; border-radius: 8px;
          transition: background 0.2s;
        }
        .account-header:hover { background: rgba(255,255,255,0.08); }
        .account-dropdown {
          max-height: 0; overflow: hidden;
          transition: max-height 0.3s ease;
          display: flex; flex-direction: column; gap: 8px;
        }
        .account-dropdown.open { max-height: 300px; }
        .account-item {
          padding: 8px 12px; border-radius: 6px;
          display: flex; align-items: center; gap: 10px;
          transition: background 0.2s;
        }
        .account-item:hover { background: rgba(255,255,255,0.08); }
        .account-item.danger { color: #ff6b6b; }
      `}</style>

    </nav>
  );
}
