import RoomCatalogue from './Rooms.jsx';
import { FASTBOOKING_URL } from './booking.js';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowRight, Menu, X, Phone, MapPin, Clock, Plane, CalendarDays, Waves, Coffee, Image as ImageIcon } from 'lucide-react';

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
    slogan: "The Perfect Place With A Perfect View",
    shuttleAirToHotel: "บริการรับจากสนามบิน สู่ โรงแรม",
    service24h: "บริการ 24 ชั่วโมง", 
    noAdvanceBooking: "No Advance Booking",
    stepsTitle: "4 ขั้นตอนง่ายๆ",
    guideVideo: "วิดีโอแนะนำการเดินทาง",
    viewImage: "ดูภาพประกอบ",
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
    h2aSubtitle: "บริการรถตู้จากโรงแรมไปยังสนามบินสุวรรณภูมิ ออกทุกๆ ครึ่งชั่วโมง",
    detailsTitle: "รายละเอียดบริการ",
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
    facMassage: "ร้านนวดแผนไทย (11:00 - 22:30 น.)",
    diningTitle: "อาหารและเครื่องดื่ม",
    diningDesc: "สัมผัสความอร่อยที่แตกต่างกับร้านอาหารทั้ง 3 แห่งภายในโรงแรมของเรา",
    bfTitle: "อาหารเช้า",
    bfTime: "พร้อมให้บริการ 05:00 - 11:00 น.",
    s64Desc: "รูฟท็อปบาร์วิวสนามบิน 360 องศา ดนตรีสดและโชว์ควงไฟสุดอลังการ (เปิด 18:00 - 01:00 น.)",
    steakDesc: "สเต็กคุณภาพและอาหารหลากหลายเมนู ในบรรยากาศสบายๆ (เปิด 11:00 - 22:00 น.)",
    cafeDesc: "คาเฟ่บรรยากาศดี ให้บริการเครื่องดื่ม กาแฟสด และเบเกอรี่ (เปิด 24 ชั่วโมง)",
    visitWebsite: "เยี่ยมชมเว็บไซต์",
    visitFacebook: "เข้าชม Facebook",
    contactTitle: "ติดต่อเรา",
    addressDesc: "9/9 หมู่ 7 ซอยกิ่งแก้ว 64 ถนนกิ่งแก้ว ตำบลราชาเทวะ อำเภอบางพลี สมุทรปราการ 10540",
    frontDesk: "(แผนกต้อนรับ 24 ชม.)",
    socialMedia: "โซเชียลมีเดีย",
    openMap: "เปิดแผนที่",
    allRightsReserved: "สงวนลิขสิทธิ์",
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
    slogan: "The Perfect Place With A Perfect View",
    shuttleAirToHotel: "Shuttle Service: Airport to Hotel",
    service24h: "24 Hours Service", 
    noAdvanceBooking: "No Advance Booking",
    stepsTitle: "4 Easy Steps",
    guideVideo: "Guide Video",
    viewImage: "View Image",
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
    h2aSubtitle: "Van service from the hotel to Suvarnabhumi Airport, departing every 30 minutes.",
    detailsTitle: "Service Details",
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
    facMassage: "Thai Massage (11:00 - 22:30)",
    diningTitle: "Dining & Beverage",
    diningDesc: "Experience different delicious tastes from our 3 restaurants.",
    bfTitle: "Breakfast",
    bfTime: "Served daily from 05:00 - 11:00 AM",
    s64Desc: "360° airport view rooftop bar, live music & fire show (18:00 - 01:00)",
    steakDesc: "Quality steaks and various menus in a cozy atmosphere (11:00 - 22:00)",
    cafeDesc: "Fresh coffee, beverages, and bakery in a relaxing cafe (24 Hours)",
    visitWebsite: "Visit Website",
    visitFacebook: "Visit Facebook",
    contactTitle: "Contact Us",
    addressDesc: "9/9 Moo 7 Soi Kingkaew 64, Kingkaew Road, Rachathewa, Bangphli, Samut Prakan 10540",
    frontDesk: "(Front Desk 24 Hrs)",
    socialMedia: "Social Media",
    openMap: "Open Map",
    allRightsReserved: "All Rights Reserved.",
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
    slogan: "完美的地点，完美的风景",
    shuttleAirToHotel: "接送服务：从机场到酒店",
    service24h: "24小时服务", 
    noAdvanceBooking: "无需提前预订",
    stepsTitle: "4个简单的步骤",
    guideVideo: "乘车指南视频",
    viewImage: "查看图片",
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
    h2aSubtitle: "从酒店到素万那普机场的班车服务，每30分钟一班。",
    detailsTitle: "服务详情",
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
    facMassage: "泰式按摩 (11:00 - 22:30)",
    diningTitle: "餐饮",
    diningDesc: "在我们的3家餐厅体验不同的美味。",
    bfTitle: "早餐",
    bfTime: "供应时间：05:00 - 11:00",
    s64Desc: "360° 机场景观屋顶酒吧、现场音乐和火舞表演 (18:00 - 01:00)",
    steakDesc: "温馨氛围中提供优质牛排和各种菜单 (11:00 - 22:00)",
    cafeDesc: "轻松的咖啡厅提供现煮咖啡、饮料和烘焙食品 (24小时)",
    visitWebsite: "访问网站",
    visitFacebook: "访问 Facebook",
    contactTitle: "联系我们",
    addressDesc: "9/9 Moo 7 Soi Kingkaew 64, Kingkaew Road, Rachathewa, Bangphli, Samut Prakan 10540",
    frontDesk: "(24小时前台)",
    socialMedia: "社交媒体",
    openMap: "打开地图",
    allRightsReserved: "保留所有权利。",
  }
};


