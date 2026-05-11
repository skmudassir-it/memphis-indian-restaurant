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
  Award,
  Users,
  Heart,
  Sparkles,
} from "lucide-react";
import Image from "next/image";

// ─── MENU DATA ────────────────────────────────────────────────────────────────

type MenuItem = { name: string; description?: string; price: number; tag?: string };

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
      { name: "Hyderabadi Chicken Dum Biryani", description: "Fragrant basmati layered with marinated chicken, slow-cooked in a sealed pot", price: 16.99, tag: "Signature" },
      { name: "Chicken 65 Biryani", description: "Spicy fried chicken tossed with aromatic biryani rice", price: 20.99, tag: "Spicy" },
      { name: "Vijayawada Biryani", description: "Andhra-style biryani with bold spices and tender meat", price: 20.99, tag: "Special" },
      { name: "Paneer Biryani", description: "Cubes of cottage cheese layered with saffron-infused rice", price: 14.99, tag: "Veg" },
      { name: "Goat Biryani", description: "Succulent goat meat slow-cooked with premium basmati", price: 21.99, tag: "Premium" },
    ],
  },
  {
    id: "pulav",
    name: "Pulav",
    icon: <Soup className="w-5 h-5" />,
    color: "from-emerald-600 to-teal-500",
    items: [
      { name: "Chicken Pulav", description: "Lightly spiced rice pilaf with tender chicken pieces", price: 17.99 },
      { name: "Pachimirchi Pulav", description: "Green chili-infused pulav — fiery and flavorful", price: 20.99, tag: "Spicy" },
      { name: "Goat Pulav", description: "Rich goat meat pilaf with caramelized onions", price: 19.99 },
      { name: "Paneer Pulav", description: "Aromatic rice with golden-fried paneer cubes", price: 14.99, tag: "Veg" },
    ],
  },
  {
    id: "appetizers",
    name: "Appetizers",
    icon: <Flame className="w-5 h-5" />,
    color: "from-red-600 to-rose-500",
    items: [
      { name: "Chicken 65", description: "Legendary spicy deep-fried chicken — our most-ordered starter", price: 15.99, tag: "Popular" },
      { name: "Chilli Chicken", description: "Indo-Chinese wok-tossed chicken with peppers & onion", price: 15.99 },
      { name: "Goat Fry (Goat Sukka)", description: "Dry-roasted goat with coastal spices", price: 18.99, tag: "Premium" },
      { name: "Gobi Manchuria / 65", description: "Crispy cauliflower — choose Manchurian or 65 style", price: 13.99, tag: "Veg" },
      { name: "Paneer Chilli / 65", description: "Cottage cheese — chilli or 65 style", price: 14.99, tag: "Veg" },
    ],
  },
  {
    id: "tiffins",
    name: "Tiffins",
    icon: <Coffee className="w-5 h-5" />,
    color: "from-yellow-600 to-amber-500",
    items: [
      { name: "Poori", description: "Fluffy deep-fried bread served with potato masala", price: 12.99 },
      { name: "Dosa", description: "Crispy fermented rice crepe with chutney & sambar", price: 6.99, tag: "From" },
    ],
  },
  {
    id: "curries",
    name: "Curries",
    icon: <UtensilsCrossed className="w-5 h-5" />,
    color: "from-orange-700 to-red-600",
    items: [
      { name: "Butter Chicken", description: "Creamy tomato-based curry — our house specialty", price: 14.99, tag: "Popular" },
      { name: "Chicken Tikka Masala", description: "Char-grilled chicken in a spiced cream sauce", price: 14.99 },
      { name: "Paneer Butter Masala", description: "Cottage cheese simmered in rich buttery gravy", price: 14.99, tag: "Veg" },
      { name: "Paneer Tikka", description: "Marinated paneer roasted in the tandoor", price: 14.99, tag: "Veg" },
      { name: "Goat Gravy", description: "Slow-cooked goat in traditional bone-marrow gravy", price: 16.99, tag: "Premium" },
    ],
  },
  {
    id: "breads",
    name: "Breads & More",
    icon: <Croissant className="w-5 h-5" />,
    color: "from-stone-500 to-amber-600",
    items: [
      { name: "Veg Samosa", description: "Crispy pastry stuffed with spiced potatoes & peas", price: 4.99, tag: "Veg" },
      { name: "Garlic Naan", description: "Clay-oven bread brushed with garlic butter", price: 2.99 },
      { name: "Butter Naan", description: "Soft leavened bread with a generous butter glaze", price: 2.49 },
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

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

// ─── COMPONENTS ───────────────────────────────────────────────────────────────

function SpiceParticle() {
  const particles = useMemo(
    () =>
      Array.from({ length: 25 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 12,
        duration: 8 + Math.random() * 12,
        size: 2 + Math.random() * 5,
        opacity: 0.08 + Math.random() * 0.2,
        color: i % 3 === 0 ? "bg-amber-400/30" : i % 3 === 1 ? "bg-orange-400/20" : "bg-red-400/15",
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={`absolute rounded-full ${p.color}`}
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: -10,
            opacity: p.opacity,
          }}
          animate={{
            y: ["0vh", "105vh"],
            x: [0, (Math.random() - 0.5) * 120],
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
      className="group flex items-center justify-between p-5 rounded-xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:bg-white/[0.06] hover:border-amber-500/10 transition-all duration-300"
    >
      <div className="flex items-start gap-4 min-w-0">
        <motion.div
          className="w-2 h-2 rounded-full bg-amber-500/50 group-hover:bg-amber-400 shrink-0 mt-2"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: index * 0.1 }}
        />
        <div className="min-w-0">
          <span className="text-zinc-200 text-sm sm:text-base font-medium block truncate">
            {item.name}
          </span>
          {item.description && (
            <span className="text-zinc-500 text-xs mt-0.5 block leading-relaxed">
              {item.description}
            </span>
          )}
        </div>
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
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-amber-900/15 blur-[140px]" />
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-red-900/10 blur-[140px]" />
        <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-terracotta-500/8 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-amber-800/5 blur-[120px]" />
      </div>

      {/* Floating spice particles */}
      <SpiceParticle />

      {/* ── HERO / HEADER ── */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 pt-8 sm:pt-16 pb-8">
        <motion.header
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8, type: "spring", stiffness: 100 }}
            className="mb-8 flex justify-center"
          >
            <div className="relative w-28 h-28 sm:w-32 sm:h-32">
              <Image
                src="/logo.png"
                alt="Memphis Indian Restaurant"
                fill
                className="object-contain"
                priority
              />
            </div>
          </motion.div>

          {/* Decorative line with star */}
          <motion.div
            className="flex items-center justify-center gap-4 mb-6"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-amber-500/50 to-amber-500" />
            <Star className="w-5 h-5 text-amber-400" fill="currentColor" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent via-amber-500/50 to-amber-500" />
          </motion.div>

          {/* Restaurant name */}
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-tight">
            <span className="bg-gradient-to-b from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent">
              Memphis Indian
            </span>
            <br />
            <span className="bg-gradient-to-b from-zinc-200 to-zinc-400 bg-clip-text text-transparent">
              Restaurant
            </span>
          </h1>

          {/* Tagline */}
          <motion.p
            className="mt-4 text-zinc-500 text-sm tracking-[0.2em] uppercase font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Authentic Flavors · Since 2010
          </motion.p>

          {/* Divider */}
          <motion.div
            className="mt-8 mx-auto w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          />

          {/* Quick stats */}
          <motion.div
            className="mt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            {[
              { icon: <Award className="w-4 h-4" />, label: "14+ Years" },
              { icon: <Heart className="w-4 h-4" />, label: "Family Owned" },
              { icon: <Sparkles className="w-4 h-4" />, label: "Halal Certified" },
              { icon: <Users className="w-4 h-4" />, label: "Catering Available" },
            ].map((stat, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-zinc-500 text-xs font-medium uppercase tracking-wider"
              >
                <span className="text-amber-500/60">{stat.icon}</span>
                {stat.label}
              </div>
            ))}
          </motion.div>
        </motion.header>
      </div>

      {/* ── MENU SECTION ── */}
      <section className="relative z-10 max-w-2xl mx-auto px-4 pb-8">
        {/* Section label */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-amber-500/60 text-xs font-semibold tracking-[0.3em] uppercase">
            Our Menu
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-2">
            Discover Our Flavors
          </h2>
          <p className="text-zinc-500 text-sm mt-2 max-w-md mx-auto">
            From aromatic biryanis to sizzling appetizers — every dish tells a story
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-10 p-1.5 rounded-2xl bg-white/[0.03] border border-white/[0.05] backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
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

        {/* Menu Items */}
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
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${active.color} flex items-center justify-center text-white shadow-lg shadow-amber-900/20`}
              >
                {active.icon}
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-serif">
                {active.name}
              </h3>
            </motion.div>

            {/* Items grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="space-y-2.5"
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
              {active.items.length} item{active.items.length !== 1 ? "s" : ""} in this category
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ── ABOUT / STORY SECTION ── */}
      <motion.section
        className="relative z-10 max-w-2xl mx-auto px-4 py-16 sm:py-24"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="text-center">
          <span className="text-amber-500/60 text-xs font-semibold tracking-[0.3em] uppercase">
            Our Story
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-2 mb-6">
            A Taste of Home,<br />
            <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
              Right Here in Memphis
            </span>
          </h2>
          <div className="max-w-xl mx-auto space-y-4">
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              Since 2010, Memphis Indian Restaurant has been serving authentic
              Hyderabadi and South Indian cuisine to the Bluff City. What started
              as a small family kitchen has grown into one of Memphis&apos;s most
              beloved destinations for genuine Indian flavors.
            </p>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Every dish is crafted from recipes passed down through generations —
              using hand-ground spices, fresh ingredients, and the same techniques
              our family has used for over a century. From our signature
              Hyderabadi Dum Biryani to our sizzling Chicken 65, every bite
              transports you to the streets of India.
            </p>
          </div>

          {/* Story stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
            {[
              { value: "14+", label: "Years Serving" },
              { value: "50+", label: "Dishes" },
              { value: "100%", label: "Halal" },
              { value: "5★", label: "Rated" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.05] backdrop-blur-sm"
                variants={itemVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <div className="font-serif text-2xl sm:text-3xl font-bold bg-gradient-to-b from-amber-300 to-amber-500 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-zinc-500 text-xs mt-1 uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── CONTACT / LOCATION ── */}
      <motion.section
        className="relative z-10 max-w-2xl mx-auto px-4 pb-20"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm p-8 sm:p-10">
          <div className="text-center mb-8">
            <span className="text-amber-500/60 text-xs font-semibold tracking-[0.3em] uppercase">
              Visit Us
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-2">
              Come Dine With Us
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                icon: <MapPin className="w-5 h-5" />,
                title: "Location",
                lines: ["Memphis, TN", "Find us in the heart of the city"],
              },
              {
                icon: <Clock className="w-5 h-5" />,
                title: "Hours",
                lines: ["Daily 11:00 AM – 10:00 PM", "Open 7 days a week"],
              },
              {
                icon: <Phone className="w-5 h-5" />,
                title: "Contact",
                lines: ["Call for Orders & Reservations", "Catering available for events"],
              },
            ].map((item, i) => (
              <div key={i} className="text-center p-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mx-auto mb-3 text-amber-400">
                  {item.icon}
                </div>
                <h4 className="text-white font-semibold text-sm mb-2">{item.title}</h4>
                {item.lines.map((line, j) => (
                  <p key={j} className="text-zinc-500 text-xs leading-relaxed">
                    {line}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── FOOTER ── */}
      <motion.footer
        className="relative z-10 max-w-2xl mx-auto px-4 pb-8 pt-8 border-t border-white/[0.06] text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        {/* Bottom logo */}
        <div className="flex justify-center mb-4">
          <div className="relative w-12 h-12 opacity-60">
            <Image src="/logo.png" alt="" fill className="object-contain" />
          </div>
        </div>

        <p className="text-zinc-500 text-sm font-serif italic">
          Memphis Indian Restaurant
        </p>
        <div className="flex items-center justify-center gap-4 mt-2 text-zinc-600 text-xs">
          <span>Authentic Indian Cuisine</span>
          <Dot className="w-3 h-3" />
          <span>Since 2010</span>
        </div>
        <p className="mt-4 text-zinc-700 text-xs">
          Prices subject to change. All major credit cards accepted.
        </p>

        {/* Decorative flourish */}
        <motion.div
          className="mt-6 flex items-center justify-center gap-2"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-amber-600/30"
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
  );
}
