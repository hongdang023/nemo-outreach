export const TARGET_TYPES = ["Experts", "Creators", "Alumni", "Schools", "Communities", "Media"] as const;
export const STAGES = ["Research", "Qualified", "Contacted", "Replied", "Conversation", "Meeting", "Pilot", "Partner"] as const;
export type TargetType = typeof TARGET_TYPES[number];
export type Stage = typeof STAGES[number];

export type OutreachTarget = {
  id: string; name: string; type: TargetType; city: string; website: string;
  contactRole: string; contactChannel: string; contactStatus: "Verified" | "Public route" | "Research needed";
  valueProp: string; nextAction: string; nextActionDate: string; stage: Stage;
  fit: number; access: number; trust: number; readiness: number; score: number;
  trials: number; learners: number; notes: string;
};

type Seed = [name: string, city: string, website: string, contact: string, status?: OutreachTarget["contactStatus"]];

const groups: Record<TargetType, Seed[]> = {
  Experts: [
    ["Khánh Vy", "Hà Nội", "https://www.facebook.com/khanhvyccf/", "Facebook/YouTube công khai", "Public route"],
    ["Đặng Trần Tùng", "Hà Nội", "https://theieltsworkshop.com/", "The IELTS Workshop · form/hotline công khai", "Public route"],
    ["Nguyễn Lâm Thảo Tâm", "TP.HCM", "https://www.facebook.com/thaotamnguyenlam/", "Facebook/Instagram công khai", "Public route"],
    ["IELTS Face-Off Production Team", "Hà Nội", "https://ielts.ican.vn/ifo", "VTV7 / iCAN contact route", "Public route"],
    ["Trường Teen / The Debaters VTV7", "Hà Nội", "https://vtv.gov.vn/news/vtv-voi-khan-gia/truong-teen-2026-chinh-thuc-mo-casting", "tranhbienvtv7@gmail.com · 0334 213 302", "Verified"],
    ["Lưu Chí Anh", "Hà Nội", "https://vtv.gov.vn/news/tin-tuc-su-kien/truong-teen-se-tro-lai-tren-song-vtv7", "Qua BTC Trường Teen / VTV7", "Verified"],
    ["Hà Tuấn Hùng", "Hà Nội", "https://vtv.gov.vn/news/tin-tuc-su-kien/truong-teen-se-tro-lai-tren-song-vtv7", "Qua BTC Trường Teen / VTV7", "Verified"],
    ["Khánh Linh — Trường Teen", "Hà Nội", "https://vtv.gov.vn/news/tin-tuc-su-kien/truong-teen-se-tro-lai-tren-song-vtv7", "Qua BTC Trường Teen / VTV7", "Verified"],
    ["Đức An — Trường Teen", "Hà Nội", "https://vtv.gov.vn/news/vtv-voi-khan-gia/truong-teen-2026-chinh-thuc-mo-casting", "Qua BTC Trường Teen / VTV7", "Verified"],
    ["Lam Trà — Trường Teen", "Hà Nội", "https://vtv.gov.vn/news/vtv-voi-khan-gia/truong-teen-2026-chinh-thuc-mo-casting", "Qua BTC Trường Teen / VTV7", "Verified"],
    ["Minh Khôi — Trường Teen", "Hà Nội", "https://vtv.gov.vn/news/vtv-voi-khan-gia/truong-teen-2026-chinh-thuc-mo-casting", "Qua BTC Trường Teen / VTV7", "Verified"],
    ["Minh Tâm — Trường Teen", "Hà Nội", "https://vtv.gov.vn/news/vtv-voi-khan-gia/truong-teen-2026-chinh-thuc-mo-casting", "Qua BTC Trường Teen / VTV7", "Verified"],
    ["Hana's Lexis", "TP.HCM", "https://www.youtube.com/@HanasLexis", "YouTube/Instagram business route", "Public route"],
    ["IELTS Ngọc Bách", "Hà Nội", "https://ieltsngocbach.com/", "Website/Facebook công khai", "Public route"],
    ["IELTS Thanh Loan", "Hà Nội", "https://ielts-thanhloan.com/", "Website/Facebook công khai", "Public route"],
    ["DOL Academic Team", "TP.HCM", "https://www.dolenglish.vn/", "Website/hotline công khai", "Public route"],
    ["IELTS Fighter Academic Team", "Toàn quốc", "https://ielts-fighter.com/", "Website/hotline công khai", "Public route"],
    ["British Council IELTS Vietnam", "Hà Nội & TP.HCM", "https://www.britishcouncil.vn/en/exam/ielts", "Customer service / partnerships route", "Public route"],
    ["IDP IELTS Vietnam", "Toàn quốc", "https://ielts.idp.com/vietnam", "Website/contact centre công khai", "Public route"],
    ["VTV7 English", "Hà Nội", "https://vtv.vn/english-by-stories.html", "vtv7@vtv.vn", "Verified"],
  ],
  Creators: [
    ["Khánh Vy", "Hà Nội", "https://www.youtube.com/@KhanhVyOfficial", "YouTube/Instagram business route"], ["Hana's Lexis", "TP.HCM", "https://www.youtube.com/@HanasLexis", "YouTube/Instagram business route"],
    ["The Present Writer", "Toàn quốc", "https://thepresentwriter.com/", "Website/newsletter contact"], ["Giang Ơi", "TP.HCM", "https://www.youtube.com/@GiangOi", "YouTube/Instagram business route"],
    ["Nguyễn Hữu Trí", "TP.HCM", "https://www.youtube.com/@NguyenHuuTri", "YouTube/Facebook public route"], ["Web5ngay", "TP.HCM", "https://www.youtube.com/@Web5Ngay", "YouTube/Facebook public route"],
    ["IELTS Face-Off", "Hà Nội", "https://www.youtube.com/@IELTSFACE-OFF", "VTV7 / iCAN public route"], ["The IELTS Workshop", "Hà Nội", "https://www.youtube.com/@TheIELTSWorkshop", "Website/hotline public route"],
    ["DOL English", "TP.HCM", "https://www.youtube.com/@DOLENGLISH", "Website/hotline public route"], ["IELTS Fighter", "Toàn quốc", "https://www.youtube.com/@IELTSFighter", "Website/hotline public route"],
    ["IELTS LangGo", "Hà Nội", "https://www.youtube.com/@IELTSLangGo", "Website/hotline public route"], ["Langmaster", "Hà Nội", "https://www.youtube.com/@Langmaster", "Website/hotline public route"],
    ["Elight Learning English", "Hà Nội", "https://www.youtube.com/@elightlearningenglish", "Website/social public route"], ["Ms Hoa Giao Tiếp", "Toàn quốc", "https://www.youtube.com/@MsHoaGiaoTiep", "Website/hotline public route"],
    ["Step Up English", "Hà Nội", "https://stepup.edu.vn/", "Website/social public route"], ["Pasal", "Hà Nội", "https://pasal.edu.vn/", "Website/hotline public route"],
    ["Easy English Vietnam", "Toàn quốc", "https://www.youtube.com/@EasyEnglishVietnam", "YouTube public route"], ["IELTS Mentor", "Hà Nội", "https://ieltsmentor.edu.vn/", "Website/hotline public route"],
    ["YOLA", "TP.HCM", "https://yola.vn/", "Website/hotline public route"], ["VUS", "TP.HCM", "https://vus.edu.vn/", "Website/hotline public route"],
  ],
  Alumni: [
    ["RMIT Vietnam Alumni Network", "Hà Nội & TP.HCM", "https://alumninetwork.rmit.edu.vn/", "Alumni Network portal"], ["VinUniversity Alumni", "Hà Nội", "https://vinuni.edu.vn/aid/alumni-engagement/", "Alumni Engagement"],
    ["Fulbright University Vietnam Alumni", "TP.HCM", "https://fulbright.edu.vn/", "Student engagement/alumni office"], ["VNU Alumni", "Hà Nội", "https://vnu.edu.vn/", "Alumni/communications office"],
    ["HUST Alumni", "Hà Nội", "https://alumni.hust.edu.vn/", "Alumni portal"], ["DAV Alumni Network", "Hà Nội", "https://alumni.dav.edu.vn/", "Alumni portal"],
    ["FTU Alumni", "Hà Nội & TP.HCM", "https://ftu.edu.vn/", "Alumni relations"], ["NEU Alumni", "Hà Nội", "https://neu.edu.vn/", "Alumni relations"],
    ["UEH Alumni", "TP.HCM", "https://www.ueh.edu.vn/", "Alumni relations"], ["VNU-HCM Alumni", "TP.HCM", "https://vnuhcm.edu.vn/", "Alumni/communications office"],
    ["Can Tho University Alumni", "Cần Thơ", "https://www.ctu.edu.vn/", "Alumni office"], ["University of Danang Alumni", "Đà Nẵng", "https://www.udn.vn/", "Alumni/communications office"],
    ["Hue University Alumni", "Huế", "https://hueuni.edu.vn/", "Alumni/communications office"], ["HaUI Alumni", "Hà Nội", "https://www.haui.edu.vn/", "Alumni office"],
    ["HSB-VNU Alumni", "Hà Nội", "https://www.hsb.edu.vn/info/alumni/alumni-network", "Alumni Network"], ["BUV Alumni", "Hưng Yên", "https://www.buv.edu.vn/", "Alumni relations"],
    ["FPT University Alumni", "Nhiều tỉnh thành", "https://daihoc.fpt.edu.vn/", "Student affairs/alumni"], ["Duy Tan University Alumni", "Đà Nẵng", "https://duytan.edu.vn/", "Alumni office"],
    ["Ton Duc Thang University Alumni", "TP.HCM", "https://www.tdtu.edu.vn/", "Alumni office"], ["HANU Alumni", "Hà Nội", "https://hanu.vn/", "Alumni/communications office"],
  ],
  Schools: [
    ["THPT Chuyên Hà Nội – Amsterdam", "Hà Nội", "https://hn-ams.edu.vn/gioi-thieu-trung-tam", "c23hanoi-ams@hanoiedu.vn", "Verified"],
    ["THPT Chuyên Ngoại ngữ – ĐHQGHN", "Hà Nội", "https://flss.vnu.edu.vn/", "Ban giám hiệu / Tổ tiếng Anh · website trường"],
    ["THPT Chuyên ĐH Sư phạm Hà Nội", "Hà Nội", "https://chuyensp.edu.vn/", "Văn phòng trường · website"],
    ["Phổ thông Năng khiếu – ĐHQG-HCM", "TP.HCM", "https://ptnk.edu.vn/", "Ban giám hiệu / Tổ tiếng Anh · website trường"],
    ["THPT Chuyên Lê Hồng Phong", "TP.HCM", "https://lehongphong.edu.vn/", "Văn phòng trường · website"],
    ["THPT Chuyên Trần Đại Nghĩa", "TP.HCM", "https://trandainghia.edu.vn/", "Văn phòng trường · website"],
    ["THPT Chuyên Lê Quý Đôn", "Đà Nẵng", "https://lequydon-danang.edu.vn/", "Văn phòng trường · website"],
    ["THPT Chuyên Quốc Học", "Huế", "https://thpt-qhoc.thuathienhue.edu.vn/", "Văn phòng trường · website"],
    ["THPT Chuyên Lam Sơn", "Thanh Hóa", "http://thptchuyenlamson.edu.vn/", "Văn phòng trường · website"],
    ["THPT Chuyên Phan Bội Châu", "Nghệ An", "https://thptchuyenphanboichau.edu.vn/", "Văn phòng trường · website"],
    ["THPT Chuyên Trần Phú", "Hải Phòng", "https://chuyentranphu.haiphong.edu.vn/", "Văn phòng trường · website"],
    ["THPT Chuyên Hạ Long", "Quảng Ninh", "https://thptchuyenhalong.edu.vn/", "Văn phòng trường · website"],
    ["THPT Chuyên Bắc Ninh", "Bắc Ninh", "https://thptchuyenbacninh.bacninh.edu.vn/", "Văn phòng trường · website"],
    ["THPT Chuyên Thái Nguyên", "Thái Nguyên", "https://c3chuyenthainguyen.edu.vn/", "Văn phòng trường · website"],
    ["THPT Chuyên Nguyễn Trãi", "Hải Dương", "https://chuyennguyentrai.edu.vn/", "Văn phòng trường · website"],
    ["THPT Chuyên Vĩnh Phúc", "Vĩnh Phúc", "https://chuyenvinhphuc.vinhphuc.edu.vn/", "Văn phòng trường · website"],
    ["THPT Chuyên Lương Văn Tụy", "Ninh Bình", "https://thptchuyenluongvantuy.ninhbinh.edu.vn/", "Văn phòng trường · website"],
    ["THPT Chuyên Nguyễn Quang Diêu", "Đồng Tháp", "https://thptchuyennguyenquangdieu.edu.vn/", "Văn phòng trường · website"],
    ["THPT Chuyên Lý Tự Trọng", "Cần Thơ", "https://chuyenlytutrong.edu.vn/", "Văn phòng trường · website"],
    ["THPT Chuyên Lê Quý Đôn", "Bà Rịa–Vũng Tàu", "https://thpt-lequydon.bariavungtau.edu.vn/", "Văn phòng trường · website"],
  ],
  Communities: [
    ["VietAbroader", "Toàn quốc", "https://vietabroader.org/", "Community/program lead"], ["AIESEC in Vietnam", "Toàn quốc", "https://www.aiesec.vn/ve-chung-toi", "aiesec.vietnam@aiesec.net", "Verified"],
    ["YBOX.VN", "Toàn quốc", "https://ybox.vn/hop-tac/hop-tac-cung-ybox-227087", "Partnership route công khai"], ["YouthSpeak Vietnam", "Toàn quốc", "https://www.aiesec.vn/youthspeak/home", "AIESEC partnership route"],
    ["VNU Youth", "Hà Nội", "https://youth.vnu.edu.vn/", "Đoàn ĐHQGHN"], ["RMIT Student Council", "Hà Nội & TP.HCM", "https://www.rmit.edu.vn/students/campus-life", "Student Life"],
    ["Fulbright Student Council", "TP.HCM", "https://fulbright.edu.vn/student-engagement/", "Student Engagement"], ["VinUni Student Clubs", "Hà Nội", "https://vinuni.edu.vn/student-life/clubs-and-organizations/", "Student Affairs/club leaders"],
    ["BUV Student Association", "Hưng Yên", "https://www.buv.edu.vn/student-societies/", "Student Life"], ["NEU Youth Union", "Hà Nội", "https://neu.edu.vn/", "Đoàn Thanh niên"],
    ["SVUK", "Toàn quốc", "https://svuk.org.uk/", "Executive committee"], ["Vietnamese Youth Alliance", "Toàn quốc", "https://www.facebook.com/vietnamyouthalliance/", "Facebook public route"],
    ["VietSeeds", "Toàn quốc", "https://vietseeds.org/", "Program/partnership team"], ["Room to Read Vietnam", "Nhiều tỉnh thành", "https://www.roomtoread.org/countries/vietnam/local-information/", "info.vn@roomtoread.org", "Verified"],
    ["Blue Dragon Children's Foundation", "Hà Nội", "https://www.bluedragon.org/who-we-are/contact-us/", "info@bdcf.org", "Verified"], ["Saigonchildren", "TP.HCM & các tỉnh", "https://www.saigonchildren.com/", "Partnership/program team"],
    ["Teach For Viet Nam", "Quảng Nam & Đồng Tháp", "https://teachforvietnam.org/", "Partnership/program team"], ["GreenHub", "Hà Nội", "https://greenhub.org.vn/", "Program/community team"],
    ["Enactus Vietnam", "Toàn quốc", "https://enactus.org/country/vietnam/", "National program route"], ["Vietnam National Union of Students", "Toàn quốc", "https://hoisinhvien.com.vn/", "Văn phòng Trung ương Hội"],
  ],
  Media: [
    ["VnExpress Giáo dục", "Toàn quốc", "https://vnexpress.net/giao-duc", "Education editor/editorial contact"], ["Tuổi Trẻ Giáo dục", "Toàn quốc", "https://tuoitre.vn/giao-duc.htm", "Education editor/editorial contact"],
    ["Giáo dục & Thời đại", "Toàn quốc", "https://giaoducthoidai.vn/", "Tòa soạn/contact page"], ["Tạp chí Giáo dục", "Hà Nội", "https://tapchigiaoduc.edu.vn/", "Tòa soạn/contact page"],
    ["VTV7", "Toàn quốc", "https://vtv7.vtv.vn/", "vtv7@vtv.vn", "Verified"], ["IELTS Face-Off", "Toàn quốc", "https://ielts.ican.vn/ifo", "VTV7 / iCAN contact route"],
    ["Hoa Học Trò", "Toàn quốc", "https://hoahoctro.tienphong.vn/", "Student editor/editorial contact"], ["Dân Trí Giáo dục", "Toàn quốc", "https://dantri.com.vn/giao-duc.htm", "Education editor/editorial contact"],
    ["VietnamNet Giáo dục", "Toàn quốc", "https://vietnamnet.vn/giao-duc", "Education editor/editorial contact"], ["Thanh Niên Giáo dục", "Toàn quốc", "https://thanhnien.vn/giao-duc.htm", "Education editor/editorial contact"],
    ["Lao Động Giáo dục", "Toàn quốc", "https://laodong.vn/giao-duc", "Education editor/editorial contact"], ["Nhân Dân Giáo dục", "Toàn quốc", "https://nhandan.vn/giaoduc/", "Education editor/editorial contact"],
    ["VietnamPlus Giáo dục", "Toàn quốc", "https://www.vietnamplus.vn/giao-duc/", "Education editor/editorial contact"], ["Vietnam News Education", "Toàn quốc", "https://vietnamnews.vn/society/education", "Education editor/editorial contact"],
    ["ZNews Giáo dục", "Toàn quốc", "https://znews.vn/giao-duc.html", "Education editor/editorial contact"], ["Tiền Phong Giáo dục", "Toàn quốc", "https://tienphong.vn/giao-duc/", "Education editor/editorial contact"],
    ["VOV2 Giáo dục", "Toàn quốc", "https://vov2.vov.vn/giao-duc-dao-tao", "Education desk"], ["VTV24", "Toàn quốc", "https://vtv.vn/vtv24.htm", "Newsroom/editorial contact"],
    ["Giáo dục Việt Nam", "Toàn quốc", "https://giaoduc.net.vn/", "Tòa soạn/contact page"], ["Kênh14 Học đường", "Toàn quốc", "https://kenh14.vn/hoc-duong.chn", "Youth/editorial contact"],
  ],
};

