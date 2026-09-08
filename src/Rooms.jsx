import { useState } from 'react';
import {
  ArrowUpRight,
  Maximize2,
  Users,
  BedDouble,
  Image as ImageIcon,
  Wifi,
  Snowflake,
  Refrigerator,
  ShowerHead,
  Bath,
  Waves,
  DoorOpen,
  Armchair,
  Briefcase,
  Check,
} from 'lucide-react';
import { FASTBOOKING_URL } from './booking.js';

const IMAGE_BASE = 'https://d3ehecxdotm942.cloudfront.net/b01bf1a53760e71e7923a93af7d0f295/2544e5b1e7659a7/';
const HOTEL_ROOMS_URL = 'https://www.suvarnabhumiville.com/accommodation/room/';
const PREMIER_SUITE_TOUR_URL = 'https://www.suvarnabhumiville.com/mapping/view360/accommodation/room/premier-suite-pool-access';

const rooms = [
  {
    id: 'standard',
    name: 'Standard Room no Elevator',
    size: '28–30',
    occupancy: 2,
    bed: 'kingTwin',
    features: ['wifi', 'air', 'balcony', 'fridge'],
    images: ['553df2905579e8045978fa69914aa41d', '3b5dc5c8965ce0d8206eedc19f535b30', 'd628e2050cf1c19394982b9e39535b63', 'a296c8230a268603a3b40d7a223c937f', '32958cbc82558445b7b678d9f044169e'],
    description: {
      th: 'ห้องพักขนาด 28–30 ตร.ม. พร้อมระเบียง เหมาะสำหรับการพักแบบเรียบง่ายและสบาย มีตัวเลือกเตียงคิงไซส์หรือเตียงแฝดตามห้องว่าง',
      en: 'A comfortable 28–30 m² room with a balcony and a choice of king or twin bedding, subject to availability.',
      zh: '舒适的28–30平方米客房，设有阳台，可选择特大床或双床，视供应情况而定。',
    },
  },
  {
    id: 'deluxe',
    name: 'Deluxe Room',
    size: '24–26',
    occupancy: 3,
    bed: 'queenTwin',
    features: ['wifi', 'air', 'fridge', 'shower'],
    images: ['e2be65f7bfacf1b2f000015b20eddf10', 'ed0770a82f63b721548df7901782d5ee', '2af6e52e78d49a09cf8b7d7683e84e99', '81a717d6f899b552664e18294fbba53c', '9cab8b734e755727a05c9bc7329cf45f'],
    description: {
      th: 'ห้องพักร่วมสมัยขนาด 24–26 ตร.ม. จัดพื้นที่ได้ลงตัว พร้อมสิ่งอำนวยความสะดวกสำหรับการพักผ่อน และมีเตียงควีนไซส์หรือเตียงแฝดให้เลือกตามห้องว่าง',
      en: 'A contemporary 24–26 m² room with practical in-room comforts and queen or twin bedding options, subject to availability.',
      zh: '24–26平方米现代客房，配备实用设施，可选择大床或双床，视供应情况而定。',
    },
  },
  {
    id: 'executive',
    name: 'Executive Room',
    size: '28–30',
    occupancy: 3,
    bed: 'kingTwin',
    features: ['wifi', 'air', 'balcony', 'shower'],
    images: ['2d278fdb465917058de9a39db7466b0c', 'cbdcef2e0345f9af16e2ccc46996d61b', 'a02d2100f903cc24fc6297c23b7df63b', 'be9341cc77ababa1c4f9feec36667b83', 'b24e4013d79176c7485a0cf65961dd51'],
    description: {
      th: 'ห้องพักขนาด 28–30 ตร.ม. พร้อมระเบียงส่วนตัว พื้นที่เก็บสัมภาระ และตู้เสื้อผ้าขนาดใหญ่ เหมาะสำหรับผู้ที่ต้องการพื้นที่ใช้สอยเพิ่มขึ้น',
      en: 'A 28–30 m² room with a private balcony, generous wardrobe space and dedicated luggage storage for a more relaxed stay.',
      zh: '28–30平方米客房，设有私人阳台、宽敞衣柜及行李存放空间，住宿更从容。',
    },
  },
  {
    id: 'executive-pool-view',
    name: 'Executive Pool View',
    size: '28–30',
    occupancy: 3,
    bed: 'kingTwin',
    features: ['wifi', 'air', 'balcony', 'poolView'],
    images: ['1bd9281d22a4ce937142ebd4bb57c454', '0b0ae0e1fc4ebc722de333cf8692beff', '3789b9b75d24477d6af1f456e3afe2b6', 'd8a724f2693e9ec216b1a165c8072216', 'cb78d03be4e4471b0dabdaf44fb02d81'],
    description: {
      th: 'ห้องพักขนาด 28–30 ตร.ม. ที่เพิ่มบรรยากาศผ่อนคลายด้วยระเบียงส่วนตัวและวิวสระว่ายน้ำจากหน้าต่างบานใหญ่',
      en: 'A 28–30 m² room with a private balcony and relaxing pool views through large windows.',
      zh: '28–30平方米客房，设有私人阳台，并可透过大窗欣赏泳池景观。',
    },
  },
  {
    id: 'premier-pool-access',
    name: 'Premier Pool Access',
    size: '28–30',
    occupancy: 3,
    bed: 'king',
    features: ['wifi', 'air', 'poolAccess', 'bathrobe'],
    images: ['364b6e59aba3d5ecec2adc71658531ad', 'cac569d6cd58119fc0072e8e89d4a2f2', '7e059e78e72d11475510c5e37675acd9', 'd9066fa24249bc54abfa3d796021a20e', '844e0413999350417e99b2a610a2f53e'],
    description: {
      th: 'ห้องพักขนาด 28–30 ตร.ม. พร้อมเตียงคิงไซส์และระเบียงส่วนตัวที่เชื่อมต่อสู่สระว่ายน้ำกลางแจ้งได้โดยตรง',
      en: 'A 28–30 m² king room with a private balcony offering direct access to the outdoor swimming pool.',
      zh: '28–30平方米特大床客房，私人阳台可直接通往室外泳池。',
    },
  },
  {
    id: 'premier-junior-suite',
    name: 'Premier Junior Suite',
    size: '38',
    occupancy: 3,
    bed: 'king',
    features: ['wifi', 'bathtub', 'sofa', 'bathrobe'],
    images: ['84543c10968f2f67bd171d5f3ad15647', 'ea4f5f5c410074ec8b0605d73ddc6208', '04a09e57d97fd2038ab9bc0f4463c139', 'aeaf2a5292d23df94628ff2c898358bf', '2fbc29675d980192f3cc7674ca33e282'],
    description: {
      th: 'ห้องสวีทขนาด 38 ตร.ม. พร้อมเตียงคิงไซส์ โซฟา และห้องน้ำกระจกที่มีอ่างอาบน้ำ ให้พื้นที่พักผ่อนกว้างขึ้นอย่างลงตัว',
      en: 'A spacious 38 m² suite with a king bed, sofa and glass bathroom with a bathtub for added comfort.',
      zh: '宽敞的38平方米套房，配备特大床、沙发及带浴缸的玻璃浴室。',
    },
  },
  {
    id: 'premier-suite-pool-access',
    name: 'Premier Suite Pool Access',
    size: '47',
    occupancy: 3,
    bed: 'king',
    features: ['poolAccess', 'bathtub', 'sofa', 'desk', 'wifi'],
    imageUrls: ['https://www.suvarnabhumiville.com/admin/main/image/0401201802465465.jpg'],
    tourUrl: PREMIER_SUITE_TOUR_URL,
    description: {
      th: 'ห้องพักขนาดใหญ่ที่สุด 47 ตร.ม. พร้อมเตียงคิงไซส์ โซฟา โต๊ะทำงาน ห้องน้ำกระจกพร้อมอ่างอาบน้ำ และระเบียงส่วนตัวที่เชื่อมต่อสู่สระว่ายน้ำโดยตรง',
      en: 'The hotel’s largest room at 47 m², with a king bed, sofa, work desk, glass bathroom with bathtub, and a private balcony with direct pool access.',
      zh: '酒店最大的47平方米客房，配备特大床、沙发、办公桌、带浴缸的玻璃浴室，以及可直通泳池的私人阳台。',
    },
  },
];

