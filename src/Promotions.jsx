import { Heart, Camera, Mail, MessageCircle, CheckCircle2 } from 'lucide-react';

const copy = {
  th: {
    nav: 'โปรโมชั่น', title: 'สิทธิพิเศษ\nสำหรับสมาชิก',
    intro: 'พักผ่อนในแบบของคุณ พร้อมอัตราห้องพักสำหรับผู้สนับสนุนโซเชียลมีเดียของโรงแรม',
    heading: 'รับสิทธิ์ได้อย่างไร', sub: 'เตรียมพร้อมก่อนสอบถามราคาสมาชิก',
    follow: 'ติดตาม กดถูกใจ และแชร์', followText: 'ผ่านช่องทางโซเชียลมีเดียของโรงแรมด้านล่าง',
    proof: 'เตรียมหลักฐาน', proofText: 'โรงแรมอาจขอภาพหน้าจอเพื่อตรวจสอบสิทธิ์ก่อนยืนยันราคา',
    contact: 'ติดต่อเพื่อจอง', contactText: 'ส่งรายละเอียดการจองผ่าน LINE หรืออีเมล',
    booking: 'สอบถามราคาสมาชิก', bookingText: 'ให้ทีมโรงแรมช่วยดูแลการจองของคุณ',
    line: 'สอบถามผ่าน LINE', email: 'ส่งอีเมล', terms: 'เงื่อนไขสิทธิ์สมาชิก',
    termsText: 'สำหรับผู้มีคุณสมบัติตามเงื่อนไขเท่านั้น ไม่ใช่โปรโมชั่นทั่วไป และอยู่ภายใต้ข้อกำหนดของโรงแรม',
    stay: 'ดูห้องพัก',
  },
  en: {
    nav: 'Offers', title: 'A special stay.\nMember privileges.',
    intro: 'Member room rates for supporters of the hotel’s social channels.',
    heading: 'How to qualify', sub: 'Before requesting a member rate',
    follow: 'Follow, like & share', followText: 'Use the hotel’s social channels below.',
    proof: 'Keep your screenshots', proofText: 'The hotel may request proof before confirming eligibility.',
    contact: 'Contact reservations', contactText: 'Send booking details by LINE or email.',
    booking: 'Request member rates', bookingText: 'Let the hotel team arrange your stay.',
    line: 'Chat on LINE', email: 'Email reservations', terms: 'Member conditions',
    termsText: 'Eligible guests only. This is not a general promotion. Hotel terms apply.',
    stay: 'Explore rooms',
  },
  zh: {
    nav: '优惠', title: '会员专属\n住宿礼遇',
    intro: '为支持酒店社交媒体的宾客提供会员房价。',
    heading: '如何获得资格', sub: '咨询会员房价前的准备',
    follow: '关注、点赞并分享', followText: '通过以下酒店社交媒体渠道参与。',
    proof: '保留截图', proofText: '酒店可能要求提供截图，核实资格后确认房价。',
    contact: '联系预订', contactText: '通过 LINE 或电子邮件发送预订详情。',
    booking: '咨询会员房价', bookingText: '让酒店团队协助安排您的住宿。',
    line: '通过 LINE 咨询', email: '发送邮件', terms: '会员条件',
    termsText: '仅限符合资格的宾客，不属于一般促销，须遵守酒店条款。',
    stay: '浏览客房',
  },
};
const socials = [
  ['Facebook', 'https://www.facebook.com/SuvarnabhumivilleHotel/'],
  ['TikTok', 'https://www.tiktok.com/@suvarnabhumivilles64'],
  ['Instagram', 'https://www.instagram.com/suvarnabhumiville'],
];

function SocialIcon({ name }) {
  if (name === 'Instagram') return <svg viewBox="0 0 24 24" width="23" height="23" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" focusable="false"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>;
  if (name === 'Facebook') return <svg viewBox="0 0 24 24" width="23" height="23" fill="currentColor" aria-hidden="true" focusable="false"><path d="M14 21v-8h3l.5-4H14V7c0-1.2.4-2 2-2h2V1.4C17.4 1.2 16.3 1 15 1c-3 0-5 1.8-5 5v3H7v4h3v8z" /></svg>;
  return <svg viewBox="0 0 24 24" width="23" height="23" fill="currentColor" aria-hidden="true" focusable="false"><path d="M16.5 2c.3 2.7 1.8 4.4 4.5 4.7v3.4a9 9 0 0 1-4.5-1.4v7.1a6.2 6.2 0 1 1-5.3-6.1v3.5a2.8 2.8 0 1 0 1.8 2.6V2z" /></svg>;
}

export default function Promotions({ lang, lineUrl }) {
  const c = copy[lang] || copy.en;
  const steps = [[Heart,c.follow,c.followText],[Camera,c.proof,c.proofText],[Mail,c.contact,c.contactText]];
  return <>
    <section className="page-hero promotion-hero">
      <img src="./bg-home.jpg" alt="" fetchPriority="high" />
      <div className="hero-shade" />
      <div className="wrap page-hero-content">
        <p className="eyebrow pale">{c.nav}</p>
        <h1>{c.title}</h1><p>{c.intro}</p>
      </div>
    </section>
    <section className="section wrap promotion-layout">
      <div className="promotion-main">
        <div className="section-heading"><div><p className="eyebrow">{c.sub}</p><h2>{c.heading}</h2></div></div>
        <div className="promotion-steps">
          {steps.map(([Icon,title,body],index) => <article className="promotion-step" key={title}>
            <span className="promotion-icon"><Icon size={25} strokeWidth={1.6} aria-hidden="true" /></span>
            <div><h3>{title}</h3><p>{body}</p>
              {index === 0 && <div className="promotion-socials">{socials.map(([name,url]) =>
                <a key={name} href={url} target="_blank" rel="noreferrer" aria-label={name} title={name}><SocialIcon name={name} /></a>
              )}</div>}
            </div>
          </article>)}
        </div>
        <div className="promotion-terms">
          <CheckCircle2 size={22} aria-hidden="true" />
          <div><h3>{c.terms}</h3><p>{c.termsText}</p>
          </div>
        </div>
      </div>
      <aside className="promotion-booking">
        <img src="./fac-pool.jpg" alt="" loading="lazy" />
        <div className="promotion-booking-copy">
          <p className="eyebrow">SUVARNABHUMI VILLE</p>
          <h2>{c.booking}</h2><p>{c.bookingText}</p>
          <a className="button gold" href={lineUrl} target="_blank" rel="noreferrer"><MessageCircle size={18} aria-hidden="true" />{c.line}</a>
          <span className="promotion-contact-detail">@0982673888ville</span>
          <a className="button outline" href="mailto:front@suvarnabhumiville.com"><Mail size={18} aria-hidden="true" />{c.email}</a>
          <span className="promotion-contact-detail">front@suvarnabhumiville.com</span>
          <a className="text-link" href="#stay">{c.stay}</a>
        </div>
      </aside>
    </section>
  </>;
}
