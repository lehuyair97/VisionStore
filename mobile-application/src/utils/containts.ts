import dayjs from "dayjs";

export const comentsData = [
  {
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "Nguyễn Văn A",
    color: "Xanh dương",
    comment: "Sản phẩm rất đẹp, giao hàng nhanh chóng.",
    images: [
      "https://picsum.photos/200/300",
      "https://picsum.photos/200/301",
      "https://picsum.photos/200/302",
      "https://picsum.photos/200/303",
    ],
    likes: 2,
  },
  {
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Trần Thị B",
    color: "Đỏ",
    comment: "Chất lượng rất tốt, sẽ mua thêm lần sau.",
    images: [
      "https://picsum.photos/200/304",
      "https://picsum.photos/200/305",
      "https://picsum.photos/200/306",
    ],
    likes: 3,
  },
];
export const BuildPCManualData = [
  {
    id: "1",
    subcategory_name: "RAM",
    name: "Corsair Vengeance LPX 16GB (2 x 8GB) DDR4-3200",
    price: "$75.99",
    original_price: "$89.99",
    quantity: 30,
    image:
      "https://bizweb.dktcdn.net/thumb/grande/100/329/122/products/ram-pc-corsair-vengeance-lpx-8gb-3200mhz-ddr4-cmk16gx4m2e3200c16-8-26cb337e-4122-4bb7-bc55-54f38f4f086a-3b650c5f-51f8-4890-8951-95206ff25145.jpg?v=1726626578813",
  },
  {
    id: "2",
    subcategory_name: "CPU",
    name: "Intel Core i7-11700K",
    price: "$349.99",
    original_price: "$399.99",
    quantity: 15,
    image:
      "https://dlcdnimgs.asus.com/websites/global/products/tcymjbjbhzloect5/img/z490/style/customization-front.png",
  },
  {
    id: "3",
    subcategory_name: "GPU",
    name: "NVIDIA GeForce RTX 3080",
    price: "$699.99",
    original_price: "$799.99",
    quantity: 10,
    image: "https://images.anandtech.com/doci/17204/RTX_3080_12GB_678x452.jpg",
  },
  {
    id: "4",
    subcategory_name: "Motherboard",
    name: "ASUS ROG Strix Z490-E Gaming",
    price: "$249.99",
    original_price: "$299.99",
    quantity: 20,
    image:
      "https://dlcdnimgs.asus.com/websites/global/products/tcymjbjbhzloect5/img/z490/style/customization-front.png",
  },
  {
    id: "5",
    subcategory_name: "SSD",
    name: "Samsung 970 EVO Plus 1TB NVMe M.2",
    price: "$129.99",
    original_price: "$149.99",
    quantity: 25,
    image:
      "https://m.media-amazon.com/images/I/61XDwt17G4L._AC_UF894,1000_QL80_.jpg",
  },
  {
    id: "6",
    subcategory_name: "Power Supply",
    name: "EVGA 600 W1, 80+ WHITE 600W",
    price: "$49.99",
    original_price: "$59.99",
    quantity: 18,
    image:
      "https://images.evga.com/products/gallery/png/100-W1-0600-K1_LG_1.png",
  },
];
export const banners = [
  require("./../assets/icons/banner.png"),
  require("./../assets/icons/banner2.png"),
  require("./../assets/icons/banner.png"),
];

export const iconMap: { [key: string]: string } = {
  Laptop: "home",
  PC: "desktop",
  "Linh  kiện": "microchip",
  "Phụ kiện": "headphones",
};

export const shipingStatus = [
  { id: "1", name: "Chờ thanh toán", icon: "credit-card" },
  { id: "2", name: "Đang Xử lý", icon: "user" },
  { id: "3", name: "Đang vận chuyển", icon: "truck" },
  { id: "4", name: "Đã giao", icon: "clipboard" },
  { id: "5", name: "Đổi trả", icon: "rotate-left" },
];


export const deliveryMethods = [
  {
    method: "Giao nhanh",
    description: "Giao hàng nhanh",
    estimated_delivery_time: dayjs().add(2, "day").format("DD-MM-YYYY"),
    price: 35,
  },
  {
    method: "Giao thường",
    description: "Giao hàng chậm",
    estimated_delivery_time: dayjs().add(3, "day").format("DD-MM-YYYY"),
    price: 25,
  },
];