const copy = {
  th: {
    heading: 'เลือกห้องพักที่เหมาะกับคุณ',
    intro: 'เปรียบเทียบพื้นที่ รูปแบบเตียง และจุดเด่นของห้องพักทั้ง 7 ประเภท แล้วเลือกบรรยากาศที่เหมาะกับการเข้าพักของคุณ',
    category: 'ประเภทห้องพัก',
    book: 'ตรวจสอบราคาและจอง',
    bookingNote: 'เลือกวันเข้าพัก ประเภทห้อง และแพ็กเกจบน Fastbooking ของโรงแรม ราคาและห้องว่างขึ้นอยู่กับวันที่เลือก',
    details: 'จุดเด่นของห้อง',
    adults: 'ผู้ใหญ่',
    guests: 'ท่าน',
    upTo: 'สูงสุด',
    area: 'ตร.ม.',
    kingTwin: 'คิงไซส์ / เตียงแฝด',
    queenTwin: 'ควีนไซส์ / เตียงแฝด',
    king: 'เตียงคิงไซส์',
    noElevator: 'อาคาร 4 ชั้น ไม่มีลิฟต์ · ห้องฝั่งถนนอาจได้ยินเสียงการจราจร',
    note: 'ชนิดเตียงและการรองรับผู้เข้าพักเพิ่มเติมเป็นไปตามห้องว่างและเงื่อนไขของโรงแรม',
    image: 'ขยายภาพ',
    thumbnail: 'ดูภาพ',
    unavailable: 'ไม่สามารถโหลดภาพได้',
    source: 'ดูข้อมูลห้องพักจากเว็บไซต์โรงแรม',
    tour: 'ชม Room Tour 360°',
    wifi: 'Wi-Fi ฟรี',
    air: 'เครื่องปรับอากาศ',
    balcony: 'ระเบียงส่วนตัว',
    shower: 'ฝักบัว',
    fridge: 'ตู้เย็น',
    poolView: 'วิวสระว่ายน้ำ',
    poolAccess: 'เชื่อมต่อสระว่ายน้ำ',
    bathtub: 'อ่างอาบน้ำ',
    bathrobe: 'เสื้อคลุมอาบน้ำ',
    sofa: 'โซฟา',
    desk: 'โต๊ะทำงาน',
  },
  en: {
    heading: 'Find your kind of stay',
    intro: 'Compare room size, bedding and signature features across all seven room types, then choose the atmosphere that suits your stay.',
    category: 'Room types',
    book: 'Check rates & book',
    bookingNote: 'Choose your dates, room type and package on the hotel’s Fastbooking page. Rates and availability depend on your selected dates.',
    details: 'Room highlights',
    adults: 'adults',
    guests: 'guests',
    upTo: 'Up to',
    area: 'm²',
    kingTwin: 'King / Twin',
    queenTwin: 'Queen / Twin',
    king: 'King bed',
    noElevator: '4-storey building · No elevator · Road-facing rooms may experience traffic noise',
    note: 'Bedding and arrangements for additional guests are subject to availability and hotel conditions.',
    image: 'Enlarge image',
    thumbnail: 'View image',
    unavailable: 'Image unavailable',
    source: 'View room information on the hotel website',
    tour: 'View 360° room tour',
    wifi: 'Free Wi-Fi',
    air: 'Air conditioning',
    balcony: 'Private balcony',
    shower: 'Shower',
    fridge: 'Refrigerator',
    poolView: 'Pool view',
    poolAccess: 'Direct pool access',
    bathtub: 'Bathtub',
    bathrobe: 'Bathrobes',
    sofa: 'Sofa',
    desk: 'Work desk',
  },
  zh: {
    heading: '找到适合您的客房',
    intro: '比较七种房型的面积、床型及特色，选择最适合您旅程的住宿体验。',
    category: '房型',
    book: '查询房价并预订',
    bookingNote: '在酒店 Fastbooking 页面选择日期、房型及套餐。房价及空房以所选日期为准。',
    details: '客房亮点',
    adults: '位成人',
    guests: '位客人',
    upTo: '最多',
    area: '平方米',
    kingTwin: '特大床 / 双床',
    queenTwin: '大床 / 双床',
    king: '特大床',
    noElevator: '4层建筑 · 无电梯 · 临街客房可能会听到交通声',
    note: '床型及额外住客安排视供应情况及酒店条款而定。',
    image: '放大图片',
    thumbnail: '查看图片',
    unavailable: '图片暂时无法加载',
    source: '查看酒店官网客房资料',
    tour: '查看360°客房导览',
    wifi: '免费 Wi-Fi',
    air: '空调',
    balcony: '私人阳台',
    shower: '淋浴',
    fridge: '冰箱',
    poolView: '泳池景观',
    poolAccess: '直通泳池',
    bathtub: '浴缸',
    bathrobe: '浴袍',
    sofa: '沙发',
    desk: '办公桌',
  },
};

