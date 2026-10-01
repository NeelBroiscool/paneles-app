import { useEffect, useMemo, useState } from 'react';
import { Compass, Download, Heart, Home, Monitor, Palette, Search, Settings, Smartphone, Tablet, UserRound, X } from 'lucide-react';

type DeviceKey = 'phone' | 'tab' | 'laptop' | 'monitor';
type NavKey = 'home' | 'explore' | 'profile' | 'settings';
type Category = 'All' | 'Abstract' | 'Minimal' | 'Tech' | 'OLED' | 'Architecture' | 'Gradients' | 'Nature' | 'Space' | 'Photography' | 'Anime' | 'Cars' | 'Gaming' | 'Dark' | 'Light' | '3D' | 'Patterns';

type Wallpaper = {
  id: number;
  title: string;
  creator: string;
  category: Category;
  tags: string[];
  image: string;
  thumbnail: string;
  devices: DeviceKey[];
  aspectRatio: number;
  width: number;
  height: number;
  likes: number;
  downloads: number;
};

type SettingsState = {
  theme: 'OLED Dark' | 'Dark' | 'System';
  defaultDevice: DeviceKey;
  selectedDevice: DeviceKey;
  favorites: number[];
  recentlyViewed: number[];
};

const categories: Category[] = ['All', 'Abstract', 'Minimal', 'Tech', 'OLED', 'Architecture', 'Gradients', 'Nature', 'Space', 'Photography', 'Anime', 'Cars', 'Gaming', 'Dark', 'Light', '3D', 'Patterns'];

const wallpapers: Wallpaper[] = [
  {
    id: 1,
    title: 'Purple Horizon',
    creator: 'Aether',
    category: 'Gradients',
    tags: ['purple', 'sunset', 'minimal'],
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
    devices: ['phone', 'tab', 'laptop', 'monitor'],
    aspectRatio: 16 / 9,
    width: 1600,
    height: 900,
    likes: 2840,
    downloads: 814,
  },
  {
    id: 2,
    title: 'Luma Glass',
    creator: 'Luma',
    category: 'Abstract',
    tags: ['glass', 'purple', 'frost'],
    image: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=900&q=80',
    devices: ['phone', 'laptop', 'monitor'],
    aspectRatio: 16 / 9,
    width: 1600,
    height: 900,
    likes: 2605,
    downloads: 678,
  },
  {
    id: 3,
    title: 'Neon Circuit',
    creator: 'Akira',
    category: 'Tech',
    tags: ['tech', 'cyber', 'purple'],
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
    devices: ['phone', 'laptop', 'monitor'],
    aspectRatio: 16 / 9,
    width: 1600,
    height: 900,
    likes: 4011,
    downloads: 1215,
  },
  {
    id: 4,
    title: 'Vanta Flow',
    creator: 'Vanta',
    category: 'OLED',
    tags: ['dark', 'minimal', 'oled'],
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80',
    devices: ['tab', 'laptop', 'monitor'],
    aspectRatio: 4 / 3,
    width: 1200,
    height: 900,
    likes: 1825,
    downloads: 480,
  },
  {
    id: 5,
    title: 'Aero Night',
    creator: 'Nova',
    category: 'Architecture',
    tags: ['night', 'city', 'dark'],
    image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=900&q=80',
    devices: ['laptop', 'monitor'],
    aspectRatio: 16 / 9,
    width: 1600,
    height: 900,
    likes: 2150,
    downloads: 502,
  },
  {
    id: 6,
    title: 'Skyline Glow',
    creator: 'Mono',
    category: 'Minimal',
    tags: ['minimal', 'city', 'purple'],
    image: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1200&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=800&q=80',
    devices: ['phone', 'tab', 'laptop', 'monitor'],
    aspectRatio: 9 / 16,
    width: 900,
    height: 1600,
    likes: 1300,
    downloads: 305,
  },
  {
    id: 7,
    title: 'Cosmic Drift',
    creator: 'Orion',
    category: 'Space',
    tags: ['space', 'aurora', 'night'],
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=900&q=80',
    devices: ['phone', 'laptop', 'monitor'],
    aspectRatio: 16 / 9,
    width: 1600,
    height: 900,
    likes: 3622,
    downloads: 990,
  },
  {
    id: 8,
    title: 'Soft Frames',
    creator: 'Kairo',
    category: 'Light',
    tags: ['light', 'clean', 'modern'],
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
    devices: ['tab', 'laptop', 'monitor'],
    aspectRatio: 4 / 3,
    width: 1200,
    height: 900,
    likes: 1420,
    downloads: 420,
  },
];

