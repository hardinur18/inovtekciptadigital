import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Blocks,
  Check,
  CheckSquare,
  ChevronDown,
  Chrome as ChromeIcon,
  ClipboardList,
  Clock,
  CreditCard,
  Download,
  ExternalLink,
  FileText,
  FolderKanban,
  GraduationCap,
  Home,
  Image,
  LayoutGrid,
  Mail,
  Menu,
  MessageCircle,
  MessageSquare,
  Package,
  Phone,
  Search,
  Send,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Star,
  X
} from "lucide-react";
import { products, projects, services } from "./data";
import { formatCurrency, getRouteFromHash, getStoredCart, navGroupFor, saveStoredCart } from "./utils";

const routeMap = {
  home: "home",
  portfolio: "portfolio",
  products: "products",
  cart: "cart",
  login: "login",
  register: "register",
  assistant: "assistant",
  contact: "contact"
};

const iconMap = {
  "arrow-left": ArrowLeft,
  "arrow-right": ArrowRight,
  "badge-check": BadgeCheck,
  blocks: Blocks,
  check: Check,
  "check-square": CheckSquare,
  "chevron-down": ChevronDown,
  chrome: ChromeIcon,
  "clipboard-list": ClipboardList,
  clock: Clock,
  "credit-card": CreditCard,
  download: Download,
  "external-link": ExternalLink,
  "file-text": FileText,
  "folder-kanban": FolderKanban,
  "graduation-cap": GraduationCap,
  home: Home,
  image: Image,
  "layout-grid": LayoutGrid,
  mail: Mail,
  menu: Menu,
  "message-circle": MessageCircle,
  "message-square": MessageSquare,
  package: Package,
  phone: Phone,
  search: Search,
  send: Send,
  "shield-check": ShieldCheck,
  "shopping-bag": ShoppingBag,
  "shopping-cart": ShoppingCart,
  star: Star,
  x: X
};

function Icon({ name, ...props }) {
  const Component = iconMap[name] || Blocks;
  return <Component {...props} />;
}

function Brand({ footer = false }) {
  return (
    <a className={`brand${footer ? " footer-brand" : ""}`} href="#home" aria-label="Beranda Inovtek">
      <img className="brand-logo" src="assets/inovtek-logo-mark.svg" alt="" />
      <span className="brand-word">inovtek</span>
    </a>
  );
}