const featureIcons = {
  wifi: Wifi,
  air: Snowflake,
  fridge: Refrigerator,
  shower: ShowerHead,
  balcony: DoorOpen,
  poolView: Waves,
  poolAccess: Waves,
  bathtub: Bath,
  bathrobe: Check,
  sofa: Armchair,
  desk: Briefcase,
};

const getImageSrc = (room, index) => {
  if (room.imageUrls) return room.imageUrls[index];
  return IMAGE_BASE + room.images[index] + '-w704-scale.jpg';
};

function RoomCard({ room, index, c, lang, onImage }) {
  const [selected, setSelected] = useState(0);
  const [failed, setFailed] = useState(false);
  const imageCount = room.imageUrls?.length || room.images.length;
  const src = getImageSrc(room, selected);

  return (
    <article id={'room-' + room.id} className="room-card">
      <div className="room-gallery">
        <button className="room-photo" onClick={() => onImage({ src, alt: room.name })} aria-label={c.image + ': ' + room.name} disabled={failed}>
          {failed ? <span className="room-image-fallback">{c.unavailable}</span> : <img src={src} alt={room.name} loading="lazy" onError={() => setFailed(true)} />}
          <span className="room-photo-count">{selected + 1} / {imageCount}</span>
          <ImageIcon size={20} aria-hidden="true" />
        </button>
        <div className="room-thumbnails" role="group" aria-label={room.name}>
          {Array.from({ length: imageCount }).map((_, i) => {
            const thumbSrc = getImageSrc(room, i);
            return (
              <button key={thumbSrc} aria-label={c.thumbnail + ' ' + (i + 1) + ': ' + room.name} aria-pressed={selected === i} onClick={() => { setSelected(i); setFailed(false); }}>
                <img src={thumbSrc} alt="" loading="lazy" />
              </button>
            );
          })}
        </div>
      </div>

      <div className="room-copy">
        <p className="eyebrow">THE VILLE ROOMS · 0{index + 1}</p>
        <h2>{room.name}</h2>
        <div className="room-specs">
          <span><Maximize2 size={17} />{room.size} {c.area}</span>
          <span><Users size={17} />{c.upTo} {room.occupancy} {room.id === 'standard' ? c.adults : c.guests}</span>
          <span><BedDouble size={17} />{c[room.bed]}</span>
        </div>
        <p className="room-description">{room.description[lang]}</p>
        {room.id === 'standard' && <p className="room-access-note">{c.noElevator}</p>}
        <ul className="room-amenities" aria-label={c.details}>
          {room.features.map((key) => {
            const FeatureIcon = featureIcons[key] || Check;
            return (
              <li key={key}>
                <FeatureIcon size={14} aria-hidden="true" style={{ display: 'inline', verticalAlign: '-2px', marginRight: 6 }} />
                <span>{c[key]}</span>
              </li>
            );
          })}
        </ul>
        <div className="actions">
          <a className="button gold room-book" href={FASTBOOKING_URL} target="_blank" rel="noreferrer" aria-label={c.book + ': ' + room.name}>{c.book}<ArrowUpRight size={18} /></a>
          {room.tourUrl && <a className="text-link" href={room.tourUrl} target="_blank" rel="noreferrer">{c.tour}<ArrowUpRight size={15} /></a>}
        </div>
        <p className="room-availability-note">{c.bookingNote}</p>
      </div>
    </article>
  );
}

export default function RoomCatalogue({ lang, onImage }) {
  const c = copy[lang];
  return (
    <section className="section wrap room-catalogue">
      <div className="room-introduction">
        <p className="eyebrow">ROOMS & SUITES</p>
        <h2>{c.heading}</h2>
        <p>{c.intro}</p>
      </div>
      <nav className="room-jump-links" aria-label={c.category}>
        {rooms.map((room) => (
          <a href="#stay" key={room.id} onClick={(e) => { e.preventDefault(); document.getElementById('room-' + room.id)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }); }}>{room.name}</a>
        ))}
      </nav>
      <div className="room-list">
        {rooms.map((room, index) => <RoomCard key={room.id} room={room} index={index} c={c} lang={lang} onImage={onImage} />)}
      </div>
      <p className="room-catalogue-note">
        {c.note} <a href={HOTEL_ROOMS_URL} target="_blank" rel="noreferrer">{c.source}<ArrowUpRight size={14} /></a>
      </p>
    </section>
  );
}
