export const services = [
  {
    id: "service-webapp",
    icon: "blocks",
    preview: "app",
    title: "Jasa Web App Custom",
    short: "Aplikasi web untuk proses bisnis, membership, booking, dashboard, dan workflow internal.",
    heading: "Solusi custom yang dirancang dari workflow nyata.",
    body:
      "Kami mulai dari pemetaan proses, prioritas modul, role user, sampai desain dashboard. Cocok untuk bisnis yang butuh sistem khusus dan tidak cukup memakai template.",
    features: ["Discovery workshop", "Dashboard admin", "Role permission", "API integration", "QA scenario", "Deployment support"]
  },
  {
    id: "service-lms",
    icon: "graduation-cap",
    preview: "lms",
    title: "Jasa Website E-Learning",
    short: "Platform pembelajaran online untuk course, kelas live, sertifikat, dan pembayaran.",
    heading: "Bangun LMS yang nyaman untuk admin, mentor, dan peserta.",
    body:
      "Kami bantu merancang katalog course, area belajar, quiz, sertifikat, progress tracking, pembayaran, dan halaman mentor agar pengalaman belajar terasa lengkap.",
    features: ["Course builder", "Quiz dan tugas", "Certificate", "Payment flow", "Student dashboard", "Mentor area"]
  },
  {
    id: "service-store",
    icon: "shopping-bag",
    preview: "store",
    title: "Jasa Website E-Commerce",
    short: "Toko online dengan katalog produk, checkout, promo, ongkir, dan dashboard order.",
    heading: "E-commerce yang fokus pada konversi dan operasional.",
    body:
      "Kami menyusun halaman produk, checkout, promo, inventory, dan order management agar toko mudah dipakai pelanggan dan mudah dikelola tim.",
    features: ["Product catalog", "Checkout system", "Promo engine", "Order dashboard", "Payment gateway", "Analytics"]
  },
  {
    id: "service-profile",
    icon: "badge-check",
    preview: "profile",
    title: "Jasa Website Company Profile",
    short: "Website profil perusahaan yang kredibel, cepat, dan mudah diperluas untuk SEO.",
    heading: "Company profile yang terasa kredibel dari halaman pertama.",
    body:
      "Kami bantu susun struktur narasi, halaman layanan, proof, portofolio, CTA, dan optimasi teknis agar calon klien cepat paham nilai bisnis Anda.",
    features: ["Brand narrative", "Service pages", "Portfolio section", "SEO basics", "Responsive UI", "WhatsApp funnel"]
  }
];

export const projects = [
  { id: "p1", title: "KiddieCare Centre", category: "Company Profile", industry: "Education", colors: ["#bae6fd", "#ffedd5"] },
  { id: "p2", title: "Abumusa Auto", category: "Company Profile", industry: "Automotive", colors: ["#dbeafe", "#111827"] },
  { id: "p3", title: "Inovtek LMS Demo", category: "E-Learning", industry: "Learning platform", colors: ["#ddd6fe", "#60a5fa"] },
  { id: "p4", title: "Puspita Wedding System", category: "Web App", industry: "Event operations", colors: ["#fef3c7", "#fb7185"] },
  { id: "p5", title: "Gatena Market", category: "E-Commerce", industry: "Retail", colors: ["#bbf7d0", "#0f172a"] },
  { id: "p6", title: "My Theta Appointment", category: "Web App", industry: "Health appointment", colors: ["#cffafe", "#facc15"] },
  { id: "p7", title: "Flores Tourism", category: "Travel", industry: "Tour and booking", colors: ["#bfdbfe", "#fb7185"] },
  { id: "p8", title: "Sanga Newsroom", category: "Company Profile", industry: "News and brand story", colors: ["#fef9c3", "#22c55e"] }
];

