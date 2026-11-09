/** Read-only presentation seed for the 6-hotel pilot. No NET rates, partner contacts or private photo URLs belong in browser source. */
export type PilotRoom = {code:string; name:string; sizeSqm:number|null; bed:string; adults:number|null; children:number|null; view:string; breakfast:boolean; photoStatus:"pending"};
export type PilotHotel = {code:string; name:string; address:string; area:string; stars:number|null; description:string; photoStatus:"pending"; rooms:PilotRoom[]};
export const PILOT_HOTELS: PilotHotel[] = [
  {
    "code": "KS01",
    "name": "MANDILA BEACH HOTEL",
    "address": "218 Võ Nguyên Giáp,Phường An Hải,Thành Phố Đà Nẵng , Việt Nam",
    "area": "An Hải - Quận Sơn Trà",
    "stars": 4,
    "description": "Khách sạn 4 sao ven biển Mỹ Khê, sở hữu phòng nghỉ hiện đại, hồ bơi vô cực, nhà hàng, spa, phòng gym và tầm nhìn hướng biển đẹp.",
    "photoStatus": "pending",
    "rooms": [
      {
        "code": "KS01-P01",
        "name": "Deluxe King",
        "sizeSqm": 30,
        "bed": "1 King",
        "adults": null,
        "children": null,
        "view": "Chưa có thông tin",
        "breakfast": true,
        "photoStatus": "pending"
      },
      {
        "code": "KS01-P02",
        "name": "Deluxe Twin",
        "sizeSqm": 30,
        "bed": "2 Twin",
        "adults": null,
        "children": null,
        "view": "Chưa có thông tin",
        "breakfast": true,
        "photoStatus": "pending"
      },
      {
        "code": "KS01-P03",
        "name": "Deluxe Partial Ocean King",
        "sizeSqm": 30,
        "bed": "1 King",
        "adults": null,
        "children": null,
        "view": "Partial Ocean View",
        "breakfast": true,
        "photoStatus": "pending"
      },
      {
        "code": "KS01-P04",
        "name": "Deluxe Partial Ocean Twin",
        "sizeSqm": 30,
        "bed": "2 Twin",
        "adults": null,
        "children": null,
        "view": "Partial Ocean View",
        "breakfast": true,
        "photoStatus": "pending"
      },
      {
        "code": "KS01-P05",
        "name": "ROH (Deluxe & Deluxe Partial)",
        "sizeSqm": null,
        "bed": "Chưa xác nhận",
        "adults": null,
        "children": null,
        "view": "Deluxe hoặc Partial Ocean View",
        "breakfast": true,
        "photoStatus": "pending"
      },
      {
        "code": "KS01-P06",
        "name": "Deluxe Partial Ocean Trip",
        "sizeSqm": 30,
        "bed": "1 King + 1 Twin",
        "adults": null,
        "children": null,
        "view": "Partial Ocean View",
        "breakfast": true,
        "photoStatus": "pending"
      },
      {
        "code": "KS01-P07",
        "name": "Deluxe Ocean Front King",
        "sizeSqm": 30,
        "bed": "1 King",
        "adults": null,
        "children": null,
        "view": "Ocean Front View",
        "breakfast": true,
        "photoStatus": "pending"
      },
      {
        "code": "KS01-P08",
        "name": "Deluxe Ocean Front Twin",
        "sizeSqm": 30,
        "bed": "2 Twin",
        "adults": null,
        "children": null,
        "view": "Ocean Front View",
        "breakfast": true,
        "photoStatus": "pending"
      },
      {
        "code": "KS01-P09",
        "name": "Mandila Ocean Suite",
        "sizeSqm": 47,
        "bed": "1 King",
        "adults": null,
        "children": null,
        "view": "Ocean Front View",
        "breakfast": true,
        "photoStatus": "pending"
      },
      {
        "code": "KS01-P10",
        "name": "Junior Family Ocean Apartment – 2BR",
        "sizeSqm": 69,
        "bed": "1 King + 2 Twin",
        "adults": null,
        "children": null,
        "view": "Partial Ocean View",
        "breakfast": true,
        "photoStatus": "pending"
      },
      {
        "code": "KS01-P11",
        "name": "Mandila Family Ocean Apartment – 3BR",
        "sizeSqm": 139,
        "bed": "2 King + 2 Twin",
        "adults": null,
        "children": null,
        "view": "Ocean Front View",
        "breakfast": true,
        "photoStatus": "pending"
      }
    ]
  },
  {
    "code": "KS02",
    "name": "YARRA OCEAN SUITES",
    "address": "304 Võ Nguyên Giáp, Phường Ngũ Hành Sơn, Thành Phố Đà Nẵng",
    "area": "Quận Ngũ Hành Sơn",
    "stars": 4,
    "description": "khách sạn đạt tiêu chuẩn 4 sao tọa lạc tại địa chỉ 304 Võ Nguyên Giáp, phường Ngũ Hành Sơn, TP. Đà Nẵng, nằm ngay đối diện bãi biển Mỹ Khê danh tiếng.",
    "photoStatus": "pending",
    "rooms": [
      {
        "code": "KS02-P01",
        "name": "Superior",
        "sizeSqm": 28,
        "bed": "Double (2mx2m) Twin (1m2x2m)",
        "adults": 2,
        "children": 2,
        "view": "no view",
        "breakfast": true,
        "photoStatus": "pending"
      },
      {
        "code": "KS02-P02",
        "name": "Superior Triple",
        "sizeSqm": 30,
        "bed": "Triple (1m8 + 1m2x2m)",
        "adults": 3,
        "children": 2,
        "view": "no view",
        "breakfast": true,
        "photoStatus": "pending"
      },
      {
        "code": "KS02-P03",
        "name": "Deluxe Twin",
        "sizeSqm": 28,
        "bed": "Twin (1m2x2m)",
        "adults": 2,
        "children": 2,
        "view": "city view",
        "breakfast": true,
        "photoStatus": "pending"
      },
      {
        "code": "KS02-P04",
        "name": "Yarra",
        "sizeSqm": 30,
        "bed": "Double (2mx2m) Twin (1m2x2m)",
        "adults": 2,
        "children": 2,
        "view": "Partial Ocean View",
        "breakfast": true,
        "photoStatus": "pending"
      },
      {
        "code": "KS02-P05",
        "name": "Junior",
        "sizeSqm": 35,
        "bed": "Double (2mx2m)",
        "adults": 2,
        "children": 2,
        "view": "Seafront View",
        "breakfast": true,
        "photoStatus": "pending"
      },
      {
        "code": "KS02-P06",
        "name": "Premium",
        "sizeSqm": 40,
        "bed": "Double (2mx2m)",
        "adults": 2,
        "children": 2,
        "view": "Seafront View",
        "breakfast": true,
        "photoStatus": "pending"
      },
      {
        "code": "KS02-P07",
        "name": "Bedroom Residence",
        "sizeSqm": 75,
        "bed": "Bed1: Double (2mx2m) Bed2: Twin (1m2x2m)",
        "adults": 4,
        "children": 2,
        "view": "Seafront View",
        "breakfast": true,
        "photoStatus": "pending"
      }
    ]
  },
  {
    "code": "KS03",
    "name": "MAXIMILAN DANANG BEACH HOTEL",
    "address": "222 Vo Nguyen Giap Street, An Hai Ward , Da Nang, Vietnam",
    "area": "Phường An Hải, Đà Nẵng",
    "stars": 4,
    "description": "Tọa lạc trên đường Võ Nguyên Giáp, khách sạn sở hữu không gian hiện đại, tầm nhìn hướng biển và không khí nghỉ dưỡng thoải mái.",
    "photoStatus": "pending",
    "rooms": [
      {
        "code": "KS03-P01",
        "name": "Deluxe",
        "sizeSqm": 28,
        "bed": "Twin/ Double",
        "adults": 2,
        "children": 2,
        "view": "Không có view (Window, no view)",
        "breakfast": true,
        "photoStatus": "pending"
      },
      {
        "code": "KS03-P02",
        "name": "Premier Deluxe",
        "sizeSqm": 28,
        "bed": "Twin/ Double",
        "adults": 2,
        "children": 2,
        "view": "View xéo biển (Partial sea view)",
        "breakfast": true,
        "photoStatus": "pending"
      },
      {
        "code": "KS03-P03",
        "name": "Beachfront Premier Deluxe",
        "sizeSqm": 35,
        "bed": "Twin/ Double",
        "adults": 2,
        "children": 2,
        "view": "View trực diện biển (Seaview)",
        "breakfast": true,
        "photoStatus": "pending"
      },
      {
        "code": "KS03-P04",
        "name": "Family Deluxe (4pax)",
        "sizeSqm": 55,
        "bed": "Twin & Double /Twin & Twin",
        "adults": 4,
        "children": 4,
        "view": "Không có view (Window, no view)",
        "breakfast": true,
        "photoStatus": "pending"
      },
      {
        "code": "KS03-P05",
        "name": "Pent-house Beachfront Diamond (4pax)",
        "sizeSqm": 105,
        "bed": "Double & Double",
        "adults": 4,
        "children": 4,
        "view": "View trực diện biển (Seaview)",
        "breakfast": true,
        "photoStatus": "pending"
      }
    ]
  },
  {
    "code": "KS04",
    "name": "CANVAS ĐÀ NẴNG",
    "address": "234 Vo Nguyen Giap Street, Phuoc My Ward, Son Tra District, Da Nang City",
    "area": "Đà Nẵng – Quận Sơn Trà.",
    "stars": 4,
    "description": "Khách sạn 4 sao với hệ thống phòng nghỉ hiện đại, hồ bơi vô cực, phòng gym và khu vui chơi trẻ em. Phù hợp cho khách du lịch cá nhân, gia đình và khách đoàn.",
    "photoStatus": "pending",
    "rooms": [
      {
        "code": "KS04-P01",
        "name": "Classic King",
        "sizeSqm": 28,
        "bed": "King",
        "adults": 2,
        "children": 2,
        "view": "Có cửa sổ, không view",
        "breakfast": true,
        "photoStatus": "pending"
      },
      {
        "code": "KS04-P02",
        "name": "Premier Twin",
        "sizeSqm": 32,
        "bed": "Twin & Twin",
        "adults": 2,
        "children": 2,
        "view": "Có cửa sổ, không view",
        "breakfast": true,
        "photoStatus": "pending"
      },
      {
        "code": "KS04-P03",
        "name": "Deluxe Twin",
        "sizeSqm": 35,
        "bed": "Twin & Twin",
        "adults": 2,
        "children": 2,
        "view": "Có cửa sổ, không view",
        "breakfast": true,
        "photoStatus": "pending"
      },
      {
        "code": "KS04-P04",
        "name": "Premier Family",
        "sizeSqm": 64,
        "bed": "Twin & Double",
        "adults": 4,
        "children": 2,
        "view": "Có cửa sổ, không view",
        "breakfast": true,
        "photoStatus": "pending"
      },
      {
        "code": "KS04-P05",
        "name": "Grand Beach Front",
        "sizeSqm": 40,
        "bed": "King",
        "adults": 2,
        "children": 2,
        "view": "Ban công/không ban công, view biển.",
        "breakfast": true,
        "photoStatus": "pending"
      },
      {
        "code": "KS04-P06",
        "name": "Grand Beach Front Triple",
        "sizeSqm": 40,
        "bed": "King & Twin",
        "adults": 3,
        "children": 2,
        "view": "Ban công/không ban công, view biển.",
        "breakfast": true,
        "photoStatus": "pending"
      },
      {
        "code": "KS04-P07",
        "name": "CANVAS Suite",
        "sizeSqm": 80,
        "bed": "King",
        "adults": 2,
        "children": 2,
        "view": "Ban công, view biển",
        "breakfast": true,
        "photoStatus": "pending"
      },
      {
        "code": "KS04-P08",
        "name": "Family Suite",
        "sizeSqm": 110,
        "bed": "Twin & Twin & Double",
        "adults": 4,
        "children": 2,
        "view": "Ban công, view biển",
        "breakfast": true,
        "photoStatus": "pending"
      }
    ]
  },
  {
    "code": "KS05",
    "name": "HAIAN BEACH HOTEL & SPA",
    "address": "278 Võ Nguyên Giáp, Phường Ngũ Hành Sơn, TP. Đà Nẵng, Việt Nam",
    "area": "Ngũ Hành Sơn",
    "stars": 4,
    "description": "HAIAN BEACH HOTEL & SPA là khách sạn 4 sao tại Đà Nẵng, cung cấp phòng nghỉ tiện nghi, hồ bơi, xe đạp miễn phí và Wi-Fi tốc độ cao. Phù hợp cho khách du lịch và gia đình.",
    "photoStatus": "pending",
    "rooms": [
      {
        "code": "KS05-P01",
        "name": "Junior Room",
        "sizeSqm": 28,
        "bed": "1 King hoặc 2 Twin",
        "adults": 2,
        "children": 2,
        "view": "Chưa có thông tin",
        "breakfast": true,
        "photoStatus": "pending"
      },
      {
        "code": "KS05-P02",
        "name": "Superior Room",
        "sizeSqm": 30,
        "bed": "1 King hoặc 2 Twin",
        "adults": 2,
        "children": 2,
        "view": "Chưa có thông tin",
        "breakfast": true,
        "photoStatus": "pending"
      },
      {
        "code": "KS05-P03",
        "name": "City View Oasis",
        "sizeSqm": 28,
        "bed": "1 King hoặc 2 Twin",
        "adults": 2,
        "children": 2,
        "view": "Chưa có thông tin",
        "breakfast": true,
        "photoStatus": "pending"
      },
      {
        "code": "KS05-P04",
        "name": "Superior Triple Room",
        "sizeSqm": 32,
        "bed": "1 King + 1 Twin",
        "adults": 3,
        "children": 2,
        "view": "Chưa có thông tin",
        "breakfast": true,
        "photoStatus": "pending"
      },
      {
        "code": "KS05-P05",
        "name": "Beach Front Oasis",
        "sizeSqm": 30,
        "bed": "1 King hoặc 2 Twin",
        "adults": 2,
        "children": 2,
        "view": "Chưa có thông tin",
        "breakfast": true,
        "photoStatus": "pending"
      },
      {
        "code": "KS05-P06",
        "name": "Beach Front Diamond",
        "sizeSqm": 45,
        "bed": "1 King",
        "adults": 2,
        "children": 2,
        "view": "Chưa có thông tin",
        "breakfast": true,
        "photoStatus": "pending"
      },
      {
        "code": "KS05-P07",
        "name": "Beach Front 1-Bedroom Apartment",
        "sizeSqm": 50,
        "bed": "1 King",
        "adults": 2,
        "children": 2,
        "view": "Chưa có thông tin",
        "breakfast": true,
        "photoStatus": "pending"
      },
      {
        "code": "KS05-P08",
        "name": "1-Bedroom Royal Pent House",
        "sizeSqm": 50,
        "bed": "1 King",
        "adults": 2,
        "children": 2,
        "view": "Chưa có thông tin",
        "breakfast": true,
        "photoStatus": "pending"
      },
      {
        "code": "KS05-P09",
        "name": "2-Bedroom Royal Pent House",
        "sizeSqm": 75,
        "bed": "1 King + 2 Twin",
        "adults": 4,
        "children": 4,
        "view": "Chưa có thông tin",
        "breakfast": true,
        "photoStatus": "pending"
      },
      {
        "code": "KS05-P10",
        "name": "2-Bedroom Royal Pent House (City View)",
        "sizeSqm": 75,
        "bed": "1 King + 2 Twin",
        "adults": 4,
        "children": 4,
        "view": "Chưa có thông tin",
        "breakfast": true,
        "photoStatus": "pending"
      },
      {
        "code": "KS05-P11",
        "name": "3-Bedroom Royal Pent House",
        "sizeSqm": 85,
        "bed": "2 King + 2 Twin",
        "adults": 6,
        "children": 6,
        "view": "Chưa có thông tin",
        "breakfast": true,
        "photoStatus": "pending"
      }
    ]
  },
  {
    "code": "KS06",
    "name": "NARACO",
    "address": "Chưa có trong file nguồn",
    "area": "Chưa xác nhận",
    "stars": null,
    "description": "Bảng thông tin phòng Naraco do đối tác cung cấp.",
    "photoStatus": "pending",
    "rooms": [
      {
        "code": "KS06-P01",
        "name": "Superior Double",
        "sizeSqm": 20,
        "bed": "01 giường Double",
        "adults": 2,
        "children": 1,
        "view": "",
        "breakfast": true,
        "photoStatus": "pending"
      },
      {
        "code": "KS06-P02",
        "name": "Deluxe King",
        "sizeSqm": 28,
        "bed": "01 giường King",
        "adults": 2,
        "children": 1,
        "view": "",
        "breakfast": true,
        "photoStatus": "pending"
      },
      {
        "code": "KS06-P03",
        "name": "Deluxe King (View)",
        "sizeSqm": 28,
        "bed": "01 giường King",
        "adults": 2,
        "children": 1,
        "view": "Ban công; hướng vườn",
        "breakfast": true,
        "photoStatus": "pending"
      },
      {
        "code": "KS06-P04",
        "name": "Sky King",
        "sizeSqm": 24,
        "bed": "01 giường King",
        "adults": 2,
        "children": 1,
        "view": "",
        "breakfast": true,
        "photoStatus": "pending"
      },
      {
        "code": "KS06-P05",
        "name": "Family Room",
        "sizeSqm": 48,
        "bed": "02 giường Double",
        "adults": 4,
        "children": 0,
        "view": "Nhìn ra vườn; hồ bơi",
        "breakfast": true,
        "photoStatus": "pending"
      }
    ]
  }
];
