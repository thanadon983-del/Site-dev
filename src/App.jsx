import { useState, useEffect, useRef } from 'react';
import { 
  Plane, Car, MapPin, Phone, CheckCircle, Menu, X, ChevronRight,
  ChevronLeft, ChevronDown, Globe, Image as ImageIcon, Clock,
  ShieldCheck, Waves, Coffee, Home
} from 'lucide-react';

// --- Component สำหรับพื้นหลัง Mesh Gradient (ขาว/ทอง/#1800ad) ---
const AnimatedMeshGradient = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-white">
      <div 
        className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-[#d4af37] mix-blend-multiply filter blur-[90px] md:blur-[150px] opacity-50"
        style={{ animation: 'blob 25s infinite alternate ease-in-out' }}
      ></div>
      <div 
        className="absolute top-[10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#1800ad] mix-blend-multiply filter blur-[90px] md:blur-[150px] opacity-30"
        style={{ animation: 'blob 30s infinite alternate ease-in-out', animationDelay: '2s' }}
      ></div>
      <div 
        className="absolute bottom-[-20%] left-[10%] w-[80vw] h-[80vw] rounded-full bg-[#d4af37] mix-blend-multiply filter blur-[90px] md:blur-[150px] opacity-40"
        style={{ animation: 'blob 35s infinite alternate ease-in-out', animationDelay: '4s' }}
      ></div>
      <div 
        className="absolute bottom-[-10%] right-[20%] w-[50vw] h-[50vw] rounded-full bg-[#1800ad] mix-blend-multiply filter blur-[90px] md:blur-[150px] opacity-20"
        style={{ animation: 'blob 28s infinite alternate ease-in-out', animationDelay: '6s' }}
      ></div>
    </div>
  );
};

