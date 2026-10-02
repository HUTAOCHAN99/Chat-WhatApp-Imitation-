"use client";
import { useState, useRef, useEffect } from "react";
import { CHAT_SCENARIO, COMMAND_SCENARIO } from "./scenario";

/* ====== DATA — ganti sesuai kebutuhan ======
   avatar: URL gambar di /public (mis. "/bot.png"); kalau kosong dipakai huruf. */
const PEOPLE = {
  bot: { name: "Agemasen Bot", color: "#e8c36a", bg: "#c9757d", letter: "A", avatar: "/images/image.png" },
  sam: { name: "user1", color: "#53bdeb", bg: "#1f3a5f", letter: "U", avatar: "" },
};
const GROUP = {
  title: "Grup Random",
  members: "user1, user2, user3, user4, user5, user6, user7, user8, user9, user10, Agemasen Bot",
  avatar: "/images/image.png",
};
const SCENARIOS = { chat: CHAT_SCENARIO, command: COMMAND_SCENARIO };

const rich = (s) => s.split(/(\*\*[^*]+\*\*|@Agemasen Bot)/g).map((p, i) =>
  p === "@Agemasen Bot" ? <span key={i} className="mention">{p}</span> :
    p.startsWith("**") ? <b key={i}>{p.slice(2, -2)}</b> : p);

const Avatar = ({ p, size = 32, fs = 14 }) => (
  <div className="av" style={{ width: size, height: size, fontSize: fs, background: p.bg }}>
    {p.avatar ? <img src={p.avatar} alt="" /> : p.letter}
  </div>
);