export const products = [
  {
    id: "lms-suite",
    mark: "lms",
    name: "Inovtek LMS E-Learning",
    image: "assets/inovtek-lms-icon.png",
    cover: "assets/inovtek-lms-cover.png",
    screenshots: Array.from({ length: 19 }, (_, index) => `assets/inovtek-lms-screen-${index + 1}.png`),
    category: "Plugin WordPress",
    subcategory: "LMS/E-Learning",
    price: 70000,
    rating: 5,
    sales: 24,
    version: "v1.5.9",
    description:
      "Inovtek LMS E-Learning adalah plugin WordPress dengan sistem E-Learning dan LMS lengkap untuk menjual course, pembelajaran online, dan produk digital. Paketnya dibuat untuk admin yang butuh instalasi cepat, dashboard rapi, fitur penjualan siap jalan, dan tampilan yang tetap mudah diatur tanpa menumpuk banyak plugin tambahan.",
    features: [
      { title: "Course Builder", detail: "Susun course, modul, lesson, file, video, dan preview materi dari satu dashboard." },
      { title: "Live Course Area", detail: "Area belajar untuk peserta dengan progress, materi bertahap, dan status penyelesaian." },
      { title: "Certificate Builder", detail: "Template sertifikat, nomor unik, dan penerbitan otomatis setelah course selesai." },
      { title: "Quiz dan Assessment", detail: "Quiz, tugas, passing grade, timer, dan ringkasan nilai untuk mentor." },
      { title: "Subscription", detail: "Paket membership bulanan/tahunan untuk katalog course atau kelas tertentu." },
      { title: "Affiliate System", detail: "Tracking referral, komisi, laporan performa, dan link promosi member." },
      { title: "Teacher Revenue Sharing", detail: "Atur pembagian pendapatan mentor per course, order, atau periode." },
      { title: "Analytics Report", detail: "Pantau student, course, transaksi, rating, dan funnel pembelajaran." },
      { title: "YouTube Protection", detail: "Embed video lebih aman dengan pembatasan tampilan di area belajar." },
      { title: "Elementor Compatible", detail: "Komponen utama bisa dipadukan dengan layout builder populer." },
      { title: "Payment Gateway Ready", detail: "Struktur checkout siap disambungkan ke integrasi pembayaran." },
      { title: "Import Demo", detail: "Mulai cepat dari demo layout, course sample, dan konfigurasi awal." }
    ],
    support: [
      { title: "Lifetime Update Selama Lisensi Aktif", detail: "Update versi minor, patch kompatibilitas, dan peningkatan UI mengikuti roadmap." },
      { title: "Technical Support", detail: "Bantuan instalasi, aktivasi lisensi, konfigurasi awal, dan troubleshooting dasar." },
      { title: "Video Dokumentasi", detail: "Panduan setup, course builder, checkout, sertifikat, dan workflow mentor." },
      { title: "Grup Komunitas", detail: "Tempat berbagi pertanyaan operasional, update rilis, dan contoh penggunaan." },
      { title: "Easy Install", detail: "File plugin, panduan aktivasi, dan checklist sebelum go-live." },
      { title: "Secure Payment Guidance", detail: "Arahan integrasi pembayaran dan validasi alur order." }
    ],
    plans: [
      { id: "trial", name: "Pro Plus Trial", price: 70000, duration: "1 Bulan" },
      { id: "pro", name: "Pro", price: 390000, duration: "1 Tahun" },
      { id: "plus", name: "Pro Plus", price: 590000, duration: "1 Tahun" }
    ],
    specs: [
      ["Platform", "WordPress"],
      ["Kategori", "Plugin LMS/E-Learning"],
      ["Versi", "v1.5.9"],
      ["Lisensi", "Single site dan multi site sesuai paket"],
      ["Kompatibilitas", "WordPress 6.x, PHP 8.x"],
      ["Builder", "Elementor compatible"],
      ["Pembayaran", "Checkout-ready"],
      ["Update", "Mengikuti masa lisensi"]
    ],
    included: [
      "File plugin Inovtek LMS",
      "Dashboard admin course",
      "Template course, checkout, dan member area",
      "Demo layout untuk import cepat",
      "Dokumentasi instalasi",
      "Checklist go-live",
      "Akses support sesuai paket",
      "Update versi selama lisensi aktif"
    ],
    reviews: [
      { name: "Fajar Lesmana", rating: 5, text: "Fiturnya lengkap dan enak dipakai untuk jual course." },
      { name: "Nadia Prameswari", rating: 5, text: "Setup awalnya jelas, dashboard adminnya rapi, dan peserta gampang diarahkan." },
      { name: "Rizky Mahardika", rating: 5, text: "Cocok untuk academy kecil yang butuh checkout, sertifikat, dan area mentor." }
    ],
    changelog: [
      { version: "1.5.9", text: "Improved header, footer, dan template rendering untuk halaman course." },
      { version: "1.5.8", text: "Fixed template rendering issue pada beberapa konfigurasi builder." },
      { version: "1.5.7", text: "Optimasi query dashboard student dan course analytics." },
      { version: "1.5.6", text: "Penyesuaian UI checkout, badge course, dan layout sertifikat." },
      { version: "1.5.5", text: "Added import demo feature untuk setup awal lebih cepat." },
      { version: "1.5.2", text: "Peningkatan kompatibilitas PHP 8 dan WordPress terbaru." },
      { version: "1.5.0", text: "Rilis subscription, affiliate system, dan teacher revenue sharing." }
    ]
  }
];