function App() {
  const [route, setRoute] = useState(getRouteFromHash);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [waOpen, setWaOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [cart, setCart] = useState(getStoredCart);
  const [portfolioCategory, setPortfolioCategory] = useState("All");
  const [portfolioSearch, setPortfolioSearch] = useState("");
  const [productSearch, setProductSearch] = useState("");
  const [productCategory, setProductCategory] = useState("Semua Kategori");
  const [productMax, setProductMax] = useState("");
  const [productRating, setProductRating] = useState("0");
  const [productTab, setProductTab] = useState("detail");
  const [selectedPlanId, setSelectedPlanId] = useState(products[0].plans[0].id);

  const view = getView(route);
  const currentProduct = getCurrentProduct(route);
  const selectedPlan = currentProduct.plans.find((plan) => plan.id === selectedPlanId) || currentProduct.plans[0];
  const currentService = services.find((service) => service.id === route) || services[0];
  const navGroup = navGroupFor(route, view);

  useEffect(() => {
    const onHash = () => setRoute(getRouteFromHash());
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("hashchange", onHash);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("hashchange", onHash);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", mobileOpen);
    document.body.classList.toggle("search-open", searchOpen);
    document.body.classList.toggle("modal-open", waOpen);
  }, [mobileOpen, searchOpen, waOpen]);

  useEffect(() => {
    if (view === "product-detail") {
      setProductTab("detail");
      setSelectedPlanId(currentProduct.plans[0].id);
    }
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [route]);

  useEffect(() => {
    saveStoredCart(cart);
  }, [cart]);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    const clearLocalCaches = () => {
      if (!("caches" in window)) return Promise.resolve();
      return caches.keys().then((keys) =>
        Promise.all(keys.filter((key) => key.startsWith("inovtek-")).map((key) => caches.delete(key)))
      );
    };
    const handleLoad = () => {
      if (process.env.NODE_ENV !== "production") {
        navigator.serviceWorker.getRegistrations()
          .then((registrations) => Promise.all(registrations.map((registration) => registration.unregister())))
          .then(clearLocalCaches)
          .then(() => {
            if (navigator.serviceWorker.controller && !sessionStorage.getItem("inovtek-sw-reset")) {
              sessionStorage.setItem("inovtek-sw-reset", "1");
              window.location.reload();
            }
          })
          .catch(() => {});
        return;
      }
      navigator.serviceWorker.register("sw.js").catch(() => {});
    };
    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }
    return () => window.removeEventListener("load", handleLoad);
  }, []);

  function showToast(message) {
    setToast(message);
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => setToast(""), 2600);
  }

  function closeOverlays() {
    setMobileOpen(false);
    setSearchOpen(false);
  }

  function addCurrentProductToCart(goToCart = false) {
    const key = `${currentProduct.id}-${selectedPlan.id}`;
    setCart((items) => {
      if (items.some((item) => item.key === key)) return items;
      return [
        ...items,
        {
          key,
          productId: currentProduct.id,
          planId: selectedPlan.id,
          planName: selectedPlan.name,
          price: selectedPlan.price
        }
      ];
    });
    showToast(`${currentProduct.name} masuk ke keranjang.`);
    if (goToCart) window.location.hash = "cart";
  }

  function removeCartItem(key) {
    setCart((items) => items.filter((item) => item.key !== key));
    showToast("Produk dihapus dari keranjang.");
  }

  const shellProps = {
    route,
    view,
    navGroup,
    cart,
    closeOverlays,
    setMobileOpen,
    setSearchOpen,
    setWaOpen,
    showToast
  };

  return (
    <>
      <Header {...shellProps} solid={route !== "home" || scrolled} mobileOpen={mobileOpen} />
      <MobileBottomNav navGroup={navGroup} cartCount={cart.length} />
      <SearchOverlay
        open={searchOpen}
        query={searchQuery}
        setQuery={setSearchQuery}
        close={() => setSearchOpen(false)}
      />
      <main>
        {view === "home" && <HomeView />}
        {view === "service" && <ServiceView service={currentService} />}
        {view === "portfolio" && (
          <PortfolioView
            category={portfolioCategory}
            setCategory={setPortfolioCategory}
            query={portfolioSearch}
            setQuery={setPortfolioSearch}
          />
        )}
        {view === "products" && (
          <ProductsView
            query={productSearch}
            setQuery={setProductSearch}
            category={productCategory}
            setCategory={setProductCategory}
            max={productMax}
            setMax={setProductMax}
            rating={productRating}
            setRating={setProductRating}
          />
        )}
        {view === "product-detail" && (
          <ProductDetailView
            product={currentProduct}
            tab={productTab}
            setTab={setProductTab}
            selectedPlanId={selectedPlanId}
            setSelectedPlanId={setSelectedPlanId}
            selectedPlan={selectedPlan}
            addToCart={addCurrentProductToCart}
            showToast={showToast}
            openWhatsapp={() => setWaOpen(true)}
          />
        )}
        {view === "cart" && (
          <CartView cart={cart} removeCartItem={removeCartItem} showToast={showToast} />
        )}
        {view === "login" && <LoginView showToast={showToast} />}
        {view === "register" && <RegisterView showToast={showToast} />}
        {view === "assistant" && <AssistantView showToast={showToast} />}
        {view === "contact" && <ContactView showToast={showToast} openWhatsapp={() => setWaOpen(true)} />}
      </main>
      <Footer />
      <button className="whatsapp-float" type="button" onClick={() => setWaOpen(true)} aria-label="Buka formulir WhatsApp">
        <Icon name="message-circle" />
      </button>
      <WhatsappModal open={waOpen} close={() => setWaOpen(false)} />
      <div className={`toast${toast ? " is-visible" : ""}`}>{toast}</div>
    </>
  );
}

function getView(route) {
  if (route.startsWith("service-")) return "service";
  if (route.startsWith("product-")) return "product-detail";
  return routeMap[route] || "home";
}

function getCurrentProduct(route) {
  if (!route.startsWith("product-")) return products[0];
  return products.find((product) => product.id === route.replace("product-", "")) || products[0];
}

function Header({ solid, mobileOpen, setMobileOpen, setSearchOpen, cart, closeOverlays }) {
  const handleRoute = () => closeOverlays();
  return (
    <header className={`site-header${solid ? " is-solid" : ""}`} id="siteHeader">
      <div className="header-shell">
        <button className="icon-btn mobile-menu-btn" type="button" onClick={() => setMobileOpen(true)} aria-label="Buka navigasi">
          <Icon name="menu" />
        </button>
        <Brand />
        <nav className="desktop-nav" aria-label="Navigasi utama">
          <a href="#home" onClick={handleRoute}>Home</a>
          <div className="nav-dropdown">
            <button type="button">Layanan <Icon name="chevron-down" /></button>
            <div className="nav-menu">
              {services.map((service) => (
                <a key={service.id} href={`#${service.id}`} onClick={handleRoute}>{service.title.replace("Jasa ", "")}</a>
              ))}
            </div>
          </div>
          <a href="#products" onClick={handleRoute}>Produk</a>
          <a href="#portfolio" onClick={handleRoute}>Portofolio</a>
          <a href="#assistant" onClick={handleRoute}>AI Assistant <span className="soon-badge">soon</span></a>
          <a href="#contact" onClick={handleRoute}>Hubungi Kami</a>
        </nav>
        <div className="header-actions">
          <button className="icon-btn" type="button" onClick={() => setSearchOpen(true)} aria-label="Cari">
            <Icon name="search" />
          </button>
          <a className="icon-btn cart-link" href="#cart" aria-label="Keranjang">
            <Icon name="shopping-cart" />
            <span className="cart-count">{cart.length}</span>
          </a>
          <a className="login-btn" href="#login">Login</a>
        </div>
      </div>
      <button
        className={`mobile-panel-backdrop${mobileOpen ? " is-open" : ""}`}
        type="button"
        onClick={() => setMobileOpen(false)}
        aria-label="Tutup navigasi"
      />
      <aside className={`mobile-panel${mobileOpen ? " is-open" : ""}`} aria-hidden={!mobileOpen}>
        <div className="mobile-panel-head">
          <Brand />
          <button className="icon-btn" type="button" onClick={() => setMobileOpen(false)} aria-label="Tutup navigasi">
            <Icon name="x" />
          </button>
        </div>
        <a className="mobile-login" href="#login" onClick={handleRoute}>Login member</a>
        <a className="mobile-login subtle" href="#cart" onClick={handleRoute}>Keranjang</a>
        <div className="mobile-search">
          <Icon name="search" />
          <input type="search" placeholder="Cari layanan atau produk" onFocus={() => setSearchOpen(true)} />
        </div>
        <nav className="mobile-nav" aria-label="Navigasi mobile">
          <a href="#home" onClick={handleRoute}>Home</a>
          {services.map((service) => (
            <a key={service.id} href={`#${service.id}`} onClick={handleRoute}>{service.title.replace("Jasa ", "")}</a>
          ))}
          <a href="#products" onClick={handleRoute}>Produk</a>
          <a href="#portfolio" onClick={handleRoute}>Portofolio</a>
          <a href="#assistant" onClick={handleRoute}>AI Assistant</a>
          <a href="#contact" onClick={handleRoute}>Hubungi Kami</a>
        </nav>
      </aside>
    </header>
  );
}

