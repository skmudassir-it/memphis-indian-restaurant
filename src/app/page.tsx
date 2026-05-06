"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChefHat,
  Soup,
  UtensilsCrossed,
  Coffee,
  Croissant,
  Flame,
  Star,
  Clock,
  MapPin,
  Phone,
  Dot,
} from "lucide-react";

// ─── MENU DATA ────────────────────────────────────────────────────────────────

type MenuItem = { name: string; price: number; tag?: string };

type Category = {
  id: string;
  name: string;
  icon: React.ReactNode;
  items: MenuItem[];
  color: string;
};

const categories: Category[] = [
  {
    id: "biryani",
    name: "Biryani",
    icon: <ChefHat className="w-5 h-5" />,
    color: "from-amber-600 to-orange-500",
    items: [
      { name: "Hyderabadi Chicken Dum Biryani", price: 16.99, tag: "Signature" },
      { name: "Chicken 65 Biryani", price: 20.99, tag: "Spicy" },
      { name: "Vijayawada Biryani", price: 20.99, tag: "Special" },
      { name: "Paneer Biryani", price: 14.99, tag: "Veg" },
      { name: "Goat Biryani", price: 21.99, tag: "Premium" },
    ],
  },
  {
    id: "pulav",
    name: "Pulav",
    icon: <Soup className="w-5 h-5" />,
    color: "from-emerald-600 to-teal-500",
    items: [
      { name: "Chicken Pulav", price: 17.99 },
      { name: "Pachimirchi Pulav", price: 20.99, tag: "Spicy" },
      { name: "Goat Pulav", price: 19.99 },
      { name: "Paneer Pulav", price: 14.99, tag: "Veg" },
    ],
  },
  {
    id: "appetizers",
    name: "Appetizers",
    icon: <Flame className="w-5 h-5" />,
    color: "from-red-600 to-rose-500",
    items: [
      { name: "Chicken 65", price: 15.99, tag: "Popular" },
      { name: "Chilli Chicken", price: 15.99 },
      { name: "Goat Fry (Goat Sukka)", price: 18.99, tag: "Premium" },
      { name: "Gobi (Manchuria / 65)", price: 13.99, tag: "Veg" },
      { name: "Paneer (Chilli / 65)", price: 14.99, tag: "Veg" },
    ],
  },
  {
    id: "tiffins",
    name: "Tiffins",
    icon: <Coffee className="w-5 h-5" />,
    color: "from-yellow-600 to-amber-500",
    items: [
      { name: "Poori", price: 12.99 },
      { name: "Dosa", price: 6.99, tag: "From" },
    ],
  },
  {
    id: "curries",
    name: "Curries",
    icon: <UtensilsCrossed className="w-5 h-5" />,
    color: "from-orange-700 to-red-600",
    items: [
      { name: "Butter Chicken", price: 14.99, tag: "Popular" },
      { name: "Chicken Tikka Masala", price: 14.99 },
      { name: "Paneer Butter Masala", price: 14.99, tag: "Veg" },
      { name: "Paneer Tikka", price: 14.99, tag: "Veg" },
      { name: "Goat Gravy", price: 16.99, tag: "Premium" },
    ],
  },
  {
    id: "breads",
    name: "Breads",
    icon: <Croissant className="w-5 h-5" />,
    color: "from-stone-500 to-amber-600",
    items: [
      { name: "Veg Samosa", price: 4.99, tag: "Veg" },
      { name: "Garlic Naan", price: 2.99 },
      { name: "Butter Naan", price: 2.49 },
    ],
  },
];

// ─── ANIMATION VARIANTS ───────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 120, damping: 15 },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: -40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" as const },
  },
};

// ─── COMPONENTS ───────────────────────────────────────────────────────────────

