import { Product, Service, Review, PortfolioItem, FAQItem } from './types';

export const COMP_STATS = [
  { label: 'Years Experience', value: 10, suffix: '+' },
  { label: 'Happy Customers', value: 5000, suffix: '+' },
  { label: 'Mobile Brands', value: 100, suffix: '+' },
  { label: 'Support SLA', value: 24, suffix: '/7' },
];

export const FEATURED_BRANDS = [
  { name: 'Apple', logo: '🍎', description: 'Experience the pinnacle of innovation and luxury.' },
  { name: 'Samsung', logo: '📱', description: 'Pioneering future-forward screens and AI power.' },
  { name: 'OnePlus', logo: '🚀', description: 'Never Settle with flagship speed and fluid UI.' },
  { name: 'Xiaomi', logo: '🔋', description: 'Smart living, extreme value, and Leica camera optics.' },
  { name: 'Vivo', logo: '📸', description: 'Professional studio-grade portraits at your fingertips.' },
  { name: 'Oppo', logo: '💎', description: 'Gorgeous designs combined with superfast flash charge.' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'iPhone 15 Pro Max',
    brand: 'Apple',
    description: 'Forged in titanium, featuring the groundbreaking A17 Pro chip, customizable Action button, and the most powerful iPhone camera system ever.',
    price: 1199,
    originalPrice: 1299,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    badge: 'Flagship Leader',
    specs: ['Super Retina XDR OLED', 'A17 Pro 3nm Chip', '5x Telephoto Zoom', 'Grade-5 Titanium Frame'],
    inStock: true,
  },
  {
    id: 'p2',
    name: 'Galaxy S24 Ultra',
    brand: 'Samsung',
    description: 'Empowered by Galaxy AI. Take stunning dusk-to-dawn shots with custom Nightography, translate live conversations, and write with built-in S-Pen.',
    price: 1249,
    originalPrice: 1379,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    badge: 'AI Powered',
    specs: ['Dynamic AMOLED 2X 120Hz', 'Snapdragon 8 Gen 3', '200MP Quad Camera', 'Embedded S-Pen'],
    inStock: true,
  },
  {
    id: 'p3',
    name: 'OnePlus 12 Dual-SIM',
    brand: 'OnePlus',
    description: 'Redefining smooth efficiency. Features 100W SUPERVOOC charging, highly advanced Hasselblad Camera for Mobile, and Dual Cryo-velocity Cooling.',
    price: 799,
    originalPrice: 849,
    image: 'https://images.unsplash.com/photo-1565630916779-e303be97b6f5?auto=format&fit=crop&w=600&q=80',
    rating: 4.7,
    badge: '100W SuperVOOC',
    specs: ['2K 120Hz ProXDR Display', 'Snapdragon 8 Gen 3', 'Hasselblad Camera Co-op', '5400mAh High-Density Battery'],
    inStock: true,
  },
  {
    id: 'p4',
    name: 'Xiaomi 14 Ultra',
    brand: 'Xiaomi',
    description: 'Co-engineered with Leica. Integrates 1-inch sensor, stepless variable aperture, and liquid-cool loops inside an elegant vegan leather backing.',
    price: 999,
    originalPrice: 1099,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    badge: 'Leica Optics',
    specs: ['All-Around Liquid Display', 'Leica Quad Camera', 'Snapdragon 8 Gen 3', '90W HyperCharge Wireless'],
    inStock: false,
  },
  {
    id: 'p5',
    name: 'Vivo X100 Pro',
    brand: 'Vivo',
    description: 'Zeiss APO Floating Telephoto camera designed for exquisite color grading and extreme detail. Features Dimensity 9300 for buttery peak performance.',
    price: 899,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80',
    rating: 4.6,
    badge: 'Zeiss Certified',
    specs: ['Zeiss T* Anti-Reflective Coating', 'Dimensity 9300 Chipset', '5400mAh BlueVolt Battery', 'V3 Imaging Chip'],
    inStock: true,
  },
  {
    id: 'p6',
    name: 'Oppo Find X7 Ultra',
    brand: 'Oppo',
    description: 'The world\'s first dual-periscope camera setup, backed by Hasselblad Master Tuned Portrait engine and beautiful hand-crafted premium chassis.',
    price: 949,
    originalPrice: 999,
    image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=600&q=80',
    rating: 4.7,
    badge: 'Dual Periscope',
    specs: ['Ultra-bright Diamond Screen', 'Snapdragon 8 Gen 3', 'Hasselblad Portrait Mode', 'IP68 Water Resistant'],
    inStock: true,
  },
  {
    id: 'p7',
    name: 'iPhone 15 Plus',
    brand: 'Apple',
    description: 'Dynamic Island floats your alerts, a durable color-infused back glass design, and a spectacular 48MP main camera with comfortable hand-feel.',
    price: 899,
    originalPrice: 949,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80',
    rating: 4.6,
    specs: ['Dynamic Island Display', 'A16 Bionic Processor', '2x Telephoto Optical Crop', 'Outstanding Battery Life'],
    inStock: true,
  },
  {
    id: 'p8',
    name: 'Galaxy S24+ FE',
    brand: 'Samsung',
    description: 'All premium features packed inside a slim high-durability frame, focusing on modern creative styling and unmatched multitasking controls.',
    price: 749,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=600&q=80',
    rating: 4.5,
    badge: 'Popular Choice',
    specs: ['6.7" Dynamic AMOLED', 'Exynos 2400 Deca-Core', '50MP triple adaptive camera', '4700mAh battery'],
    inStock: true,
  }
];

