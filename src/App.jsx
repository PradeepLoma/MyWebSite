import { useState, useEffect, useRef, useCallback } from "react";

/* ─────────────────────────────────────────────────────────────
   GLOBAL STYLES (updated color scheme)
───────────────────────────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

    :root {
      --bg:#0a0a0a; --bg2:#111111; --bg3:#161616;
      --border:rgba(255,255,255,0.07); --border2:rgba(255,255,255,0.12);
      --text:#e8e8e8; --text2:#a0a0a0; --text3:#555;
      --accent:#6C63FF; --accent2:#5a4bd1; --accent-dim:rgba(108,99,255,0.15);
      --accent-cyan:#00D4FF; --accent-glow:rgba(108,99,255,0.3);
    }
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
    html{scroll-behavior:smooth;}
    body,#root{background:var(--bg);color:var(--text);font-family:'Space Grotesk',sans-serif;overflow-x:hidden;}
    .mono{font-family:'JetBrains Mono',monospace;}

    .nav-hire:hover{background:var(--accent2)!important;}
    .nav-link:hover{color:var(--text)!important;}
    @keyframes blink{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.75)}}
    .blink-dot{animation:blink 2s ease-in-out infinite;}
    @keyframes pulse-ring{0%{box-shadow:0 0 0 0 rgba(108,99,255,0.5)}70%{box-shadow:0 0 0 10px rgba(108,99,255,0)}100%{box-shadow:0 0 0 0 rgba(108,99,255,0)}}
    .btn-p:hover{background:var(--accent2)!important;transform:translateY(-1px);}
    .btn-g:hover{border-color:var(--accent)!important;color:var(--accent)!important;transform:translateY(-1px);}
    .edu-card:hover,.award-card:hover{border-color:rgba(108,99,255,0.3)!important;}
    .soc-btn:hover{border-color:var(--accent)!important;color:var(--accent)!important;background:var(--accent-dim)!important;}
    .c-email:hover{border-color:var(--accent)!important;}
    .tl-ul li{position:relative;padding-left:16px;}
    .tl-ul li::before{content:'▹';position:absolute;left:0;color:var(--accent);font-size:11px;top:3px;}

    .status-online{background:#23a55a;}
    .status-idle{background:#f0b232;}
    .status-dnd{background:#f23f42;}
    .status-offline{background:#80848e;}

    .spotlight-card{position:relative;overflow:hidden;}
    .spotlight-card::before{content:'';position:absolute;inset:0;pointer-events:none;z-index:1;border-radius:inherit;
      background:radial-gradient(500px circle at var(--mx,50%) var(--my,50%),var(--sc,rgba(108,99,255,0.15)),transparent 40%);
      opacity:0;transition:opacity 0.3s;}
    .spotlight-card:hover::before{opacity:1;}

    .bento-grid{display:grid;grid-template-columns:repeat(4,1fr);grid-auto-rows:minmax(120px,auto);gap:12px;}
    .bento-card{position:relative;overflow:hidden;border-radius:14px;border:1px solid var(--border);
      background:var(--bg2);transition:border-color 0.25s,transform 0.2s;}
    .bento-card::before{content:'';position:absolute;inset:0;border-radius:inherit;pointer-events:none;z-index:0;
      background:radial-gradient(300px circle at var(--bx,-100px) var(--by,-100px),rgba(108,99,255,0.1),transparent 60%);
      opacity:0;transition:opacity 0.3s;}
    .bento-grid:hover .bento-card::before{opacity:1;}
    .bento-card:hover{border-color:rgba(108,99,255,0.35);transform:translateY(-2px);}
    .bento-inner{position:relative;z-index:1;height:100%;padding:22px;}

    @media(max-width:900px){
      .bento-grid{grid-template-columns:repeat(2,1fr);}
      .bento-span2{grid-column:span 1!important;}
    }
    @media(max-width:780px){
      .hero-inner{grid-template-columns:1fr!important;}
      .about-grid{grid-template-columns:1fr!important;}
      .ea-grid{grid-template-columns:1fr!important;}
      .tli-grid{grid-template-columns:60px 1px 1fr!important;}
      .nav-links-list{display:none!important;}
      footer{flex-direction:column!important;gap:8px;text-align:center;}
      .bento-grid{grid-template-columns:1fr;}
    }
  `}</style>
);

/* ══════════════════════════════════════════════════════════
   REACTBITS: CHROMA GRID  (Skills)
══════════════════════════════════════════════════════════ */
const PALETTE = [
  "#6C63FF", "#00D4FF", "#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF",
  "#FF6B9D", "#A66CFF", "#FF9F43", "#00C9A7", "#FF6B6B", "#FECA57",
  "#48DBFB", "#FF9FF3", "#54A0FF", "#5F27CD", "#FF9F43", "#00D2D3",
];

function ChromaGrid({ items }) {
  const [hov, setHov] = useState(null);
  return (
    <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(132px,1fr))",gap:10,marginTop:44 }}>
      {items.map((item, i) => {
        const color = PALETTE[i % PALETTE.length];
        const active = hov === i;
        return (
          <div key={item} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}
            style={{ position:"relative",borderRadius:9,padding:"13px 15px",display:"flex",alignItems:"center",gap:9,cursor:"default",
              transition:"transform 0.2s,box-shadow 0.2s,background 0.2s,border-color 0.2s,color 0.2s",
              transform:active?"scale(1.07) translateY(-2px)":"scale(1)",
              background:active?`${color}18`:"var(--bg2)",
              border:active?`1px solid ${color}66`:"1px solid var(--border)",
              color:active?color:"var(--text2)",
              boxShadow:active?`0 8px 28px ${color}30`:"none",
              fontFamily:"'JetBrains Mono',monospace",fontSize:12,
            }}>
            {active && <div style={{ position:"absolute",inset:0,borderRadius:"inherit",pointerEvents:"none",background:`linear-gradient(135deg,${color}22 0%,transparent 55%,${color}10 100%)` }}/>}
            <span style={{ width:5,height:5,borderRadius:"50%",flexShrink:0,zIndex:1,background:active?color:"var(--accent)",opacity:active?1:0.45,transition:"background 0.2s,opacity 0.2s" }}/>
            <span style={{ zIndex:1,position:"relative" }}>{item}</span>
          </div>
        );
      })}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   REACTBITS: PROFILE CARD  (Hero — 3D tilt + shine)
