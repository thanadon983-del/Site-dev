import { ArrowRight, CheckCircle2, MapPin, MessageCircle } from 'lucide-react';
import promotionArtwork from './promotionArtwork.js';

const copy = {
  th: {
    nav: 'โปรโมชั่นพิเศษ', title: 'พักสบายกว่าเดิม\nในราคาพิเศษ',
    intro: 'รับส่วนลดห้องพัก 32% สำหรับลูกค้าที่ Walk-in หรือจองตรงผ่าน LINE ของโรงแรมเท่านั้น',
    limited: 'DIRECT BOOKING PRIVILEGE', off: 'ลดทันที', offer: 'สิทธิพิเศษสำหรับการจองตรง',
    offerText: 'รับราคาพิเศษสำหรับการเข้าพักที่ Suvarnabhumi Ville เมื่อจองผ่านช่องทางที่ร่วมรายการ',
    eligible: 'ช่องทางที่รับโปรโมชั่น', walkin: 'Walk-in ที่โรงแรม',
    walkinText: 'ติดต่อแผนกต้อนรับโดยตรงเมื่อเดินทางมาถึงโรงแรม',
    lineOnly: 'จองผ่าน LINE', lineText: 'ส่งวันเข้าพัก จำนวนผู้เข้าพัก และประเภทห้องที่ต้องการให้ทีมโรงแรมตรวจสอบ',
    line: 'จองโปรโมชั่นผ่าน LINE', condition: 'เงื่อนไขสำคัญ',
    conditionText: 'โปรโมชั่นลด 32% ใช้สำหรับราคา Walk-in หรือการจองผ่าน LINE ของโรงแรมเท่านั้น ไม่สามารถใช้กับการจองผ่านเว็บไซต์หรือแพลตฟอร์มอื่นได้ ห้องพักขึ้นอยู่กับจำนวนห้องว่างและเงื่อนไขของโรงแรม',
    artwork: 'โปสเตอร์ราคาและโปรโมชั่นห้องพักของ Suvarnabhumi Ville', viewRooms: 'ดูประเภทห้องพัก', poster: 'อัตราห้องพักโปรโมชั่น',
  },
  en: {
    nav: 'Special offer', title: 'More comfort.\nA better direct rate.',
    intro: 'Enjoy 32% off room rates, exclusively for walk-in guests or reservations made directly through the hotel’s LINE account.',
    limited: 'DIRECT BOOKING PRIVILEGE', off: 'SAVE ON YOUR STAY', offer: 'An exclusive direct-booking rate',
    offerText: 'Receive a preferred rate at Suvarnabhumi Ville when booking through an eligible direct channel.',
    eligible: 'How to claim this offer', walkin: 'Walk in at the hotel',
    walkinText: 'Contact reception directly when you arrive at the hotel.',
    lineOnly: 'Book through LINE', lineText: 'Send your stay dates, number of guests, and preferred room type to the hotel team.',
    line: 'Book this offer on LINE', condition: 'Important conditions',
    conditionText: 'The 32% discount is available only for walk-in rates or reservations made through the hotel’s LINE account. It does not apply to website or third-party platform bookings. Rooms are subject to availability and hotel terms.',
    artwork: 'Suvarnabhumi Ville room rate and promotion poster', viewRooms: 'Explore room types', poster: 'Promotional room rates',
  },
  zh: {
    nav: '特别优惠', title: '舒适入住\n专享直订价格',
    intro: '客房价格立减32%，仅限到店客人或通过酒店 LINE 直接预订。',
    limited: '直订专享礼遇', off: '住宿立省', offer: '直订专属价格',
    offerText: '通过指定直订渠道预订 Suvarnabhumi Ville，即可享受专属价格。',
    eligible: '优惠使用方式', walkin: '到店预订',
    walkinText: '抵达酒店后直接联系前台办理预订。',
    lineOnly: '通过 LINE 预订', lineText: '将入住日期、人数和所需房型发送给酒店团队查询。',
    line: '通过 LINE 预订优惠', condition: '重要条件',
    conditionText: '32%优惠仅适用于到店价格或通过酒店 LINE 账号完成的预订，不适用于官网或第三方平台预订。客房视供应情况及酒店条款而定。',
    artwork: 'Suvarnabhumi Ville 客房价格及优惠海报', viewRooms: '查看房型', poster: '优惠客房价格',
  },
};

export default function Promotions({ lang, lineUrl }) {
  const c = copy[lang] || copy.en;
  return <>
    <section className="page-hero promotion-hero promotion-hero-new">
      <img src="./bg-promotions.webp" alt="" fetchPriority="high" />
      <div className="hero-shade" />
      <div className="wrap page-hero-content">
        <p className="eyebrow pale">{c.nav}</p>
        <h1>{c.title}</h1><p>{c.intro}</p>
      </div>
    </section>
    <section className="section promotion-offer-section">
      <div className="wrap promotion-offer-grid">
        <div className="promotion-offer-copy">
          <p className="eyebrow">{c.limited}</p>
          <div className="promotion-rate-lockup"><strong>32%</strong><span>{c.off}</span></div>
          <h2>{c.offer}</h2>
          <p className="muted promotion-lead">{c.offerText}</p>
          <div className="promotion-channels" aria-label={c.eligible}>
            <article><span><MapPin aria-hidden="true" /></span><div><h3>{c.walkin}</h3><p>{c.walkinText}</p></div></article>
            <article><span><MessageCircle aria-hidden="true" /></span><div><h3>{c.lineOnly}</h3><p>{c.lineText}</p></div></article>
          </div>
          <a className="button gold promotion-line-cta" href={lineUrl} target="_blank" rel="noreferrer"><MessageCircle size={19} aria-hidden="true" />{c.line}<ArrowRight size={18} aria-hidden="true" /></a>
          <span className="promotion-line-id">LINE: @0982673888ville</span>
          <div className="promotion-new-terms"><CheckCircle2 aria-hidden="true" /><div><h3>{c.condition}</h3><p>{c.conditionText}</p></div></div>
        </div>
        <figure className="promotion-poster">
          <div className="promotion-poster-frame"><img src={promotionArtwork} alt={c.artwork} loading="eager" /></div>
          <figcaption><span>{c.poster}</span><a className="text-link" href="#stay">{c.viewRooms}<ArrowRight size={16} aria-hidden="true" /></a></figcaption>
        </figure>
      </div>
    </section>
  </>;
}