export const SERVICES: Service[] = [
  {
    id: 's1',
    title: 'Smartphone Sales',
    description: 'Curated selection of certified brand-new and pristine-grade smartphones with full direct manufacturer warranty support and instant flexible trade-ins.',
    iconName: 'Smartphone',
    longDesc: 'We are official retail partners for Apple, Samsung, OnePlus, Xiaomi, and Vivo. Our sales consultants guide you to pick the exact storage, color, and performance profile for your personal or professional usage, including full data migration setups included for free.'
  },
  {
    id: 's2',
    title: 'Mobile Repairing',
    description: 'Expert diagnostics and precision component-level dynamic repairing by Apple, Samsung, and Android certified hardware engineers.',
    iconName: 'Wrench',
    longDesc: 'From motherboard soldering to water damage reclamation, custom audio IC rectifying, and power charging port restoration. All repair operations pass comprehensive multi-point security testing before leaving our workstation.'
  },
  {
    id: 's3',
    title: 'Accessories Sales',
    description: 'Premium protection and dynamic audio add-ons including active-noise cancelling earbuds, premium shockproof cases, high-speed GaN chargers, and screen guards.',
    iconName: 'Sparkles',
    longDesc: 'We stock original premium brands like Spigen, UAG, Anker, Belkin, and native manufacturers accessories. Secure your flagship gadget with military-grade drop protections and advanced Qi2/MagSafe wireless docks.'
  },
  {
    id: 's4',
    title: 'Screen Replacement',
    description: 'Instant, certified screen restorations using genuine manufacturer-grade OLED & LCD sensory display modules under strict warranty.',
    iconName: 'SmartphoneIcon',
    longDesc: 'We perform rapid screen changes in under 45 minutes. Utilizing professional dust-free vacuum laminators and customized adhesive seals ensuring water-resistance metrics stay perfectly intact.'
  },
  {
    id: 's5',
    title: 'Software Updates',
    description: 'Comprehensive OS flashes, network profile setups, boot loop recoveries, and highly secure malware removals without losing your precious files.',
    iconName: 'Cpu',
    longDesc: 'Staging clean boot setups, addressing stubborn software black-screens, resolving slow cache delays, rendering secure firmware unlocks, and setting up cloud synchronization architectures.'
  },
  {
    id: 's6',
    title: 'Smartwatch & Gadget Sales',
    description: 'Ecosystem extensions with smartwatches, tablets, Bluetooth audio trackers, and innovative smart home companion gadgets.',
    iconName: 'Watch',
    longDesc: 'Discover high-end trackers like Apple Watch Ultra and Galaxy Watch, premium iPads and Galaxy Tabs, along with intelligent motion beacons and localized wireless transceivers.'
  },
  {
    id: 's7',
    title: 'Data Transfer Services',
    description: 'Secure, clean device migrations, WhatsApp Chat histories cross-platform syncing, and automated cloud backups.',
    iconName: 'Database',
    longDesc: 'Migrating safely from iOS to Android or vice versa. We transfer contacts, messages, photos, app configurations, and custom databases securely without leaking a single byte of your private info.'
  },
  {
    id: 's8',
    title: 'Customer Support',
    description: '24/7 dedicated troubleshooting hotline and immediate interactive remote diagnostic advice for any operational query.',
    iconName: 'Headphones',
    longDesc: 'Access continuous help from technical specialists who can verify diagnostic codes and configure mail-in repair bookings, ensuring you are never stranded without a working device.'
  }
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'pt1',
    title: 'Mobile Showroom Front',
    category: 'Showroom',
    image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80',
    description: 'Our luxurious flagship physical store showroom exhibiting interactive demonstration zones.'
  },
  {
    id: 'pt2',
    title: 'Interactive Gadget Pods',
    category: 'Showroom',
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80',
    description: 'Live test table hosting premium wearables, smartwatches, and flagship virtual reality accessories.'
  },
  {
    id: 'pt4',
    title: 'Customer Consultations',
    category: 'Interaction',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80',
    description: 'Our digital advocates explaining complex software and cloud capabilities to friendly local patrons.'
  },
  {
    id: 'pt5',
    title: 'Smart Tech Exhibits',
    category: 'Gadget',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80',
    description: 'Sleek visual setup showcasing high-fidelity sound-bars and wireless noise-reduction headphones.'
  },
  {
    id: 'pt6',
    title: 'Latest Audio Devices',
    category: 'Gadget',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    description: 'Bespoke custom headphone docks with live frequency response tuning capabilities.'
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    name: 'Sarah Jenkins',
    role: 'Tech Reviewer & Content Creator',
    text: 'Mobile Shop has been my absolute go-to for flagship device purchases for years. Their staff possesses unparalleled technological depth, helping me pick precise hardware specs. The trade-in value offered for my previous device was stellar, and the data transfer took less than 10 minutes!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    date: 'May 12, 2026'
  },
  {
    id: 'r2',
    name: 'Michael Chen',
    role: 'Managing Director, Chen Consultants',
    text: 'Required a fleet of 25 corporate smartphones fully set up with active enterprise security profiles in a matter of 48 hours. Mobile Shop rose to the challenge brilliantly. Not only did they beat all online quotes, but they also delivered every unit labeled, tested, and ready for work. Exemplary support!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    date: 'April 29, 2026'
  },
  {
    id: 'r3',
    name: 'Emily Watson',
    role: 'Photographer & Designer',
    text: 'I shattered my Galaxy Ultra screen right before a massive weekend wedding shoot. The team at Mobile Shop completed a full certified OLED sensory screen swap, re-sealed the chassis for dust & water resistance, and fully tested the optics in under 35 minutes! Genuinely saved my career that afternoon.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
    date: 'June 02, 2026'
  },
  {
    id: 'r4',
    name: 'David Miller',
    role: 'Competitive Mobile Gamer',
    text: 'Fantastic catalog! Selected my ROG Phone accessorized cooling docks directly off their shelves. Pricing is insanely competitive compared to online logistics, and obtaining physical, immediate local warranty validation was the peace of mind I truly needed.',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    date: 'March 15, 2026'
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'f1',
    question: 'Are all your smartphones genuine and coming with official warranty?',
    answer: 'Absolutely. Every single device sold at Mobile Shop is 100% brand new, authentic, and carries the official manufacturer direct warranty (e.g. 1 year Apple Care or Authorized Samsung Shield Warranty). We do not retail gray-market imports or blacklisted devices.',
    category: 'Products'
  },
  {
    id: 'f2',
    question: 'How long does a standard smartphone screen or battery replacement take?',
    answer: 'Our certified hardware technicians perform standard screen swaps and battery replacements in approximately 30 to 45 minutes on-site. We have a dedicated waiting lounge with coffee where you can view your device being repaired through our clean-room window.',
    category: 'Repairs'
  },
  {
    id: 'f3',
    question: 'What is your warranty coverage on diagnostic repairs or component replacements?',
    answer: 'We provide a 180-day premium warranty on all parts replaced and labor associated with your repair. If the exact same issue arises of non-accidental nature during this frame, we fix it again completely free of charge.',
    category: 'Repairs'
  },
  {
    id: 'f4',
    question: 'Can you transfer my WhatsApp and private documents if I switch platforms iOS to Android?',
    answer: 'Yes! We possess industry-grade data migration vaults that transfer your full WhatsApp history (including voice notes and videos), contacts, galleries, notes, and documents in under 15 minutes. No data is saved or cached during this secure, encrypted operation.',
    category: 'Services'
  },
  {
    id: 'f5',
    question: 'Do you offer instant trade-ins for older or damaged devices?',
    answer: 'We certainly do. Bring in your existing handset for a comprehensive 5-minute automated diagnostic checklist. We offer highly competitive physical evaluations which can be applied directly as instant cash value discounts toward your new gadget.',
    category: 'Products'
  }
];