// --- Component สำหรับทำ Animation เลื่อนจอแล้วค่อยๆ ปรากฏ ---
const FadeInSection = ({ children, delay = 0, className = "" }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();
  
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    }
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- Component เมนูทางลัด 4 ปุ่ม (ซ่อนหน้าปัจจุบันอัตโนมัติ) ---
const ShortcutMenu = ({ navigateTo, currentPage, t }) => {
  const allShortcuts = [
    { id: 'home', label: t.navHome, icon: Home },
    { id: 'airportToHotel', label: t.navAirToHotel, icon: Plane, iconClass: "transform rotate-45" },
    { id: 'hotelToAirport', label: t.navHotelToAir, icon: Car },
    { id: 'facilities', label: t.navFacilities, icon: Waves },
    { id: 'dining', label: t.navDining, icon: Coffee },
  ];

  let shortcutsToShow = allShortcuts.filter(item => item.id !== currentPage);
  
  if (shortcutsToShow.length > 4) {
    shortcutsToShow = shortcutsToShow.filter(item => item.id !== 'home').slice(0, 4);
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 mt-8 mb-12 relative z-20">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {shortcutsToShow.map((item) => {
          const Icon = item.icon;
          return (
            <button 
              key={item.id}
              onClick={() => navigateTo(item.id)} 
              className="glass-card bg-white/90 p-6 md:p-8 rounded-3xl flex flex-col items-center justify-center gap-4 hover:-translate-y-2 transition-all duration-300 group outline-none focus:outline-none border-gray-100 shadow-md hover:shadow-xl hover:border-[#d4af37]/40"
            >
              <div className="p-4 rounded-full transition-colors shadow-inner bg-gray-50 text-gray-400 group-hover:bg-[#d4af37] group-hover:text-white">
                <Icon size={30} strokeWidth={1.5} className={item.iconClass || ""} />
              </div>
              <span className="text-sm md:text-base font-medium tracking-wide uppercase text-center leading-tight transition-colors text-gray-600 group-hover:text-[#d4af37]">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

// --- Component แบนเนอร์หัวเว็บสำหรับหน้าย่อย (ไล่สี ขาวบน -> ดำล่าง) ---
const PageBanner = ({ title, bgImage }) => (
  <div className="relative h-[35vh] min-h-[280px] md:h-[45vh] md:min-h-[380px] w-full flex items-center justify-center overflow-hidden">
    <img 
      src={bgImage} 
      alt={title} 
      className="absolute inset-0 w-full h-full object-cover scale-105 transform motion-safe:animate-[pulse_15s_ease-in-out_infinite_alternate]"
      onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1542314831-c6a4d27ce605?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80'; }}
    />
    <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-black/50 to-gray-900"></div>
    
    <div className="relative z-10 text-center px-6 mt-10">
      <FadeInSection>
        <h1 className="text-3xl md:text-5xl font-serif text-white tracking-wider font-light mb-4 drop-shadow-lg">{title}</h1>
        <div className="w-16 h-1 bg-[#d4af37] mx-auto rounded-full shadow-md"></div>
      </FadeInSection>
    </div>
  </div>
);

// --- Component Slider แบบมาตรฐาน (วนลูป) ---
const ImageCarousel = ({ images, heightClass = "h-[250px] md:h-[450px]" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => setCurrentIndex(current => current === 0 ? images.length - 1 : current - 1);
  const nextSlide = () => setCurrentIndex(current => current === images.length - 1 ? 0 : current + 1);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(current => current === images.length - 1 ? 0 : current + 1);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className={`relative w-full ${heightClass} rounded-3xl overflow-hidden group shadow-xl border border-gray-100`}>
      {images.map((img, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          <img 
            src={img} 
            alt={`Slide ${idx}`} 
            className="w-full h-full object-cover" 
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
        </div>
      ))}
      <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 text-gray-800 hover:bg-[#d4af37] hover:text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm shadow-md">
        <ChevronLeft size={24} />
      </button>
      <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 text-gray-800 hover:bg-[#d4af37] hover:text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm shadow-md">
        <ChevronRight size={24} />
      </button>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2.5 rounded-full transition-all duration-300 shadow-sm ${idx === currentIndex ? 'bg-[#d4af37] w-8' : 'bg-white/80 w-2.5 hover:bg-white'}`}
          />
        ))}
      </div>
    </div>
  );
};

// --- Component Slider แบบซ้อนทับกัน (Coverflow) ---
const CoverflowGallery = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(Math.floor(images.length / 2));

  const prev = () => setCurrentIndex(prev => (prev - 1 + images.length) % images.length);
  const next = () => setCurrentIndex(prev => (prev + 1) % images.length);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative w-full h-[250px] md:h-[350px] flex items-center justify-center overflow-hidden py-10 group">
      {images.map((img, idx) => {
        let offset = idx - currentIndex;
        const half = Math.floor(images.length / 2);
        if (offset > half) offset -= images.length;
        if (offset < -half) offset += images.length;

        let styles = "opacity-0 hidden";
        if (offset === 0) styles = "z-30 scale-100 opacity-100 translate-x-0 shadow-[0_15px_40px_rgba(0,0,0,0.15)] border-[#d4af37]/50";
        else if (offset === 1) styles = "z-20 scale-[0.85] opacity-70 translate-x-[55%] md:translate-x-[65%] blur-[1px]";
        else if (offset === -1) styles = "z-20 scale-[0.85] opacity-70 -translate-x-[55%] md:-translate-x-[65%] blur-[1px]";
        else if (offset === 2) styles = "z-10 scale-75 opacity-30 translate-x-[110%] md:translate-x-[130%] blur-[2px]";
        else if (offset === -2) styles = "z-10 scale-75 opacity-30 -translate-x-[110%] md:-translate-x-[130%] blur-[2px]";

        return (
          <div 
            key={idx} 
            className={`absolute w-[220px] md:w-[400px] h-full transition-all duration-700 ease-in-out cursor-pointer rounded-2xl overflow-hidden border border-white/40 ${styles}`} 
            onClick={() => setCurrentIndex(idx)}
          >
            <img 
              src={img} 
              className="w-full h-full object-cover" 
              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800'; }}
            />
          </div>
        );
      })}
      
      <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-2 md:left-10 z-40 bg-white/80 hover:bg-[#d4af37] text-gray-800 hover:text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-md">
        <ChevronLeft size={24} />
      </button>
      <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-2 md:right-10 z-40 bg-white/80 hover:bg-[#d4af37] text-gray-800 hover:text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-md">
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

// ไอคอน Social Media
const LineIcon = ({ size = 24, className = "" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
    <path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.036 9.608.391.084.922.258 1.057.592.122.303.079.778.039 1.085l-.171 1.027c-.053.303-.242 1.186 1.039.647 1.281-.54 6.911-4.069 9.428-6.967 1.739-1.907 2.572-3.843 2.572-5.992zm-18.988 2.595h-2.392v-4.578c0-.265.215-.48.48-.48s.48.215.48.48v4.098h1.432c.265 0 .48.215.48.48s-.215.48-.48.48zm3.322 0h-.96c-.265 0-.48-.215-.48-.48v-4.578c0-.265.215-.48.48-.48s.48.215.48.48v4.578c0 .265-.215.48-.48.48zm5.666 0h-1.472l-1.963-2.739v2.739c0 .265-.214.48-.479.48s-.48-.215-.48-.48v-4.578c0-.265.215-.48.48-.48s.48.215.48.48v2.724l1.948-2.724c.097-.137.253-.211.419-.211.265 0 .48.215.48.48v4.578c0 .265-.215.48-.48.48zm3.692-3.618h-2.392v.975h2.392c.265 0 .48.215.48.48s-.215.48-.48.48h-2.392v1.203h2.392c.265 0 .48.215.48.48s-.215.48-.48.48h-2.872c-.265 0-.48-.215-.48-.48v-4.578c0-.265.215-.48.48-.48h2.872c.265 0 .48.215.48.48s-.215.48-.48.48z"/>
  </svg>
);
const FacebookIcon = ({ size = 24, className = "" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);
const InstagramIcon = ({ size = 24, className = "" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);
const TiktokIcon = ({ size = 24, className = "" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

// ข้อมูลคำแปลภาษา
const translations = {
  th: {
    navHome: "หน้าแรก",
    navAirToHotel: "บริการรับจากสนามบิน",
    navHotelToAir: "บริการรถส่งสนามบิน",
    navFacilities: "สิ่งอำนวยความสะดวก",
    navDining: "ห้องอาหารและบาร์",
    navContact: "ติดต่อเรา",
    navBook: "สำรองห้องพัก",
    
    heroDesc: "ยินดีต้อนรับสู่หน้าข้อมูลเพิ่มเติมของ Suvarnabhumi Ville ที่จะช่วยแนะนำบริการรถรับ-ส่ง สิ่งอำนวยความสะดวก และร้านอาหาร เพื่อให้การพักผ่อนของคุณสมบูรณ์แบบที่สุด",
    changeLang: "เปลี่ยนภาษา (Language)",

    shuttleAirToHotel: "บริการรับจากสนามบิน สู่ โรงแรม",
    noAdvanceBooking: "No Advance Booking",
    step1Title: "ไปที่จุดนัดพบ (Meeting Point)",
    step1Desc1: "หลังจากรับสัมภาระ กรุณาไปยังจุดนัดพบที่ ",
    step1Desc2: "ชั้น 2 ด้านในอาคารผู้โดยสารขาเข้า",
    step2Title: "สังเกตจุดนัดพบ (Gate 3 - 4)",
    step2Desc1: "มองหาเคาน์เตอร์ AOT Limousine บริเวณ ",
    step2Desc2: "ระหว่างประตู 3 และ ประตู 4",
    step3Title: "มองหาป้ายโรงแรม",
    step3Desc1: "สังเกตป้ายสีน้ำเงินคำว่า ",
    step3Desc2: "\"SUVARNABHUMI VILLE\"",
    step3Desc3: " จะมีเจ้าหน้าที่สแตนด์บายตลอด 24 ชม.",
    step4Title: "ติดต่อเจ้าหน้าที่",
    step4Desc1: "เมื่อพบเจ้าหน้าที่ กรุณารอรถประมาณ ",
    step4Desc2: "10-20 นาที",
    step4Desc3: " เนื่องจากรถไม่ได้จอดรอที่สนามบิน",
    step4Warning: "หากหาพนักงานไม่เจอ กรุณาโทร 098-267-3888 (ตลอด 24 ชม.)",
    shuttleHotelToAir: "บริการรถ จากโรงแรม สู่ สนามบิน",
    hotelToAirportBadge: "Hotel to Airport",
    h2a1Title: "การจองรถไปสนามบิน",
    h2a1Desc: "กรุณาแจ้งเวลาที่ต้องการเดินทางไปสนามบินกับพนักงานต้อนรับขณะเช็คอิน เพื่อสำรองที่นั่งล่วงหน้า",
    h2a2Title: "เวลาให้บริการ",
    h2a2Desc: "บริการรถส่งสนามบินให้บริการตลอด 24 ชั่วโมง โดยมีรถออกทุกๆ ครึ่งชั่วโมง",
    h2a3Title: "ค่าบริการ",
    h2a3Desc: "ค่าบริการ 100 บาท/รอบ สำหรับผู้โดยสาร 1-2 ท่านที่เดินทางพร้อมกัน",
    h2a4Title: "ก่อนเดินทาง",
    h2a4Desc: "กรุณามาถึงบริเวณล็อบบี้ของโรงแรมก่อนเวลาออกอย่างน้อย 10-15 นาที",
    facTitle: "สิ่งอำนวยความสะดวกในโรงแรม",
    facDesc: "เราได้จัดเตรียมบริการและสิ่งอำนวยความสะดวกต่างๆ ไว้เพื่อให้ท่านได้รับความสะดวกสบายตลอดการเข้าพัก",
    facPool: "สระว่ายน้ำกลางแจ้ง (07:00 - 01:00 น.)",
    facFit: "ห้องฟิตเนส (เปิดบริการ 24 ชั่วโมง)",
    facSauna: "ห้องซาวน่า (เปิดบริการ 24 ชั่วโมง)",
    facMart: "มินิมาร์ท (เปิดบริการ 24 ชั่วโมง)",
    facChicken: "ไก่ย่าง Five Star (07:30 - 21:30 น.)",
    facLaundry: "ร้านซักผ้า (เปิดบริการ 24 ชั่วโมง)",
    facKids: "ห้องเด็กเล่น (เปิดบริการ 24 ชั่วโมง)",
    diningTitle: "อาหารและเครื่องดื่ม",
    diningDesc: "สัมผัสความอร่อยที่แตกต่างกับร้านอาหารทั้ง 3 แห่งภายในโรงแรมของเรา",
    bfTitle: "อาหารเช้า",
    bfTime: "พร้อมให้บริการ 05:00 - 11:00 น.",
    s64Desc: "รูฟท็อปบาร์วิวสนามบิน 360 องศา ดนตรีสดและโชว์ควงไฟสุดอลังการ (เปิด 18:00 - 01:00 น.)",
    steakDesc: "สเต็กคุณภาพและอาหารหลากหลายเมนู ในบรรยากาศสบายๆ (เปิด 11:00 - 22:00 น.)",
    cafeDesc: "คาเฟ่บรรยากาศดี ให้บริการเครื่องดื่ม กาแฟสด และเบเกอรี่ (เปิด 24 ชั่วโมง)",
    contactTitle: "ติดต่อเรา",
    addressDesc: "9/9 หมู่ 7 ซอยกิ่งแก้ว 64 ถนนกิ่งแก้ว ตำบลราชาเทวะ อำเภอบางพลี สมุทรปราการ 10540",
  },
  en: {
    navHome: "Home",
    navAirToHotel: "Airport Pick-up",
    navHotelToAir: "Airport Drop-off",
    navFacilities: "Hotel Facilities",
    navDining: "Dining & Bars",
    navContact: "Contact Us",
    navBook: "Reserve Your Stay",
    
    heroDesc: "Welcome to Suvarnabhumi Ville's information page. Here you can find details about our shuttle service, facilities, and restaurants for your perfect stay.",
    changeLang: "Language",

    shuttleAirToHotel: "Shuttle Service: Airport to Hotel",
    noAdvanceBooking: "No Advance Booking",
    step1Title: "Go to Meeting Point",
    step1Desc1: "After receiving luggage, please go to the meeting point at ",
    step1Desc2: "2nd floor inside Arrival Hall",
    step2Title: "Notice Meeting Point (Gate 3 - 4)",
    step2Desc1: "Look for AOT Limousine counter between ",
    step2Desc2: "Gate 3 and Gate 4",
    step3Title: "Look for Hotel Sign",
    step3Desc1: "Look for the blue sign ",
    step3Desc2: "\"SUVARNABHUMI VILLE\"",
    step3Desc3: ". Staff on standby 24 hrs.",
    step4Title: "Contact Staff",
    step4Desc1: "Please wait approximately ",
    step4Desc2: "10-20 minutes",
    step4Desc3: " for the van to arrive.",
    step4Warning: "If you cannot find the staff, please call 098-267-3888 (24 Hrs)",
    shuttleHotelToAir: "Shuttle Service: Hotel to Airport",
    hotelToAirportBadge: "Hotel to Airport",
    h2a1Title: "Advance Booking",
    h2a1Desc: "Please inform reception of your preferred departure time during check-in to reserve your seat.",
    h2a2Title: "Service Hours",
    h2a2Desc: "Airport shuttle operates 24 hours, departing every 30 minutes.",
    h2a3Title: "Service Fee",
    h2a3Desc: "100 THB per trip for 1-2 passengers traveling together.",
    h2a4Title: "Before Departure",
    h2a4Desc: "Please arrive at the lobby at least 10-15 minutes before departure.",
    facTitle: "Hotel Facilities",
    facDesc: "We provide various services and facilities to ensure a comfortable stay.",
    facPool: "Outdoor Swimming Pool (07:00 - 01:00)",
    facFit: "Fitness Center (24 Hours)",
    facSauna: "Sauna Room (24 Hours)",
    facMart: "Mini Mart (24 Hours)",
    facChicken: "Five Star Chicken (07:30 - 21:30)",
    facLaundry: "Laundry Service (24 Hours)",
    facKids: "Kids Room (24 Hours)",
    diningTitle: "Dining & Beverage",
    diningDesc: "Experience different delicious tastes from our 3 restaurants.",
    bfTitle: "Breakfast",
    bfTime: "Served daily from 05:00 - 11:00 AM",
    s64Desc: "360° airport view rooftop bar, live music & fire show (18:00 - 01:00)",
    steakDesc: "Quality steaks and various menus in a cozy atmosphere (11:00 - 22:00)",
    cafeDesc: "Fresh coffee, beverages, and bakery in a relaxing cafe (24 Hours)",
    contactTitle: "Contact Us",
    addressDesc: "9/9 Moo 7 Soi Kingkaew 64, Kingkaew Road, Rachathewa, Bangphli, Samut Prakan 10540",
  },
  zh: {
    navHome: "首页",
    navAirToHotel: "接机服务",
    navHotelToAir: "送机服务",
    navFacilities: "酒店设施",
    navDining: "餐饮与酒吧",
    navContact: "联系我们",
    navBook: "立即预订",
    
    heroDesc: "欢迎来到 Suvarnabhumi Ville 信息页面。了解我们的接送服务、设施和餐厅，开启完美住宿。",
    changeLang: "语言 (Language)",

    shuttleAirToHotel: "接送服务：从机场到酒店",
    noAdvanceBooking: "无需提前预订",
    step1Title: "前往会合点",
    step1Desc1: "取完行李后，请前往位于 ",
    step1Desc2: "到达大厅内2楼的会合点",
    step2Title: "注意会合点 (3-4号门)",
    step2Desc1: "寻找位于 ",
    step2Desc2: "3号门和4号门之间",
    step3Title: "寻找酒店指示牌",
    step3Desc1: "寻找蓝色的 ",
    step3Desc2: "\"SUVARNABHUMI VILLE\"",
    step3Desc3: " 指示牌。工作人员24小时待命。",
    step4Title: "联系工作人员",
    step4Desc1: "遇到工作人员后，请等待约 ",
    step4Desc2: "10-20分钟",
    step4Desc3: " 等候车辆到达。",
    step4Warning: "如果找不到工作人员，请致电 098-267-3888 (24小时)",
    shuttleHotelToAir: "接送服务：从酒店到机场",
    hotelToAirportBadge: "酒店至机场",
    h2a1Title: "提前预订",
    h2a1Desc: "请在入住时告知前台您所需的出发时间以预留座位。",
    h2a2Title: "服务时间",
    h2a2Desc: "机场班车24小时运行，每30分钟一班。",
    h2a3Title: "服务费",
    h2a3Desc: "同行1-2名乘客每趟100泰铢。",
    h2a4Title: "出发前",
    h2a4Desc: "请在出发前至少10-15分钟到达大堂。",
    facTitle: "酒店设施",
    facDesc: "我们提供各种服务和设施，以确保您住宿舒适。",
    facPool: "室外游泳池 (07:00 - 01:00)",
    facFit: "健身中心 (24小时)",
    facSauna: "桑拿房 (24小时)",
    facMart: "便利店 (24小时)",
    facChicken: "五星烤鸡 (07:30 - 21:30)",
    facLaundry: "洗衣服务 (24小时)",
    facKids: "儿童游戏室 (24小时)",
    diningTitle: "餐饮",
    diningDesc: "在我们的3家餐厅体验不同的美味。",
    bfTitle: "早餐",
    bfTime: "供应时间：05:00 - 11:00",
    s64Desc: "360° 机场景观屋顶酒吧、现场音乐和火舞表演 (18:00 - 01:00)",
    steakDesc: "温馨氛围中提供优质牛排和各种菜单 (11:00 - 22:00)",
    cafeDesc: "轻松的咖啡厅提供现煮咖啡、饮料和烘焙食品 (24小时)",
    contactTitle: "联系我们",
    addressDesc: "9/9 Moo 7 Soi Kingkaew 64, Kingkaew Road, Rachathewa, Bangphli, Samut Prakan 10540",
  }
};

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState('th'); 
  const [modalImage, setModalImage] = useState(null);
  const [currentPage, setCurrentPage] = useState('home'); 

  const t = translations[lang]; 

  const navigateTo = (page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false); 
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };

  return (
    <div className="min-h-screen bg-white text-gray-700 selection:bg-[#d4af37] selection:text-white font-light" style={{ fontFamily: "'Kanit', sans-serif" }}>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Kanit:wght@200;300;400;500;600&display=swap');
        * { font-family: 'Kanit', sans-serif !important; }
        html { scroll-behavior: smooth; }
        body { background-color: #ffffff; }
        button, a { outline: none !important; -webkit-tap-highlight-color: transparent; }
        button:focus, a:focus { outline: none !important; box-shadow: none !important; }
        .glass-card {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.4);
        }
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
      `}} />

      {/* พื้นหลัง Mesh Gradient เคลื่อนไหว */}
      <AnimatedMeshGradient />

      {/* Navigation */}
      <nav className="absolute top-0 left-0 w-full z-50 bg-transparent py-5">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex justify-between items-center relative w-full h-12">
            
            <div onClick={() => navigateTo('home')} className="flex-shrink-0 flex items-center cursor-pointer group relative z-20">
              <img 
                src="/logo-large.png" 
                alt="Suvarnabhumi Ville Hotel Logo" 
                className="h-12 md:h-16 object-contain hover:scale-105 transition-transform duration-500" 
                onError={(e) => { 
                  e.target.style.display = 'none'; 
                  e.target.nextSibling.style.display = 'block'; 
                }} 
              />
              <span style={{display: 'none'}} className="font-serif text-xl md:text-2xl tracking-[0.15em] text-gray-800 uppercase group-hover:text-[#d4af37] transition-colors drop-shadow-md">
                Suvarnabhumi <span className="text-[#d4af37] italic font-light lowercase">Ville</span>
              </span>
            </div>
            
            <div className="flex items-center gap-3 md:gap-6 relative z-20">
              
              <div className="relative group hidden md:block">
                <button className="flex items-center text-sm tracking-wider text-gray-800 hover:text-[#d4af37] transition-colors uppercase py-2 drop-shadow-sm font-medium">
                  <Globe size={18} className="mr-1.5" />
                  {lang === 'th' ? 'TH' : lang === 'en' ? 'EN' : '中文'}
                  <ChevronDown size={14} className="ml-1 opacity-70 group-hover:opacity-100 transition-opacity" />
                </button>
                <div className="absolute right-0 mt-2 w-32 glass-card rounded-xl overflow-hidden shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right scale-95 group-hover:scale-100 border border-gray-100">
                  <button onClick={() => setLang('th')} className={`w-full text-left px-5 py-3 text-sm transition-colors ${lang === 'th' ? 'text-[#d4af37] bg-gray-50' : 'text-gray-700 hover:bg-gray-50 hover:text-[#d4af37]'}`}>ไทย</button>
                  <button onClick={() => setLang('en')} className={`w-full text-left px-5 py-3 text-sm transition-colors ${lang === 'en' ? 'text-[#d4af37] bg-gray-50' : 'text-gray-700 hover:bg-gray-50 hover:text-[#d4af37]'}`}>English</button>
                  <button onClick={() => setLang('zh')} className={`w-full text-left px-5 py-3 text-sm transition-colors ${lang === 'zh' ? 'text-[#d4af37] bg-gray-50' : 'text-gray-700 hover:bg-gray-50 hover:text-[#d4af37]'}`}>中文</button>
                </div>
              </div>

              <div className={`hidden md:block transition-all duration-500`}>
                <a href="https://www.suvarnabhumiville.com/accommodation/room/room-rate" target="_blank" rel="noreferrer" className="bg-[#d4af37] text-white px-6 py-2.5 text-sm tracking-wider font-medium hover:bg-gray-900 hover:text-white hover:shadow-[0_5px_15px_rgba(212,175,55,0.4)] transition-all duration-300 rounded-full flex items-center outline-none focus:outline-none shadow-lg">
                  {t.navBook}
                </a>
              </div>

              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
                className="text-gray-800 bg-white/40 border border-gray-300 hover:bg-[#d4af37] hover:border-transparent hover:text-white p-2 md:p-2.5 rounded-full transition-all duration-300 shadow-sm outline-none focus:outline-none focus:ring-0"
              >
                {mobileMenuOpen ? <X size={24} strokeWidth={2} /> : <Menu size={24} strokeWidth={2} />}
              </button>
            </div>
            
          </div>
        </div>

        {/* เมนู Dropdown */}
        <div className={`absolute top-full left-0 w-full glass-card border-t border-gray-100 transition-all duration-500 overflow-y-auto shadow-2xl ${mobileMenuOpen ? 'max-h-[85vh] opacity-100 visible py-6 md:py-10' : 'max-h-0 opacity-0 invisible py-0'}`}>
          <div className="max-w-3xl mx-auto px-6 flex flex-col">
            
            <div className="md:hidden flex items-center justify-between py-4 border-b border-gray-100 mb-6">
              <span className="text-sm text-gray-500 uppercase tracking-wider flex items-center"><Globe size={16} className="mr-2 text-[#d4af37]" /> {t.changeLang}</span>
              <div className="flex space-x-4">
                <button onClick={() => { setLang('th'); }} className={`${lang === 'th' ? 'text-[#d4af37] font-medium' : 'text-gray-500 hover:text-gray-800'} text-sm outline-none focus:outline-none`}>TH</button>
                <button onClick={() => { setLang('en'); }} className={`${lang === 'en' ? 'text-[#d4af37] font-medium' : 'text-gray-500 hover:text-gray-800'} text-sm outline-none focus:outline-none`}>EN</button>
                <button onClick={() => { setLang('zh'); }} className={`${lang === 'zh' ? 'text-[#d4af37] font-medium' : 'text-gray-500 hover:text-gray-800'} text-sm outline-none focus:outline-none`}>ZH</button>
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                { id: 'home', label: t.navHome },
                { id: 'airportToHotel', label: t.navAirToHotel },
                { id: 'hotelToAirport', label: t.navHotelToAir },
                { id: 'facilities', label: t.navFacilities },
                { id: 'dining', label: t.navDining },
                { id: 'contact', label: t.navContact }
              ].map((item) => (
                <button 
                  key={item.id} 
                  onClick={() => navigateTo(item.id)} 
                  className={`w-full text-center md:text-left py-4 text-lg md:text-xl uppercase tracking-widest font-light transition-all duration-300 hover:tracking-[0.2em] rounded-2xl outline-none focus:outline-none ${currentPage === item.id ? 'text-[#d4af37] bg-gray-50 font-medium shadow-inner' : 'text-gray-800 hover:bg-gray-50 hover:text-[#d4af37]'}`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="md:hidden mt-10">
              <a href="https://www.suvarnabhumiville.com/accommodation/room/room-rate" target="_blank" rel="noreferrer" className="bg-[#d4af37] text-white w-full block text-center px-4 py-4 text-sm tracking-widest font-medium hover:bg-gray-900 rounded-full uppercase outline-none focus:outline-none shadow-[0_10px_20px_rgba(212,175,55,0.3)] transition-colors">
                {t.navBook}
              </a>
            </div>

          </div>
        </div>
      </nav>

      {/* ==================================================== */}
      {/* 1. หน้าแรก (Home) */}
      {/* ==================================================== */}
      {currentPage === 'home' && (
        <section className="relative min-h-screen flex flex-col justify-center overflow-hidden animate-[pop-in_0.5s_ease-out_forwards] pt-20 pb-10">
          <div className="absolute inset-0 z-0 h-[85vh] md:h-[90vh]">
            <img 
              src="/bg-home.jpg" 
              alt="Background" 
              className="w-full h-full object-cover scale-105 transform motion-safe:animate-[pulse_15s_ease-in-out_infinite_alternate]"
              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1542314831-c6a4d27ce605?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80'; }}
            />
            {/* ไล่สีจากขาวสว่างด้านบน ลงมาเป็นดำเข้มด้านล่าง */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-black/50 to-gray-900"></div>
          </div>
          
          <div className="relative z-10 text-center px-4 w-full max-w-5xl mx-auto flex-grow flex flex-col justify-center">
            
            <FadeInSection delay={100}>
              <div className="flex justify-center mb-4 md:mb-6 mt-6 md:mt-10">
                 <img 
                   src="/logo-large.png" 
                   alt="Suvarnabhumi Ville Hotel" 
                   className="h-32 md:h-40 lg:h-48 object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700" 
                 />
              </div>
            </FadeInSection>

            <FadeInSection delay={300}>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl text-white mb-6 leading-[1.2] font-medium tracking-wider uppercase" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.3), 0 2px 5px rgba(0,0,0,0.5)' }}>
                Suvarnabhumi Ville <span className="text-white font-light block md:inline mt-2 md:mt-0">Hotel</span>
              </h1>
            </FadeInSection>
            
            <FadeInSection delay={500}>
              <p className="text-base md:text-lg text-gray-600 mb-6 max-w-2xl mx-auto font-light leading-relaxed px-4">
                {t.heroDesc}
              </p>
            </FadeInSection>
          </div>

          <FadeInSection delay={700}>
             <ShortcutMenu navigateTo={navigateTo} currentPage={currentPage} t={t} />
          </FadeInSection>
        </section>
      )}

      {/* ==================================================== */}
      {/* 2. หน้าจากสนามบิน (Airport to Hotel) */}
      {/* ==================================================== */}
      {currentPage === 'airportToHotel' && (
        <div className="animate-[pop-in_0.5s_ease-out_forwards]">
          <PageBanner title={t.navAirToHotel} bgImage="/bg-airport.jpg" />
          <ShortcutMenu navigateTo={navigateTo} currentPage={currentPage} t={t} />

          <section className="py-12 relative">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
              <FadeInSection>
                <div className="text-center mb-16">
                  <h2 className="font-serif text-3xl md:text-4xl text-gray-900 mb-4 font-medium">{t.shuttleAirToHotel}</h2>
                  <p className="text-gray-600 font-light max-w-2xl mx-auto">
                    {t.step1Desc1} <br/><span className="text-[#d4af37] font-medium">{t.step1Desc2}</span>
                  </p>
                </div>
              </FadeInSection>

              <div className="grid lg:grid-cols-2 gap-12 items-start">
                <FadeInSection delay={200}>
                  <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-xl relative">
                    <span className="absolute top-8 right-8 text-xs tracking-widest text-[#d4af37] border border-[#d4af37]/30 px-3 py-1 rounded-full uppercase bg-[#d4af37]/5 hidden sm:inline-block">{t.noAdvanceBooking}</span>
                    <h3 className="text-2xl text-gray-900 mb-8 font-serif flex items-center"><Plane className="text-[#d4af37] mr-3 transform rotate-45" /> 4 ขั้นตอนง่ายๆ (Steps)</h3>
                    <div className="space-y-6">
                      {[
                        { step: 1, title: t.step1Title, desc1: t.step1Desc1, desc2: t.step1Desc2, image: '/step1.jpg' },
                        { step: 2, title: t.step2Title, desc1: t.step2Desc1, desc2: t.step2Desc2, image: '/step2.jpg' },
                        { step: 3, title: t.step3Title, desc1: t.step3Desc1, desc2: t.step3Desc2, desc3: t.step3Desc3, image: '/step3.jpg' },
                        { step: 4, title: t.step4Title, desc1: t.step4Desc1, desc2: t.step4Desc2, desc3: t.step4Desc3, warning: t.step4Warning, image: '/step4.jpg' }
                      ].map((item, idx) => (
                        <div key={idx} className="flex gap-4 group cursor-pointer hover:bg-gray-50 p-4 -mx-4 rounded-xl transition-all" onClick={() => setModalImage(item.image)}>
                          <div className="w-10 h-10 rounded-full bg-gray-100 group-hover:bg-[#d4af37] flex items-center justify-center text-gray-500 group-hover:text-white font-medium text-base transition-colors shrink-0 shadow-inner">{item.step}</div>
                          <div>
                            <h4 className="text-gray-900 font-medium mb-1 group-hover:text-[#d4af37] transition-colors">{item.title}</h4>
                            <p className="text-gray-600 text-sm font-light leading-relaxed">{item.desc1}<strong className="text-gray-800 font-medium">{item.desc2}</strong>{item.desc3}</p>
                            {item.warning && <p className="text-yellow-600 text-sm mt-3 font-light bg-yellow-50 p-3 rounded-lg border border-yellow-200/50">{item.warning}</p>}
                            <div className="mt-2 flex items-center text-xs text-[#d4af37]/80 group-hover:text-[#d4af37] font-medium"><ImageIcon size={14} className="mr-1.5" /> {lang === 'th' ? 'คลิกเพื่อดูภาพ' : 'Click to view image'}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeInSection>
                
                {/* ช่องวิดีโอแบบคลีนๆ ลบปุ่มเพลย์หลอกออกแล้ว */}
                <FadeInSection delay={400} className="flex flex-col items-center justify-center h-full">
                  <h3 className="text-gray-900 text-lg font-medium mb-4 text-center">วิดีโอแนะนำการเดินทาง (Guide Video)</h3>
                  <div className="relative w-full max-w-[320px] aspect-[9/16] bg-gray-100 rounded-3xl overflow-hidden border-4 border-white shadow-2xl">
                    <video 
                      src="/vid-guide1.mp4" 
                      className="w-full h-full object-cover"
                      controls
                      controlsList="nodownload"
                    />
                  </div>
                </FadeInSection>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ==================================================== */}
      {/* 3. หน้าไปสนามบิน (Hotel to Airport) */}
      {/* ==================================================== */}
      {currentPage === 'hotelToAirport' && (
        <div className="animate-[pop-in_0.5s_ease-out_forwards]">
          <PageBanner title={t.navHotelToAir} bgImage="/bg-hotel.jpg" />
          <ShortcutMenu navigateTo={navigateTo} currentPage={currentPage} t={t} />

          <section className="py-12 relative">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
              <FadeInSection>
                <div className="text-center mb-16">
                  <h2 className="font-serif text-3xl md:text-4xl text-gray-900 mb-4 font-medium">{t.shuttleHotelToAir}</h2>
                  <p className="text-gray-600 font-light max-w-2xl mx-auto">
                    บริการรถตู้จากโรงแรมไปยังสนามบินสุวรรณภูมิ ออกทุกๆ ครึ่งชั่วโมง
                  </p>
                </div>
              </FadeInSection>

              <div className="max-w-4xl mx-auto items-start">
                <FadeInSection delay={200}>
                  <div className="bg-white rounded-3xl border border-gray-100 p-8 md:p-12 shadow-xl">
                    <h3 className="text-2xl text-gray-900 mb-8 font-serif flex items-center"><Car className="text-[#d4af37] mr-3" /> รายละเอียดบริการ (Details)</h3>
                    <div className="space-y-8">
                      {[
                        { icon: Clock, title: t.h2a1Title, desc: t.h2a1Desc },
                        { icon: CheckCircle, title: t.h2a2Title, desc: t.h2a2Desc },
                        { icon: MapPin, title: t.h2a3Title, desc: t.h2a3Desc },
                        { icon: ShieldCheck, title: t.h2a4Title, desc: t.h2a4Desc }
                      ].map((item, idx) => (
                        <div key={idx} className="flex gap-5 items-start">
                          <div className="bg-gray-50 p-3 rounded-full shadow-inner mt-1">
                             <item.icon className="text-[#d4af37] shrink-0" size={24} strokeWidth={1.5} />
                          </div>
                          <div>
                            <h4 className="text-gray-900 text-lg font-medium mb-2">{item.title}</h4>
                            <p className="text-gray-600 font-light leading-relaxed">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeInSection>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ==================================================== */}
      {/* 4. หน้าสิ่งอำนวยความสะดวก (Facilities) */}
      {/* ==================================================== */}
      {currentPage === 'facilities' && (
        <div className="animate-[pop-in_0.5s_ease-out_forwards]">
          <PageBanner title={t.navFacilities} bgImage="/bg-facility.jpg" />
          <ShortcutMenu navigateTo={navigateTo} currentPage={currentPage} t={t} />

          <section className="py-12 relative">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
              <FadeInSection>
                <div className="text-center mb-16">
                  <h2 className="font-serif text-3xl md:text-4xl text-gray-900 mb-4 font-medium">{t.facTitle}</h2>
                  <p className="text-gray-600 font-light max-w-2xl mx-auto">{t.facDesc}</p>
                </div>
              </FadeInSection>

              {/* เพิ่ม ImageCarousel สำหรับสิ่งอำนวยความสะดวก */}
              <FadeInSection delay={100} className="mb-20">
                <ImageCarousel images={[
                  '/fac-slide1.jpg',
                  '/fac-slide2.jpg',
                  '/fac-slide3.jpg',
                  '/fac-slide4.jpg'
                ]} />
              </FadeInSection>

              {/* Grid แบบการ์ดแนวตั้ง ตัด Wifi และ CCTV ออกแล้ว */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                {[
                  { img: '/fac-pool.jpg', title: t.facPool },
                  { img: '/fac-fitness.jpg', title: t.facFit },
                  { img: '/fac-sauna.jpg', title: t.facSauna },
                  { img: '/fac-mart.jpg', title: t.facMart },
                  { img: '/fac-chicken.jpg', title: t.facChicken },
                  { img: '/fac-laundry.jpg', title: t.facLaundry },
                  { img: '/fac-kids.jpg', title: t.facKids },
                ].map((item, idx) => (
                  <FadeInSection key={idx} delay={idx * 100}>
                    <div className="relative aspect-[4/5] rounded-3xl overflow-hidden group shadow-lg cursor-default border border-gray-100 hover:border-[#d4af37]/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 bg-gray-100">
                      <img 
                        src={item.img} 
                        alt={item.title} 
                        className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1563622236306-03c6225c5dfc?w=600'; }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
                      <div className="absolute bottom-0 left-0 w-full p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                        <div className="w-8 h-1 bg-[#d4af37] mb-3 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-100 rounded-full"></div>
                        <h3 className="text-white font-medium text-lg md:text-xl drop-shadow-md group-hover:text-[#d4af37] transition-colors duration-300">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  </FadeInSection>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ==================================================== */}
      {/* 5. หน้าร้านอาหาร/อาหาร (Dining) */}
      {/* ==================================================== */}
      {currentPage === 'dining' && (
        <div className="animate-[pop-in_0.5s_ease-out_forwards]">
          <PageBanner title={t.navDining} bgImage="/bg-dining.jpg" />
          <ShortcutMenu navigateTo={navigateTo} currentPage={currentPage} t={t} />

          <section className="py-12 relative">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
              <FadeInSection>
                <div className="text-center mb-16">
                  <h2 className="font-serif text-3xl md:text-4xl text-gray-900 mb-4 font-medium">{t.diningTitle}</h2>
                  <p className="text-gray-600 font-light max-w-2xl mx-auto">{t.diningDesc}</p>
                </div>
              </FadeInSection>

              {/* Breakfast Section */}
              <FadeInSection delay={200}>
                <div className="relative rounded-3xl overflow-hidden mb-24 group shadow-2xl border border-gray-100">
                  <img 
                    src="/food-breakfast.jpg" 
                    alt="Breakfast" 
                    className="w-full h-64 md:h-[400px] object-cover opacity-90 transform group-hover:scale-105 transition-transform duration-1000 bg-gray-100"
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=1200'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex flex-col justify-center p-8 md:p-16">
                    <h2 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-wide drop-shadow-xl">{t.bfTitle}</h2>
                    <p className="text-lg md:text-2xl text-[#d4af37] font-medium drop-shadow-md">{t.bfTime}</p>
                  </div>
                </div>
              </FadeInSection>

              {/* แกลเลอรี่อาหารแบบ Coverflow */}
              <div className="space-y-32">
                {/* S64 */}
                <FadeInSection delay={300}>
                  <div className="text-center mb-8">
                    <h3 className="font-serif text-3xl text-gray-900 mb-3">{t.s64Desc.split('(')[0]}</h3>
                    <p className="text-gray-600 font-light max-w-3xl mx-auto mb-6 text-lg">{t.s64Desc}</p>
                    <a href="https://skybar64.com/" target="_blank" rel="noreferrer" className="inline-flex items-center text-sm uppercase tracking-wider text-[#d4af37] hover:text-white bg-white hover:bg-[#d4af37] transition-all border border-[#d4af37] px-8 py-3 rounded-full shadow-md hover:shadow-lg">
                      Visit Website <ChevronRight size={18} className="ml-2" />
                    </a>
                  </div>
                  <CoverflowGallery images={[
                    '/s64-1.jpg',
                    '/s64-2.jpg',
                    '/s64-3.jpg',
                    '/s64-4.jpg',
                    '/s64-5.jpg'
                  ]} />
                </FadeInSection>

                {/* Steak */}
                <FadeInSection delay={400}>
                  <div className="text-center mb-8">
                    <h3 className="font-serif text-3xl text-gray-900 mb-3">Steak Gun Aeng 64</h3>
                    <p className="text-gray-600 font-light max-w-3xl mx-auto mb-6 text-lg">{t.steakDesc}</p>
                    <a href="https://www.facebook.com/steakgunang64" target="_blank" rel="noreferrer" className="inline-flex items-center text-sm uppercase tracking-wider text-[#d4af37] hover:text-white bg-white hover:bg-[#d4af37] transition-all border border-[#d4af37] px-8 py-3 rounded-full shadow-md hover:shadow-lg">
                      Visit Facebook <ChevronRight size={18} className="ml-2" />
                    </a>
                  </div>
                  <CoverflowGallery images={[
                    '/steak-1.jpg',
                    '/steak-2.jpg',
                    '/steak-3.jpg',
                    '/steak-4.jpg',
                    '/steak-5.jpg'
                  ]} />
                </FadeInSection>

                {/* Cafe */}
                <FadeInSection delay={500}>
                  <div className="text-center mb-8">
                    <h3 className="font-serif text-3xl text-gray-900 mb-3">Café Suvarnabhumi Ville</h3>
                    <p className="text-gray-600 font-light max-w-3xl mx-auto mb-6 text-lg">{t.cafeDesc}</p>
                    <a href="https://www.facebook.com/cafesuvarnabhumiville/" target="_blank" rel="noreferrer" className="inline-flex items-center text-sm uppercase tracking-wider text-[#d4af37] hover:text-white bg-white hover:bg-[#d4af37] transition-all border border-[#d4af37] px-8 py-3 rounded-full shadow-md hover:shadow-lg">
                      Visit Facebook <ChevronRight size={18} className="ml-2" />
                    </a>
                  </div>
                  <CoverflowGallery images={[
                    '/cafe-1.jpg',
                    '/cafe-2.jpg',
                    '/cafe-3.jpg',
                    '/cafe-4.jpg',
                    '/cafe-5.jpg'
                  ]} />
                </FadeInSection>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ==================================================== */}
      {/* 6. หน้าติดต่อเรา (Contact) */}
      {/* ==================================================== */}
      {currentPage === 'contact' && (
        <div className="animate-[pop-in_0.5s_ease-out_forwards]">
          <PageBanner title={t.contactTitle} bgImage="/bg-contact.jpg" />
          <ShortcutMenu navigateTo={navigateTo} currentPage={currentPage} t={t} />

          <section className="py-12 relative">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
              <div className="grid lg:grid-cols-2 gap-0 bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-2xl">
                {/* ข้อมูลติดต่อ */}
                <div className="p-10 md:p-16 flex flex-col justify-center bg-white z-10">
                  <h2 className="font-serif text-3xl text-gray-900 mb-8 font-medium">Suvarnabhumi Ville Hotel</h2>
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="bg-gray-50 p-2.5 rounded-full mt-0.5 shrink-0 shadow-inner">
                        <MapPin className="text-[#d4af37]" size={20} strokeWidth={1.5} />
                      </div>
                      <p className="text-gray-600 font-light leading-relaxed ml-4 pt-1">{t.addressDesc}</p>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-gray-50 p-2.5 rounded-full shrink-0 shadow-inner">
                        <Phone className="text-[#d4af37]" size={20} strokeWidth={1.5} />
                      </div>
                      <p className="text-gray-600 font-light ml-4">+66 (0) 98 267 3888 (Front Desk 24 Hrs)</p>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-gray-50 p-2.5 rounded-full shrink-0 shadow-inner">
                        <Phone className="text-[#d4af37]" size={20} strokeWidth={1.5} />
                      </div>
                      <p className="text-gray-600 font-light ml-4">+66 (0) 2 738 4599</p>
                    </div>
                  </div>
                  
                  <div className="mt-12 pt-8 border-t border-gray-100">
                    <p className="text-sm text-gray-400 uppercase tracking-widest mb-5 font-medium">Social Media</p>
                    <div className="flex space-x-4">
                      <a href="https://www.facebook.com/suvarnabhumi.ville.2025" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-[#d4af37] hover:border-transparent hover:text-white hover:-translate-y-1 transition-all shadow-sm"><FacebookIcon size={20} /></a>
                      <a href="https://www.instagram.com/suvarnabhumiville/" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-[#d4af37] hover:border-transparent hover:text-white hover:-translate-y-1 transition-all shadow-sm"><InstagramIcon size={20} /></a>
                      <a href="https://www.tiktok.com/@suvarnabhumivilles64" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-[#d4af37] hover:border-transparent hover:text-white hover:-translate-y-1 transition-all shadow-sm"><TiktokIcon size={20} /></a>
                      <a href="https://lin.ee/YGQw4ZR" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-[#d4af37] hover:border-transparent hover:text-white hover:-translate-y-1 transition-all shadow-sm"><LineIcon size={20} /></a>
                    </div>
                  </div>
                </div>

                {/* Google Maps Embed */}
                <div className="h-[400px] lg:h-auto min-h-[400px] bg-gray-100">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.5367657155627!2d100.73010151483015!3d13.685958290389332!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d67004f141829%3A0x6b4f706e2e54a938!2sSuvarnabhumi%20Ville%20Airport%20Hotel!5e0!3m2!1sen!2sth!4v1650000000000!5m2!1sen!2sth" 
                    className="w-full h-full border-0" 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Maps"
                  ></iframe>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ==================================================== */}
      {/* Footer (แสดงทุกหน้า เปลี่ยนเป็นสีสว่าง) */}
      {/* ==================================================== */}
      <footer className="bg-white pt-16 pb-8 border-t border-gray-200 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col items-center md:items-start">
              <span className="font-serif text-xl tracking-[0.15em] text-[#d4af37] uppercase mb-2">Suvarnabhumi <span className="text-gray-800 italic font-light lowercase">Ville</span></span>
              <p className="text-xs text-gray-500 font-light tracking-wide">The Perfect Place With A Perfect View</p>
            </div>
            
            <div className="flex gap-4">
               <a href="https://www.facebook.com/suvarnabhumi.ville.2025" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#d4af37] transition-colors"><FacebookIcon size={20} /></a>
               <a href="https://www.instagram.com/suvarnabhumiville/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#d4af37] transition-colors"><InstagramIcon size={20} /></a>
               <a href="https://www.tiktok.com/@suvarnabhumivilles64" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#d4af37] transition-colors"><TiktokIcon size={20} /></a>
               <a href="https://lin.ee/YGQw4ZR" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#d4af37] transition-colors"><LineIcon size={20} /></a>
            </div>
          </div>
          <div className="text-center md:text-left mt-8 pt-8 border-t border-gray-100 text-xs text-gray-500 font-light">
            <p>© {new Date().getFullYear()} Suvarnabhumi Ville Hotel. All Rights Reserved.</p>
          </div>
        </div>
      </footer>

      {/* Popup รูปภาพ (Modal Overlay) */}
      {modalImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-10 backdrop-blur-sm transition-all" onClick={() => setModalImage(null)}>
          <button className="absolute top-6 right-6 md:top-10 md:right-10 text-gray-400 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-full p-2 z-10" onClick={() => setModalImage(null)}>
            <X size={24} />
          </button>
          <div className="relative max-w-4xl w-full max-h-full flex items-center justify-center transform animate-[pop-in_0.3s_ease-out_forwards]" onClick={(e) => e.stopPropagation()}>
            <img src={modalImage} alt="Preview" className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl" onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800'; }} />
          </div>
          <style dangerouslySetInnerHTML={{__html: `@keyframes pop-in { 0% { opacity: 0; transform: scale(0.95); } 100% { opacity: 1; transform: scale(1); } }`}} />
        </div>
      )}
    </div>
  );
}