const defaults: Record<TargetType, { role: string; offer: string; action: string }> = {
  Experts: { role: "Expert / host / mentor", offer: "Expert Council + co-created insight", action: "Xác minh kênh cá nhân và đề nghị review framework 45 phút." },
  Creators: { role: "Creator / Partnerships", offer: "Creator × Nemo12 Trial Challenge", action: "Research audience fit; gửi concept challenge có tracking trials." },
  Alumni: { role: "Alumni Relations / Chapter Lead", offer: "Alumni Give-back Diagnostic Day", action: "Tìm alumni lead hoặc chapter champion và đề xuất activation." },
  Schools: { role: "Ban giám hiệu / Tổ tiếng Anh", offer: "Free IELTS Diagnostic for 100 Students", action: "Gọi/email văn phòng; xin đúng đầu mối English hoặc ngoại khóa." },
  Communities: { role: "Community / Program Lead", offer: "Community Diagnostic Week", action: "Đề xuất co-host activation và đo trials theo source." },
  Media: { role: "Education Editor / Producer", offer: "Vietnam Learner Gap Index", action: "Nurture; pitch data story sau khi đủ sample trials." },
};

function slug(value: string) { return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""); }

export const SEED_TARGETS: OutreachTarget[] = TARGET_TYPES.flatMap((type, groupIndex) => groups[type].map((seed, index) => {
  const [name, city, website, contactChannel, status = "Public route"] = seed;
  const fit = Math.max(18, 25 - Math.floor(index / 7));
  const access = status === "Verified" ? 24 : Math.max(17, 23 - Math.floor(index / 8));
  const trust = Math.max(19, 24 - Math.floor(index / 9));
  const readiness = Math.max(16, 23 - Math.floor(index / 6));
  return { id: `${slug(type)}-${slug(name)}-${groupIndex}-${index}`, name, type, city, website,
    contactRole: defaults[type].role, contactChannel, contactStatus: status, valueProp: defaults[type].offer,
    nextAction: defaults[type].action, nextActionDate: index < 6 ? "Tuần 1" : index < 13 ? "Tuần 2" : "Tuần 3",
    stage: status === "Verified" || index < 4 ? "Qualified" : "Research", fit, access, trust, readiness,
    score: fit + access + trust + readiness, trials: 0, learners: 0,
    notes: "Thông tin từ nguồn công khai; cần xác nhận lại trước khi outreach. Không lưu dữ liệu liên hệ cá nhân riêng tư." };
}));