const I = ({ d, s = 24 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
);

function Message({ m }) {
  const p = PEOPLE[m.from];
  const left = m.from !== "me";
  const lead = left ? (m.head ? <Avatar p={p} /> : <div className="gap" />) : <Avatar p={PEOPLE.bot} />;
  const q = m.quote && PEOPLE[m.quote.who];
  return (
    <div className={"row" + (m.head ? " head" : "")}>
      {m.from === "me" ? <Avatar p={{ ...PEOPLE.sam, letter: "K", bg: "#6b4fa0" }} /> : lead}
      <div className={"bub" + (m.type === "image" ? " img" : "")} style={{ marginLeft: 20 }}>
        {m.head && left && (
          <div className="name" style={{ color: p.color }}>
            <span>{p.name}</span>{p.phone && <span className="ph">{p.phone}</span>}
          </div>
        )}
        {m.type === "image" && (
          <div className={"pic" + (m.image ? " photo" : "")}>{m.image ? <img src={m.image} alt="" /> : m.letter}</div>
        )}
        {q && (
          <div className="quote" style={{ borderLeftColor: q.color }}>
            <div className="qn" style={{ color: q.color }}><span>{q.name}</span>{q.phone && <span className="ph">{q.phone}</span>}</div>
            <div className="qt">{rich(m.quote.text)}</div>
          </div>
        )}
        {m.big && <div className="big">{m.big}</div>}
        {m.caption && (
          <div className="cap txt">
            {m.caption.map((c, i) => typeof c === "string" ? c : <span key={i} className="mention">{c.m}</span>)}
          </div>
        )}
        {m.text && <span className="txt">{rich(m.text)}</span>}
        <span className="time">{m.time}</span>
        <div style={{ clear: "both" }} />
      </div>
      {m.type === "image" && <span className="fwd"><I d="M15 14l5-5-5-5M20 9H9a5 5 0 0 0-5 5v5" s={18} /></span>}
    </div>
  );
}

export default function Page() {
  const [mode, setMode] = useState("chat");
  const INIT = SCENARIOS[mode];
  const [msgs, setMsgs] = useState([SCENARIOS.chat[0]]);
  const [val, setVal] = useState("");
  const [typing, setTyping] = useState(false);
  const end = useRef(null);
  useEffect(() => { end.current?.scrollIntoView(); }, [msgs]);

  useEffect(() => {
    let timer;
    let index = 1;
    setMsgs([INIT[0]]);
    setTyping(false);
    let cancelled = false;

    const appendNext = () => {
      if (index >= INIT.length) {
        setTyping(false);
        timer = window.setTimeout(() => {
          if (cancelled) return;
          index = 1;
          setMsgs([INIT[0]]);
          timer = window.setTimeout(appendNext, 650);
        }, 2200);
        return;
      }

      const message = INIT[index];
      if (message.from === "bot") {
        setTyping(true);
        const textLength = (message.text || message.quote?.text || "").length;
        timer = window.setTimeout(() => {
          if (cancelled) return;
          setMsgs((current) => [...current, message]);
          setTyping(false);
          index += 1;
          timer = window.setTimeout(appendNext, 450);
        }, Math.min(1800, Math.max(650, textLength * 8)));
        return;
      }

      setMsgs((current) => [...current, message]);
      index += 1;
      timer = window.setTimeout(appendNext, 450);
    };

    timer = window.setTimeout(appendNext, 650);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [mode]);

  const send = () => {
    if (!val.trim()) return;
    const t = new Date().toTimeString().slice(0, 5);
    setMsgs((current) => [...current, { id: Date.now(), from: "sam", head: true, time: t, text: val }]);
    setVal("");
  };

  return (
    <div className="app">
      <div className="hdr">
        <Avatar p={{ ...PEOPLE.bot, avatar: GROUP.avatar, letter: "P" }} size={40} fs={18} />
        <div className="info">
          <div className="title">{GROUP.title}</div>
          <div className="sub">{GROUP.members}</div>
        </div>
        <div className="icons">
          <Avatar p={{ bg: "#8a8fb8", letter: "M", avatar: "" }} size={26} fs={12} />
          <I d="M23 7l-7 5 7 5V7zM1 5h15v14H1z" />
          <span className="sep" />
          <I d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3" />
          <I d="M12 5v.01M12 12v.01M12 19v.01" />
        </div>
      </div>
      <div className="pin">
        <I d="M12 17v5M9 3h6l-1 7 3 3v2H7v-2l3-3-1-7z" s={18} />
        <span><b>Agemasen:</b> 🎧 Audio</span>
      </div>
      <div style={{ display: "flex", gap: 8, padding: "6px 12px", background: "#111b21" }}>
        {[["chat", "💬 Skenario ngobrol"], ["command", "⌨️ Contoh command"]].map(([k, label]) => (
          <button key={k} onClick={() => setMode(k)}
            style={{ cursor: "pointer", border: 0, borderRadius: 16, padding: "5px 12px", fontSize: 12.5,
              color: mode === k ? "#111b21" : "#e9edef", background: mode === k ? "#00a884" : "#233138" }}>
            {label}
          </button>
        ))}
      </div>
      <div className="chat">
        {msgs.map((m) => <Message key={m.id} m={m} />)}
        {typing && (
          <div className="row head typing-row" role="status" aria-label="Agemasen Bot sedang mengetik">
            <Avatar p={PEOPLE.bot} />
            <div className="typing-bubble">
              <span /><span /><span />
            </div>
          </div>
        )}
        <div ref={end} />
      </div>
      <div className="inp">
        <div className="pill">
          <I d="M21 12l-9 9a6 6 0 0 1-9-9l9-9a4 4 0 0 1 6 6l-9 9a2 2 0 0 1-3-3l8-8" s={22} />
          <I d="M12 21a9 9 0 1 0-9-9v9h9zM8 10h.01M16 10h.01M8 15c2 2 6 2 8 0" s={22} />
          <input value={val} onChange={(e) => setVal(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Type a message" />
          <I d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3zM19 11a7 7 0 0 1-14 0M12 18v4" s={22} />
        </div>
      </div>
    </div>
  );
}