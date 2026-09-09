import { Wifi, Snowflake, Refrigerator, Wind, Thermometer, Coffee, Tv, Phone, Footprints, CigaretteOff, Lock, DoorOpen, DoorClosed, Waves, Fan, ArrowUpDown, ShowerHead, Shirt, Bath, Armchair, Scale, Rows3 } from 'lucide-react';

const amenities = {
  wifi: { Icon: Wifi, title: ["Wi-Fi ฟรี","Free Wi-Fi","免费 Wi-Fi"], description: ["เชื่อมต่ออินเทอร์เน็ตในห้องพัก","Internet access in your room","客房内可连接互联网"] },
  air: { Icon: Snowflake, title: ["เครื่องปรับอากาศ","Air conditioning","空调"], description: ["ปรับอุณหภูมิห้องได้ตามต้องการ","Adjust the room temperature","可调节客房温度"] },
  fridge: { Icon: Refrigerator, title: ["ตู้เย็น","Refrigerator","冰箱"], description: ["ตู้เย็นภายในห้องพัก","An in-room refrigerator","客房内配备冰箱"] },
  hairDryer: { Icon: Wind, title: ["ไดร์เป่าผม","Hair dryer","吹风机"], description: ["มีไดร์เป่าผมให้ใช้ในห้อง","A hair dryer is provided","客房内提供吹风机"] },
  heater: { Icon: Thermometer, title: ["เครื่องทำน้ำอุ่น","Water heater","热水器"], description: ["มีเครื่องทำน้ำอุ่นในห้องพัก","Water heating is available","客房配有热水器"] },
  coffee: { Icon: Coffee, title: ["กาแฟและชา","Coffee & tea","咖啡和茶"], description: ["อุปกรณ์ชงกาแฟและชาให้ใช้ฟรี","Complimentary coffee and tea making facilities","免费咖啡和茶冲泡设施"] },
  tv: { Icon: Tv, title: ["เคเบิลทีวี","Cable TV","有线电视"], description: ["รับชมรายการผ่านเคเบิลทีวี","Watch cable television","可收看有线电视节目"] },
  satellite: { Icon: Tv, title: ["เคเบิล / ดาวเทียม","Cable / satellite TV","有线 / 卫星电视"], description: ["โทรทัศน์พร้อมช่องเคเบิลหรือดาวเทียม","TV with cable or satellite channels","配备有线或卫星频道电视"] },
  phone: { Icon: Phone, title: ["โทรศัพท์ IDD","IDD telephone","国际直拨电话"], description: ["โทรศัพท์ภายในห้องพัก","An in-room IDD telephone","客房内配备国际直拨电话"] },
  slippers: { Icon: Footprints, title: ["รองเท้าแตะ","Slippers","拖鞋"], description: ["มีรองเท้าแตะสำหรับใช้งาน","Slippers are provided","提供拖鞋"] },
  nonSmoking: { Icon: CigaretteOff, title: ["ห้องปลอดบุหรี่","Non-smoking room","无烟客房"], description: ["งดสูบบุหรี่ภายในห้องพัก","Smoking is not permitted in the room","客房内禁止吸烟"] },
  safe: { Icon: Lock, title: ["ตู้นิรภัย","Electronic safe","电子保险箱"], description: ["เก็บของมีค่าในตู้นิรภัยภายในห้อง","An in-room electronic safe","客房内配备电子保险箱"] },
  balcony: { Icon: DoorOpen, title: ["ระเบียง","Balcony","阳台"], description: ["มีระเบียงส่วนตัว","A private balcony","设有私人阳台"] },
  noBalcony: { Icon: DoorClosed, title: ["ไม่มีระเบียง","No balcony","无阳台"], description: ["ห้องพักประเภทนี้ไม่มีระเบียง","This room type has no balcony","此房型不设阳台"] },
  poolView: { Icon: Waves, title: ["ระเบียงวิวสระ","Pool-view balcony","泳池景观阳台"], description: ["มองเห็นสระว่ายน้ำจากระเบียง","Enjoy pool views from the balcony","可从阳台欣赏泳池景观"] },
  poolAccess: { Icon: Waves, title: ["ระเบียงเชื่อมสระ","Direct pool access","直通泳池"], description: ["ระเบียงส่วนตัวเชื่อมสู่สระว่ายน้ำกลางแจ้ง","A private balcony opens onto the outdoor pool","私人阳台直通室外泳池"] },
  fan: { Icon: Fan, title: ["พัดลมเคลื่อนย้ายได้","Portable fan","便携式风扇"], description: ["มีพัดลมสำหรับใช้ภายในห้อง","A portable fan is provided","客房内提供便携式风扇"] },
  elevator: { Icon: ArrowUpDown, title: ["มีลิฟต์","Elevator access","设有电梯"], description: ["เดินทางขึ้นห้องพักด้วยลิฟต์ได้","Access your room by elevator","可乘电梯前往客房"] },
  shower: { Icon: ShowerHead, title: ["ห้องอาบน้ำ","Shower room","淋浴间"], description: ["มีพื้นที่อาบน้ำแบบฝักบัว","A shower area is provided","设有淋浴区域"] },
  bathrobe: { Icon: Shirt, title: ["เสื้อคลุมอาบน้ำ","Bathrobe","浴袍"], description: ["มีเสื้อคลุมอาบน้ำให้ใช้","A bathrobe is provided","提供浴袍"] },
  bathtub: { Icon: Bath, title: ["อ่างอาบน้ำ","Bathtub","浴缸"], description: ["ผ่อนคลายในอ่างอาบน้ำ","Relax in the bathtub","可在浴缸内放松"] },
  sofa: { Icon: Armchair, title: ["โซฟา","Sofa","沙发"], description: ["มีโซฟาสำหรับนั่งพักผ่อน","A sofa for relaxing","配有休息沙发"] },
  scale: { Icon: Scale, title: ["เครื่องชั่งน้ำหนัก","Weighing scale","体重秤"], description: ["มีเครื่องชั่งน้ำหนักภายในห้อง","A weighing scale is provided","客房内提供体重秤"] },
  towels: { Icon: Rows3, title: ["ผ้าเช็ดตัว","Towels","毛巾"], description: ["มีผ้าเช็ดตัวให้ใช้","Towels are provided","提供毛巾"] },
};