══════════════════════════════════════════════════════════ */
function ProfileCard({ name, role, location, avatarUrl, handle, stats }) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x:0,y:0 });
  const [shine, setShine] = useState({ x:50,y:50 });
  const [hov, setHov] = useState(false);
  const onMove = useCallback((e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const dx = (e.clientX-r.left-r.width/2)/(r.width/2);
    const dy = (e.clientY-r.top-r.height/2)/(r.height/2);
    setTilt({ x:dy*-10,y:dx*10 });
    setShine({ x:((e.clientX-r.left)/r.width)*100,y:((e.clientY-r.top)/r.height)*100 });
  }, []);
  return (
    <div ref={ref} onMouseMove={onMove} onMouseEnter={() => setHov(true)} onMouseLeave={() => { setHov(false);setTilt({x:0,y:0}); }} style={{ perspective:"900px" }}>
      <div style={{
        transform:`rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition:hov?"transform 0.08s ease-out":"transform 0.5s ease-out",
        transformStyle:"preserve-3d",borderRadius:20,overflow:"hidden",position:"relative",
        background:"linear-gradient(145deg,#1a1a2e 0%,#111 50%,#0d0a2a 100%)",
        border:"1px solid rgba(108,99,255,0.25)",padding:"24px 22px",
        boxShadow:hov?"0 32px 64px rgba(0,0,0,0.55),0 0 0 1px rgba(108,99,255,0.15)":"0 10px 40px rgba(0,0,0,0.3)",
      }}>
        <div style={{ position:"absolute",inset:0,borderRadius:"inherit",pointerEvents:"none",background:`radial-gradient(ellipse at ${shine.x}% ${shine.y}%,rgba(108,99,255,0.13) 0%,transparent 60%)`,opacity:hov?1:0,transition:"opacity 0.3s" }}/>
        <div style={{ position:"absolute",top:-50,right:-50,width:140,height:140,borderRadius:"50%",background:"rgba(108,99,255,0.06)",filter:"blur(40px)",pointerEvents:"none" }}/>

        <div style={{ display:"flex",alignItems:"flex-start",gap:14,marginBottom:16 }}>
          <div style={{ width:60,height:60,borderRadius:"50%",border:"2px solid var(--accent)",overflow:"hidden",flexShrink:0,boxShadow:"0 0 16px rgba(108,99,255,0.28)",animation:"pulse-ring 3s ease infinite" }}>
            <img src={avatarUrl} alt={name} style={{ width:"100%",height:"100%",objectFit:"cover" }}
              onError={e => { e.target.style.display='none'; e.target.parentNode.textContent='P'; e.target.parentNode.style.cssText='width:100%;height:100%;background:linear-gradient(135deg,#2d1b4d,#1a0a2e);display:flex;align-items:center;justify-content:center;font-size:26px;color:#6C63FF;font-weight:700;'; }}
            />
          </div>
          <div style={{ flex:1,paddingTop:2 }}>
            <div style={{ fontSize:15,fontWeight:700,color:"var(--text)",lineHeight:1.2 }}>{name}</div>
            <div className="mono" style={{ fontSize:10.5,color:"var(--accent)",marginTop:4 }}>{role}</div>
            <div className="mono" style={{ fontSize:10,color:"var(--text3)",marginTop:3 }}>📍 {location}</div>
          </div>
        </div>

        <div style={{ display:"inline-flex",alignItems:"center",gap:6,background:"rgba(108,99,255,0.09)",border:"1px solid rgba(108,99,255,0.2)",borderRadius:100,padding:"4px 12px",marginBottom:16 }}>
          <span className="blink-dot" style={{ width:6,height:6,borderRadius:"50%",background:"var(--accent)",flexShrink:0 }}/>
          <span className="mono" style={{ fontSize:10,color:"var(--accent)" }}>Available for opportunities</span>
        </div>

        <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:7,marginBottom:16 }}>
          {stats.map(({ value,label }) => {
            const num = value.replace(/[^0-9.]/g,""); const sfx = value.replace(/[0-9.]/g,"");
            return (
              <div key={label} style={{ background:"rgba(255,255,255,0.03)",border:"1px solid var(--border)",borderRadius:9,padding:"10px 6px",textAlign:"center" }}>
                <div style={{ fontSize:16,fontWeight:700,color:"var(--text)",lineHeight:1 }}>{num}<span style={{ color:"var(--accent)",fontSize:11 }}>{sfx}</span></div>
                <div className="mono" style={{ fontSize:9,color:"var(--text3)",marginTop:3,letterSpacing:"0.05em" }}>{label}</div>
              </div>
            );
          })}
        </div>

        <div style={{ display:"flex",gap:7,flexWrap:"wrap" }}>
          {[
            { href:`https://github.com/${handle}`,label:`@${handle}`,hc:"var(--accent)",icon:<GithubIcon size={12}/> },
            { href:"https://wa.me/917905307223",label:"WhatsApp",hc:"#25D366",icon:<span style={{fontSize:12}}>💬</span> },
            { href:"https://t.me/+85511713091",label:"Telegram",hc:"#2AABEE",icon:<span style={{fontSize:12}}>✈️</span> },
          ].map(({ href,label,hc,icon }) => (
            <a key={label} href={href} target="_blank" rel="noopener"
              style={{ flex:"1 1 auto",display:"flex",alignItems:"center",justifyContent:"center",gap:5,background:"rgba(255,255,255,0.03)",border:"1px solid var(--border)",borderRadius:8,padding:"7px 8px",fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:"var(--text2)",textDecoration:"none",transition:"border-color 0.2s,color 0.2s" }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=hc;e.currentTarget.style.color=hc;}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--border)";e.currentTarget.style.color="var(--text2)";}}
            >{icon}{label}</a>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   REACTBITS: LANYARD  (Discord presence widget)
   → Add your Discord User ID to DISCORD_ID below to go live.
══════════════════════════════════════════════════════════ */
const DISCORD_ID = ""; // 🔴 Paste your Discord User ID here to go live

function LanyardWidget() {
  const [data, setData] = useState(null);
  const [err, setErr] = useState(false);
  const wsRef = useRef(null);

  useEffect(() => {
    if (!DISCORD_ID) return;
    let alive = true;
    const connect = () => {
      const ws = new WebSocket("wss://api.lanyard.rest/socket");
      wsRef.current = ws;
      ws.onmessage = (e) => {
        const msg = JSON.parse(e.data);
        if (msg.op === 1) ws.send(JSON.stringify({ op:2,d:{ subscribe_to_id:DISCORD_ID } }));
        if (msg.op === 0 && (msg.t==="INIT_STATE"||msg.t==="PRESENCE_UPDATE")) {
          if (alive) setData(msg.d);
        }
      };
      ws.onerror = () => { if (alive) setErr(true); };
      ws.onclose = () => { if (alive) setTimeout(connect, 3000); };
    };
    connect();
    return () => { alive=false; wsRef.current?.close(); };
  }, []);

  const STATUS_COLOR = { online:"#23a55a",idle:"#f0b232",dnd:"#f23f42",offline:"#80848e" };
  const STATUS_LABEL = { online:"Online",idle:"Away",dnd:"Do Not Disturb",offline:"Offline" };

  // ── Static fallback (no Discord ID configured) ──
  if (!DISCORD_ID) return (
    <div style={{ background:"linear-gradient(135deg,#1a1a2e 0%,#111 60%,#0d0a2a 100%)",border:"1px solid rgba(108,99,255,0.3)",borderRadius:16,padding:"20px 22px",position:"relative",overflow:"hidden",maxWidth:360 }}>
      <div style={{ position:"absolute",top:-40,right:-40,width:120,height:120,borderRadius:"50%",background:"rgba(108,99,255,0.08)",filter:"blur(30px)" }}/>
      <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:16 }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#5865F2"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.012.143.083.274.203.362a19.9 19.9 0 0 0 5.993 3.03.076.076 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>
        <span style={{ fontSize:13,fontWeight:700,color:"#fff",fontFamily:"'Space Grotesk',sans-serif" }}>Discord Status</span>
        <span style={{ marginLeft:"auto",fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:"#80848e",background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:100,padding:"2px 8px" }}>Live</span>
      </div>
      <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:14 }}>
        <div style={{ position:"relative",width:44,height:44 }}>
          <img src="https://avatars.githubusercontent.com/raipradeep" alt="P" style={{ width:44,height:44,borderRadius:"50%",border:"2px solid rgba(108,99,255,0.5)",objectFit:"cover" }}/>
          <span style={{ position:"absolute",bottom:0,right:0,width:12,height:12,borderRadius:"50%",background:"#80848e",border:"2px solid #111" }}/>
        </div>
        <div>
          <div style={{ fontSize:14,fontWeight:600,color:"#fff" }}>pradeep.kr</div>
          <div style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:"#80848e" }}>⚙️ Add Discord ID to go live</div>
        </div>
      </div>
      <div style={{ background:"rgba(255,255,255,0.04)",borderRadius:10,padding:"10px 12px",marginBottom:10 }}>
        <div style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:"#80848e",letterSpacing:"0.08em",marginBottom:6,textTransform:"uppercase" }}>Currently</div>
        <div style={{ display:"flex",alignItems:"center",gap:8 }}>
          <span style={{ fontSize:18 }}>👨‍💻</span>
          <div>
            <div style={{ fontSize:12,fontWeight:600,color:"var(--text)" }}>Building Android Apps</div>
            <div className="mono" style={{ fontSize:10,color:"var(--text3)" }}>Senior Dev @ LOMA Technology</div>
          </div>
        </div>
      </div>
      <div className="mono" style={{ fontSize:9,color:"var(--text3)",textAlign:"center",marginTop:8 }}>
        Join discord.gg/lanyard · Add your Discord ID to show live status
      </div>
    </div>
  );

  // ── Live Lanyard data ──
  if (err || !data) return (
    <div style={{ background:"rgba(108,99,255,0.08)",border:"1px solid rgba(108,99,255,0.2)",borderRadius:16,padding:"20px 22px" }}>
      <div className="mono" style={{ fontSize:11,color:"var(--text3)" }}>{err?"Could not connect to Lanyard":"Connecting to Discord..."}</div>
    </div>
  );

  const status = data.discord_status || "offline";
  const user = data.discord_user;
  const spotify = data.listening_to_spotify ? data.spotify : null;
  const activity = data.activities?.find(a => a.type === 0);
  const avatarUrl = user ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.webp?size=128` : "";

  return (
    <div style={{ background:"linear-gradient(135deg,#1a1a2e 0%,#111 60%,#0d0a2a 100%)",border:"1px solid rgba(108,99,255,0.3)",borderRadius:16,padding:"20px 22px",position:"relative",overflow:"hidden",maxWidth:360 }}>
      <div style={{ position:"absolute",top:-40,right:-40,width:120,height:120,borderRadius:"50%",background:"rgba(108,99,255,0.08)",filter:"blur(30px)" }}/>
      <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:16 }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#5865F2"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.012.143.083.274.203.362a19.9 19.9 0 0 0 5.993 3.03.076.076 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>
        <span style={{ fontSize:13,fontWeight:700,color:"#fff" }}>Discord</span>
        <div style={{ display:"flex",alignItems:"center",gap:5,marginLeft:"auto" }}>
          <span style={{ width:8,height:8,borderRadius:"50%",background:STATUS_COLOR[status],display:"inline-block" }}/>
          <span className="mono" style={{ fontSize:10,color:STATUS_COLOR[status] }}>{STATUS_LABEL[status]}</span>
        </div>
      </div>
      <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:14 }}>
        <div style={{ position:"relative",width:44,height:44 }}>
          <img src={avatarUrl} alt={user?.username} style={{ width:44,height:44,borderRadius:"50%",border:`2px solid ${STATUS_COLOR[status]}`,objectFit:"cover" }}/>
          <span style={{ position:"absolute",bottom:0,right:0,width:12,height:12,borderRadius:"50%",background:STATUS_COLOR[status],border:"2px solid #111" }}/>
        </div>
        <div>
          <div style={{ fontSize:14,fontWeight:600,color:"#fff" }}>{user?.global_name||user?.username}</div>
          <div className="mono" style={{ fontSize:10,color:"#80848e" }}>@{user?.username}</div>
        </div>
      </div>
      {activity && (
        <div style={{ background:"rgba(255,255,255,0.04)",borderRadius:10,padding:"10px 12px",marginBottom:8 }}>
          <div className="mono" style={{ fontSize:9,color:"#80848e",letterSpacing:"0.08em",marginBottom:4,textTransform:"uppercase" }}>Playing</div>
          <div style={{ fontSize:12,fontWeight:600,color:"var(--text)" }}>{activity.name}</div>
          {activity.details && <div className="mono" style={{ fontSize:10,color:"var(--text3)",marginTop:2 }}>{activity.details}</div>}
        </div>
      )}
      {spotify && (
        <div style={{ background:"rgba(30,215,96,0.08)",border:"1px solid rgba(30,215,96,0.15)",borderRadius:10,padding:"10px 12px" }}>
          <div className="mono" style={{ fontSize:9,color:"#1ed760",letterSpacing:"0.08em",marginBottom:6,textTransform:"uppercase" }}>🎵 Listening on Spotify</div>
          <div style={{ display:"flex",gap:10,alignItems:"center" }}>
            {spotify.album_art_url && <img src={spotify.album_art_url} alt="album" style={{ width:36,height:36,borderRadius:6,objectFit:"cover" }}/>}
            <div>
              <div style={{ fontSize:12,fontWeight:600,color:"var(--text)" }}>{spotify.song}</div>
              <div className="mono" style={{ fontSize:10,color:"var(--text3)" }}>{spotify.artist}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   REACTBITS: MAGIC BENTO
══════════════════════════════════════════════════════════ */
function MagicBentoGrid({ children }) {
  const ref = useRef(null);
  const onMove = useCallback((e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    ref.current.querySelectorAll(".bento-card").forEach(card => {
      const cr = card.getBoundingClientRect();
      card.style.setProperty("--bx", `${x - (cr.left - r.left)}px`);
      card.style.setProperty("--by", `${y - (cr.top - r.top)}px`);
    });
  }, []);
  return (
    <div ref={ref} onMouseMove={onMove} className="bento-grid">
      {children}
    </div>
  );
}

function BentoCard({ children, style={}, span=1, rowSpan=1 }) {
  return (
    <div className="bento-card" style={{ gridColumn:`span ${span}`,gridRow:`span ${rowSpan}`,...style }}>
      <div className="bento-inner">{children}</div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   REACTBITS: PIXEL CARD  (Projects)
══════════════════════════════════════════════════════════ */
function PixelCard({ children, disabled=false }) {
  const canvasRef=useRef(null),raf=useRef(null),pixels=useRef([]),hovering=useRef(false),wrapRef=useRef(null);
  const buildPixels=useCallback(()=>{
    const c=canvasRef.current; if(!c||!wrapRef.current) return;
    const W=wrapRef.current.offsetWidth,H=wrapRef.current.offsetHeight;
    c.width=W;c.height=H;
    const sz=5;pixels.current=[];
    for(let r=0;r<Math.ceil(H/sz);r++) for(let col=0;col<Math.ceil(W/sz);col++)
      pixels.current.push({x:col*sz,y:r*sz,sz,a:0,ta:0,delay:Math.random()*500,t0:null});
  },[]);
  useEffect(()=>{const obs=new ResizeObserver(buildPixels);if(wrapRef.current)obs.observe(wrapRef.current);buildPixels();return()=>obs.disconnect();},[buildPixels]);
  const tick=useCallback((ts)=>{
    const c=canvasRef.current;if(!c)return;
    const ctx=c.getContext("2d");ctx.clearRect(0,0,c.width,c.height);
    let live=false;
    for(const p of pixels.current){
      if(hovering.current&&p.a<p.ta){if(!p.t0)p.t0=ts;const el=ts-p.t0-p.delay;if(el>0){p.a=Math.min(p.ta,el/250);live=true;}}
      else if(!hovering.current&&p.a>0){p.a=Math.max(0,p.a-0.05);p.t0=null;live=true;}
      if(p.a>0){ctx.fillStyle=`rgba(108,99,255,${p.a*0.28})`;ctx.fillRect(p.x,p.y,p.sz-1,p.sz-1);}
    }
    if(live||hovering.current)raf.current=requestAnimationFrame(tick);else raf.current=null;
  },[]);
  const enter=useCallback(()=>{hovering.current=true;pixels.current.forEach(p=>{p.ta=0.4+Math.random()*0.6;p.t0=null;});if(!raf.current)raf.current=requestAnimationFrame(tick);},[tick]);
  const leave=useCallback(()=>{hovering.current=false;if(!raf.current)raf.current=requestAnimationFrame(tick);},[tick]);
  useEffect(()=>()=>{if(raf.current)cancelAnimationFrame(raf.current);},[]);
  return (
    <div ref={wrapRef} onMouseEnter={disabled?undefined:enter} onMouseLeave={disabled?undefined:leave}
      style={{ position:"relative",overflow:"hidden",background:"var(--bg3)",borderRadius:12,height:"100%",border:"1px solid var(--border)",transition:"border-color 0.2s,transform 0.2s",opacity:disabled?0.55:1,pointerEvents:disabled?"none":undefined }}
      onMouseOver={disabled?undefined:(e=>{e.currentTarget.style.borderColor="rgba(108,99,255,0.35)";e.currentTarget.style.transform="translateY(-3px)";})}
      onMouseOut={disabled?undefined:(e=>{e.currentTarget.style.borderColor="var(--border)";e.currentTarget.style.transform="translateY(0)";})}
    >
      <canvas ref={canvasRef} style={{ position:"absolute",inset:0,borderRadius:"inherit",pointerEvents:"none",zIndex:0 }}/>
      <div style={{ position:"relative",zIndex:1,height:"100%",display:"flex",flexDirection:"column" }}>{children}</div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   REACTBITS: SPOTLIGHT CARD  (About highlights)
══════════════════════════════════════════════════════════ */
function SpotlightCard({ children, style={}, color="rgba(108,99,255,0.13)" }) {
  const ref=useRef(null);
  const onMove=useCallback((e)=>{
    if(!ref.current)return;
    const r=ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx",`${((e.clientX-r.left)/r.width)*100}%`);
    ref.current.style.setProperty("--my",`${((e.clientY-r.top)/r.height)*100}%`);
    ref.current.style.setProperty("--sc",color);
  },[color]);
  return (
    <div ref={ref} onMouseMove={onMove} className="spotlight-card" style={{ background:"var(--bg2)",border:"1px solid var(--border)",borderRadius:10,cursor:"default",...style }}>
      {children}
    </div>
  );
}

/* ─── SHARED ICONS ─────────────────────────────────────────── */
const GithubIcon=({size=15})=>(
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.68-.22.68-.48v-1.7C6.73 19.91 6.14 18 6.14 18c-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85 0 1.71.11 2.51.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10z"/>
  </svg>
);
const PlayIcon=()=>(
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 20.5v-17c0-.83 1-.83 1.5-.5l14 8.5-14 8.5C3.5 20.5 3 20.5 3 19.5z"/>
  </svg>
);

/* ─── NAV ──────────────────────────────────────────────────── */
const Nav=()=>(
  <nav style={{ position:"fixed",top:0,left:0,right:0,zIndex:100,padding:"18px 5%",display:"flex",alignItems:"center",justifyContent:"space-between",background:"rgba(10,10,10,0.88)",backdropFilter:"blur(20px)",borderBottom:"1px solid var(--border)" }}>
    <a href="#hero" className="mono" style={{ fontSize:13,color:"var(--accent)",textDecoration:"none",letterSpacing:"0.02em" }}>pradeep.kr</a>
    <ul className="nav-links-list" style={{ display:"flex",gap:28,listStyle:"none" }}>
      {["About","Experience","Skills","Apps","Projects","Recognition","Contact"].map(s=>(
        <li key={s}><a href={`#${s.toLowerCase()}`} className="nav-link" style={{ fontSize:13,color:"var(--text2)",textDecoration:"none",letterSpacing:"0.04em",transition:"color 0.2s" }}>{s}</a></li>
      ))}
    </ul>
    <a href="mailto:raipradeep009@gmail.com" className="nav-hire" style={{ display:"inline-flex",alignItems:"center",gap:7,background:"var(--accent)",color:"#0a0a0a",padding:"8px 18px",borderRadius:7,fontWeight:600,fontSize:13,textDecoration:"none",transition:"background 0.2s" }}>Hire Me →</a>
  </nav>
);