const defaultSettings: SettingsState = {
  theme: 'OLED Dark',
  defaultDevice: 'laptop',
  selectedDevice: 'laptop',
  favorites: [1, 3],
  recentlyViewed: [1, 3, 7],
};

const deviceMeta: Record<DeviceKey, { label: string; aspectRatio: number; recommended: string; icon: any }> = {
  phone: { label: 'Phone', aspectRatio: 9 / 16, recommended: '1440x2560', icon: Smartphone },
  tab: { label: 'Tab', aspectRatio: 4 / 3, recommended: '2048x2732', icon: Tablet },
  laptop: { label: 'Laptop', aspectRatio: 16 / 9, recommended: '2560x1440', icon: Monitor },
  monitor: { label: 'Monitor', aspectRatio: 16 / 9, recommended: '3840x2160', icon: Monitor },
};

function App() {
  const [nav, setNav] = useState<NavKey>('home');
  const [selectedDevice, setSelectedDevice] = useState<DeviceKey>('laptop');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<Category>('All');
  const [selectedWallpaper, setSelectedWallpaper] = useState<Wallpaper | null>(null);
  const [settings, setSettings] = useState<SettingsState>(() => {
    const stored = localStorage.getItem('panels-free-state');
    if (!stored) return defaultSettings;
    try {
      return { ...defaultSettings, ...JSON.parse(stored) };
    } catch {
      return defaultSettings;
    }
  });

  useEffect(() => {
    localStorage.setItem('panels-free-state', JSON.stringify(settings));
  }, [settings]);

  const favoritesSet = useMemo(() => new Set(settings.favorites), [settings.favorites]);

  const recentWallpapers = useMemo(
    () => settings.recentlyViewed.map((id) => wallpapers.find((w) => w.id === id)).filter(Boolean) as Wallpaper[],
    [settings.recentlyViewed]
  );

  const visibleWallpapers = useMemo(() => {
    const q = search.toLowerCase();
    return wallpapers.filter((wallpaper) => {
      const matchesDevice = wallpaper.devices.includes(selectedDevice);
      const matchesCategory = category === 'All' || wallpaper.category === category;
      const haystack = `${wallpaper.title} ${wallpaper.creator} ${wallpaper.category} ${wallpaper.tags.join(' ')} ${wallpaper.description ?? ''}`.toLowerCase();
      const matchesSearch = !q || haystack.includes(q);
      return matchesDevice && matchesCategory && matchesSearch;
    });
  }, [search, category, selectedDevice]);

  const toggleFavorite = (id: number) => {
    setSettings((prev) => ({
      ...prev,
      favorites: prev.favorites.includes(id)
        ? prev.favorites.filter((item) => item !== id)
        : [...prev.favorites, id],
    }));
  };

  const openWallpaper = (wallpaper: Wallpaper) => {
    setSelectedWallpaper(wallpaper);
    setSettings((prev) => ({
      ...prev,
      recentlyViewed: [wallpaper.id, ...prev.recentlyViewed.filter((id) => id !== wallpaper.id)].slice(0, 20),
    }));
  };

  const downloadWallpaper = (wallpaper: Wallpaper) => {
    const canvas = document.createElement('canvas');
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = wallpaper.image;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);
      const link = document.createElement('a');
      link.download = `${wallpaper.creator} - ${wallpaper.title}.jpg`;
      link.href = canvas.toDataURL('image/jpeg', 0.92);
      link.click();
      alert(`Download started for ${wallpaper.title}`);
    };
    img.onerror = () => {
      alert('Image unavailable.');
    };
  };

  const renderPage = () => {
    switch (nav) {
      case 'explore':
        return (
          <div className="page explore-page">
            <div className="search-box">
              <Search size={16} />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search wallpapers, creators..." />
            </div>

            <div className="category-row">
              {categories.map((item) => (
                <button key={item} className={`chip ${category === item ? 'selected' : ''}`} onClick={() => setCategory(item)}>
                  {item}
                </button>
              ))}
            </div>

            <div className="gallery-grid">
              {visibleWallpapers.map((wallpaper) => (
                <WallpaperCard
                  key={wallpaper.id}
                  wallpaper={wallpaper}
                  isFavorite={favoritesSet.has(wallpaper.id)}
                  onOpen={() => openWallpaper(wallpaper)}
                  onToggleFavorite={() => toggleFavorite(wallpaper.id)}
                />
              ))}
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="page profile-page">
            <div className="profile-header">
              <div className="profile-tag">PANELS FREE</div>
              <h2>Local Profile</h2>
            </div>
            <div className="stats-grid">
              <StatCard label="Favorite count" value={settings.favorites.length.toString()} />
              <StatCard label="Downloaded count" value="0" />
              <StatCard label="Collections count" value="5" />
              <StatCard label="Recently viewed count" value={settings.recentlyViewed.length.toString()} />
            </div>
            <div className="profile-section">
              <h3>Favorites</h3>
              <div className="mini-list">
                {wallpapers.filter((w) => settings.favorites.includes(w.id)).slice(0, 6).map((w) => (
                  <div key={w.id} className="mini-item">
                    <img src={w.thumbnail} alt={w.title} />
                    <span>{w.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="page settings-page">
            <section className="settings-panel">
              <h3>Appearance</h3>
              <div className="settings-row"><span>Theme</span><button className="ghost">{settings.theme}</button></div>
              <div className="settings-row"><span>Default device</span><button className="ghost">{settings.defaultDevice}</button></div>
            </section>
            <section className="settings-panel">
              <h3>Downloads</h3>
              <div className="settings-row"><span>Download folder</span><button className="ghost">Pictures/PANELS FREE</button></div>
              <button className="action-button">Open downloads folder</button>
              <button className="action-button danger">Clear download history</button>
            </section>
          </div>
        );
      case 'home':
      default:
        return (
          <div className="page home-page">
            <section className="hero-card">
              <div className="hero-copy">
                <p className="eyebrow">FREE WALLPAPERS</p>
                <h1>Make your screen look incredible.</h1>
                <p>Beautiful wallpapers for phones, tablets, laptops and monitors. No subscriptions.</p>
                <button className="primary-button" onClick={() => setNav('explore')}>Explore wallpapers</button>
              </div>
              <div className="hero-visual">
                <img src={wallpapers[0].image} alt="Featured wallpaper" />
              </div>
            </section>

            <section className="creator-strip">
              {['Aether', 'Kairo', 'Nova', 'Luma', 'Akira', 'Mono', 'Orion', 'Vanta'].map((creator) => (
                <button key={creator} className="creator-item">
                  <div className="creator-avatar">{creator.slice(0, 2).toUpperCase()}</div>
                  <span>{creator}</span>
                </button>
              ))}
            </section>

            <div className="two-col">
              <section className="panel-block">
                <h3>Featured wallpapers</h3>
                <div className="mini-card-grid">
                  {wallpapers.slice(0, 4).map((wallpaper) => (
                    <div key={wallpaper.id} className="mini-feature" onClick={() => openWallpaper(wallpaper)}>
                      <img src={wallpaper.thumbnail} alt={wallpaper.title} />
                      <div>
                        <strong>{wallpaper.title}</strong>
                        <span>{wallpaper.creator}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="panel-block">
                <h3>Recently viewed</h3>
                <div className="mini-card-grid">
                  {recentWallpapers.slice(0, 4).map((wallpaper) => (
                    <div key={wallpaper.id} className="mini-feature" onClick={() => openWallpaper(wallpaper)}>
                      <img src={wallpaper.thumbnail} alt={wallpaper.title} />
                      <div>
                        <strong>{wallpaper.title}</strong>
                        <span>{wallpaper.creator}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">P</div>
          <span>PANELS</span>
        </div>
        <nav className="nav-list">
          <button className={`nav-button ${nav === 'home' ? 'active' : ''}`} onClick={() => setNav('home')}><Home size={18} /> HOME</button>
          <button className={`nav-button ${nav === 'explore' ? 'active' : ''}`} onClick={() => setNav('explore')}><Compass size={18} /> EXPLORE</button>
          <button className={`nav-button ${nav === 'profile' ? 'active' : ''}`} onClick={() => setNav('profile')}><UserRound size={18} /> PROFILE</button>
        </nav>
        <div className="sidebar-footer">
          <button className={`nav-button ${nav === 'settings' ? 'active' : ''}`} onClick={() => setNav('settings')}><Settings size={18} /> SETTINGS</button>
        </div>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <div className="title-wrap">
            <h1>PANELS</h1>
            <span>Free high-quality wallpapers</span>
          </div>
          <button className="profile-pill"><UserRound size={18} /></button>
        </header>

        <div className="device-selector">
          {(Object.keys(deviceMeta) as DeviceKey[]).map((deviceKey) => {
            const meta = deviceMeta[deviceKey];
            const Icon = meta.icon;
            return (
              <button key={deviceKey} className={`device-pill ${selectedDevice === deviceKey ? 'active' : ''}`} onClick={() => setSelectedDevice(deviceKey)}>
                <Icon size={16} />
                <span>{meta.label}</span>
              </button>
            );
          })}
        </div>

        {renderPage()}
      </main>

      {selectedWallpaper && (
        <div className="detail-backdrop" onClick={() => setSelectedWallpaper(null)}>
          <div className="detail-dialog" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedWallpaper(null)}><X size={18} /></button>
            <img src={selectedWallpaper.image} alt={selectedWallpaper.title} className="detail-image" />
            <div className="detail-info">
              <div className="detail-header-row">
                <div>
                  <h2>{selectedWallpaper.title}</h2>
                  <p>by {selectedWallpaper.creator}</p>
                </div>
                <button className="like-btn" onClick={() => toggleFavorite(selectedWallpaper.id)}>
                  <Heart size={18} fill={favoritesSet.has(selectedWallpaper.id) ? 'currentColor' : 'none'} />
                </button>
              </div>
              <div className="badge-row">
                <span className="badge">{selectedWallpaper.category}</span>
                <span className="badge">{selectedWallpaper.width}x{selectedWallpaper.height}</span>
                <span className="badge">♥ {selectedWallpaper.likes}</span>
              </div>
              <p className="detail-text">{selectedWallpaper.tags.join(', ')}</p>
              <button className="primary-button" onClick={() => downloadWallpaper(selectedWallpaper)}>Download HD (Free)</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

type WallpaperCardProps = {
  wallpaper: Wallpaper;
  isFavorite: boolean;
  onOpen: () => void;
  onToggleFavorite: () => void;
};

function WallpaperCard({ wallpaper, isFavorite, onOpen, onToggleFavorite }: WallpaperCardProps) {
  return (
    <article className="wallpaper-card" onClick={onOpen}>
      <div className="card-image-wrap">
        <img src={wallpaper.thumbnail} alt={wallpaper.title} className="wallpaper-thumb" />
        <button className={`favorite-button ${isFavorite ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); onToggleFavorite(); }}>
          <Heart size={15} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="card-info">
        <strong>{wallpaper.title}</strong>
        <span>{wallpaper.creator}</span>
      </div>
    </article>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="stat-card">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

export default App;