const BOOK = FASTBOOKING_URL;
const MAP = 'https://www.google.com/maps/search/?api=1&query=Suvarnabhumi+Ville+Airport+Hotel';
const LINE = 'https://lin.ee/YGQw4ZR';
const pages = ['home', 'stay', 'airportToHotel', 'hotelToAirport', 'facilities', 'dining', 'gallery', 'contact'];
const words = {
  th: { stay:'ห้องพัก', gallery:'แกลเลอรี', explore:'ค้นพบประสบการณ์', more:'ดูรายละเอียด', welcome:'พื้นที่สำหรับการพักผ่อนของคุณ', intro:'จากการเดินทาง สู่ช่วงเวลาของคุณ', introBody:'พักผ่อนริมสระว่ายน้ำ พบกับรสชาติที่ชื่นชอบ และใช้เวลาในแบบของคุณที่สุวรรณภูมิ วิลล์ พร้อมข้อมูลการเดินทางที่ช่วยให้การเข้าพักเป็นเรื่องง่าย', hero:'ให้ทุกการเดินทาง\nมีช่วงเวลาที่น่าจดจำ', heroBody:'พักผ่อน อิ่มอร่อย และเตรียมพร้อมสำหรับจุดหมายต่อไป ณ สุวรรณภูมิ วิลล์', experiences:'ค้นพบทุกมุมของการพักผ่อน', stayTitle:'พักสบาย\nในจังหวะของคุณ', stayBody:'ค้นพบห้องพักแต่ละประเภท พร้อมภาพและรายละเอียด เพื่อเลือกการพักผ่อนที่เหมาะกับคุณ', official:'ตรวจสอบห้องว่างและราคาบนเว็บไซต์โรงแรม', roomLink:'ดูห้องพักและราคา', request:'สอบถามความต้องการพิเศษ', requestBody:'เดินทางกับครอบครัว มีคำขอเกี่ยวกับห้องพัก หรือวางแผนเข้าพักก่อนออกเดินทาง ติดต่อทีมโรงแรมเพื่อสอบถามรายละเอียดก่อนจอง', arrival:'การเดินทางที่สะดวก เริ่มต้นที่นี่', departure:'พร้อมสำหรับจุดหมายต่อไป', help:'ให้เราช่วยดูแลการเดินทางของคุณ', helpBody:'สอบถามการเข้าพัก บริการรถรับส่ง และข้อมูลโรงแรมได้กับทีมแผนกต้อนรับ', call:'โทรหาโรงแรม', chat:'สอบถามผ่าน LINE', faq:'ข้อมูลก่อนเข้าพัก', faqIntro:'คำตอบที่ช่วยให้คุณวางแผนได้สะดวกขึ้น', galleryTitle:'มองเห็นการพักผ่อน\nในแบบของคุณ', all:'ทั้งหมด', pool:'พักผ่อนและดูแลตัวเอง', food:'รสชาติและบรรยากาศ', convenience:'ความสะดวกระหว่างเข้าพัก', contactIntro:'เราพร้อมช่วยให้การเข้าพักของคุณราบรื่น', reception:'แผนกต้อนรับ', address:'ที่ตั้งโรงแรม', social:'ติดตามโรงแรม', close:'ปิด', previous:'ภาพก่อนหน้า', next:'ภาพถัดไป', menu:'เมนู', skip:'ข้ามไปเนื้อหา', language:'ภาษา', image:'เปิดภาพ', journey:'วางแผนการเดินทาง', home:'หน้าแรก', breakfast:'เริ่มวันใหม่อย่างอิ่มอร่อย', breakfastBody:'เติมพลังมื้อเช้าก่อนออกเดินทาง หรือค่อยๆ เริ่มต้นวันพักผ่อนของคุณ', hours:'เวลาให้บริการ', directions:'เส้นทางและจุดนัดพบ', roomNote:'รายละเอียดห้อง ราคา และเงื่อนไขการจองแสดงบนเว็บไซต์โรงแรม', hotel:'โรงแรม', viewAll:'ดูภาพทั้งหมด', facts:'สิ่งที่ควรรู้', select:'เลือกหมวดภาพ', findUs:'พบกันที่สุวรรณภูมิ วิลล์', confirm:'กรุณาตรวจสอบรายละเอียดล่าสุดกับโรงแรมก่อนใช้บริการ' },
  en: { stay:'Stay', gallery:'Gallery', explore:'Discover the experience', more:'Explore', welcome:'YOUR SPACE TO UNWIND', intro:'Arrive. Unwind.\nMake it yours.', introBody:'Slow down by the pool, discover a favourite flavour, and enjoy time your way at Suvarnabhumi Ville. Find everything you need to plan a smooth arrival and a comfortable stay.', hero:'Every journey deserves\na memorable pause.', heroBody:'Rest, dine, and get ready for your next destination at Suvarnabhumi Ville.', experiences:'A stay with more to discover', stayTitle:'Stay comfortably.\nAt your own pace.', stayBody:'Explore our room collection, with photographs and details to help you find your ideal stay.', official:'Check availability and rates on the hotel website', roomLink:'Explore rooms & rates', request:'Make your stay personal', requestBody:'Travelling with family, planning a rest before your flight, or have a particular room request? Contact the hotel team before booking.', arrival:'Your arrival, made simpler.', departure:'Ready for your next destination.', help:'Let us help you plan your stay', helpBody:'Speak with reception about accommodation, airport transfers, and your time at the hotel.', call:'Call the hotel', chat:'Chat on LINE', faq:'Before you arrive', faqIntro:'Useful answers for a smoother stay.', galleryTitle:'Picture your\ntime at the Ville.', all:'All', pool:'Relax & recharge', food:'Taste & atmosphere', convenience:'Everyday conveniences', contactIntro:'Here to help make your stay feel effortless.', reception:'Reception', address:'Our location', social:'Stay connected', close:'Close', previous:'Previous image', next:'Next image', menu:'Menu', skip:'Skip to content', language:'Language', image:'Open image', journey:'Plan your journey', home:'Home', breakfast:'A delicious start to your day', breakfastBody:'Enjoy breakfast before your onward journey, or ease into a day of relaxation.', hours:'Opening hours', directions:'Directions & meeting points', roomNote:'Room details, rates, and booking conditions are shown on the hotel website.', hotel:'Hotel', viewAll:'View the gallery', facts:'At a glance', select:'Gallery categories', findUs:'Find us at Suvarnabhumi Ville', confirm:'Please confirm current details with the hotel before using a service.' },
  zh: { stay:'客房', gallery:'相册', explore:'探索入住体验', more:'了解更多', welcome:'放松身心的空间', intro:'抵达，放松\n享受自己的时光', introBody:'在泳池畔放松，探索喜爱的美味，在素万那普维尔酒店享受属于您的时光。查看交通指南，轻松规划入住。', hero:'每一段旅程\n都值得美好停留', heroBody:'在素万那普维尔酒店休息、用餐，为下一个目的地做好准备。', experiences:'探索更多入住体验', stayTitle:'舒适入住\n自在享受', stayBody:'探索各类客房，浏览真实照片与设施详情，找到适合您的入住选择。', official:'在酒店网站查询空房及价格', roomLink:'查看客房与房价', request:'让入住更贴心', requestBody:'与家人同行、在起飞前休息，或有特别的客房需求？请在预订前联系酒店团队。', arrival:'让抵达更加轻松', departure:'为下一站做好准备', help:'让我们协助您规划入住', helpBody:'欢迎联系前台咨询住宿、机场接送及酒店服务。', call:'致电酒店', chat:'通过 LINE 咨询', faq:'入住前须知', faqIntro:'实用信息，让入住更轻松。', galleryTitle:'想象您在酒店的\n美好时光', all:'全部', pool:'放松与焕新', food:'美味与氛围', convenience:'便利服务', contactIntro:'我们随时为您的顺利入住提供帮助。', reception:'前台', address:'酒店位置', social:'关注酒店', close:'关闭', previous:'上一张', next:'下一张', menu:'菜单', skip:'跳至内容', language:'语言', image:'打开图片', journey:'规划行程', home:'首页', breakfast:'美味开启新的一天', breakfastBody:'出发前享用早餐，或悠闲开启休息日。', hours:'营业时间', directions:'路线与会合点', roomNote:'客房详情、房价及预订条款请以酒店网站为准。', hotel:'酒店', viewAll:'查看相册', facts:'服务概要', select:'相册分类', findUs:'相约素万那普维尔酒店', confirm:'使用服务前，请向酒店确认最新详情。' }
};
const facilityData = [
  ['facPool','fac-pool.jpg','07:00 – 01:00','relax'],
  ['facFit','fac-fitness.jpg','24h','relax'],
  ['facSauna','fac-sauna.jpg','24h','relax'],
  ['facMassage','fac-massage.jpg','11:00 – 22:30','relax'],
  ['facMart','fac-mart.jpg','24h','comfort'],
  ['facLaundry','fac-laundry.jpg','24h','comfort'],
  ['facKids','fac-kids.jpg','24h','comfort'],
  ['facChicken','fac-chicken.jpg','07:30 – 21:30','comfort']
];
const venues = [
  { id:'sky', name:'Sky Bar 64', key:'s64Desc', prefix:'s64', hours:'18:00 – 01:00', url:'https://skybar64.com/' },
  { id:'steak', name:'Steak Gun Aeng 64', key:'steakDesc', prefix:'steak', hours:'11:00 – 22:00', url:'https://www.facebook.com/steakgunang64' },
  { id:'cafe', name:'Café Suvarnabhumi Ville', key:'cafeDesc', prefix:'cafe', hours:'24h', url:'https://www.facebook.com/cafesuvarnabhumiville/' }
];
function readPage() {
  const value = window.location.hash.slice(1);
  return pages.includes(value) ? value : 'home';
}
function Photo({ src, alt, className = '', eager = false }) {
  return <img src={src.startsWith('https://') ? src : './' + src} alt={alt} className={className} loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : 'auto'} decoding="async" />;
}
function External({ href, children, className = 'button gold' }) {
  return <a href={href} target="_blank" rel="noreferrer" className={className}>{children}<ArrowUpRight size={17} aria-hidden="true" /></a>;
}
function Lightbox({ image, onClose, w }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!image) return;
    const dialog = ref.current;
    const prior = document.activeElement;
    const overflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = overflow;
      prior?.focus();
    };
  }, [image]);
  return <dialog ref={ref} className="lightbox" aria-label={image?.alt || w.gallery} onCancel={onClose} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
    {image && <div className="lightbox-body"><button className="icon-button close" onClick={onClose} aria-label={w.close}><X /></button><Photo src={image.src} alt={image.alt} eager /><p>{image.alt}</p></div>}
  </dialog>;
}
function GalleryStrip({ prefix, title, onImage, w }) {
  return <div className="photo-strip">{[1,2,3,4,5].map(n => <button key={n} onClick={() => onImage({src:prefix + '-' + n + '.jpg',alt:title + ' · ' + n})} aria-label={w.image + ': ' + title + ' ' + n}><Photo src={prefix + '-' + n + '.jpg'} alt={title + ' · ' + n} /><ImageIcon size={18} aria-hidden="true" /></button>)}</div>;
}
function Header({ page, lang, setLang, t, w }) {
  const [open,setOpen] = useState(false);
  const toggle = useRef(null);
  useEffect(() => { if (!open) return; const onKey = e => { if (e.key === 'Escape') { setOpen(false); toggle.current?.focus(); } }; window.addEventListener('keydown',onKey); return () => window.removeEventListener('keydown',onKey); },[open]);
  const links = [['home',t.navHome],['stay',w.stay],['facilities',t.navFacilities],['dining',t.navDining],['airportToHotel',w.journey],['gallery',w.gallery],['contact',t.navContact]];
  return <header className="site-header">
    <div className="utility"><span>SUVARNABHUMI VILLE AIRPORT HOTEL</span><a href="tel:+66982673888"><Phone size={12} /> +66 (0) 98 267 3888</a></div>
    <div className="navigation wrap">
      <a href="#home" className="brand" aria-label="Suvarnabhumi Ville — Home"><img src="./logo-icon.png" alt="" /><span>SUVARNABHUMI<b>VILLE</b><small>AIRPORT HOTEL</small></span></a>
      <nav className="desktop-nav" aria-label={w.menu}>{links.map(([id,label])=><a key={id} href={'#'+id} aria-current={page===id || (id==='airportToHotel' && page==='hotelToAirport') ? 'page':undefined}>{label}</a>)}</nav>
      <div className="header-actions"><label className="language"><span className="sr-only">{w.language}</span><select value={lang} onChange={e=>setLang(e.target.value)}><option value="th">TH</option><option value="en">EN</option><option value="zh">中文</option></select></label><External href={BOOK} className="button gold header-book">{t.navBook}</External><button ref={toggle} className="icon-button menu-toggle" aria-label={open?w.close:w.menu} aria-expanded={open} aria-controls="mobile-menu" onClick={()=>setOpen(!open)}>{open?<X />:<Menu />}</button></div>
    </div>
    <nav id="mobile-menu" className="mobile-menu" hidden={!open} aria-label={w.menu}>{links.map(([id,label],i)=><a key={id} href={'#'+id} onClick={()=>setOpen(false)} aria-current={page===id?'page':undefined}><span>0{i+1}</span>{label}<ArrowUpRight size={17} /></a>)}<a href="#hotelToAirport" onClick={()=>setOpen(false)}>{t.navHotelToAir}<ArrowUpRight size={17} /></a></nav>
  </header>;
}
function Banner({ page, title, subtitle, image, t, w }) {
  return <section className="page-hero"><Photo src={image} alt={title.replaceAll('\n',' ')} eager /><div className="hero-shade" /><div className="wrap page-hero-content"><div className="breadcrumb"><a href="#home">{t.navHome}</a><span>/</span><span>{page}</span></div><p className="eyebrow pale">SUVARNABHUMI VILLE</p><h1>{title}</h1><p>{subtitle}</p></div><a href={BOOK} className="hero-reserve" target="_blank" rel="noreferrer"><CalendarDays size={19} />{w.official}<ArrowUpRight size={18} /></a></section>;
}
function Concierge({ w }) {
  return <section className="concierge"><div className="wrap concierge-inner"><div><p className="eyebrow pale">AT YOUR SERVICE</p><h2>{w.help}</h2><p>{w.helpBody}</p></div><div className="actions"><a href="tel:+66982673888" className="button gold"><Phone size={17} />{w.call}</a><External href={LINE} className="button outline-light">{w.chat}</External></div></div><span className="concierge-mark" aria-hidden="true">V</span></section>;
}
function FAQ({ t,w }) {
  return <section className="section wrap faq-grid"><div><p className="eyebrow">GOOD TO KNOW</p><h2>{w.faq}</h2><p className="muted">{w.faqIntro}</p></div><div>{[
    [t.navAirToHotel,t.step1Desc1+t.step1Desc2+' · '+t.step2Desc1+t.step2Desc2],
    [t.h2a1Title,t.h2a1Desc],
    [t.h2a3Title,t.h2a3Desc],
    [t.bfTitle,t.bfTime],
    [w.stay,w.roomNote]
  ].map(([q,a])=><details key={q}><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>)}</div></section>;
}
function Home({t,w}) {
  return <>
    <section className="home-hero"><Photo src="bg-home.jpg" alt="Suvarnabhumi Ville Hotel" eager /><div className="hero-shade" /><div className="home-hero-content wrap"><p className="eyebrow pale">THE PERFECT PLACE WITH A PERFECT VIEW</p><h1>{w.hero}</h1><p>{w.heroBody}</p><div className="actions"><External href={BOOK}>{t.navBook}</External><a href="#stay" className="button outline-light">{w.stay}<ArrowRight size={17} /></a></div></div><span className="hero-side" aria-hidden="true">A PAUSE BETWEEN DESTINATIONS</span></section>
    <div className="service-dock wrap">{[[Plane,w.journey,'airportToHotel',t.service24h],[Waves,t.navFacilities,'facilities',w.pool],[Coffee,t.navDining,'dining',w.food],[CalendarDays,w.stay,'stay',w.official]].map(([Icon,label,id,detail])=><a href={'#'+id} key={id}><Icon size={25} strokeWidth={1.25} /><div><strong>{label}</strong><small>{detail}</small></div><ArrowUpRight size={17} /></a>)}</div>
    <section className="section wrap introduction"><div className="intro-images"><Photo src="fac-pool.jpg" alt={t.facPool} /><Photo src="s64-1.jpg" alt="Sky Bar 64" /><span className="image-seal" aria-hidden="true">SV<span>THE VILLE</span></span></div><div className="intro-copy"><p className="eyebrow">{w.welcome}</p><h2>{w.intro}</h2><span className="gold-rule" /><p className="muted">{w.introBody}</p><a className="text-link" href="#gallery">{w.viewAll}<ArrowUpRight size={18} /></a></div></section>
    <section className="section pearl"><div className="wrap"><div className="section-heading"><div><p className="eyebrow">THE VILLE COLLECTION</p><h2>{w.experiences}</h2></div><a href="#facilities" className="text-link">{w.explore}<ArrowUpRight size={18} /></a></div><div className="experience-grid">{[['facilities','fac-pool.jpg',t.navFacilities,w.pool],['dining','s64-2.jpg',t.navDining,w.food],['airportToHotel','bg-hotel.jpg',w.journey,t.service24h]].map(([id,img,label,desc],i)=><a className="experience-card" key={id} href={'#'+id}><Photo src={img} alt={label} /><span className="card-number">0{i+1}</span><div><p className="eyebrow pale">{desc}</p><h3>{label}</h3><ArrowUpRight aria-hidden="true" /></div></a>)}</div></div></section>
    <section className="dining-teaser"><Photo src="s64-3.jpg" alt="Sky Bar 64" /><div className="wrap"><div><p className="eyebrow pale">AN EVENING AT THE VILLE</p><h2>Sky Bar 64</h2><p>{t.s64Desc}</p><a href="#dining" className="button outline-light">{t.navDining}<ArrowRight size={17} /></a></div></div></section>
    <FAQ t={t} w={w} />
  </>;
}
function Stay({t,w,lang,onImage}) {
  return <><Banner page={w.stay} title={w.stayTitle} subtitle={w.stayBody} image="bg-home.jpg" t={t} w={w} /><RoomCatalogue lang={lang} onImage={onImage}/><section className="pearl section"><div className="wrap split"><div><p className="eyebrow">THOUGHTFUL DETAILS</p><h2>{w.request}</h2><p className="muted">{w.requestBody}</p><External href={LINE} className="text-link">{w.chat}</External></div><div className="stay-perks">{[[Plane,w.journey,t.service24h,'airportToHotel'],[Waves,t.navFacilities,w.pool,'facilities'],[Coffee,t.navDining,w.food,'dining']].map(([Icon,title,detail,href])=><a href={'#'+href} key={href}><Icon /><div><h3>{title}</h3><p>{detail}</p></div><ArrowUpRight size={17} /></a>)}</div></div></section><FAQ t={t} w={w} /></>;
}
function Transfer({departure,t,w,onImage}) {
  const steps = [1,2,3,4].map(n=>({ title:t['step'+n+'Title'],body:(t['step'+n+'Desc1']||'')+(t['step'+n+'Desc2']||'')+(t['step'+n+'Desc3']||''),src:'step'+n+'.jpg' }));
  return <><Banner page={w.journey} title={departure?w.departure:w.arrival} subtitle={departure?t.h2aSubtitle:t.shuttleAirToHotel} image={departure?'bg-hotel.jpg':'bg-airport.jpg'} t={t} w={w} /><div className="transfer-tabs wrap"><a href="#airportToHotel" aria-current={!departure?'page':undefined}><Plane size={18} />{t.navAirToHotel}</a><a href="#hotelToAirport" aria-current={departure?'page':undefined}><ArrowUpRight size={18} />{t.navHotelToAir}</a></div><section className="section wrap transfer-layout"><div><p className="eyebrow">{w.directions}</p><h2>{departure?t.detailsTitle:t.stepsTitle}</h2><div className="steps">{(departure?[1,2,3,4].map(n=>({title:t['h2a'+n+'Title'],body:t['h2a'+n+'Desc']})):steps).map((step,i)=><article className="step" key={step.title}><span className="step-number">0{i+1}</span><div><h3>{step.title}</h3><p>{step.body}</p>{step.src&&<button className="step-photo" onClick={()=>onImage({src:step.src,alt:step.title})}><Photo src={step.src} alt={step.title} /><span><ImageIcon size={15} />{t.viewImage}</span></button>}</div></article>)}</div></div><aside className="transfer-aside"><div className="info-panel"><p className="eyebrow">{w.facts}</p><h3>{t.service24h}</h3><div className="info-line"><Clock /><p>{departure?t.h2a2Desc:t.step4Desc1+t.step4Desc2+t.step4Desc3}</p></div><div className="info-line"><MapPin /><p>{departure?t.h2a4Desc:t.step1Desc2+' · '+t.step2Desc2}</p></div><a href="tel:+66982673888" className="button navy"><Phone size={17} />098 267 3888</a>{!departure&&<p className="service-note">{t.step4Warning}</p>}</div>{!departure&&<div className="guide-video"><h3>{t.guideVideo}</h3><video src="./vid-guide1.mp4" controls preload="none" playsInline aria-label={t.guideVideo} /><p>{w.confirm}</p></div>}</aside></section></>;
}
function Facilities({t,w,onImage}) {
  return <><Banner page={t.navFacilities} title={w.pool} subtitle={t.facDesc} image="bg-facility.JPG" t={t} w={w} />{['relax','comfort'].map((group,gi)=><section className={'section '+(gi?'pearl':'')} key={group}><div className="wrap"><div className="section-heading"><div><p className="eyebrow">{gi?'EVERYDAY COMFORT':'WELLBEING AT THE VILLE'}</p><h2>{gi?w.convenience:w.pool}</h2></div><span className="section-index">0{gi+1}</span></div><div className="facility-grid">{facilityData.filter(f=>f[3]===group).map(([key,src,hours])=><article className="facility-card" key={key}><button className="facility-photo" onClick={()=>onImage({src,alt:t[key]})} aria-label={w.image+': '+t[key]}><Photo src={src} alt={t[key]} /><span><ImageIcon size={17} /></span></button><div className="facility-body"><h3>{t[key].split(' (')[0]}</h3><p><Clock size={15} />{hours==='24h'?t.service24h:hours}</p></div></article>)}</div></div></section>)}<p className="wrap service-note bottom-note">{w.confirm}</p></>;
}
function Dining({t,w,onImage}) {
  return <><Banner page={t.navDining} title={w.food} subtitle={t.diningDesc} image="bg-dining.jpg" t={t} w={w} /><div className="venue-nav wrap">{venues.map(v=><a key={v.id} href={'#dining'} onClick={e=>{e.preventDefault();document.getElementById('venue-'+v.id)?.scrollIntoView({behavior:'smooth'});}}>{v.name}<ArrowRight size={15} /></a>)}</div><section className="section wrap breakfast-block"><Photo src="food-breakfast.jpg" alt={t.bfTitle} /><div><p className="eyebrow">A GOOD MORNING</p><h2>{w.breakfast}</h2><p className="muted">{w.breakfastBody}</p><span className="hours"><Clock size={17} />{t.bfTime}</span></div></section>{venues.map((v,i)=><section id={'venue-'+v.id} className={'section venue '+(i%2===0?'pearl':'')} key={v.id}><div className="wrap"><div className={'venue-feature '+(i%2?'reverse':'')}><div className="venue-main-photo"><Photo src={v.prefix+'-1.jpg'} alt={v.name} /><span className="venue-number">0{i+1}</span></div><div className="venue-copy"><p className="eyebrow">TASTE OF THE VILLE</p><h2>{v.name}</h2><p className="muted">{t[v.key]}</p><p className="hours"><Clock size={17} />{v.hours==='24h'?t.service24h:v.hours}</p><External href={v.url} className="text-link">{v.id==='sky'?t.visitWebsite:t.visitFacebook}</External></div></div><GalleryStrip prefix={v.prefix} title={v.name} onImage={onImage} w={w} /></div></section>)}<p className="wrap service-note bottom-note">{w.confirm}</p></>;
}
function Gallery({t,w,onImage}) {
  const [category,setCategory]=useState('all');
  const pictures=[...facilityData.map(([key,src])=>({category:'facilities',src,alt:t[key]})),...venues.flatMap(v=>[1,2,3,4,5].map(n=>({category:'dining',src:v.prefix+'-'+n+'.jpg',alt:v.name+' · '+n}))),{category:'hotel',src:'bg-home.jpg',alt:'Suvarnabhumi Ville Hotel'},{category:'hotel',src:'bg-hotel.jpg',alt:'Suvarnabhumi Ville Hotel'}];
  return <><Banner page={w.gallery} title={w.galleryTitle} subtitle={t.slogan} image="fac-slide1.jpg" t={t} w={w}/><section className="section wrap"><div className="gallery-filters" role="group" aria-label={w.select}>{[['all',w.all],['hotel',w.hotel],['facilities',t.navFacilities],['dining',t.navDining]].map(([id,label])=><button key={id} aria-pressed={category===id} onClick={()=>setCategory(id)}>{label}</button>)}</div><div className="gallery-grid">{pictures.filter(p=>category==='all'||p.category===category).map(p=><button key={p.src} onClick={()=>onImage(p)} aria-label={w.image+': '+p.alt}><Photo src={p.src} alt={p.alt}/><span>{p.alt}<ImageIcon size={17}/></span></button>)}</div></section></>;
}
function Contact({t,w}) {
  return <><Banner page={t.navContact} title={w.findUs} subtitle={w.contactIntro} image="bg-contact.jpg" t={t} w={w}/><section className="section wrap"><div className="contact-grid"><article><MapPin/><p className="eyebrow">{w.address}</p><h2>Suvarnabhumi Ville</h2><address>{t.addressDesc}</address><External href={MAP} className="text-link">{t.openMap}</External></article><article><Phone/><p className="eyebrow">{w.reception}</p><h2>{t.service24h}</h2><a className="contact-phone" href="tel:+66982673888">+66 (0) 98 267 3888</a><a className="contact-phone" href="tel:+6627384599">+66 (0) 2 738 4599</a><External href={LINE} className="text-link">{w.chat}</External></article><article><CalendarDays/><p className="eyebrow">{w.stay}</p><h2>{t.navBook}</h2><p>{w.roomNote}</p><External href={BOOK} className="text-link">{w.roomLink}</External></article></div><div className="map-panel"><iframe title={t.openMap} src="https://maps.google.com/maps?q=Suvarnabhumi%20Ville%20Airport%20Hotel&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /><div className="map-caption"><MapPin size={20}/><span>{t.addressDesc}</span><External href={MAP} className="button navy">{t.openMap}</External></div></div></section><section className="section pearl"><div className="wrap section-heading"><div><p className="eyebrow">ARRIVE WITH EASE</p><h2>{w.journey}</h2></div><div className="actions"><a href="#airportToHotel" className="button navy">{t.navAirToHotel}<ArrowRight size={17}/></a><a href="#hotelToAirport" className="button outline">{t.navHotelToAir}<ArrowRight size={17}/></a></div></div></section><FAQ t={t} w={w}/></>;
}
function Footer({t,w}) {
  return <><footer className="footer"><div className="wrap footer-grid"><div><a href="#home" className="footer-brand">SUVARNABHUMI<span>VILLE</span></a><p>{t.slogan}</p><address>{t.addressDesc}</address></div><div><h3>{w.explore}</h3>{[['stay',w.stay],['facilities',t.navFacilities],['dining',t.navDining],['gallery',w.gallery]].map(([id,label])=><a href={'#'+id} key={id}>{label}</a>)}</div><div><h3>{w.journey}</h3><a href="#airportToHotel">{t.navAirToHotel}</a><a href="#hotelToAirport">{t.navHotelToAir}</a><a href="#contact">{t.navContact}</a><a href="tel:+66982673888">+66 (0) 98 267 3888</a></div><div><h3>{w.social}</h3>{[['Facebook','https://www.facebook.com/suvarnabhumi.ville.2025'],['Instagram','https://www.instagram.com/suvarnabhumiville/'],['TikTok','https://www.tiktok.com/@suvarnabhumivilles64'],['LINE',LINE]].map(([name,url])=><External key={name} href={url} className="footer-social">{name}</External>)}</div></div><div className="wrap footer-bottom"><span>© {new Date().getFullYear()} Suvarnabhumi Ville Hotel. {t.allRightsReserved}</span><a href="#home">SUVARNABHUMI VILLE AIRPORT HOTEL</a></div></footer><div className="mobile-booking"><a href="tel:+66982673888"><Phone size={18}/>{w.call}</a><External href={BOOK}>{t.navBook}</External></div></>;
}
export default function App() {
  const [page,setPage]=useState(readPage);
  const [lang,setLang]=useState(()=>{try { const l=localStorage.getItem('ville-language'); return ['th','en','zh'].includes(l)?l:'th'; } catch { return 'th'; }});
  const [image,setImage]=useState(null);
  const main=useRef(null);
  const t=translations[lang],w=words[lang];
  useEffect(()=>{
    const update=()=>{setPage(readPage());setImage(null);window.scrollTo({top:0,behavior:'instant'});requestAnimationFrame(()=>main.current?.focus({preventScroll:true}));};
    window.addEventListener('hashchange',update);return()=>window.removeEventListener('hashchange',update);
  },[]);
  useEffect(()=>{try {localStorage.setItem('ville-language',lang);} catch { /* Language remains available without storage. */ }document.documentElement.lang=lang==='zh'?'zh-Hans':lang;},[lang]);
  useEffect(()=>{const titles={home:t.navHome,stay:w.stay,airportToHotel:t.navAirToHotel,hotelToAirport:t.navHotelToAir,facilities:t.navFacilities,dining:t.navDining,gallery:w.gallery,contact:t.navContact};document.title=titles[page]+' | Suvarnabhumi Ville Airport Hotel';},[page,t,w]);
  const content={home:<Home t={t} w={w}/>,stay:<Stay t={t} w={w} lang={lang} onImage={setImage}/>,airportToHotel:<Transfer t={t} w={w} onImage={setImage}/>,hotelToAirport:<Transfer departure t={t} w={w} onImage={setImage}/>,facilities:<Facilities t={t} w={w} onImage={setImage}/>,dining:<Dining t={t} w={w} onImage={setImage}/>,gallery:<Gallery t={t} w={w} onImage={setImage}/>,contact:<Contact t={t} w={w}/>};
  return <><a className="skip-link" href="#main-content" onClick={e=>{e.preventDefault();main.current?.focus();}}>{w.skip}</a><Header key={page} page={page} lang={lang} setLang={setLang} t={t} w={w}/><main id="main-content" ref={main} tabIndex={-1}>{content[page]}<Concierge w={w} t={t}/></main><Footer t={t} w={w}/><Lightbox image={image} onClose={()=>setImage(null)} w={w}/></>;
}
