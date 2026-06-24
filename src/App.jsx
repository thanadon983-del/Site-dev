import { useState, useEffect, useRef } from 'react';
import { 
  Plane, 
  Car, 
  MapPin, 
  Phone, 
  CheckCircle, 
  Menu, 
  X, 
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Globe,
  Image as ImageIcon,
  Clock,
  ShieldCheck,
  PlayCircle
} from 'lucide-react';

// --- Component สำหรับพื้นหลังเรขาคณิตเคลื่อนไหว ---
const FloatingShapes = () => {
  const shapes = [
    { type: 'circle', size: 'w-64 h-64 md:w-96 md:h-96', pos: '-top-[10%] -left-[10%]', duration: '25s', delay: '0s', color: 'bg-[#d4af37]' },
    { type: 'square', size: 'w-48 h-48 md:w-72 md:h-72', pos: 'top-[20%] right-[5%]', duration: '30s', delay: '-5s', color: 'bg-white' },
    { type: 'circle', size: 'w-72 h-72 md:w-[500px] md:h-[500px]', pos: 'bottom-[10%] -left-[5%]', duration: '35s', delay: '-10s', color: 'bg-[#d4af37]' },
    { type: 'square', size: 'w-32 h-32 md:w-48 md:h-48', pos: 'bottom-[30%] right-[15%]', duration: '20s', delay: '-2s', color: 'bg-gray-300' },
    { type: 'circle', size: 'w-56 h-56 md:w-80 md:h-80', pos: 'top-[40%] left-[30%]', duration: '40s', delay: '-15s', color: 'bg-white' },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {shapes.map((s, i) => (
        <div
          key={i}
          className={`absolute opacity-5 md:opacity-10 ${s.size} ${s.pos} ${s.color} ${s.type === 'circle' ? 'rounded-full' : 'rounded-[3rem] rotate-12'}`}
          style={{
            animation: `float-shape ${s.duration} ease-in-out infinite alternate`,
            animationDelay: s.delay,
          }}
        />
      ))}
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

// --- Component แบนเนอร์หัวเว็บสำหรับหน้าย่อย ---
const PageBanner = ({ title, bgImage }) => (
  <div className="relative h-[30vh] min-h-[250px] md:h-[40vh] md:min-h-[350px] w-full flex items-center justify-center overflow-hidden">
    <img 
      src={bgImage} 
      alt={title} 
      className="absolute inset-0 w-full h-full object-cover opacity-40 scale-105 transform motion-safe:animate-[pulse_15s_ease-in-out_infinite_alternate]"
      onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1542314831-c6a4d27ce605?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80'; }}
    />
    <div className="absolute inset-0 bg-gradient-to-b from-[#2d3748]/80 via-[#2d3748]/50 to-[#2d3748]"></div>
    <div className="relative z-10 text-center px-6">
      <FadeInSection>
        <h1 className="text-3xl md:text-5xl font-serif text-white tracking-wider font-light mb-4">{title}</h1>
        <div className="w-16 h-px bg-[#d4af37] mx-auto"></div>
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
    <div className={`relative w-full ${heightClass} rounded-3xl overflow-hidden group shadow-2xl border border-white/5`}>
      {images.map((img, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          <img src={img} alt="Slide" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a202c]/80 to-transparent opacity-60"></div>
        </div>
      ))}
      <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-[#d4af37] text-white hover:text-black p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm">
        <ChevronLeft size={24} />
      </button>
      <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-[#d4af37] text-white hover:text-black p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm">
        <ChevronRight size={24} />
      </button>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-[#d4af37] w-8' : 'bg-white/50 w-2.5 hover:bg-white'}`}
          />
        ))}
      </div>
    </div>
  );
};