// Room-specific lists follow the supplied annotated room amenity sheets.
const roomAmenities = {
  "standard": [
    "air",
    "fridge",
    "hairDryer",
    "safe",
    "wifi",
    "heater",
    "coffee",
    "tv",
    "phone",
    "slippers",
    "nonSmoking",
    "balcony"
  ],
  "deluxe": [
    "air",
    "fridge",
    "satellite",
    "noBalcony",
    "slippers",
    "fan",
    "phone",
    "elevator",
    "wifi",
    "heater",
    "hairDryer",
    "nonSmoking",
    "safe"
  ],
  "executive": [
    "air",
    "fridge",
    "shower",
    "satellite",
    "fan",
    "safe",
    "coffee",
    "balcony",
    "phone",
    "wifi",
    "heater",
    "hairDryer",
    "slippers",
    "nonSmoking"
  ],
  "executive-pool-view": [
    "air",
    "fridge",
    "nonSmoking",
    "satellite",
    "fan",
    "safe",
    "coffee",
    "phone",
    "poolView",
    "wifi",
    "heater",
    "hairDryer",
    "slippers"
  ],
  "premier-pool-access": [
    "air",
    "fridge",
    "satellite",
    "safe",
    "coffee",
    "poolAccess",
    "phone",
    "fan",
    "wifi",
    "heater",
    "hairDryer",
    "slippers",
    "nonSmoking",
    "bathrobe"
  ],
  "premier-junior-suite": [
    "air",
    "fridge",
    "sofa",
    "satellite",
    "safe",
    "coffee",
    "noBalcony",
    "fan",
    "slippers",
    "scale",
    "phone",
    "wifi",
    "heater",
    "hairDryer",
    "nonSmoking",
    "bathrobe",
    "bathtub"
  ],
  "premier-suite-pool-access": [
    "air",
    "fridge",
    "hairDryer",
    "phone",
    "sofa",
    "safe",
    "fan",
    "scale",
    "poolAccess",
    "wifi",
    "towels",
    "slippers",
    "nonSmoking",
    "bathrobe",
    "satellite",
    "bathtub",
    "coffee"
  ]
};

const labels = {
  th: ['รายละเอียดเพิ่มเติม', 'ซ่อนรายละเอียด', 'สิ่งอำนวยความสะดวกภายในห้อง'],
  en: ['More details', 'Hide details', 'In-room amenities'],
  zh: ['更多详情', '收起详情', '客房设施'],
};

export default function RoomDetails({ roomId, roomName, lang }) {
  const language = labels[lang] ? lang : 'en';
  const index = { th: 0, en: 1, zh: 2 }[language];
  const text = labels[language];
  const items = roomAmenities[roomId] || [];
  return (
    <details className="room-more-details">
      <summary>
        <span className="room-details-closed">{text[0]}</span>
        <span className="room-details-open">{text[1]}</span>
        <span className="sr-only"> · {roomName}</span>
      </summary>
      <div className="room-details-content">
        <h3>{text[2]}</h3>
        <ul className="room-details-grid">
          {items.map(key => {
            const { Icon, title, description } = amenities[key];
            return <li key={key}>
              <span className="room-detail-icon"><Icon size={24} strokeWidth={1.6} aria-hidden="true" /></span>
              <div><h4>{title[index]}</h4><p>{description[index]}</p></div>
            </li>;
          })}
        </ul>
      </div>
    </details>
  );
}
