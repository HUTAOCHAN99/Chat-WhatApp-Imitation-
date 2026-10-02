// Data preview untuk app/page.js (Chat-WhatApp-Imitation).
// Cara pakai: tempel salah satu array ini menggantikan `const INIT = [...]` di page.js,
// atau simpan file ini di /app lalu: import { CHAT_SCENARIO as INIT } from "./scenario";
//
// Catatan format (sesuai page.js):
// - INIT[0] selalu tampil duluan, sisanya muncul berurutan (bot "mengetik" dulu).
// - **teks** = tebal (dipakai untuk gesture Special Week).
// - head: true = bubble pertama dari satu pengirim (tampil avatar + nama).
// - Newline (\n) dirender apa adanya (white-space: pre-wrap).
// - Gambar/stiker/GIF disimulasikan pakai type: "image" + letter/emoji (atau isi image: "/images/xxx.png").

// =========================================================
// 1) SKENARIO NGOBROL
// =========================================================
export const CHAT_SCENARIO = [
  { id: 1, from: "sam", head: true, time: "20:14",
    text: "@Agemasen Bot halo, lagi ngapain?" },

  { id: 2, from: "bot", head: true, time: "20:14",
    text: "**Special Week mengangkat kepala dari semangkuk nasi.** Hah?! Tiba-tiba nyapa gitu... Lagi makan, lah, apa lagi! 😤 Kenapa, kangen ya?" },

  { id: 3, from: "sam", head: true, time: "20:15",
    text: "Hehe, kamu tuh imut banget sih" },

  { id: 4, from: "bot", head: true, time: "20:15",
    text: "**Special Week tersedak, lalu buru-buru membuang muka.** H-hah?! Jangan ngomong yang aneh-aneh, dong!" },
  { id: 5, from: "bot", time: "20:15",
    text: "**Telinganya bergerak-gerak pelan.** ...Ya, makasih. Tapi jangan besar kepala dulu!" },

  { id: 6, from: "sam", head: true, time: "20:16",
    quote: { who: "bot", text: "...Ya, makasih. Tapi jangan besar kepala dulu!" },
    text: "Eh, besok ada ujian fisika nih. Rumus energi kinetik apa sih?" },

  { id: 7, from: "bot", head: true, time: "20:16",
    text: "**Special Week menyilangkan tangan dengan gaya sok pintar.** Hmph, gitu aja nanya. Rumusnya:" },
  // Di bot asli, rumus $$...$$ dirender jadi gambar. Di preview, cukup pakai teks/gambar.
  { id: 8, from: "bot", time: "20:16", type: "image", letter: "Eₖ = ½mv²",
    caption: ["m = massa (kg), v = kecepatan (m/s)"] },
  { id: 9, from: "bot", time: "20:16",
    text: "Jadi kalau kecepatannya dua kali lipat, energinya jadi **empat kali lipat**. **Ia melirik sekilas ke arahmu.** Jangan salah paham, aku cuma nggak tahan lihat kamu kesulitan. Belajar yang bener, ya!" },

  { id: 10, from: "sam", head: true, time: "20:17",
    text: "Makasih Spe-chan", big: "🥕🥕🥕" },

  { id: 11, from: "bot", head: true, time: "20:17",
    quote: { who: "sam", text: "🥕🥕🥕" },
    text: "**Special Week terdiam, wajahnya memerah.** ...Wortelnya aku terima. B-bukan berarti aku senang, ya! 😳" },

  { id: 12, from: "sam", head: true, time: "20:18", text: "!lupain" },
  { id: 13, from: "bot", head: true, time: "20:18",
    text: "🧠 Oke, ingatan obrolan kita sudah dihapus. Mulai dari nol lagi... ya." },
];

// =========================================================
// 2) 1 COMMAND PER KATEGORI
// =========================================================
export const COMMAND_SCENARIO = [
  // 🔎 Pencarian gambar
  { id: 1, from: "sam", head: true, time: "20:20", text: "!img special_week_(umamusume)" },
  { id: 2, from: "bot", head: true, time: "20:20", type: "image", letter: "🖼️",
    caption: [
      "🖼️ Hasil Gambar\n\n👤 Karakter: special_week_(umamusume)\n🔢 Kode Sesi: 4821\n🆔 Kode Gambar: 7312045\n➡️ Ketik 4821 (siapa saja boleh) atau !next untuk gambar lain dari pencarian ini",
    ] },

  // 🎞️ Pencarian GIF
  { id: 3, from: "sam", head: true, time: "20:21", text: "!gif anime reaction" },
  { id: 4, from: "bot", head: true, time: "20:21", type: "image", letter: "GIF",
    caption: ["🎞️ Hasil GIF (TENOR)\n\n🔎 Keyword: anime reaction\n🔢 Kode Sesi: 5307"] },

  // 🎨 Stiker
  { id: 5, from: "sam", head: true, time: "20:22", text: "!sbrat capek banget hari ini 😭" },
  { id: 6, from: "bot", head: true, time: "20:22", type: "image", letter: "capek banget hari ini 😭",
    caption: [] },

  // 📥 Download media
  { id: 7, from: "sam", head: true, time: "20:23", text: "!dl https://youtu.be/xxxxxxxxxxx mp3" },
  { id: 8, from: "bot", head: true, time: "20:23", text: "🎧 judul-lagu.mp3  (4,2 MB)" },

  // 🖼️ AI upscale
  { id: 9, from: "sam", head: true, time: "20:24", type: "image", letter: "SD", caption: ["!hd"] },
  { id: 10, from: "bot", head: true, time: "20:24", type: "image", letter: "HD",
    caption: ["✨ Selesai di-upscale"] },

  // 📄 Dokumen
  { id: 11, from: "sam", head: true, time: "20:25", text: "📄 laporan.pdf\n!ringkas fokus ke bagian kesimpulan aja" },
  { id: 12, from: "bot", head: true, time: "20:25",
    text: "**Special Week membolak-balik halaman dengan serius.** Kesimpulannya: ... (ringkasan isi PDF)" },

  // 💬 Chat AI
  { id: 13, from: "sam", head: true, time: "20:26", text: "!lupain" },
  { id: 14, from: "bot", head: true, time: "20:26", text: "🧠 Ingatan obrolan sudah dihapus." },

  // ⚙️ Lain-lain
  { id: 15, from: "sam", head: true, time: "20:27", text: "!botstatus" },
  { id: 16, from: "bot", head: true, time: "20:27",
    text: "🤖 **Status Bot**\n\n**Koneksi:** ✅ terhubung\n**Uptime:** 2 hari 4 jam\n**Jumlah grup:** 12 (aktif 11, nonaktif 1)\n**Memori bot:** 184 MB\n**Di grup ini:** ✅ AKTIF" },
];