function MobileBottomNav({ navGroup, cartCount }) {
  const items = [
    ["home", "home", "Home"],
    ["services", "layout-grid", "Layanan", "service-webapp"],
    ["products", "package", "Produk"],
    ["portfolio", "folder-kanban", "Portofolio"],
    ["cart", "shopping-cart", "Cart"]
  ];
  return (
    <nav className="mobile-bottom-nav" aria-label="Navigasi aplikasi mobile">
      {items.map(([group, icon, label, route = group]) => (
        <a key={group} href={`#${route}`} className={navGroup === group ? "is-active" : ""} aria-current={navGroup === group ? "page" : undefined}>
          <Icon name={icon} />
          <span>{label}</span>
          {group === "cart" && <b className="cart-count">{cartCount}</b>}
        </a>
      ))}
    </nav>
  );
}

function SearchOverlay({ open, query, setQuery, close }) {
  const items = useMemo(() => {
    const value = query.toLowerCase().trim();
    return [
      ...services.map((item) => ({ title: item.title, type: "Layanan", route: item.id })),
      ...projects.map((item) => ({ title: item.title, type: "Portofolio", route: "portfolio" })),
      ...products.map((item) => ({ title: item.name, type: "Produk", route: `product-${item.id}` }))
    ]
      .filter((item) => !value || item.title.toLowerCase().includes(value) || item.type.toLowerCase().includes(value))
      .slice(0, 8);
  }, [query]);

  return (
    <div className={`search-overlay${open ? " is-open" : ""}`} aria-hidden={!open}>
      <div className="search-box">
        <button className="icon-btn" type="button" onClick={close} aria-label="Tutup pencarian">
          <Icon name="x" />
        </button>
        <label htmlFor="siteSearch">Cari cepat</label>
        <div className="search-input-row">
          <Icon name="search" />
          <input id="siteSearch" type="search" placeholder="Contoh: LMS, ecommerce, portfolio" value={query} onChange={(event) => setQuery(event.target.value)} />
        </div>
        <div className="search-results">
          {items.map((item) => (
            <a className="search-result" href={`#${item.route}`} key={`${item.type}-${item.title}`} onClick={close}>
              <strong>{item.title}</strong>
              <span>{item.type}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function HomeView() {
  return (
    <section className="view is-active" data-view="home">
      <section className="hero-section" id="home">
        <div className="hero-bg-grid" aria-hidden="true" />
        <div className="hero-shell">
          <div className="hero-copy">
            <p className="eyebrow">Profesional website</p>
            <h1>Bangun Website Profesional Untuk Bisnis Anda</h1>
            <p className="hero-lead">Kami bantu bisnis Anda punya website profesional sesuai kebutuhan.</p>
            <div className="hero-actions">
              <a className="primary-btn" href="#services-home"><Icon name="layout-grid" />Explore Layanan</a>
            </div>
            <div className="press-row">
              <span>Sudah diliput oleh media nasional</span>
              <div className="press-logos" aria-label="Media dan klien">
                {["VIVA.co.id", "Liputan 6", "IDX Channel", "Times Indonesia", "Tech Daily"].map((item) => <b key={item}>{item}</b>)}
              </div>
            </div>
          </div>
          <HeroVisual />
        </div>
      </section>
      <ClientStrip />
      <SplitSection />
      <ServicesSection />
      <CustomSection />
      <PortfolioPreviewSection />
      <CtaBand />
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="hero-visual" aria-label="Preview dashboard dan website">
      <div className="metric-card top"><strong>500+</strong><span>Projek Website</span></div>
      <div className="phone-mock small"><div className="phone-bar" /><div className="ticket-line" /><div className="ticket-line short" /><div className="mini-chart" /></div>
      <div className="phone-mock main">
        <div className="progress-ring">78%</div>
        <div className="chip-row"><span /><span /><span /></div>
        <div className="bar-chart"><span /><span /><span /><span /></div>
      </div>
      <div className="phone-mock dark-phone"><div className="app-grid"><span /><span /><span /><span /><span /><span /></div></div>
      <div className="metric-card bottom"><strong>98%</strong><span>Client satisfaction</span></div>
    </div>
  );
}

function ClientStrip() {
  const clients = ["Theta Institute", "Blakc Brand", "Montessori Indonesia", "Perintis Group", "Sanga Sanga", "Temika", "Upsekil", "Dara Luxury"];
  return (
    <section className="client-strip">
      <div className="section-shell slim">
        <p className="eyebrow center">Dipercaya oleh klien nasional</p>
        <div className="client-marquee">{[...clients, ...clients].map((item, index) => <span key={`${item}-${index}`}>{item}</span>)}</div>
      </div>
    </section>
  );
}

function SplitSection() {
  return (
    <section className="split-section">
      <div className="section-shell split-grid">
        <div className="showcase-stack" aria-label="Tumpukan contoh website">
          <div className="web-preview preview-a"><div className="browser-bar" /><div className="preview-hero" /><div className="preview-grid" /></div>
          <div className="web-preview preview-b"><div className="browser-bar red" /><div className="shop-banner" /><div className="shop-grid" /></div>
        </div>
        <div className="section-copy">
          <p className="eyebrow">Profesional website</p>
          <h2>Inovtek akan mewujudkan website impian Anda</h2>
          <p>Kami akan buatkan website profesional yang disesuaikan dengan kebutuhan Anda agar bisnis makin mudah dan kredibel. Semua proses dibuat transparan dan terukur.</p>
          <div className="tech-row" aria-label="Teknologi">
            {["Next.js", "PHP", "WordPress", "PostgreSQL", "MySQL"].map((item) => <span key={item}>{item}</span>)}
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section className="services-section" id="services-home">
      <div className="section-shell">
        <div className="section-head">
          <p className="eyebrow">Layanan</p>
          <h2>Web services</h2>
          <p>Solusi lengkap untuk website bisnis, produk digital, dan sistem internal.</p>
        </div>
        <div className="service-grid">{services.map((service) => <ServiceCard key={service.id} service={service} />)}</div>
      </div>
    </section>
  );
}

function ServiceCard({ service }) {
  return (
    <article className="service-card">
      <div className="service-card-top">
        <span className="service-icon"><Icon name={service.icon} /></span>
        <span className="service-arrow"><Icon name="arrow-right" /></span>
      </div>
      <div className={`service-preview service-preview-${service.preview}`} aria-hidden="true">
        <div className="service-preview-browser" />
      </div>
      <h3>{service.title}</h3>
      <p>{service.short}</p>
      <a href={`#${service.id}`}>Pelajari layanan</a>
    </article>
  );
}

function CustomSection() {
  return (
    <section className="custom-section">
      <div className="section-shell custom-grid">
        <div>
          <p className="eyebrow">Web custom profesional</p>
          <h2>Website tailor-made untuk proses bisnis yang tidak pas dengan template.</h2>
          <p>Dari membership, subscription, dashboard internal, booking system, sampai AI-powered web app. Semua dirancang agar mudah dioperasikan tim Anda.</p>
          <div className="feature-pills">{["Membership", "SaaS", "LMS", "ERP", "E-Commerce", "Booking", "Internal tools", "AI web app"].map((item) => <span key={item}>{item}</span>)}</div>
          <div className="custom-benefit-strip" aria-label="Benefit website custom">
            {["Design Profesional", "Web Responsive & Secure", "Unlimited Revisi", "Unlimited Support", "Get Full Akses"].map((item) => <span key={item}>{item}</span>)}
          </div>
        </div>
        <div className="dashboard-preview" aria-label="Dashboard analitik">
          <div className="dashboard-sidebar" />
          <div className="dashboard-main"><div className="dash-top" /><div className="dash-cards"><span /><span /><span /></div><div className="dash-graph" /><div className="dash-table" /></div>
        </div>
      </div>
    </section>
  );
}

function PortfolioPreviewSection() {
  return (
    <section className="portfolio-preview-section">
      <div className="section-shell">
        <div className="section-head rowed">
          <div>
            <p className="eyebrow">Portofolio</p>
            <h2>Hasil karya terbaik Inovtek</h2>
            <p>Ragam implementasi website lintas industri yang kami bangun dengan kualitas desain dan performa.</p>
          </div>
          <a className="ghost-btn" href="#portfolio"><Icon name="external-link" />Lihat Portofolio</a>
        </div>
        <div className="portfolio-strip">{projects.map((project) => <ProjectCard key={project.id} project={project} />)}</div>
      </div>
    </section>
  );
}

function CtaBand() {
  return (
    <section className="cta-band">
      <div className="section-shell cta-inner">
        <div>
          <p className="eyebrow">Butuh Website Handal?</p>
          <h2>Segera konsultasikan kebutuhan website untuk bisnis Anda bersama kami</h2>
          <p>Kirim brief singkat. Tim Inovtek bantu turunkan menjadi scope, timeline, dan prioritas fitur.</p>
        </div>
        <a className="primary-btn" href="#contact"><Icon name="message-circle" />Hubungi Kami</a>
      </div>
    </section>
  );
}

function ServiceView({ service }) {
  return (
    <section className="view is-active" data-view="service">
      <section className="page-hero compact">
        <div className="section-shell page-hero-inner">
          <p className="eyebrow">Layanan</p>
          <h1>{service.title}</h1>
          <p>{service.short}</p>
        </div>
      </section>
      <section className="service-detail-section">
        <div className="section-shell detail-grid">
          <div className="detail-copy">
            <h2>{service.heading}</h2>
            <p>{service.body}</p>
            <div className="feature-list">{service.features.map((item) => <span key={item}>{item}</span>)}</div>
            <div className="hero-actions">
              <a className="primary-btn" href="#contact"><Icon name="send" />Konsultasi layanan</a>
              <a className="ghost-btn" href="#portfolio"><Icon name="folder-kanban" />Lihat portofolio</a>
            </div>
          </div>
          <div className="service-mock" aria-label="Preview layanan">
            <div className="service-window"><div /><div /><div /></div>
            <div className="service-bars"><span /><span /><span /><span /></div>
            <div className="service-cards"><span /><span /><span /></div>
          </div>
        </div>
      </section>
    </section>
  );
}

function PortfolioView({ category, setCategory, query, setQuery }) {
  const categories = ["All", ...new Set(projects.map((project) => project.category))];
  const filtered = projects.filter((project) => {
    const categoryMatch = category === "All" || project.category === category;
    const searchMatch = [project.title, project.category, project.industry].join(" ").toLowerCase().includes(query.toLowerCase().trim());
    return categoryMatch && searchMatch;
  });

  return (
    <section className="view is-active" data-view="portfolio">
      <section className="page-hero">
        <div className="section-shell page-hero-inner">
          <p className="eyebrow center">Inovtek showcase</p>
          <h1>Portofolio</h1>
          <p>Kualitas desain dan engineering, dirangkum dalam project pilihan.</p>
        </div>
      </section>
      <section className="portfolio-page-section">
        <div className="section-shell portfolio-layout">
          <aside className="filter-panel">
            <p className="eyebrow">Kategori</p>
            <div className="filter-list">
              {categories.map((item) => <button key={item} type="button" className={item === category ? "is-active" : ""} onClick={() => setCategory(item)}>{item}</button>)}
            </div>
          </aside>
          <div className="portfolio-content">
            <div className="search-line"><Icon name="search" /><input type="search" placeholder="Cari nama brand atau industri" value={query} onChange={(event) => setQuery(event.target.value)} /></div>
            <div className="portfolio-grid">{filtered.length ? filtered.map((project) => <ProjectCard key={project.id} project={project} />) : <div className="empty-cart">Belum ada portofolio yang cocok dengan filter ini.</div>}</div>
          </div>
        </div>
      </section>
    </section>
  );
}

function ProjectCard({ project }) {
  return (
    <article className="portfolio-card">
      <div className="project-shot" style={{ "--shot-a": project.colors[0], "--shot-b": project.colors[1] }}>
        <div className="shot-window" />
      </div>
      <div className="portfolio-card-body">
        <h3>{project.title}</h3>
        <p>{project.category} - {project.industry}</p>
        <a className="visit-btn" href="#contact">Kunjungi</a>
      </div>
    </article>
  );
}

function ProductsView({ query, setQuery, category, setCategory, max, setMax, rating, setRating }) {
  const categories = ["Semua Kategori", ...new Set(products.map((product) => product.category))];
  const filtered = products.filter((product) => {
    const text = [product.name, product.category, product.subcategory, product.description].join(" ").toLowerCase();
    const searchMatch = text.includes(query.toLowerCase().trim());
    const categoryMatch = category === "Semua Kategori" || product.category === category;
    const priceMatch = Number(max || 0) === 0 || product.price <= Number(max);
    const ratingMatch = product.rating >= Number(rating);
    return searchMatch && categoryMatch && priceMatch && ratingMatch;
  });

  return (
    <section className="view is-active" data-view="products">
      <section className="page-hero compact">
        <div className="section-shell page-hero-inner">
          <h1>Semua Produk</h1>
          <p>Plugin, template, dan starter kit premium untuk mempercepat website bisnis.</p>
        </div>
      </section>
      <section className="product-filter-section">
        <div className="section-shell product-filter-row">
          <div className="search-line"><Icon name="search" /><input type="search" placeholder="Cari produk" value={query} onChange={(event) => setQuery(event.target.value)} /></div>
          <label><span>Kategori</span><select value={category} onChange={(event) => setCategory(event.target.value)}>{categories.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
          <label><span>Harga maksimum</span><input type="number" min="0" placeholder="Contoh 500000" value={max} onChange={(event) => setMax(event.target.value)} /></label>
          <label><span>Rating minimum</span><select value={rating} onChange={(event) => setRating(event.target.value)}><option value="0">Semua</option><option value="4">4 ke atas</option><option value="5">5 saja</option></select></label>
        </div>
      </section>
      <section className="products-list-section">
        <div className="section-shell">
          <div className="product-list">{filtered.length ? filtered.map((product) => <ProductCard key={product.id} product={product} />) : <div className="empty-cart">Produk tidak ditemukan.</div>}</div>
          <p className="result-info">Menampilkan {filtered.length} dari {products.length} produk</p>
        </div>
      </section>
    </section>
  );
}

function ProductCard({ product }) {
  return (
    <article className="product-card">
      <div className="product-thumb"><img src={product.image} alt={product.name} /></div>
      <div>
        <h2><a href={`#product-${product.id}`}>{product.name}</a></h2>
        <span className="category-chip">{product.category}</span>{" "}
        <span className="rating-chip">{product.rating}.0 rating</span>
      </div>
      <div className="product-action">
        <span className="price">{formatCurrency(product.price)}</span>
        <a className="primary-btn" href={`#product-${product.id}`}>Lihat Produk</a>
      </div>
    </article>
  );
}

function ProductDetailView({ product, tab, setTab, selectedPlanId, setSelectedPlanId, selectedPlan, addToCart, showToast, openWhatsapp }) {
  const tabs = [
    ["detail", "file-text", "Detail"],
    ["features", "check-square", "Fitur"],
    ["support", "message-square", "Support"],
    ["rating", "star", `Rating (${product.reviews.length})`],
    ["changelog", "clock", "Changelog"]
  ];

  return (
    <section className="view is-active" data-view="product-detail">
      <section className="product-detail-header">
        <div className="section-shell product-title-row">
          <div className="product-icon"><img src={product.image} alt={product.name} /></div>
          <div>
            <div className="title-with-version"><h1>{product.name}</h1><span>{product.version}</span></div>
            <div className="product-meta"><span>{product.sales} Terjual</span><span>{product.rating}.0 ({product.reviews.length})</span><span>{product.category}, {product.subcategory}</span></div>
          </div>
          <div className="detail-head-actions"><strong>{formatCurrency(product.price)}</strong><button className="primary-btn" type="button" onClick={() => addToCart(true)}>Beli Sekarang</button></div>
        </div>
      </section>
      <section className="product-detail-body">
        <div className="section-shell product-detail-grid">
          <div className="product-main">
            <div className="tabs">
              {tabs.map(([id, icon, label]) => <button key={id} type="button" className={tab === id ? "is-active" : ""} onClick={() => setTab(id)}><Icon name={icon} />{label}</button>)}
            </div>
            <div className="tab-panel"><ProductTabPanel product={product} tab={tab} /></div>
          </div>
          <aside className="buy-panel">
            <label><span>Pilih paket</span><select value={selectedPlanId} onChange={(event) => setSelectedPlanId(event.target.value)}>{product.plans.map((plan) => <option key={plan.id} value={plan.id}>{plan.name}</option>)}</select></label>
            <div className="buy-price">{formatCurrency(selectedPlan.price)}</div>
            <button className="outline-action" type="button" onClick={() => { setTab("detail"); showToast("Perbandingan paket sudah diringkas di tab Detail."); }}><Icon name="clipboard-list" />Lihat perbandingan paket</button>
            <div className="duration-note">Masa berlaku: {selectedPlan.duration}</div>
            <button className="outline-action blue" type="button" onClick={() => addToCart(false)}><Icon name="shopping-cart" />Add to Cart</button>
            <button className="primary-btn full" type="button" onClick={() => addToCart(true)}>Buy Now</button>
            <div className="trust-row"><span><Icon name="shield-check" />Secure</span><span><Icon name="message-square" />Support</span><span><Icon name="download" />Easy install</span></div>
            <div className="extra-links"><a href="#assistant"><Icon name="external-link" />Demo</a><a href="#contact"><Icon name="file-text" />Dokumentasi</a><button type="button" onClick={openWhatsapp}><Icon name="message-circle" />Chat</button></div>
          </aside>
        </div>
      </section>
    </section>
  );
}

function ProductTabPanel({ product, tab }) {
  if (tab === "features") return <div className="info-grid">{product.features.map((item) => <InfoCard key={item.title} item={item} />)}</div>;
  if (tab === "support") return <div className="info-grid">{product.support.map((item) => <InfoCard key={item.title} item={item} />)}</div>;
  if (tab === "rating") {
    return (
      <>
        <div className="rating-summary"><strong>{product.rating}.0</strong><span>{product.reviews.length} ulasan pengguna</span></div>
        {product.reviews.map((review) => <div className="review-item" key={review.name}><strong>{review.name}</strong><p>{review.rating}.0 rating - {review.text}</p></div>)}
      </>
    );
  }
  if (tab === "changelog") return product.changelog.map((item) => <div className="changelog-item" key={item.version}><strong>{item.version}</strong><p>{item.text}</p></div>);
  return (
    <>
      <div className="product-gallery">
        <div className="gallery-hero"><img src={product.cover} alt={`${product.name} cover`} /></div>
        <button className="outline-action" type="button"><Icon name="image" />Lihat Screenshot ({product.screenshots.length} gambar)</button>
      </div>
      <div className="long-description">
        <h2>Deskripsi Produk</h2>
        <p>{product.description}</p>
        <h2>Perbandingan Paket</h2>
        <div className="info-grid">{product.plans.map((plan) => <div key={plan.id}><strong>{plan.name}</strong><span>{formatCurrency(plan.price)} - {plan.duration}</span></div>)}</div>
        <h2>Spesifikasi Produk</h2>
        <div className="info-grid specs-grid">{product.specs.map(([label, value]) => <div key={label}><strong>{label}</strong><span>{value}</span></div>)}</div>
        <h2>Yang Anda Dapatkan</h2>
        <div className="check-grid">{product.included.map((item) => <span key={item}><Icon name="check" />{item}</span>)}</div>
        <div className="product-description-images">{product.screenshots.map((src, index) => <img key={src} src={src} alt={`${product.name} screenshot ${index + 1}`} loading="lazy" />)}</div>
      </div>
    </>
  );
}

function InfoCard({ item }) {
  return <div><strong>{item.title}</strong><span>{item.detail}</span></div>;
}

function CartView({ cart, removeCartItem, showToast }) {
  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  return (
    <section className="view is-active" data-view="cart">
      <section className="cart-page">
        <div className="section-shell">
          <div className="page-title-row"><button className="icon-btn bordered" type="button" onClick={() => history.length > 1 ? history.back() : (window.location.hash = "home")} aria-label="Kembali"><Icon name="arrow-left" /></button><h1>Cart</h1></div>
          <div className="cart-layout">
            <div className="cart-items">
              {cart.length ? cart.map((item) => {
                const product = products.find((entry) => entry.id === item.productId) || products[0];
                return (
                  <article className="cart-item" key={item.key}>
                    <div className="product-thumb"><img src={product.image} alt={product.name} /></div>
                    <div><h3>{product.name}</h3><p>{item.planName}</p></div>
                    <div className="product-action"><strong>{formatCurrency(item.price)}</strong><button className="outline-action" type="button" onClick={() => removeCartItem(item.key)}>Hapus</button></div>
                  </article>
                );
              }) : <div className="empty-cart"><h2>Keranjang Kosong</h2><p>Belum ada produk di keranjang Anda.</p><a className="primary-btn" href="#products">Lihat Produk</a></div>}
            </div>
            <aside className="cart-summary"><h2>Ringkasan</h2><div className="summary-line"><span>Subtotal</span><strong>{formatCurrency(subtotal)}</strong></div><button className="primary-btn full" type="button" onClick={() => showToast(cart.length ? "Checkout mock: integrasi payment bisa ditambahkan." : "Keranjang masih kosong.")}><Icon name="credit-card" />Checkout</button></aside>
          </div>
        </div>
      </section>
    </section>
  );
}

function LoginView({ showToast }) {
  return (
    <section className="view is-active" data-view="login">
      <section className="auth-page"><div className="auth-card"><h1>Masuk ke Member Area</h1><form onSubmit={mockSubmit(showToast)}><label>Email<input type="email" placeholder="member@domain.com" required /></label><label>Password<input type="password" placeholder="Minimal 8 karakter" required /></label><button className="primary-btn full" type="submit">Masuk <Icon name="arrow-right" /></button></form><div className="divider"><span>atau</span></div><button className="outline-action full" type="button"><Icon name="chrome" />Masuk dengan Google</button><p>Belum punya akun? <a href="#register">Buat akun baru</a></p></div></section>
    </section>
  );
}

function RegisterView({ showToast }) {
  return (
    <section className="view is-active" data-view="register">
      <section className="auth-page">
        <div className="auth-card wide">
          <a className="back-link" href="#login"><Icon name="arrow-left" />Sudah punya akun?</a>
          <h1>Register</h1>
          <form className="register-grid" onSubmit={mockSubmit(showToast)}>
            <label>Nama lengkap*<input type="text" placeholder="Nama sesuai identitas" required /></label>
            <label>Alamat email*<input type="email" placeholder="member@domain.com" required /></label>
            <label>Nomor WhatsApp*<input type="tel" placeholder="628xxxx" required /></label>
            <label>Nama perusahaan<input type="text" placeholder="Opsional" /></label>
            <label>Negara*<select required><option>Indonesia</option></select></label>
            <label>Provinsi*<select required><option value="">Pilih provinsi</option><option>Jawa Barat</option><option>DKI Jakarta</option><option>Jawa Timur</option></select></label>
            <label>Kota/Kabupaten*<input type="text" placeholder="Nama kota" required /></label>
            <label>Kecamatan*<input type="text" placeholder="Nama kecamatan" required /></label>
            <label className="span-2">Alamat lengkap*<input type="text" placeholder="Nama jalan, nomor, detail lainnya" required /></label>
            <label>Password*<input type="password" placeholder="Minimal 8 karakter" required /></label>
            <label>Konfirmasi password*<input type="password" placeholder="Ulangi password" required /></label>
            <button className="primary-btn full span-2" type="submit">Daftar Sekarang <Icon name="arrow-right" /></button>
          </form>
        </div>
      </section>
    </section>
  );
}

function AssistantView({ showToast }) {
  const [note, setNote] = useState("Live responses will be available soon.");
  return (
    <section className="view is-active" data-view="assistant">
      <section className="assistant-page">
        <div className="assistant-bg" aria-hidden="true" />
        <div className="assistant-inner">
          <h1>Inovtek AI Assistant</h1>
          <p>Your intelligent partner for website development and digital solutions. <span>Coming Soon</span></p>
          <form className="assistant-input" onSubmit={(event) => { event.preventDefault(); setNote("Assistant belum aktif. Prompt Anda sudah disimpan sebagai contoh UI."); showToast("AI Assistant masih coming soon."); }}>
            <input type="text" placeholder="Ask anything you need" />
            <button type="submit">Send <Icon name="arrow-right" /></button>
          </form>
          <small>{note}</small>
        </div>
      </section>
    </section>
  );
}

function ContactView({ showToast, openWhatsapp }) {
  return (
    <section className="view is-active" data-view="contact">
      <section className="page-hero compact"><div className="section-shell page-hero-inner"><p className="eyebrow center">Hubungi Inovtek</p><h1>Konsultasi website profesional</h1><p>Ceritakan kebutuhan website Anda. Kita bantu buat scope dan estimasi awal.</p></div></section>
      <section className="contact-section">
        <div className="section-shell contact-grid">
          <div className="contact-info"><h2>PT Inovtek Digital Studio</h2><p>Jl. Trunojoyo No. 11, Bandung Wetan, Kota Bandung, Jawa Barat 40115</p><a href="mailto:contact@inovtek.test"><Icon name="mail" />contact@inovtek.test</a><a href="tel:+6282119822659"><Icon name="phone" />0821-1982-2659</a><button className="primary-btn" type="button" onClick={openWhatsapp}><Icon name="message-circle" />Chat WhatsApp</button></div>
          <form className="contact-form" onSubmit={mockSubmit(showToast)}><label>Nama<input type="text" placeholder="Nama Anda" required /></label><label>Email<input type="email" placeholder="email@domain.com" required /></label><label>Jenis kebutuhan<select required><option>Web App Custom</option><option>Website E-Learning</option><option>E-Commerce</option><option>Company Profile</option></select></label><label>Brief singkat<textarea rows="5" placeholder="Ceritakan target, fitur, timeline, atau referensi" /></label><button className="primary-btn full" type="submit">Kirim brief <Icon name="send" /></button></form>
        </div>
      </section>
    </section>
  );
}

function mockSubmit(showToast) {
  return (event) => {
    event.preventDefault();
    showToast("Form mock terkirim. Backend bisa disambungkan nanti.");
  };
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="section-shell footer-grid">
        <div><Brand footer /><p>Jl. Trunojoyo No. 11, Bandung Wetan, Kota Bandung, Jawa Barat 40115</p><a href="mailto:contact@inovtek.test"><Icon name="mail" />contact@inovtek.test</a><a href="https://wa.me/6282119822659"><Icon name="message-circle" />0821-1982-2659</a></div>
        <div><h3>Help</h3><a href="#contact">Hubungi Kami</a><a href="#portfolio">Portofolio</a><a href="#products">Produk</a><a href="#assistant">AI Assistant</a></div>
        <div><h3>Services</h3>{services.map((service) => <a href={`#${service.id}`} key={service.id}>{service.title.replace("Jasa Website ", "Web ").replace("Jasa ", "")}</a>)}</div>
        <div><h3>Subscribe newsletter</h3><p>Dapatkan update layanan, studi kasus, dan insight digital.</p><form className="newsletter-form" onSubmit={(event) => event.preventDefault()}><input type="email" placeholder="Email address" required /><button type="submit" aria-label="Subscribe"><Icon name="arrow-right" /></button></form></div>
      </div>
      <div className="footer-copy">&copy; 2026 Inovtek. All rights reserved.</div>
    </footer>
  );
}

function WhatsappModal({ open, close }) {
  function submit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = form.get("name") || "Saya";
    const need = form.get("need") || "Website Custom";
    const note = form.get("note") || "";
    const text = `Halo Inovtek, saya ${name}. Saya ingin konsultasi ${need}. ${note}`.trim();
    window.open(`https://wa.me/6282119822659?text=${encodeURIComponent(text)}`, "_blank");
    close();
  }

  return (
    <div className={`modal${open ? " is-open" : ""}`} aria-hidden={!open}>
      <div className="modal-panel">
        <button className="icon-btn" type="button" onClick={close} aria-label="Tutup modal"><Icon name="x" /></button>
        <h2>Konsultasi cepat</h2>
        <p>Isi ringkas, nanti link WhatsApp akan dibuat otomatis.</p>
        <form onSubmit={submit}>
          <label>Nama<input name="name" type="text" placeholder="Nama Anda" required /></label>
          <label>Kebutuhan<select name="need"><option>Website Custom</option><option>LMS</option><option>E-Commerce</option><option>Company Profile</option><option>Produk Plugin</option></select></label>
          <label>Catatan<textarea name="note" rows="4" placeholder="Contoh: butuh website company profile 5 halaman" /></label>
          <button className="primary-btn full" type="submit"><Icon name="message-circle" />Buka WhatsApp</button>
        </form>
      </div>
    </div>
  );
}

export default App;
