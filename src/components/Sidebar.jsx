import React, { useState, useRef, useEffect } from 'react';

export default function Sidebar({ user, selectedGuild, onSelectGuild, activePage, setActivePage, mobileMenuOpen, setMobileMenuOpen }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
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

  // Effet ripple + gestion du clic
  const handleClick = (e, page) => {
    const item = e.currentTarget;
    item.classList.remove("clicked");
    void item.offsetWidth;
    item.classList.add("clicked");

    if (page) setActivePage(page);
    closeMobileMenu();
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

      {/* GUILD SELECTOR */}
      <div className="guild-selector" id="guild-selector" ref={dropdownRef} onClick={() => setDropdownOpen(!dropdownOpen)}>
        <img 
          src={currentGuild?.icon ? `https://cdn.discordapp.com/icons/${currentGuild.id}/${currentGuild.icon}.png` : 'https://cdn.discordapp.com/embed/avatars/0.png'} 
          alt="Guild" className="guild-icon" 
        />
        <span className="guild-name">{currentGuild?.name || 'Select Server'}</span>
        <i className="fa-solid fa-chevron-down"></i>
        
        <div className={`guild-dropdown ${dropdownOpen ? 'active' : ''}`}>
          {user?.allowedGuilds?.map(g => (
            <div 
              key={g.id} 
              className="guild-option" 
              onClick={(e) => { e.stopPropagation(); onSelectGuild(g.id); setDropdownOpen(false); closeMobileMenu(); }}
            >
              {g.icon ? (
                <img src={`https://cdn.discordapp.com/icons/${g.id}/${g.icon}.png`} className="guild-icon" alt="" />
              ) : (
                <div className="guild-icon" style={{ background: '#5865F2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>#</div>
              )}
              <span className="guild-name">{g.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* WORKSPACE */}
      <div className="sidebar-section-label">Workspace</div>
      <ul className="nav-links">

        <li className={activePage === 'overview' ? 'active' : ''} onClick={(e) => handleClick(e, 'overview')}>
          <i className="fa-solid fa-chart-pie"></i>
          <span>Overview</span>
        </li>

        <li className={activePage === 'moderation' ? 'active' : ''} onClick={(e) => handleClick(e, 'moderation')}>
          <i className="fa-solid fa-gavel"></i>
          <span>Moderation</span>
        </li>

        <li className={activePage === 'automod' ? 'active' : ''} onClick={(e) => handleClick(e, 'automod')}>
          <i className="fa-solid fa-shield-halved"></i>
          <span>Auto Moderation</span>
        </li>

        <li className={activePage === 'commands' ? 'active' : ''} onClick={(e) => handleClick(e, 'commands')}>
          <i className="fa-solid fa-terminal"></i>
          <span>Command Center</span>
        </li>

        <li className={activePage === 'docs' ? 'active' : ''} onClick={(e) => handleClick(e, 'docs')}>
          <i className="fa-solid fa-book"></i>
          <span>Docs & Guides</span>
        </li>

      </ul>

      {/* ACCOUNT */}
      <div className="sidebar-section-label">Account</div>

      <div className="advanced-account" ref={accountRef}>
        <div className="account-header" onClick={(e) => handleClick(e) || setAccountMenuOpen(!accountMenuOpen)}>
          <i className="fa-solid fa-user-gear"></i>
          <span>Account Settings</span>
          <i className="fa-solid fa-chevron-down" style={{ marginLeft: 'auto' }}></i>
        </div>

        <div className={`account-dropdown ${accountMenuOpen ? 'open' : ''}`}>
          <div className="account-item"><i className="fa-solid fa-id-card"></i> Username: <strong>{user?.username}</strong></div>
          <div className="account-item"><i className="fa-solid fa-hashtag"></i> User ID: <strong>{user?.userId}</strong></div>
          <div className="account-item"><i className="fa-solid fa-server"></i> Guilds: <strong>{user?.allowedGuilds?.length}</strong></div>
          <div className="account-item danger"><i className="fa-solid fa-triangle-exclamation"></i> Delete Account</div>
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

      {/* STYLES */}
      <style>{`
        .nav-links li {
          position: relative;
          overflow: hidden;
          cursor: pointer;
          transition: background 0.25s ease, transform 0.15s ease;
        }
        .nav-links li:hover {
          background: rgba(88, 101, 242, 0.12);
          transform: translateX(4px);
        }
        .nav-links li.active {
          background: linear-gradient(90deg, rgba(88,101,242,0.25), rgba(88,101,242,0.05));
          border-left: 3px solid #5865F2;
          padding-left: 17px;
        }
        .nav-links li::after {
          content: "";
          position: absolute;
          width: 8px;
          height: 8px;
          background: rgba(88,101,242,0.5);
          border-radius: 50%;
          transform: scale(0);
          opacity: 0;
          pointer-events: none;
          transition: transform 0.4s ease, opacity 0.4s ease;
        }
        .nav-links li.clicked::after {
          transform: scale(18);
          opacity: 0;
        }

        .account-header {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          padding: 10px;
          border-radius: 8px;
          transition: background 0.2s;
        }
        .account-header:hover {
          background: rgba(255,255,255,0.08);
        }
        .account-dropdown {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 5px;
        }
        .account-dropdown.open {
          max-height: 300px;
        }
        .account-item {
          padding: 8px 12px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: background 0.2s;
        }
        .account-item:hover {
          background: rgba(255,255,255,0.08);
        }
        .account-item.danger {
          color: #ff6b6b;
        }
      `}</style>

    </nav>
  );
}