// --- Component Slider แบบซ้อนทับกัน (Coverflow) สไตล์ Wix ---
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
        if (offset === 0) styles = "z-30 scale-100 opacity-100 translate-x-0 shadow-[0_0_40px_rgba(0,0,0,0.8)] border-[#d4af37]/50";
        else if (offset === 1) styles = "z-20 scale-[0.85] opacity-70 translate-x-[55%] md:translate-x-[65%] blur-[1px]";
        else if (offset === -1) styles = "z-20 scale-[0.85] opacity-70 -translate-x-[55%] md:-translate-x-[65%] blur-[1px]";
        else if (offset === 2) styles = "z-10 scale-75 opacity-30 translate-x-[110%] md:translate-x-[130%] blur-[2px]";
        else if (offset === -2) styles = "z-10 scale-75 opacity-30 -translate-x-[110%] md:-translate-x-[130%] blur-[2px]";

        return (
          <div 
            key={idx} 
            className={`absolute w-[220px] md:w-[400px] h-full transition-all duration-700 ease-in-out cursor-pointer rounded-2xl overflow-hidden border border-white/10 ${styles}`} 
            onClick={() => setCurrentIndex(idx)}
          >
            <img src={img} className="w-full h-full object-cover" />
          </div>
        );
      })}
      
      <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-2 md:left-10 z-40 bg-black/40 hover:bg-[#d4af37] text-white hover:text-black p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all">
        <ChevronLeft size={24} />
      </button>
      <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-2 md:right-10 z-40 bg-black/40 hover:bg-[#d4af37] text-white hover:text-black p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all">
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

// ข้อมูลคำแปลภาษา
const translations = {
  th: {
    navHome: "หน้าแรก",
    navAirToHotel: "จากสนามบิน",
    navHotelToAir: "ไปสนามบิน",
    navFacilities: "สิ่งอำนวยความสะดวก",
    navDining: "ร้านอาหาร/อาหาร",
    navContact: "ติดต่อ",
    navBook: "จองห้องพัก",
    heroSubtitle: "Suvarnabhumi Ville Airport Hotel",
    heroTitle1: "โรงแรม",
    heroTitle2: "ใกล้สนามบินสุวรรณภูมิ",
    heroDesc: "ยินดีต้อนรับสู่หน้าข้อมูลเพิ่มเติมของ Suvarnabhumi Ville ที่จะช่วยแนะนำบริการรถรับ-ส่ง สิ่งอำนวยความสะดวก และร้านอาหาร เพื่อให้การพักผ่อนของคุณสมบูรณ์แบบที่สุด",
    btnBookNow: "จองห้องพักเลย",
    shuttleAirToHotel: "บริการรับส่ง จากสนามบิน สู่ โรงแรม",
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
    facWifi: "Free Wi-Fi (ภายในและภายนอกห้องพัก)",
    facPool: "สระว่ายน้ำกลางแจ้ง (07:00 - 01:00 น.)",
    facFit: "ห้องฟิตเนส (เปิดบริการ 24 ชั่วโมง)",
    facSauna: "ห้องซาวน่า (เปิดบริการ 24 ชั่วโมง)",
    facMart: "มินิมาร์ท (เปิดบริการ 24 ชั่วโมง)",
    facChicken: "ไก่ย่าง Five Star (07:30 - 21:30 น.)",
    facLaundry: "ร้านซักผ้า (เปิดบริการ 24 ชั่วโมง)",
    facKids: "ห้องเด็กเล่น (เปิดบริการ 24 ชั่วโมง)",
    facCCTV: "ระบบรักษาความปลอดภัย CCTV ตลอด 24 ชม.",
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
    navAirToHotel: "Airport to Hotel",
    navHotelToAir: "Hotel to Airport",
    navFacilities: "Facilities",
    navDining: "Dining",
    navContact: "Contact",
    navBook: "Book Now",
    heroSubtitle: "Suvarnabhumi Ville Airport Hotel",
    heroTitle1: "Hotel Near",
    heroTitle2: "Suvarnabhumi Airport",
    heroDesc: "Welcome to Suvarnabhumi Ville's information page. Here you can find details about our shuttle service, facilities, and restaurants for your perfect stay.",
    btnBookNow: "Book Room Now",
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
    facWifi: "Free Wi-Fi (In-room & Public areas)",
    facPool: "Outdoor Swimming Pool (07:00 - 01:00)",
    facFit: "Fitness Center (24 Hours)",
    facSauna: "Sauna Room (24 Hours)",
    facMart: "Mini Mart (24 Hours)",
    facChicken: "Five Star Chicken (07:30 - 21:30)",
    facLaundry: "Laundry Service (24 Hours)",
    facKids: "Kids Room (24 Hours)",
    facCCTV: "24-Hour CCTV Security",
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
    navAirToHotel: "机场到酒店",
    navHotelToAir: "酒店到机场",
    navFacilities: "设施",
    navDining: "餐厅",
    navContact: "联系我们",
    navBook: "立即预订",
    heroSubtitle: "Suvarnabhumi Ville Airport Hotel",
    heroTitle1: "素万那普机场",
    heroTitle2: "附近酒店",
    heroDesc: "欢迎来到 Suvarnabhumi Ville 信息页面。了解我们的接送服务、设施和餐厅，开启完美住宿。",
    btnBookNow: "立即预订客房",
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
    facWifi: "免费 Wi-Fi (客房及公共区域)",
    facPool: "室外游泳池 (07:00 - 01:00)",
    facFit: "健身中心 (24小时)",
    facSauna: "桑拿房 (24小时)",
    facMart: "便利店 (24小时)",
    facChicken: "五星烤鸡 (07:30 - 21:30)",
    facLaundry: "洗衣服务 (24小时)",
    facKids: "儿童游戏室 (24小时)",
    facCCTV: "24小时闭路电视监控",
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState('th'); 
  const [modalImage, setModalImage] = useState(null);
  const [currentPage, setCurrentPage] = useState('home'); 

  const t = translations[lang]; 

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ย้ายคำสั่งการเลื่อนจอและปิดเมนูมาไว้ตรงนี้แทน เพื่อไม่ให้ไปตีกับ useEffect
  const navigateTo = (page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false); // ปิดเมนูมือถือเวลาเปลี่ยนหน้า
    window.scrollTo({ top: 0, behavior: 'smooth' }); // เลื่อนขึ้นบนสุดเสมอ
  };

  return (
    <div className="min-h-screen bg-[#2d3748] text-gray-300 selection:bg-[#d4af37] selection:text-black font-light" style={{ fontFamily: "'Kanit', sans-serif" }}>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Kanit:wght@200;300;400;500;600&display=swap');
        * { font-family: 'Kanit', sans-serif !important; }
        html { scroll-behavior: smooth; }
        .glass-card {
          background: rgba(20, 20, 20, 0.6);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        @keyframes float-shape {
          0% { transform: translateY(0) translateX(0) rotate(0deg) scale(1); }
          33% { transform: translateY(-30px) translateX(20px) rotate(45deg) scale(1.05); }
          66% { transform: translateY(20px) translateX(-20px) rotate(90deg) scale(0.95); }
          100% { transform: translateY(0) translateX(0) rotate(135deg) scale(1); }
        }
      `}} />

      {/* พื้นหลังเรขาคณิต (ใส่ไว้ด้านหลังสุด มีผลทุกหน้า) */}
      <FloatingShapes />

      {/* Navigation (ระบบหลายหน้า) */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled || currentPage !== 'home' ? 'glass-card py-3 shadow-2xl shadow-black/50' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex justify-between items-center relative w-full">
            
            {/* โลโก้ (คลิกเพื่อกลับหน้าแรก) */}
            <div onClick={() => navigateTo('home')} className="flex-shrink-0 flex items-center cursor-pointer group relative z-20">
              <span className="font-serif text-xl md:text-2xl tracking-[0.15em] text-white uppercase group-hover:text-gray-200 transition-colors">
                Suvarnabhumi <span className="text-[#d4af37] italic font-light lowercase">Ville</span>
              </span>
            </div>
            
            {/* เมนูหลัก (จอคอม) */}
            <div className={`hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 space-x-6 items-center z-10 w-max transition-all duration-500 ${isScrolled || currentPage !== 'home' ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
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
                  className={`text-sm tracking-wide transition-all duration-300 hover:-translate-y-0.5 ${currentPage === item.id ? 'text-[#d4af37] font-medium border-b border-[#d4af37] pb-1' : 'text-gray-300 hover:text-[#d4af37]'}`}
                >
                  {item.label}
                </button>
              ))}
              
              {/* เปลี่ยนภาษา */}
              <div className="relative group ml-4">
                <button className="flex items-center text-sm tracking-wider text-gray-300 hover:text-[#d4af37] transition-colors uppercase py-2">
                  <Globe size={16} className="mr-1.5" />
                  {lang === 'th' ? 'TH' : lang === 'en' ? 'EN' : '中文'}
                  <ChevronDown size={14} className="ml-1 opacity-70 group-hover:opacity-100 transition-opacity" />
                </button>
                <div className="absolute right-0 mt-2 w-32 glass-card rounded-xl overflow-hidden shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right scale-95 group-hover:scale-100">
                  <button onClick={() => setLang('th')} className={`w-full text-left px-5 py-3 text-sm ${lang === 'th' ? 'text-[#d4af37] bg-white/5' : 'text-gray-300 hover:bg-white/5'} transition-colors`}>ไทย</button>
                  <button onClick={() => setLang('en')} className={`w-full text-left px-5 py-3 text-sm ${lang === 'en' ? 'text-[#d4af37] bg-white/5' : 'text-gray-300 hover:bg-white/5'} transition-colors`}>English</button>
                  <button onClick={() => setLang('zh')} className={`w-full text-left px-5 py-3 text-sm ${lang === 'zh' ? 'text-[#d4af37] bg-white/5' : 'text-gray-300 hover:bg-white/5'} transition-colors`}>中文</button>
                </div>
              </div>
            </div>

            {/* ปุ่มจองห้องพัก (จอคอม) */}
            <div className="flex items-center gap-4 relative z-20">
              <div className={`hidden md:block transition-all duration-500 ${isScrolled || currentPage !== 'home' ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
                <a href="https://www.suvarnabhumiville.com/accommodation/room/room-rate" target="_blank" rel="noreferrer" className="bg-[#d4af37] text-black px-6 py-2 text-sm tracking-wider font-medium hover:bg-white hover:text-black hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all duration-300 rounded-full">
                  {t.navBook}
                </a>
              </div>

              {/* ปุ่มเปิดเมนูมือถือ */}
              <div className="lg:hidden flex items-center">
                <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-300 hover:text-white transition-colors">
                  {mobileMenuOpen ? <X size={26} strokeWidth={1.5} /> : <Menu size={26} strokeWidth={1.5} />}
                </button>
              </div>
            </div>
            
          </div>
        </div>

        {/* เมนูสำหรับมือถือ */}
        <div className={`lg:hidden absolute top-full left-0 w-full glass-card border-t border-white/5 transition-all duration-300 overflow-y-auto ${mobileMenuOpen ? 'max-h-[70vh] opacity-100 visible' : 'max-h-0 opacity-0 invisible'}`}>
          <div className="px-6 py-4 space-y-1">
            <div className="flex items-center justify-between py-3 border-b border-white/5 mb-2">
              <span className="text-sm text-gray-400 uppercase tracking-wider flex items-center"><Globe size={16} className="mr-2" /> Language</span>
              <div className="flex space-x-4">
                <button onClick={() => { setLang('th'); }} className={`${lang === 'th' ? 'text-[#d4af37] font-medium' : 'text-gray-400'} text-sm`}>ไทย</button>
                <button onClick={() => { setLang('en'); }} className={`${lang === 'en' ? 'text-[#d4af37] font-medium' : 'text-gray-400'} text-sm`}>EN</button>
                <button onClick={() => { setLang('zh'); }} className={`${lang === 'zh' ? 'text-[#d4af37] font-medium' : 'text-gray-400'} text-sm`}>中文</button>
              </div>
            </div>
            {[
              { id: 'home', label: t.navHome },
              { id: 'airportToHotel', label: t.navAirToHotel },
              { id: 'hotelToAirport', label: t.navHotelToAir },
              { id: 'facilities', label: t.navFacilities },
              { id: 'dining', label: t.navDining },
              { id: 'contact', label: t.navContact }
            ].map((item) => (
              <button key={item.id} onClick={() => navigateTo(item.id)} className={`block w-full text-left py-3 text-base uppercase border-b border-white/5 ${currentPage === item.id ? 'text-[#d4af37]' : 'text-gray-300 hover:text-[#d4af37]'}`}>
                {item.label}
              </button>
            ))}
            <div className="pt-4 pb-2">
              <a href="https://www.suvarnabhumiville.com/accommodation/room/room-rate" target="_blank" rel="noreferrer" className="bg-[#d4af37] text-black w-full block text-center px-4 py-3 text-sm tracking-wider font-medium hover:bg-white rounded-full">
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
        <section className="relative h-screen flex items-center justify-center overflow-hidden animate-[pop-in_0.5s_ease-out_forwards]">
          <div className="absolute inset-0 z-0">
            <img 
              src="./IMG_3314.JPG" 
              alt="Background" 
              className="w-full h-full object-cover opacity-40 scale-105 transform motion-safe:animate-[pulse_15s_ease-in-out_infinite_alternate]"
              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1542314831-c6a4d27ce605?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80'; }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#2d3748]/80 via-[#2d3748]/40 to-[#2d3748]"></div>
          </div>
          
          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-10">
            <FadeInSection delay={100}>
              <p className="text-[#d4af37] tracking-[0.4em] text-xs md:text-sm uppercase mb-6 font-medium">{t.heroSubtitle}</p>
            </FadeInSection>
            <FadeInSection delay={300}>
              <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-[1.1] font-light">
                {t.heroTitle1}<br/>
                <span className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400">{t.heroTitle2}</span>
              </h1>
            </FadeInSection>
            <FadeInSection delay={400}>
              <h2 className="text-[#d4af37] tracking-[0.2em] md:tracking-[0.3em] text-sm md:text-base uppercase mb-8 font-medium drop-shadow-md">
                " The Perfect Place With A Perfect View "
              </h2>
            </FadeInSection>
            <FadeInSection delay={500}>
              <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                {t.heroDesc}
              </p>
            </FadeInSection>
            <FadeInSection delay={700}>
              {/* แคปซูลเมนูที่หน้าแรก (สลับหน้าได้) */}
              <div className="flex justify-center mt-4">
                <div className="flex flex-col md:flex-row items-center gap-6 glass-card p-4 md:p-2 md:pl-8 rounded-3xl md:rounded-full border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)] w-full sm:w-auto">
                  <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
                    <button onClick={() => navigateTo('airportToHotel')} className="text-sm tracking-wider text-gray-300 hover:text-[#d4af37] transition-all uppercase hover:-translate-y-0.5">{t.navAirToHotel}</button>
                    <button onClick={() => navigateTo('hotelToAirport')} className="text-sm tracking-wider text-gray-300 hover:text-[#d4af37] transition-all uppercase hover:-translate-y-0.5">{t.navHotelToAir}</button>
                    <button onClick={() => navigateTo('facilities')} className="text-sm tracking-wider text-gray-300 hover:text-[#d4af37] transition-all uppercase hover:-translate-y-0.5">{t.navFacilities}</button>
                    <button onClick={() => navigateTo('dining')} className="text-sm tracking-wider text-gray-300 hover:text-[#d4af37] transition-all uppercase hover:-translate-y-0.5">{t.navDining}</button>
                    
                    {/* เปลี่ยนภาษา */}
                    <div className="relative group z-50">
                      <button className="flex items-center text-sm tracking-wider text-gray-300 hover:text-[#d4af37] transition-colors uppercase py-2">
                        <Globe size={16} className="mr-1.5" /> {lang.toUpperCase()} <ChevronDown size={14} className="ml-1 opacity-70" />
                      </button>
                      <div className="absolute right-1/2 translate-x-1/2 md:translate-x-0 md:right-0 mt-2 w-32 glass-card rounded-xl overflow-hidden shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                        <button onClick={() => setLang('th')} className="w-full text-center md:text-left px-5 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-[#d4af37]">ไทย</button>
                        <button onClick={() => setLang('en')} className="w-full text-center md:text-left px-5 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-[#d4af37]">English</button>
                        <button onClick={() => setLang('zh')} className="w-full text-center md:text-left px-5 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-[#d4af37]">中文</button>
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-px h-px md:h-8 bg-white/10 my-2 md:my-0"></div>
                  <a href="https://www.suvarnabhumiville.com/accommodation/room/room-rate" target="_blank" rel="noreferrer" className="bg-[#d4af37] text-black px-8 py-3.5 text-sm tracking-wider font-medium hover:bg-white rounded-full w-full md:w-auto flex justify-center items-center uppercase">
                    {t.btnBookNow} <ChevronRight className="ml-2" size={16} />
                  </a>
                </div>
              </div>
            </FadeInSection>
          </div>
        </section>
      )}

      {/* ==================================================== */}
      {/* 2. หน้าจากสนามบิน (Airport to Hotel) */}
      {/* ==================================================== */}
      {currentPage === 'airportToHotel' && (
        <div className="animate-[pop-in_0.5s_ease-out_forwards]">
          <PageBanner title={t.navAirToHotel} bgImage="./bg-airport.jpg" />
          <section className="py-20 relative">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
              <FadeInSection>
                <div className="text-center mb-16">
                  <h2 className="font-serif text-3xl md:text-4xl text-white mb-4 font-light">{t.shuttleAirToHotel}</h2>
                  <p className="text-gray-400 font-light max-w-2xl mx-auto">
                    {t.step1Desc1} <br/><span className="text-[#d4af37] font-normal">{t.step1Desc2}</span>
                  </p>
                </div>
              </FadeInSection>

              <div className="grid lg:grid-cols-2 gap-12 items-start">
                <FadeInSection delay={200}>
                  <div className="bg-[#1a202c] rounded-3xl border border-white/5 p-8 shadow-xl relative">
                    <span className="absolute top-8 right-8 text-xs tracking-widest text-[#d4af37] border border-[#d4af37]/50 px-3 py-1 rounded-full uppercase bg-[#d4af37]/5 hidden sm:inline-block">{t.noAdvanceBooking}</span>
                    <h3 className="text-2xl text-white mb-8 font-serif flex items-center"><Plane className="text-[#d4af37] mr-3 transform rotate-45" /> 4 ขั้นตอนง่ายๆ (Steps)</h3>
                    <div className="space-y-6">
                      {[
                        { step: 1, title: t.step1Title, desc1: t.step1Desc1, desc2: t.step1Desc2, image: './step1.jpg' },
                        { step: 2, title: t.step2Title, desc1: t.step2Desc1, desc2: t.step2Desc2, image: './step2.jpg' },
                        { step: 3, title: t.step3Title, desc1: t.step3Desc1, desc2: t.step3Desc2, desc3: t.step3Desc3, image: './step3.jpg' },
                        { step: 4, title: t.step4Title, desc1: t.step4Desc1, desc2: t.step4Desc2, desc3: t.step4Desc3, warning: t.step4Warning, image: './step4.jpg' }
                      ].map((item, idx) => (
                        <div key={idx} className="flex gap-4 group cursor-pointer hover:bg-white/5 p-3 rounded-xl transition-all" onClick={() => setModalImage(item.image)}>
                          <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-[#d4af37] flex items-center justify-center text-gray-400 group-hover:text-black font-medium text-sm transition-colors shrink-0">{item.step}</div>
                          <div>
                            <h4 className="text-white font-medium mb-1 group-hover:text-[#d4af37] transition-colors">{item.title}</h4>
                            <p className="text-gray-400 text-sm font-light">{item.desc1}<strong className="text-gray-200 font-normal">{item.desc2}</strong>{item.desc3}</p>
                            {item.warning && <p className="text-yellow-500/80 text-sm mt-2 font-light bg-yellow-500/5 p-2 rounded">{item.warning}</p>}
                            <div className="mt-2 flex items-center text-xs text-[#d4af37]/60 group-hover:text-[#d4af37]"><ImageIcon size={12} className="mr-1" /> {lang === 'th' ? 'ดูภาพ' : 'View Image'}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeInSection>
                
                {/* Video Placeholder แนวตั้ง */}
                <FadeInSection delay={400} className="flex flex-col items-center justify-center h-full">
                  <h3 className="text-white text-lg font-medium mb-4 text-center">วิดีโอแนะนำการเดินทาง (Guide Video)</h3>
                  <div className="relative w-full max-w-[320px] aspect-[9/16] bg-black rounded-3xl overflow-hidden border-4 border-[#1a202c] shadow-2xl group cursor-pointer">
                    <video 
                      src="./vid-guide1.mp4" 
                      className="w-full h-full object-cover"
                      poster="./step1.jpg"
                      controls
                      controlsList="nodownload"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all pointer-events-none flex items-center justify-center">
                      <PlayCircle size={64} className="text-white/80 drop-shadow-lg" />
                    </div>
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
          <PageBanner title={t.navHotelToAir} bgImage="./bg-hotel.jpg" />
          <section className="py-20 relative">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
              <FadeInSection>
                <div className="text-center mb-16">
                  <h2 className="font-serif text-3xl md:text-4xl text-white mb-4 font-light">{t.shuttleHotelToAir}</h2>
                  <p className="text-gray-400 font-light max-w-2xl mx-auto">
                    บริการรถตู้จากโรงแรมไปยังสนามบินสุวรรณภูมิ ออกทุกๆ ครึ่งชั่วโมง
                  </p>
                </div>
              </FadeInSection>

              <div className="grid lg:grid-cols-2 gap-12 items-start">
                <FadeInSection delay={200}>
                  <div className="bg-[#1a202c] rounded-3xl border border-white/5 p-8 shadow-xl">
                    <h3 className="text-2xl text-white mb-8 font-serif flex items-center"><Car className="text-[#d4af37] mr-3" /> รายละเอียดบริการ (Details)</h3>
                    <div className="space-y-6">
                      {[
                        { icon: Clock, title: t.h2a1Title, desc: t.h2a1Desc },
                        { icon: CheckCircle, title: t.h2a2Title, desc: t.h2a2Desc },
                        { icon: MapPin, title: t.h2a3Title, desc: t.h2a3Desc },
                        { icon: ShieldCheck, title: t.h2a4Title, desc: t.h2a4Desc }
                      ].map((item, idx) => (
                        <div key={idx} className="flex gap-4 items-start">
                          <item.icon className="text-[#d4af37] shrink-0 mt-1" size={24} strokeWidth={1.5} />
                          <div>
                            <h4 className="text-white font-medium mb-1">{item.title}</h4>
                            <p className="text-gray-400 text-sm font-light leading-relaxed">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeInSection>
                
                {/* Video/Image Placeholder */}
                <FadeInSection delay={400} className="flex flex-col items-center justify-center h-full">
                  <h3 className="text-white text-lg font-medium mb-4 text-center">รถตู้รับส่งของโรงแรม (Our Van)</h3>
                  <div className="relative w-full max-w-[400px] aspect-[3/4] bg-black rounded-3xl overflow-hidden border-4 border-[#1a202c] shadow-2xl group cursor-pointer">
                    <video 
                      src="./vid-guide2.mp4" 
                      className="w-full h-full object-cover"
                      poster="./van2.jpg"
                      controls
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all pointer-events-none"></div>
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
          <PageBanner title={t.navFacilities} bgImage="./bg-facility.jpg" />
          <section className="py-20 relative">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
              <FadeInSection>
                <div className="text-center mb-16">
                  <h2 className="font-serif text-3xl md:text-4xl text-white mb-4 font-light">{t.facTitle}</h2>
                  <p className="text-gray-400 font-light max-w-2xl mx-auto">{t.facDesc}</p>
                </div>
              </FadeInSection>

              {/* เพิ่ม ImageCarousel สำหรับสิ่งอำนวยความสะดวก */}
              <FadeInSection delay={100} className="mb-20">
                <ImageCarousel images={[
                  'https://images.unsplash.com/photo-1576013551627-11971f36c9d0?w=1200',
                  'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200',
                  'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200',
                  'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=1200'
                ]} />
              </FadeInSection>

              {/* Grid แบบวงกลม */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
                {[
                  { img: './fac-wifi.jpg', fallback: 'https://images.unsplash.com/photo-1563622236306-03c6225c5dfc?w=400', title: t.facWifi },
                  { img: './fac-pool.jpg', fallback: 'https://images.unsplash.com/photo-1576013551627-11971f36c9d0?w=400', title: t.facPool },
                  { img: './fac-fitness.jpg', fallback: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400', title: t.facFit },
                  { img: './fac-sauna.jpg', fallback: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400', title: t.facSauna },
                  { img: './fac-mart.jpg', fallback: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400', title: t.facMart },
                  { img: './fac-chicken.jpg', fallback: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?w=400', title: t.facChicken },
                  { img: './fac-laundry.jpg', fallback: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400', title: t.facLaundry },
                  { img: './fac-kids.jpg', fallback: 'https://images.unsplash.com/photo-1566004100631-35d015d6a491?w=400', title: t.facKids },
                  { img: './fac-cctv.jpg', fallback: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400', title: t.facCCTV },
                ].map((item, idx) => (
                  <FadeInSection key={idx} delay={idx * 100}>
                    <div className="flex flex-col items-center text-center group cursor-default">
                      <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-[#d4af37] transition-all duration-500 mb-4 shadow-xl">
                        <img 
                          src={item.img} 
                          alt="Facility" 
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => { e.target.src = item.fallback; }}
                        />
                      </div>
                      <p className="text-gray-300 font-light text-sm md:text-base px-2 group-hover:text-white transition-colors">{item.title}</p>
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
          <PageBanner title={t.navDining} bgImage="./bg-dining.jpg" />
          <section className="py-20 relative">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
              <FadeInSection>
                <div className="text-center mb-16">
                  <h2 className="font-serif text-3xl md:text-4xl text-white mb-4 font-light">{t.diningTitle}</h2>
                  <p className="text-gray-400 font-light max-w-2xl mx-auto">{t.diningDesc}</p>
                </div>
              </FadeInSection>

              {/* Breakfast Section */}
              <FadeInSection delay={200}>
                <div className="relative rounded-3xl overflow-hidden mb-20 group shadow-2xl">
                  <img 
                    src="./food-breakfast.jpg" 
                    alt="Breakfast" 
                    className="w-full h-64 md:h-[400px] object-cover opacity-60 transform group-hover:scale-105 transition-transform duration-1000"
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=1200'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent flex flex-col justify-center p-8 md:p-16">
                    <h2 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-wide drop-shadow-lg">{t.bfTitle}</h2>
                    <p className="text-lg md:text-2xl text-[#d4af37] font-light drop-shadow-md">{t.bfTime}</p>
                  </div>
                </div>
              </FadeInSection>

              {/* แกลเลอรี่อาหารแบบ Coverflow */}
              <div className="space-y-24 mt-20">
                {/* S64 */}
                <FadeInSection delay={300}>
                  <div className="text-center mb-10">
                    <h3 className="font-serif text-3xl text-white mb-3 text-[#d4af37]">S64 Bar & Restaurant</h3>
                    <p className="text-gray-400 font-light max-w-3xl mx-auto mb-6">{t.s64Desc}</p>
                    <a href="https://skybar64.com/" target="_blank" rel="noreferrer" className="inline-flex items-center text-sm uppercase tracking-wider text-[#d4af37] hover:text-white transition-colors border border-[#d4af37] hover:border-white px-6 py-2 rounded-full">
                      Visit Website <ChevronRight size={16} className="ml-2" />
                    </a>
                  </div>
                  <CoverflowGallery images={[
                    'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800',
                    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800',
                    './bar.jpg',
                    'https://images.unsplash.com/photo-1470337458703-41512024da26?w=800',
                    'https://images.unsplash.com/photo-1574096079513-d8259312b785?w=800'
                  ]} />
                </FadeInSection>

                {/* Steak */}
                <FadeInSection delay={400}>
                  <div className="text-center mb-10">
                    <h3 className="font-serif text-3xl text-white mb-3 text-[#d4af37]">Steak Gun Aeng 64</h3>
                    <p className="text-gray-400 font-light max-w-3xl mx-auto mb-6">{t.steakDesc}</p>
                    <a href="https://www.facebook.com/steakgunang64" target="_blank" rel="noreferrer" className="inline-flex items-center text-sm uppercase tracking-wider text-[#d4af37] hover:text-white transition-colors border border-[#d4af37] hover:border-white px-6 py-2 rounded-full">
                      Visit Facebook <ChevronRight size={16} className="ml-2" />
                    </a>
                  </div>
                  <CoverflowGallery images={[
                    'https://images.unsplash.com/photo-1544025162-8111f4228994?w=800',
                    'https://images.unsplash.com/photo-1594041680534-e8c8cdebd659?w=800',
                    './steak.webp',
                    'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800',
                    'https://images.unsplash.com/photo-1558030006-450675393462?w=800'
                  ]} />
                </FadeInSection>

                {/* Cafe */}
                <FadeInSection delay={500}>
                  <div className="text-center mb-10">
                    <h3 className="font-serif text-3xl text-white mb-3 text-[#d4af37]">Café Suvarnabhumi Ville</h3>
                    <p className="text-gray-400 font-light max-w-3xl mx-auto mb-6">{t.cafeDesc}</p>
                    <a href="https://www.facebook.com/cafesuvarnabhumiville/" target="_blank" rel="noreferrer" className="inline-flex items-center text-sm uppercase tracking-wider text-[#d4af37] hover:text-white transition-colors border border-[#d4af37] hover:border-white px-6 py-2 rounded-full">
                      Visit Facebook <ChevronRight size={16} className="ml-2" />
                    </a>
                  </div>
                  <CoverflowGallery images={[
                    'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800',
                    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800',
                    './cafe.jpg',
                    'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800',
                    'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800'
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
          <PageBanner title={t.contactTitle} bgImage="./bg-contact.jpg" />
          <section className="py-20 relative">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
              <div className="grid lg:grid-cols-2 gap-12 bg-[#1a202c] rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
                {/* ข้อมูลติดต่อ */}
                <div className="p-10 md:p-16 flex flex-col justify-center">
                  <h2 className="font-serif text-3xl text-white mb-8 font-light">Suvarnabhumi Ville Airport Hotel</h2>
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <MapPin className="text-[#d4af37] mr-4 mt-1 shrink-0" size={24} strokeWidth={1.5} />
                      <p className="text-gray-300 font-light leading-relaxed">{t.addressDesc}</p>
                    </div>
                    <div className="flex items-center">
                      <Phone className="text-[#d4af37] mr-4 shrink-0" size={24} strokeWidth={1.5} />
                      <p className="text-gray-300 font-light">+66 (0) 98 267 3888 (Front Desk 24 Hrs)</p>
                    </div>
                    <div className="flex items-center">
                      <Phone className="text-[#d4af37] mr-4 shrink-0" size={24} strokeWidth={1.5} />
                      <p className="text-gray-300 font-light">+66 (0) 2 738 4599</p>
                    </div>
                  </div>
                  
                  <div className="mt-12 pt-8 border-t border-white/10">
                    <p className="text-sm text-gray-500 uppercase tracking-widest mb-4">Social Media</p>
                    <div className="flex space-x-4">
                      <a href="https://www.facebook.com/suvarnabhumi.ville.2025" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#d4af37] hover:text-black hover:-translate-y-1 transition-all"><FacebookIcon size={20} /></a>
                      <a href="https://www.instagram.com/suvarnabhumiville/" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#d4af37] hover:text-black hover:-translate-y-1 transition-all"><InstagramIcon size={20} /></a>
                      <a href="https://lin.ee/YGQw4ZR" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#d4af37] hover:text-black hover:-translate-y-1 transition-all"><LineIcon size={20} /></a>
                    </div>
                  </div>
                </div>

                {/* Google Maps Embed */}
                <div className="h-[400px] lg:h-auto min-h-[400px]">
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
      {/* Footer (แสดงทุกหน้า) */}
      {/* ==================================================== */}
      <footer className="bg-[#141821] pt-16 pb-8 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col items-center md:items-start">
              <span className="font-serif text-xl tracking-[0.15em] text-white uppercase mb-2">Suvarnabhumi <span className="text-[#d4af37] italic font-light lowercase">Ville</span></span>
              <p className="text-xs text-gray-500 font-light">The Perfect Place With A Perfect View</p>
            </div>
            
            <div className="flex gap-4">
               <a href="https://www.facebook.com/suvarnabhumi.ville.2025" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-[#d4af37] transition-colors"><FacebookIcon size={20} /></a>
               <a href="https://www.instagram.com/suvarnabhumiville/" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-[#d4af37] transition-colors"><InstagramIcon size={20} /></a>
               <a href="https://lin.ee/YGQw4ZR" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-[#d4af37] transition-colors"><LineIcon size={20} /></a>
            </div>
          </div>
          <div className="text-center md:text-left mt-8 pt-8 border-t border-white/5 text-xs text-gray-600 font-light">
            <p>© {new Date().getFullYear()} Suvarnabhumi Ville. All Rights Reserved.</p>
          </div>
        </div>
      </footer>

      {/* Popup รูปภาพ (Modal Overlay) */}
      {modalImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-10 backdrop-blur-sm transition-all" onClick={() => setModalImage(null)}>
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