function SpiceParticle() {
  const particles = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 6 + Math.random() * 10,
        size: 2 + Math.random() * 4,
        opacity: 0.1 + Math.random() * 0.2,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-amber-400/30"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: -10,
            opacity: p.opacity,
          }}
          animate={{
            y: ["0vh", "105vh"],
            x: [0, (Math.random() - 0.5) * 100],
            opacity: [p.opacity, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

function CategoryTab({
  cat,
  isActive,
  onClick,
}: {
  cat: Category;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      className={`relative flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${
        isActive
          ? "text-white"
          : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {cat.icon}
      <span>{cat.name}</span>
      {isActive && (
        <motion.div
          layoutId="activeTab"
          className={`absolute inset-0 rounded-xl bg-gradient-to-r ${cat.color} -z-10`}
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
    </motion.button>
  );
}

function PriceTag({ price, tag }: { price: number; tag?: string }) {
  return (
    <div className="flex items-center gap-2 shrink-0">
      {tag && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
          className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30"
        >
          {tag}
        </motion.span>
      )}
      <motion.span
        className="text-lg font-bold text-amber-400 tabular-nums"
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        ${price.toFixed(2)}
      </motion.span>
    </div>
  );
}

function MenuItemCard({ item, index }: { item: MenuItem; index: number }) {
  return (
    <motion.div
      variants={itemVariants}
      className="group flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:bg-white/[0.06] transition-colors"
    >
      <div className="flex items-center gap-3 min-w-0">
        <motion.div
          className="w-1.5 h-1.5 rounded-full bg-amber-500/50 group-hover:bg-amber-400 shrink-0"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: index * 0.1 }}
        />
        <span className="text-zinc-200 text-sm sm:text-base font-medium truncate">
          {item.name}
        </span>
      </div>
      <PriceTag price={item.price} tag={item.tag} />
    </motion.div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const active = categories.find((c) => c.id === activeCategory)!;

  return (
    <div className="relative min-h-screen bg-[#0a0806] font-sans overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-amber-900/20 blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-red-900/15 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-amber-800/5 blur-[100px]" />
      </div>

      {/* Floating spice particles */}
      <SpiceParticle />

      {/* Main content */}
      <div className="relative z-10 max-w-2xl mx-auto px-4 py-8 sm:py-16">
        {/* ── Header ── */}
        <motion.header
          variants={headerVariants}
          initial="hidden"
          animate="show"
          className="text-center mb-12"
        >
          {/* Decorative line */}
          <motion.div
            className="flex items-center justify-center gap-3 mb-4"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-amber-500/50 to-amber-500" />
            <Star className="w-4 h-4 text-amber-500" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent via-amber-500/50 to-amber-500" />
          </motion.div>

          {/* Restaurant name */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            <span className="bg-gradient-to-b from-amber-300 via-amber-400 to-amber-600 bg-clip-text text-transparent">
              Memphis Indian
            </span>
            <br />
            <span className="bg-gradient-to-b from-zinc-200 to-zinc-400 bg-clip-text text-transparent">
              Restaurant
            </span>
          </h1>

          {/* Tagline */}
          <motion.p
            className="mt-3 text-zinc-500 text-sm tracking-widest uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Authentic Flavors · Since 2010
          </motion.p>

          {/* Divider */}
          <motion.div
            className="mt-6 mx-auto w-20 h-0.5 bg-gradient-to-r from-transparent via-amber-500/40 to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          />
        </motion.header>

        {/* ── Category Tabs ── */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-10 p-1.5 rounded-2xl bg-white/[0.03] border border-white/[0.05] backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {categories.map((cat) => (
            <CategoryTab
              key={cat.id}
              cat={cat}
              isActive={activeCategory === cat.id}
              onClick={() => setActiveCategory(cat.id)}
            />
          ))}
        </motion.div>

        {/* ── Menu Items ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            {/* Category header */}
            <motion.div
              className="flex items-center justify-center gap-3 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
            >
              <div
                className={`w-10 h-10 rounded-xl bg-gradient-to-br ${active.color} flex items-center justify-center text-white shadow-lg`}
              >
                {active.icon}
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                {active.name}
              </h2>
            </motion.div>

            {/* Items grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="space-y-2"
            >
              {active.items.map((item, i) => (
                <MenuItemCard key={item.name} item={item} index={i} />
              ))}
            </motion.div>

            {/* Item count */}
            <motion.p
              className="text-center text-zinc-600 text-xs mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {active.items.length} item{active.items.length !== 1 ? "s" : ""}
            </motion.p>
          </motion.div>
        </AnimatePresence>

        {/* ── Footer ── */}
        <motion.footer
          className="mt-20 pt-8 border-t border-white/[0.06] text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-zinc-500 text-sm">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              Memphis, TN
            </span>
            <Dot className="w-4 h-4 hidden sm:block" />
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              Open Daily 11AM – 10PM
            </span>
            <Dot className="w-4 h-4 hidden sm:block" />
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" />
              Call for Orders
            </span>
          </div>
          <p className="mt-3 text-zinc-700 text-xs">
            Prices subject to change. All major credit cards accepted.
          </p>

          {/* Bottom decorative flourish */}
          <motion.div
            className="mt-6 flex items-center justify-center gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 h-1 rounded-full bg-amber-600/30"
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{
                  duration: 2,
                  delay: i * 0.3,
                  repeat: Infinity,
                }}
              />
            ))}
          </motion.div>
        </motion.footer>
      </div>
    </div>
  );
}