/* ─── ENHANCED TERMINAL CARD ──────────────────────────────── */
const Terminal=()=>(
  <div style={{ background:"var(--bg2)",border:"1px solid rgba(108,99,255,0.2)",borderRadius:14,overflow:"hidden",boxShadow:"0 0 40px rgba(108,99,255,0.04),inset 0 1px 0 rgba(255,255,255,0.04)" }}>
    <div style={{ display:"flex",alignItems:"center",gap:8,padding:"12px 18px",background:"var(--bg3)",borderBottom:"1px solid var(--border)" }}>
      {["#ff5f56","#ffbd2e","#27c93f"].map(c=><span key={c} style={{ width:11,height:11,borderRadius:"50%",background:c,display:"inline-block" }}/>)}
      <span className="mono" style={{ fontSize:11,color:"var(--text3)",marginLeft:6 }}>Developer.kt — Pradeep Kumar Rai</span>
    </div>
    <div className="mono" style={{ padding:"20px 22px",fontSize:12.5,lineHeight:2 }}>
      <div><span style={{color:"var(--text3)"}}>// Senior Android Developer · 6+ Years</span></div>
      <div style={{ height:6 }}/>
      <div><span style={{color:"#82aaff"}}>data class</span><span style={{color:"var(--text)"}}> Developer(</span></div>
      <div style={{paddingLeft:16}}><span style={{color:"#82aaff"}}>val </span><span style={{color:"var(--text)"}}>name = </span><span style={{color:"#c3e88d"}}>"Pradeep Kumar Rai"</span><span style={{color:"var(--text)"}}>,</span></div>
      <div style={{paddingLeft:16}}><span style={{color:"#82aaff"}}>val </span><span style={{color:"var(--text)"}}>exp = </span><span style={{color:"#c3e88d"}}>"6+ Years"</span><span style={{color:"var(--text)"}}>,</span></div>
      <div style={{paddingLeft:16}}><span style={{color:"#82aaff"}}>val </span><span style={{color:"var(--text)"}}>stack = listOf(</span></div>
      <div style={{paddingLeft:32}}><span style={{color:"#c3e88d"}}>"Jetpack Compose"</span><span style={{color:"var(--text)"}}>, </span><span style={{color:"#c3e88d"}}>"Kotlin"</span><span style={{color:"var(--text)"}}>, </span><span style={{color:"#c3e88d"}}>"Java"</span></div>
      <div style={{paddingLeft:16}}><span style={{color:"var(--text)"}}>),</span></div>
      <div style={{paddingLeft:16}}><span style={{color:"#82aaff"}}>val </span><span style={{color:"var(--text)"}}>crashFree = </span><span style={{color:"#f78c6c"}}>0.99</span><span style={{color:"var(--text)"}}>,</span></div>
      <div style={{paddingLeft:16}}><span style={{color:"#82aaff"}}>val </span><span style={{color:"var(--text)"}}>apps = </span><span style={{color:"#f78c6c"}}>7</span><span style={{color:"var(--text)"}}>,</span></div>
      <div style={{paddingLeft:16}}><span style={{color:"#82aaff"}}>val </span><span style={{color:"var(--text)"}}>role = </span><span style={{color:"#c3e88d"}}>"Team Lead"</span><span style={{color:"var(--text)"}}>,</span></div>
      <div style={{paddingLeft:16}}><span style={{color:"#82aaff"}}>val </span><span style={{color:"var(--text)"}}>note = </span><span style={{color:"#c3e88d"}}>"Private enterprise apps for</span></div>
      <div style={{paddingLeft:16,display:"flex"}}><span style={{color:"transparent",userSelect:"none",pointerEvents:"none",flexShrink:0}}>{"val note = \""}</span><span style={{color:"#c3e88d"}}>international clients aren't</span></div>
      <div style={{paddingLeft:16,display:"flex"}}><span style={{color:"transparent",userSelect:"none",pointerEvents:"none",flexShrink:0}}>{"val note = \""}</span><span style={{color:"#c3e88d"}}>publicly available due to NDAs."</span></div>
      <div><span style={{color:"var(--text)"}}>)</span></div>
    </div>
    <div style={{ padding:"8px 18px",background:"rgba(108,99,255,0.05)",borderTop:"1px solid rgba(108,99,255,0.1)",display:"flex",alignItems:"center",gap:12 }}>
      <span style={{ width:6,height:6,borderRadius:"50%",background:"var(--accent)",display:"inline-block",animation:"blink 2s ease-in-out infinite" }}/>
      <span className="mono" style={{ fontSize:10,color:"var(--accent)" }}>Kotlin · Jetpack Compose · MVVM · Clean Architecture</span>
    </div>
  </div>
);

