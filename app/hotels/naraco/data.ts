export const naracoRooms = [
  { name: "Superior Double", slug: "superior-double", size: 20, bed: "1 Double bed", occupancy: "2 adults + 1 child", feature: "Small window with natural daylight", rate: 650000, photos: "https://drive.google.com/drive/folders/1GvR2Vm794UBTXbIGyanP64KWlBUvTlCm?usp=sharing" },
  { name: "Deluxe King", slug: "deluxe-king", size: 28, bed: "1 King bed", occupancy: "2 adults + 1 child", feature: "Large window with natural daylight", rate: 800000, photos: "https://drive.google.com/drive/folders/12p5SAA91ot6V7XIo3oBCe5H1Z8gTjOGG?usp=sharing" },
  { name: "Deluxe King (View)", slug: "deluxe-king-view", size: 28, bed: "1 King bed", occupancy: "2 adults + 1 child", feature: "Garden-facing balcony and bathtub", rate: 900000, photos: "https://drive.google.com/drive/folders/1ruU-j0ACMbOK3rWHtYnHdDAIu8uINuLT?usp=sharing" },
  { name: "Sky King", slug: "sky-king", size: 24, bed: "1 King bed", occupancy: "2 adults + 1 child", feature: "Large window with an open outlook", rate: 850000, photos: "https://drive.google.com/drive/folders/1EKxbe84tbvRWY1NNXnA5hXQCXcGk00aj?usp=sharing" },
  { name: "Family Room", slug: "family-room", size: 48, bed: "2 Double beds", occupancy: "4 adults", feature: "Garden and pool outlook; bathtub", rate: 1500000, photos: "https://drive.google.com/drive/folders/1W2VErFlVNBgz6JZr_02iT5GtA0NVWVbN?usp=sharing" },
] as const;

export const naracoSharedPhotos = "https://drive.google.com/drive/folders/1XgRIyJR8cVhGbPPM3cpmkf8dHJXfURkP?usp=sharing";
export const directBookingDiscount = 0.10;
export function discountedRate(rate: number) { return Math.round(rate * (1 - directBookingDiscount)); }
export function formatVnd(rate: number) { return new Intl.NumberFormat("vi-VN").format(rate) + " ₫"; }
