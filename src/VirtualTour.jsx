import { useState } from 'react';
import { ArrowUpRight, Rotate3D, Play, X } from 'lucide-react';

const TOUR_URL = 'https://www.suvarnabhumiville.com/svahfeb2019v2/svah.html';
const labels = {
  th: {title:'ชมโรงแรมแบบ 360°',description:'เดินชมบรรยากาศของสุวรรณภูมิ วิลล์ ตั้งแต่ล็อบบี้ ห้องพัก ไปจนถึงพื้นที่พักผ่อน ผ่านทัวร์เสมือนจริงของโรงแรม',start:'เริ่มชมทัวร์ 360°',open:'เปิดทัวร์ในแท็บใหม่',stop:'ปิดทัวร์',hint:'ลากภาพเพื่อมองรอบตัว และกดลูกศรในภาพเพื่อเปลี่ยนจุดชม',fallback:'หากภาพไม่แสดงหรือควบคุมไม่สะดวก สามารถเปิดทัวร์ในแท็บใหม่ได้',teaser:'สำรวจโรงแรมก่อนเข้าพัก',short:'พบกับบรรยากาศจริงผ่านทัวร์เสมือนจริง 360 องศา',note:'ภาพจากทัวร์เสมือนจริงของโรงแรม รายละเอียดบางส่วนอาจแตกต่างจากปัจจุบัน'},
  en: {title:'Explore the hotel in 360°',description:'Discover Suvarnabhumi Ville’s lobby, rooms and leisure spaces through the hotel’s interactive virtual tour.',start:'Start the 360° tour',open:'Open tour in a new tab',stop:'Close tour',hint:'Drag to look around. Use the arrows in the image to move between viewpoints.',fallback:'If the tour does not display or is difficult to control, open it in a new tab.',teaser:'Step inside before your stay',short:'Discover the atmosphere with an interactive 360-degree hotel tour.',note:'Images are from the hotel’s virtual tour. Some details may differ from the current property.'},
  zh: {title:'360° 探索酒店',description:'通过酒店的互动虚拟导览，探索素万那普维尔酒店的大堂、客房及休闲空间。',start:'开始360°导览',open:'在新标签页打开导览',stop:'关闭导览',hint:'拖动图片环顾四周，点击画面中的箭头切换观景点。',fallback:'如果导览无法显示或操作不便，请在新标签页中打开。',teaser:'入住前，先来探索',short:'通过互动360度虚拟导览，感受酒店氛围。',note:'图片来自酒店虚拟导览，部分细节可能与酒店当前情况不同。'}
};
export function TourTeaser({lang}) {
  const c=labels[lang];
  return <section className="tour-teaser wrap"><div className="tour-symbol" aria-hidden="true"><Rotate3D size={34}/><span>360°</span></div><div><p className="eyebrow">VIRTUAL TOUR</p><h2>{c.teaser}</h2><p>{c.short}</p></div><a className="button navy" href="#virtualTour">{c.start}<ArrowUpRight size={18}/></a></section>;
}
export default function VirtualTour({lang}) {
  const c=labels[lang];
  const [started,setStarted]=useState(false);
  return <section className="section wrap virtual-tour">
    <div className="tour-heading"><p className="eyebrow">SUVARNABHUMI VILLE · VIRTUAL TOUR</p><h1>{c.title}</h1><p>{c.description}</p></div>
    <div className="tour-toolbar"><p><Rotate3D size={20}/>{c.hint}</p><a href={TOUR_URL} target="_blank" rel="noreferrer">{c.open}<ArrowUpRight size={17}/></a></div>
    <div className="tour-viewer">
      {started?<iframe src={TOUR_URL} title={c.title} allowFullScreen referrerPolicy="strict-origin-when-cross-origin"/>:<div className="tour-poster"><img src="./bg-tour.webp" alt="" loading="lazy"/><div><span className="tour-degree" aria-hidden="true">360°</span><button className="button gold" onClick={()=>setStarted(true)}><Play size={18}/>{c.start}</button></div></div>}
    </div>
    <div className="tour-support"><p>{c.fallback}</p>{started&&<button className="text-link" onClick={()=>setStarted(false)}><X size={17}/>{c.stop}</button>}</div>
    <p className="tour-source-note">{c.note}</p>
  </section>;
}