/* ─── HERO ─────────────────────────────────────────────────── */
const Hero=()=>(
  <section id="hero" style={{ minHeight:"100vh",display:"flex",alignItems:"center",paddingTop:80,position:"relative",overflow:"hidden" }}>
    <div style={{ position:"absolute",width:520,height:520,borderRadius:"50%",background:"rgba(108,99,255,0.06)",top:-120,left:-80,filter:"blur(120px)",pointerEvents:"none" }}/>
    <div style={{ position:"absolute",width:380,height:380,borderRadius:"50%",background:"rgba(0,212,255,0.04)",bottom:40,right:"8%",filter:"blur(120px)",pointerEvents:"none" }}/>
    <div style={{ maxWidth:1100,margin:"0 auto",padding:"0 5%",width:"100%",position:"relative",zIndex:1 }}>
      <div className="hero-inner" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:60,alignItems:"center" }}>
        <div>
          <div style={{ display:"inline-flex",alignItems:"center",gap:8,background:"var(--accent-dim)",border:"1px solid rgba(108,99,255,0.25)",padding:"6px 14px",borderRadius:100,marginBottom:24 }}>
            <span className="blink-dot" style={{ width:7,height:7,background:"var(--accent)",borderRadius:"50%",flexShrink:0 }}/>
            <span className="mono" style={{ fontSize:11.5,color:"var(--accent)" }}>Open to opportunities</span>
          </div>
          <h1 style={{ fontSize:"clamp(36px,5vw,60px)",fontWeight:700,lineHeight:1.08,letterSpacing:"-0.025em",marginBottom:10 }}>
            Pradeep<br/><span style={{color:"var(--accent)"}}>Kumar Rai</span>
          </h1>
          <p className="mono" style={{ fontSize:13,color:"var(--text2)",marginBottom:6,letterSpacing:"0.04em" }}>// Senior Android Developer &amp; Team Lead</p>
          <p className="mono" style={{ fontSize:12,color:"var(--text3)",marginBottom:22 }}>📍 Phnom Penh, Cambodia &nbsp;·&nbsp; Origin: Lucknow, India</p>
          <p style={{ fontSize:14.5,color:"var(--text2)",lineHeight:1.85,maxWidth:480,marginBottom:32 }}>
            6+ years building production Android apps used by millions — across healthcare, e-commerce, banking, and social platforms. I write clean Kotlin, ship fast, and lead teams that do the same.
          </p>
          <div style={{ display:"flex",gap:32,marginBottom:36,flexWrap:"wrap" }}>
            {[{n:"7",s:"+",l:"apps shipped"},{n:"99",s:"%",l:"crash-free"},{n:"500K",s:"+",l:"users reached"},{n:"40",s:"%",l:"faster dev ↑"}].map(({n,s,l})=>(
              <div key={l}>
                <div style={{ fontSize:26,fontWeight:700,color:"var(--text)",lineHeight:1 }}>{n}<span style={{color:"var(--accent)"}}>{s}</span></div>
                <div className="mono" style={{ fontSize:11,color:"var(--text3)",marginTop:4,letterSpacing:"0.05em" }}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{ display:"flex",gap:12,flexWrap:"wrap" }}>
            <a href="#projects" className="btn-p" style={{ display:"inline-flex",alignItems:"center",gap:7,background:"var(--accent)",color:"#0a0a0a",padding:"11px 22px",borderRadius:8,fontWeight:600,fontSize:14,textDecoration:"none",transition:"background 0.2s,transform 0.15s" }}>View Projects →</a>
            <a href="#contact" className="btn-g" style={{ display:"inline-flex",alignItems:"center",gap:7,border:"1px solid var(--border2)",color:"var(--text)",padding:"11px 22px",borderRadius:8,fontSize:14,fontWeight:500,textDecoration:"none",transition:"border-color 0.2s,color 0.2s,transform 0.15s" }}>Get in Touch</a>
          </div>
        </div>
        <div style={{ display:"flex",flexDirection:"column",gap:20 }}>
          <ProfileCard
            name="Pradeep Kumar Rai"
            role="Senior Android Dev · Team Lead"
            location="Phnom Penh, Cambodia"
            avatarUrl="https://avatars.githubusercontent.com/raipradeep"
            handle="raipradeep"
            stats={[{value:"6+",label:"YRS EXP"},{value:"7+",label:"APPS"},{value:"500K+",label:"USERS"}]}
          />
          <Terminal/>
        </div>
      </div>
    </div>
  </section>
);

/* ─── ABOUT (Magic Bento) ──────────────────────────────────── */
const About=()=>(
  <section id="about" style={{ padding:"100px 0" }}>
    <div style={{ maxWidth:1100,margin:"0 auto",padding:"0 5%" }}>
      <p className="mono" style={{ fontSize:11.5,color:"var(--accent)",letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:10 }}>01 — About</p>
      <h2 style={{ fontSize:"clamp(26px,3.5vw,38px)",fontWeight:700,letterSpacing:"-0.02em",lineHeight:1.15,marginBottom:40 }}>Building apps that<br/>millions actually use.</h2>

      <MagicBentoGrid>
        <BentoCard span={2} rowSpan={2}>
          <div style={{ display:"flex",flexDirection:"column",height:"100%",gap:14 }}>
            <div style={{ width:40,height:40,borderRadius:10,background:"var(--accent-dim)",border:"1px solid rgba(108,99,255,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20 }}>👨‍💻</div>
            <div style={{ fontSize:13,fontWeight:700,color:"var(--text)",textTransform:"uppercase",letterSpacing:"0.08em",fontFamily:"'JetBrains Mono',monospace" }}>Who I am</div>
            <p style={{ fontSize:14,color:"var(--text2)",lineHeight:1.85 }}>Senior Android Developer & Team Lead based in Phnom Penh, Cambodia at LOMA Technology. I specialize in Kotlin, Jetpack Compose, and scalable Android architecture.</p>
            <p style={{ fontSize:13.5,color:"var(--text2)",lineHeight:1.8 }}>Grown from solo developer to team lead — recruiting, mentoring, and building high-performance teams while still writing the best code in the room.</p>
            <div style={{ marginTop:"auto",display:"flex",gap:8,flexWrap:"wrap" }}>
              {["Kotlin","Jetpack Compose","MVVM","CI/CD"].map(tag=>(
                <span key={tag} className="mono" style={{ fontSize:10,color:"var(--accent)",background:"var(--accent-dim)",border:"1px solid rgba(108,99,255,0.2)",borderRadius:100,padding:"3px 10px" }}>{tag}</span>
              ))}
            </div>
          </div>
        </BentoCard>

        <BentoCard>
          <div style={{ fontSize:28,fontWeight:800,color:"var(--accent)",lineHeight:1 }}>30<span style={{fontSize:18}}>%</span></div>
          <div style={{ fontSize:12,fontWeight:600,color:"var(--text)",marginTop:6,marginBottom:4 }}>Performance Boost</div>
          <div style={{ fontSize:11.5,color:"var(--text2)" }}>Kotlin migration → 25% less bug density</div>
        </BentoCard>

        <BentoCard>
          <div style={{ fontSize:28,fontWeight:800,color:"#00D4FF",lineHeight:1 }}>40<span style={{fontSize:18}}>%</span></div>
          <div style={{ fontSize:12,fontWeight:600,color:"var(--text)",marginTop:6,marginBottom:4 }}>Faster Dev</div>
          <div style={{ fontSize:11.5,color:"var(--text2)" }}>Jetpack Compose adoption company-wide</div>
        </BentoCard>

        <BentoCard rowSpan={2}>
          <div style={{ display:"flex",flexDirection:"column",height:"100%",justifyContent:"space-between" }}>
            <div>
              <span style={{ fontSize:22 }}>🔧</span>
              <div style={{ fontSize:12,fontWeight:600,color:"var(--text)",marginTop:8 }}>CI/CD Pipeline</div>
              <div style={{ fontSize:11.5,color:"var(--text2)",marginTop:4 }}>2 hours → 15 minutes</div>
            </div>
            <div className="mono" style={{ fontSize:10,color:"var(--accent)",background:"var(--accent-dim)",borderRadius:6,padding:"4px 8px",display:"inline-block",marginTop:10 }}>8× faster releases</div>
          </div>
        </BentoCard>

        <BentoCard rowSpan={2}>
          <div style={{ display:"flex",flexDirection:"column",height:"100%",justifyContent:"space-between" }}>
            <div>
              <span style={{ fontSize:22 }}>👥</span>
              <div style={{ fontSize:12,fontWeight:600,color:"var(--text)",marginTop:8 }}>Team Builder</div>
              <div style={{ fontSize:11.5,color:"var(--text2)",marginTop:4 }}>60% faster onboarding. 45% better code quality scores.</div>
            </div>
          </div>
        </BentoCard>

        <BentoCard rowSpan={2}>
          <div style={{ display:"flex",flexDirection:"column",height:"100%",justifyContent:"center" }}>
            <div style={{ fontSize:22,marginBottom:8 }}>🌏</div>
            <div style={{ fontSize:12,fontWeight:600,color:"var(--text)",marginBottom:4 }}>Based in Cambodia</div>
            <div className="mono" style={{ fontSize:10.5,color:"var(--text3)" }}>Available globally · Remote-first</div>
          </div>
        </BentoCard>

        <BentoCard rowSpan={2}>
          <div style={{ display:"flex",flexDirection:"column",height:"100%",justifyContent:"center" }}>
            <div style={{ fontSize:28,fontWeight:800,lineHeight:1 }}>
              <span style={{color:"#c3e88d"}}>500K</span><span style={{color:"var(--accent)",fontSize:18}}>+</span>
            </div>
            <div style={{ fontSize:12,fontWeight:600,color:"var(--text)",marginTop:6 }}>Users reached</div>
            <div style={{ fontSize:11.5,color:"var(--text2)",marginTop:4 }}>Across all shipped apps</div>
          </div>
        </BentoCard>
      </MagicBentoGrid>
    </div>
  </section>
);

/* ─── EXPERIENCE (Scroll-following avatar timeline) ────────── */
const experiences=[
  { range:"Jan 2023\nPresent",place:"Phnom Penh, Cambodia",role:"Senior Android Developer & Team Lead",company:"LOMA Technology",
    items:["Scaled to team lead — recruiting, mentoring, and managing Android teams while establishing best practices and code review standards.","Architected production apps serving 500K+ combined users, managing full SDLC from requirements through post-launch optimization.","Pioneered Jetpack Compose adoption, reducing UI development time by 40% and improving code reusability by 50%.","Implemented CI/CD pipelines cutting deployment time from 2 hours to 15 minutes.","Delivered features 15–20% ahead of schedule with zero critical bugs in production across all projects."] },
  { range:"Feb 2022\nDec 2022",place:"Indore, India",role:"Android Developer",company:"ThoughtWin IT Solution Pvt. Ltd",
    items:["Contributed to enterprise-grade mobile applications in an agile environment with 95%+ sprint completion rate.","Integrated 15+ complex third-party APIs including payment gateways and social authentication, optimizing network efficiency by 30%.","Implemented advanced caching strategies improving app load times by 50% and reducing data consumption by 35%.","Active code reviews — identified and resolved 100+ potential issues before production deployment."] },
  { range:"Feb 2020\nJan 2022",place:"Bangalore, India",role:"Android Developer (Solo / Independent)",company:"Xcellity Technology Pvt Ltd",
    items:["Independently designed, developed, and deployed 4–5 apps for international clients — averaging 4.2+ Play Store ratings.","Built secure banking apps with Stripe & PayPal, implementing PCI-DSS compliance and end-to-end encryption.","Built real-time social features using Socket.IO and Firebase supporting 10K+ concurrent users at 99.9% uptime.","Awarded \"Developer of the Year\" for exceptional performance."] },
  { range:"Feb 2019\nAug 2019",place:"Lucknow, India",role:"Junior Android Developer",company:"SoftGen Technologies Private Limited",dimDot:true,
    items:["Built Android applications using XML-based UI and Java, establishing a strong mobile development foundation.","Reduced application crash rates by 60% through systematic debugging and thorough QA practices.","Created comprehensive technical documentation improving knowledge transfer and maintenance efficiency."] },
];

function Experience() {
  const sectionRef = useRef(null);
  const avatarRef = useRef(null);
  const lineRef = useRef(null);
  const [avatarTop, setAvatarTop] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current || !lineRef.current) return;
      const sr = sectionRef.current.getBoundingClientRect();
      const sectionH = sectionRef.current.offsetHeight;
      const scrolled = -sr.top + window.innerHeight * 0.35;
      const progress = Math.max(0, Math.min(1, scrolled / sectionH));
      const lineH = lineRef.current.offsetHeight;
      setAvatarTop(progress * lineH);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="experience" ref={sectionRef} style={{ padding:"100px 0",background:"var(--bg2)" }}>
      <div style={{ maxWidth:1100,margin:"0 auto",padding:"0 5%" }}>
        <p className="mono" style={{ fontSize:11.5,color:"var(--accent)",letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:10 }}>02 — Experience</p>
        <h2 style={{ fontSize:"clamp(26px,3.5vw,38px)",fontWeight:700,letterSpacing:"-0.02em",lineHeight:1.15,marginBottom:16 }}>Where I've worked.</h2>

        <div style={{ marginTop:48,display:"flex",gap:32 }}>
          <div ref={lineRef} style={{ position:"relative",width:64,flexShrink:0 }}>
            <div style={{ position:"absolute",left:"50%",transform:"translateX(-50%)",top:0,bottom:0,width:2,background:"linear-gradient(to bottom,var(--accent) 0%,rgba(108,99,255,0.1) 100%)",borderRadius:2 }}/>
            <div ref={avatarRef} style={{ position:"absolute",left:"50%",transform:"translateX(-50%)",top:avatarTop,width:52,height:52,borderRadius:"50%",zIndex:5,transition:"top 0.1s ease-out" }}>
              <div style={{ width:"100%",height:"100%",borderRadius:"50%",border:"2.5px solid var(--accent)",boxShadow:"0 0 0 4px rgba(108,99,255,0.15),0 0 20px rgba(108,99,255,0.3)",overflow:"hidden" }}>
                <img src="https://avatars.githubusercontent.com/raipradeep" alt="Pradeep" style={{ width:"100%",height:"100%",objectFit:"cover" }}/>
              </div>
            </div>
          </div>

          <div style={{ flex:1,display:"flex",flexDirection:"column" }}>
            {experiences.map((exp,idx)=>(
              <div key={idx} className="tli-grid" style={{ display:"grid",gridTemplateColumns:"130px 1fr",gap:"0 28px",paddingBottom:idx<experiences.length-1?52:0 }}>
                <div style={{ textAlign:"right",paddingTop:2 }}>
                  <div className="mono" style={{ fontSize:11,color:"var(--accent)",lineHeight:1.5,whiteSpace:"pre-line" }}>{exp.range}</div>
                  <div className="mono" style={{ fontSize:10.5,color:"var(--text3)",marginTop:4,lineHeight:1.4 }}>{exp.place}</div>
                </div>
                <div style={{ paddingTop:0 }}>
                  <div style={{ fontSize:16,fontWeight:600,color:"var(--text)",marginBottom:2 }}>{exp.role}</div>
                  <div className="mono" style={{ fontSize:12,color:"var(--accent)",marginBottom:12 }}>{exp.company}</div>
                  <ul className="tl-ul" style={{ listStyle:"none",display:"flex",flexDirection:"column",gap:7 }}>
                    {exp.items.map((item,i)=><li key={i} style={{ fontSize:13.5,color:"var(--text2)",lineHeight:1.65 }}>{item}</li>)}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── SKILLS (ChromaGrid) ──────────────────────────────────── */
const Skills=()=>(
  <section id="skills" style={{ padding:"100px 0" }}>
    <div style={{ maxWidth:1100,margin:"0 auto",padding:"0 5%" }}>
      <p className="mono" style={{ fontSize:11.5,color:"var(--accent)",letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:10 }}>03 — Skills</p>
      <h2 style={{ fontSize:"clamp(26px,3.5vw,38px)",fontWeight:700,letterSpacing:"-0.02em",lineHeight:1.15,marginBottom:16 }}>Technologies I work with.</h2>
      <ChromaGrid items={["Kotlin","Java","Jetpack Compose","Coroutines","LiveData & Flow","Room Database","WorkManager","Firebase Suite","Socket.IO","MVVM Pattern","Clean Architecture","Dagger / Hilt","Retrofit","RESTful APIs","Material Design","CI/CD Pipelines","Git & GitHub","JIRA & Agile"]}/>
    </div>
  </section>
);

/* ─── APPS I'VE WORKED ON ──────────────────────────────────── */
const appCategories = [
  { icon:"🛍️", name:"Shopping Apps", desc:"E-commerce platforms with multi-payment, cart, and delivery tracking" },
  { icon:"🏥", name:"Health Care App", desc:"Patient management, appointment booking, and telemedicine" },
  { icon:"❤️", name:"Dating App", desc:"Matchmaking, real-time chat, and profile discovery" },
  { icon:"⚽", name:"Live Sports", desc:"Real-time scores, live commentary, and match highlights" },
  { icon:"🏦", name:"Banking App", desc:"Secure transactions, PCI-DSS compliant, and portfolio tracking" },
  { icon:"🎬", name:"Video Player App", desc:"High-performance playback with offline caching and subtitles" },
  { icon:"📡", name:"Live Streaming App", desc:"Low-latency streaming with chat and reactions" },
  { icon:"💬", name:"Chatting App", desc:"Real-time messaging, voice notes, and end-to-end encryption" },
  { icon:"📰", name:"News App", desc:"Curated news feeds, push notifications, and offline reading" },
  { icon:"📊", name:"Trading App", desc:"Live market data, charting tools, and order execution" },
  { icon:"🎰", name:"Casino Apps", desc:"Entertainment platforms with live games and secure payments" },
];

const AppsSection=()=>(
  <section id="apps" style={{ padding:"100px 0",background:"var(--bg2)" }}>
    <div style={{ maxWidth:1100,margin:"0 auto",padding:"0 5%" }}>
      <p className="mono" style={{ fontSize:11.5,color:"var(--accent)",letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:10 }}>— Apps I've Built</p>
      <h2 style={{ fontSize:"clamp(26px,3.5vw,38px)",fontWeight:700,letterSpacing:"-0.02em",lineHeight:1.15,marginBottom:12 }}>Diverse portfolio across<br/>every major category.</h2>
      <p style={{ fontSize:14,color:"var(--text2)",marginBottom:40,maxWidth:620 }}>From shopping and banking to live streaming and healthcare — I've shipped production-grade apps across 11+ domains, each with unique challenges and high user engagement.</p>

      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:16 }}>
        {appCategories.map((app)=>(
          <div key={app.name} className="app-card"
            style={{ background:"var(--bg3)",border:"1px solid var(--border)",borderRadius:14,padding:"20px 18px",transition:"transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",cursor:"default" }}
            onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-6px) scale(1.02)";e.currentTarget.style.boxShadow="0 16px 48px rgba(108,99,255,0.15)";e.currentTarget.style.borderColor="rgba(108,99,255,0.5)";}}
            onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0) scale(1)";e.currentTarget.style.boxShadow="none";e.currentTarget.style.borderColor="var(--border)";}}
          >
            <div style={{ fontSize:32,marginBottom:10 }}>{app.icon}</div>
            <div style={{ fontSize:14,fontWeight:600,color:"var(--text)",marginBottom:4 }}>{app.name}</div>
            <div style={{ fontSize:11.5,color:"var(--text3)",lineHeight:1.5 }}>{app.desc}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ─── PROJECTS (PixelCards) ────────────────────────────────── */
const projects=[
  { href:"https://play.google.com/store/apps/details?id=com.loma.oneshop",icon:"🛍️",tag:"E-Commerce",name:"OneShop",desc:"Cambodia's go-to shopping platform with thousands of deals starting at $1. Smooth product discovery, secure multi-payment, and fast delivery UX.",meta:"50K+ downloads · 4.3★",live:true },
  { href:"https://play.google.com/store/apps/details?id=com.luckyinfos.android",icon:"🎯",tag:"Sports & News",name:"Luckyinfos",desc:"All-in-one platform for live sports scores, lottery results, and curated news. Real-time socket integration with customizable notification preferences.",meta:"Sports · Updated Mar 2026",live:true },
  { href:"https://play.google.com/store/apps/details?id=com.elitemart.android",icon:"🏪",tag:"E-Commerce",name:"EliteMart",desc:"Premium supermarket app with clothing, groceries, and essentials. Multi-payment support, fast delivery, and 24/7 customer support flow.",meta:"5K+ downloads · Shopping",live:true },
  { href:"https://play.google.com/store/apps/details?id=com.lms.android",icon:"🏢",tag:"Enterprise · HRMS",name:"Folkara HRMS",desc:"Comprehensive HR management suite — employee onboarding, real-time attendance, leave management, and automated request workflows.",meta:"Business · Updated Mar 2026",live:true },
  { href:"https://play.google.com/store/apps/details?id=com.kkForex.android",icon:"📈",tag:"Finance · Forex",name:"KK Forex",desc:"Real-time forex trading companion with live rate feeds, market analysis tools, and portfolio tracking. Built for precision and speed.",meta:"Finance · Live data",live:true },
  { href:"https://play.google.com/store/apps/details?id=com.kkmega777.android",icon:"🎲",tag:"Entertainment",name:"KK Mega777",desc:"Feature-rich entertainment platform with live content feeds and real-time socket updates. Smooth Compose UI optimized for engagement.",meta:"Entertainment · Real-time",live:true },
  { icon:"🎬",tag:"Entertainment",name:"CastIndia",desc:"Entertainment & casting platform connecting talent with opportunities. Real-time Firebase and Socket.IO integration.",meta:"Private / Confidential",live:false,nda:true },
  { icon:"🎙️",tag:"Media · Podcasts",name:"ABC Podcasts",desc:"Podcast streaming app with curated content discovery, offline listening via WorkManager, and smooth audio playback.",meta:"Private / Confidential",live:false,nda:true },
];

const PCardContent=({ icon,tag,name,desc,meta,live,nda })=>(
  <div style={{ padding:24,display:"flex",flexDirection:"column",gap:14,height:"100%" }}>
    <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start" }}>
      <div style={{ width:42,height:42,background:"var(--bg2)",border:"1px solid var(--border)",borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",fontSize:19 }}>{icon}</div>
      {nda?<span className="mono" style={{ fontSize:11,color:"var(--text3)" }}>NDA</span>:<span style={{ color:"var(--text3)",fontSize:17 }}>↗</span>}
    </div>
    <div>
      <span style={{ display:"inline-flex",alignItems:"center",background:"var(--accent-dim)",border:"1px solid rgba(108,99,255,0.2)",color:"var(--accent)",fontFamily:"'JetBrains Mono',monospace",fontSize:10.5,padding:"3px 10px",borderRadius:100 }}>{tag}</span>
      <div style={{ fontSize:16,fontWeight:600,color:"var(--text)",lineHeight:1.3,marginTop:8 }}>{name}</div>
      <p style={{ fontSize:13,color:"var(--text2)",lineHeight:1.7 }}>{desc}</p>
    </div>
    <div style={{ marginTop:"auto",paddingTop:14,borderTop:"1px solid var(--border)",display:"flex",alignItems:"center",justifyContent:"space-between" }}>
      <span className="mono" style={{ fontSize:10.5,color:"var(--text3)" }}>{meta}</span>
      {live&&<div style={{ display:"flex",alignItems:"center",gap:5,fontFamily:"'JetBrains Mono',monospace",fontSize:10.5,color:"var(--accent)" }}><PlayIcon/>Play Store</div>}
    </div>
  </div>
);

const Projects=()=>(
  <section id="projects" style={{ padding:"100px 0" }}>
    <div style={{ maxWidth:1100,margin:"0 auto",padding:"0 5%" }}>
      <p className="mono" style={{ fontSize:11.5,color:"var(--accent)",letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:10 }}>05 — Projects</p>
      <h2 style={{ fontSize:"clamp(26px,3.5vw,38px)",fontWeight:700,letterSpacing:"-0.02em",lineHeight:1.15,marginBottom:16 }}>Apps on the Play Store.</h2>
      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(310px,1fr))",gap:18,marginTop:44 }}>
        {projects.map(p=>p.nda?(
          <PixelCard key={p.name} disabled><PCardContent {...p}/></PixelCard>
        ):(
          <a key={p.name} href={p.href} target="_blank" rel="noopener" style={{ textDecoration:"none",color:"inherit",display:"block" }}>
            <PixelCard><PCardContent {...p}/></PixelCard>
          </a>
        ))}
      </div>
      <p className="mono" style={{ fontSize:11,color:"var(--text3)",marginTop:20,textAlign:"center" }}>* Faded cards are private enterprise apps — not publicly listed due to NDA restrictions.</p>
    </div>
  </section>
);

/* ─── EDUCATION & AWARDS (Magic Bento) ────────────────────── */
const More=()=>(
  <section id="recognition" style={{ padding:"100px 0",background:"var(--bg2)" }}>
    <div style={{ maxWidth:1100,margin:"0 auto",padding:"0 5%" }}>
      <p className="mono" style={{ fontSize:11.5,color:"var(--accent)",letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:10 }}>06 — Recognition</p>
      <h2 style={{ fontSize:"clamp(26px,3.5vw,38px)",fontWeight:700,letterSpacing:"-0.02em",lineHeight:1.15,marginBottom:40 }}>Awards &amp; Achievements.</h2>

      <MagicBentoGrid>
        <BentoCard span={2} rowSpan={2} style={{ background:"linear-gradient(135deg,#1a0a2e 0%,#111 60%)" }}>
          <div style={{ height:"100%",display:"flex",flexDirection:"column" }}>
            <div style={{ fontSize:36,marginBottom:12 }}>🌟</div>
            <div style={{ fontSize:15,fontWeight:700,color:"var(--text)",marginBottom:4 }}>Developer of the Year</div>
            <div className="mono" style={{ fontSize:11,color:"var(--accent)",marginBottom:12 }}>Xcellity Technology Pvt Ltd</div>
            <p style={{ fontSize:13,color:"var(--text2)",lineHeight:1.7,flex:1 }}>Recognized for outstanding contributions, innovative solutions, and exceptional performance as Solo Android Developer — consistently exceeding client expectations under challenging deadlines.</p>
            <div style={{ marginTop:16,display:"inline-flex",alignItems:"center",gap:6,background:"var(--accent-dim)",border:"1px solid rgba(108,99,255,0.2)",borderRadius:100,padding:"4px 12px",alignSelf:"flex-start" }}>
              <span style={{ width:6,height:6,borderRadius:"50%",background:"var(--accent)" }}/>
              <span className="mono" style={{ fontSize:10,color:"var(--accent)" }}>Top performer · 2020–2022</span>
            </div>
          </div>
        </BentoCard>

        <BentoCard span={2}>
          <div style={{ display:"flex",gap:12,alignItems:"flex-start" }}>
            <span style={{ fontSize:26 }}>📜</span>
            <div>
              <div style={{ fontSize:14,fontWeight:700,color:"var(--text)" }}>Android Developer Certification</div>
              <div className="mono" style={{ fontSize:11,color:"var(--accent)",marginTop:3 }}>SoftGen Technologies</div>
              <div style={{ fontSize:12.5,color:"var(--text2)",marginTop:6,lineHeight:1.6 }}>Professional certification for technical excellence in Android development and QA practices.</div>
            </div>
          </div>
        </BentoCard>

        <BentoCard>
          <div style={{ fontSize:22,marginBottom:10 }}>🌐</div>
          <div style={{ fontSize:12,fontWeight:600,color:"var(--text)",marginBottom:8 }}>Languages</div>
          <div style={{ display:"flex",flexDirection:"column",gap:6 }}>
            {[{lang:"English",level:"Professional"},{lang:"Hindi",level:"Native"}].map(({lang,level})=>(
              <div key={lang} style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                <span style={{ fontSize:12.5,color:"var(--text2)" }}>{lang}</span>
                <span className="mono" style={{ fontSize:10,color:"var(--accent)",background:"var(--accent-dim)",borderRadius:100,padding:"2px 8px" }}>{level}</span>
              </div>
            ))}
          </div>
        </BentoCard>

        <BentoCard>
          <div style={{ fontSize:22,marginBottom:10 }}>📍</div>
          <div style={{ fontSize:12,fontWeight:600,color:"var(--text)",marginBottom:4 }}>Currently in</div>
          <div style={{ fontSize:13,color:"var(--accent)",fontWeight:600 }}>Phnom Penh</div>
          <div className="mono" style={{ fontSize:10.5,color:"var(--text3)",marginTop:2 }}>Cambodia · Available globally</div>
        </BentoCard>
      </MagicBentoGrid>
    </div>
  </section>
);

/* ─── CONTACT (with Lanyard widget) ───────────────────────── */
const Contact=()=>(
  <section id="contact" style={{ padding:"100px 0" }}>
    <div style={{ maxWidth:1100,margin:"0 auto",padding:"0 5%" }}>
      <div style={{ maxWidth:720,margin:"0 auto",textAlign:"center" }}>
        <p className="mono" style={{ fontSize:11.5,color:"var(--accent)",letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:10 }}>07 — Contact</p>
        <h2 style={{ fontSize:"clamp(26px,3.5vw,38px)",fontWeight:700,letterSpacing:"-0.02em",lineHeight:1.15,marginBottom:16 }}>Let's build something<br/>great together.</h2>
        <p style={{ fontSize:14.5,color:"var(--text2)",lineHeight:1.85,margin:"18px 0 32px" }}>Open to Senior Android roles, team lead positions, freelance projects, and interesting collaborations. Based in Cambodia — available globally.</p>

        <a href="mailto:raipradeep009@gmail.com" className="c-email mono" style={{ display:"inline-block",fontSize:16,color:"var(--accent)",textDecoration:"none",borderBottom:"1px solid rgba(108,99,255,0.3)",paddingBottom:3,marginBottom:8,transition:"border-color 0.2s" }}>raipradeep009@gmail.com</a>
        <span className="mono" style={{ display:"block",fontSize:12,color:"var(--text3)",marginBottom:32 }}>📱 WhatsApp: +91-7905307223 · Telegram: +855-11713091</span>

        <div style={{ display:"flex",justifyContent:"center",gap:12,flexWrap:"wrap" }}>
          {[
            { href:"https://github.com/raipradeep",l:"raipradeep" },
            { href:"https://github.com/PradeepLoma",l:"PradeepLoma" },
            { href:"https://github.com/pradeeprai009",l:"pradeeprai009" },
          ].map(({href,l})=>(
            <a key={l} href={href} target="_blank" rel="noopener" className="soc-btn mono" style={{ display:"inline-flex",alignItems:"center",gap:7,border:"1px solid var(--border2)",color:"var(--text2)",padding:"9px 16px",borderRadius:8,fontSize:12.5,textDecoration:"none",transition:"border-color 0.2s,color 0.2s,background 0.2s" }}>
              <GithubIcon/>{l}
            </a>
          ))}
          <a href="https://wa.me/917905307223" target="_blank" rel="noopener" className="soc-btn mono" style={{ display:"inline-flex",alignItems:"center",gap:7,border:"1px solid var(--border2)",color:"var(--text2)",padding:"9px 16px",borderRadius:8,fontSize:12.5,textDecoration:"none",transition:"border-color 0.2s,color 0.2s,background 0.2s" }}>💬 WhatsApp</a>
          <a href="https://t.me/+85511713091" target="_blank" rel="noopener" className="soc-btn mono" style={{ display:"inline-flex",alignItems:"center",gap:7,border:"1px solid var(--border2)",color:"var(--text2)",padding:"9px 16px",borderRadius:8,fontSize:12.5,textDecoration:"none",transition:"border-color 0.2s,color 0.2s,background 0.2s" }}>✈️ Telegram</a>
        </div>
      </div>
    </div>
  </section>
);

/* ─── FOOTER ───────────────────────────────────────────────── */
const Footer=()=>(
  <footer style={{ padding:"26px 5%",borderTop:"1px solid var(--border)",display:"flex",alignItems:"center",justifyContent:"space-between",fontFamily:"'JetBrains Mono',monospace",fontSize:11.5,color:"var(--text3)" }}>
    <span>© 2025 Pradeep Kumar Rai · Built with React</span>
    <span>Senior Android Developer · Phnom Penh, Cambodia</span>
  </footer>
);

/* ─── ROOT APP ─────────────────────────────────────────────── */
export default function App() {
  return (
    <>
      <GlobalStyles/>
      <Nav/>
      <Hero/>
      <About/>
      <Experience/>
      <Skills/>
      <AppsSection/>
      <Projects/>
      <More/>
      <Contact/>
      <Footer/>
    </>
  );
}
