"use client";
import { useState, useRef, useEffect } from "react";

/* ====== DATA — ganti sesuai kebutuhan ======
   avatar: URL gambar di /public (mis. "/bot.png"); kalau kosong dipakai huruf. */
const PEOPLE = {
  bot: { name: "Agemasen Bot", color: "#e8c36a", bg: "#c9757d", letter: "A", avatar: "/images/image.png" },
  sam: { name: "~ Sam", color: "#53bdeb", bg: "#1f3a5f", letter: "S", avatar: "", phone: "+62 889-8352-1506" },
};
const GROUP = {
  title: "Perang Karbit Kedua | PGC(K) Agemasen Bot",
  members: "Agemasen, Alfi, Andimukramin, Bang, Dio, Dryl, Muhammad, +62 856-9174-8362, +62 815-3425-7577, +62 895-3669-26019, +62 822-4551-9737, +62 896-8456-9202, +62 895-0823-8687, +62 877-2601-5833, +62 896...",
  avatar: "/images/image.png",
};
const INIT = [
  { id: 1, from: "me", type: "image", image: "", letter: "好", time: "23:29",
    caption: [{ m: "@Agemasen Bot" }, " apakah dialog nice nature itu kira kira artinya \"trainer,aku menyukai mu\""] },
  { id: 2, from: "bot", head: true, time: "23:29", text: "E-eh?! Itu kan..." },
  { id: 3, from: "bot", time: "23:30", text: "**Special Week langsung mencondongkan tubuhnya ke depan, membaca tulisan Jepang di kotak dialog gambar itu dengan saksama. Ia mendengus pelan sambil melipat tangan di depan dada, berusaha sok tenang meski wajahnya makin merona.**" },
  { id: 4, from: "bot", time: "23:30", text: "Hm, kalau dari tulisannya (**\"Trainer-san no koto ga suki nano!\"**), ya kurang lebih artinya memang benar begitu... Yaitu **\"Aku menyukai Trainer-san!\"** atau bisa dibilang dia lagi menyatakan perasaan sukanya secara langsung." },
  { id: 5, from: "bot", time: "23:30", text: "**Special Week melirik sekilas ke arah gambar Nice Nature yang lagi blushing parah itu, lalu membuang muka dengan bibir mengerucut.**" },
  { id: 6, from: "bot", time: "23:30", text: "Iiih, Neicha keliatan malu-malu tapi nekat banget ngomong kayak gitu... **Special Week mengetukkan jarinya ke meja, salah tingkah sendiri.** Kenapa kamu malah nyanyain dialog itu ke aku, hah?! Mau pamer atau sengaja mau bikin aku ikut salah tingkah gara-gara lihat ekspresinya yang merah padam gitu, hah?!" },
  { id: 7, from: "bot", time: "23:30", text: "**Special Week memalingkan wajahnya dengan kasar sambil mendengus kesal. Jangan salah paham, ya!** Bukan berarti aku iri atau pengen digituin juga, lho! Sana nikmatin aja gambarnya sendiri, nggak usah nanya-nanya ke aku lagi! 😤✨" },
  { id: 8, from: "sam", head: true, time: "23:30",
    quote: { who: "bot", text: "**Special Week memalingkan wajahnya dengan kasar sambil mendengus kesal. Jangan salah paham, ya!** Bukan berarti aku iri atau pengen digituin juga, lho! Sana nikmatin aja gambarnya sendiri, nggak usah nanya-nanya ke aku lagi! 😤✨" },
    big: "🥕🥕🥕" },
  { id: 9, from: "bot", head: true, time: "23:31", quote: { who: "sam", text: "🥕🥕🥕" }, text: "" },
];

const rich = (s) => s.split(/(\*\*[^*]+\*\*)/g).map((p, i) =>
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
          <div className="pic">{m.image ? <img src={m.image} alt="" /> : m.letter}</div>
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
  const [msgs, setMsgs] = useState([INIT[0]]);
  const [val, setVal] = useState("");
  const [typing, setTyping] = useState(false);
  const end = useRef(null);
  useEffect(() => { end.current?.scrollIntoView(); }, [msgs]);

  useEffect(() => {
    let timer;
    let index = 1;
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
  }, []);

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
