import React from "react";

export const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@300;400;500;600;700&family=Share+Tech+Mono&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --neon:#00f5d4; --neon2:#7b2ff7; --neon3:#f72585;
      --bg:#020818; --bg2:#040d24; --panel:#06122e;
      --border:rgba(0,245,212,0.15);
      --text:#e0f7f4; --muted:#5a8a84;
      --danger:#ff3b6b; --warn:#ffb700; --success:#00e676;
    }
    html,body{height:100%;}
    body{background:var(--bg);color:var(--text);font-family:'Rajdhani',sans-serif;}
    .orbitron{font-family:'Orbitron',sans-serif;}
    .mono{font-family:'Share Tech Mono',monospace;}
    ::-webkit-scrollbar{width:4px;height:4px;}
    ::-webkit-scrollbar-track{background:var(--bg2);}
    ::-webkit-scrollbar-thumb{background:var(--neon2);border-radius:2px;}
    .glow-text{text-shadow:0 0 20px var(--neon),0 0 40px var(--neon);}
    .glow-box{box-shadow:0 0 20px rgba(0,245,212,0.1),inset 0 0 20px rgba(0,245,212,0.03);}
    .scanline{background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,245,212,0.015) 2px,rgba(0,245,212,0.015) 4px);}
    @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
    @keyframes scanIn{from{opacity:0;transform:translateX(-10px)}to{opacity:1;transform:translateX(0)}}
    @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
    @keyframes spinSlow{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
    @keyframes slideIn{from{transform:translateX(-100%)}to{transform:translateX(0)}}
    .fade-in{animation:fadeIn 0.4s ease forwards;}
    .scan-in{animation:scanIn 0.3s ease forwards;}
    .spin-slow{animation:spinSlow 8s linear infinite;}
    .notif-dot{animation:blink 1.5s ease infinite;}
    .card{background:var(--panel);border:1px solid var(--border);border-radius:8px;transition:border-color 0.2s;}
    .card:hover{border-color:rgba(0,245,212,0.3);}
    .stat-card{position:relative;overflow:hidden;}
    .stat-card::before{content:'';position:absolute;top:0;left:0;width:100%;height:2px;background:linear-gradient(90deg,transparent,var(--accent,#00f5d4),transparent);}
    .nav-item{transition:all 0.2s;border-left:2px solid transparent;}
    .nav-item:hover,.nav-item.active{border-left-color:var(--neon);background:rgba(0,245,212,0.05);color:var(--neon)!important;}
    .btn-primary{background:linear-gradient(135deg,#00f5d4,#7b2ff7);color:#000;border:none;border-radius:4px;padding:6px 16px;font-family:'Orbitron',sans-serif;font-size:11px;font-weight:700;cursor:pointer;transition:all 0.2s;letter-spacing:1px;white-space:nowrap;}
    .btn-primary:hover{opacity:.85;transform:translateY(-1px);}
    .btn-danger{background:transparent;color:var(--danger);border:1px solid var(--danger);border-radius:4px;padding:5px 10px;font-family:'Rajdhani',sans-serif;font-size:12px;font-weight:600;cursor:pointer;transition:all 0.2s;white-space:nowrap;}
    .btn-danger:hover{background:rgba(255,59,107,0.1);}
    .btn-success{background:transparent;color:var(--success);border:1px solid var(--success);border-radius:4px;padding:5px 10px;font-family:'Rajdhani',sans-serif;font-size:12px;font-weight:600;cursor:pointer;transition:all 0.2s;white-space:nowrap;}
    .btn-success:hover{background:rgba(0,230,118,0.1);}
    .btn-warn{background:transparent;color:var(--warn);border:1px solid var(--warn);border-radius:4px;padding:5px 10px;font-family:'Rajdhani',sans-serif;font-size:12px;font-weight:600;cursor:pointer;transition:all 0.2s;white-space:nowrap;}
    .tag{display:inline-block;padding:2px 7px;border-radius:3px;font-size:10px;font-family:'Share Tech Mono',monospace;font-weight:600;letter-spacing:.5px;white-space:nowrap;}
    .tag-green{background:rgba(0,230,118,0.12);color:var(--success);border:1px solid rgba(0,230,118,0.3);}
    .tag-red{background:rgba(255,59,107,0.12);color:var(--danger);border:1px solid rgba(255,59,107,0.3);}
    .tag-green{background:rgba(255,183,0,0.12);color:var(--warn);border:1px solid rgba(255,183,0,0.3);}
    .tag-green{background:rgba(123,47,247,0.12);color:#a78bfa;border:1px solid rgba(123,47,247,0.3);}
    .tag-cyan{background:rgba(0,245,212,0.12);color:var(--neon);border:1px solid rgba(0,245,212,0.3);}
    .input-field{background:rgba(0,245,212,0.04);border:1px solid rgba(0,245,212,0.2);border-radius:4px;color:var(--text);padding:8px 12px;font-family:'Rajdhani',sans-serif;font-size:14px;width:100%;transition:border-color 0.2s;outline:none;}
    .input-field:focus{border-color:var(--neon);box-shadow:0 0 10px rgba(0,245,212,0.1);}
    .table-row:hover{background:rgba(0,245,212,0.03);}
    .table-scroll{overflow-x:auto;-webkit-overflow-scrolling:touch;}
    .table-scroll table{min-width:680px;}

    /* Responsive grids */
    .g4{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;}
    .g2{display:grid;grid-template-columns:repeat(2,1fr);gap:14px;}
    .g2-1{display:grid;grid-template-columns:2fr 1fr;gap:14px;}
    .pg{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
    .sl{display:grid;grid-template-columns:190px 1fr;gap:14px;}

    @media(max-width:1023px){
      .g4{grid-template-columns:repeat(2,1fr);}
      .g2-1{grid-template-columns:1fr;}
    }
    @media(max-width:639px){
      .g4{grid-template-columns:1fr 1fr;gap:10px;}
      .g2{grid-template-columns:1fr;}
      .g2-1{grid-template-columns:1fr;}
      .pg{grid-template-columns:1fr;}
      .sl{grid-template-columns:1fr;}
    }

    /* Sidebar drawer */
    .sidebar-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.72);z-index:199;backdrop-filter:blur(4px);}
    .sidebar-drawer{position:fixed;top:0;left:0;bottom:0;width:250px;background:var(--bg2);border-right:1px solid var(--border);z-index:200;animation:slideIn 0.25s ease;display:flex;flex-direction:column;}

    /* Mobile bottom nav */
    .mobile-nav{position:fixed;bottom:0;left:0;right:0;background:var(--bg2);border-top:1px solid var(--border);display:flex;z-index:100;padding:6px 0 calc(6px + env(safe-area-inset-bottom));}
    .mobile-nav-item{flex:1;display:flex;flex-direction:column;align-items:center;gap:3px;cursor:pointer;padding:4px 0;color:#5a8a84;font-size:9px;font-family:'Share Tech Mono',monospace;transition:color 0.2s;letter-spacing:.5px;text-transform:uppercase;position:relative;}
    .mobile-nav-item.active{color:var(--neon);}

    /* Settings tabs on mobile */
    .stabs{display:flex;flex-direction:column;}
    @media(max-width:639px){
      .stabs{flex-direction:row;overflow-x:auto;gap:6px;padding:8px;}
      .stabs .nav-item{flex-shrink:0;border-left:none!important;padding:7px 12px!important;border-radius:4px;}
      .stabs .nav-item.active{background:rgba(0,245,212,0.1);}
    }
  `}</style>
);
