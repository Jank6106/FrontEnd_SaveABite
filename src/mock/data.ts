/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FoodItem, Merchant, Order, Review, User } from '../types';

export const mockUser: User = {
  id: 'u1',
  name: 'Bếp Xanh Hàng Mã',
  email: 'bepxanh@saveabite.vn',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZ7EksviZAMSvImVDdIdGT0oXarop-SQJ1l5hNXRPL20z7vr6cDootQEEYv_rEA-4uWD44EyMEckfx70Sqfb9IgfXlL6yBd0mGBcCsWxGgdvRdfejW_Lj314dsGvburiNuVVSS9gRZFwDmDM4bpvItvFc7BFBoIDFtZuXIm22vRcMcX8PGzt-DfiMjN7SaqSxtywDLU18FVJyLoqdmPM8hRGeoXT8i8jl353Eo3-Q8SQvDT6Q37hdx4AR6a6avY3n3JefRK9gquQ',
  role: 'merchant',
  impactScore: 12.5,
};

export const mockMerchants: Merchant[] = [
  {
    id: 'm1',
    name: 'Artisan Bakery & Cafe',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBIVIV2IWAZjk7Bfqpd-4H-xHMvlEMdlGumtpYAL4RIlyRIWP6HzRqFB_-cK_a1qQjdPZwd1KSzty-pgF7uvJEY3EL-hLcPObiL5RWjML2bj0lJyx6zuww3WY9gla0dZFzImItcWac7HDMVw0Fi1H-cxWGHnlCv_ApUu6yP4vfxs_3gsMUR-OmmWrPewicUGrj85V7Kroyi-yJtZGgUt9sjV-tLKqWU_-e9PhdnyyAVs3FtewxAi6k_oOFadhGrk21jolQlGkiIwQ',
    address: '123 Phố Huế, Hai Bà Trưng, Hà Nội',
    openingHours: '07:00 - 21:00',
    rating: 4.8,
    isVerified: true,
    location: { lat: 21.0123, lng: 105.8542 },
  },
  {
    id: 'm2',
    name: 'Green Life Restaurant',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDH49L6xzGecAu3jMpl6_hd-gMzBzU5Lu3EyVon_OiKVMM3RJpLtAPLspjmQg0YhzqtacGCF5nfMTDJxNoon0RcNHaiAnqeXyXsnkI1SpRmgRuWk71C12nJTwh21GkOuAyOi07_OVA8VdV39ZhUchOkleTCCn01CEFhl45ybnPCSb2A-DUprEebrl0lqrK2NVTWMUWAQhLTeb6dEJEok4X7yShDJMHRW-JL1kGp2TQSQGSsaLsAXUj3888uWt1kbOapRyeH6OATtg',
    address: '45 Cầu Giấy, Hà Nội',
    openingHours: '10:00 - 22:00',
    rating: 4.5,
    isVerified: true,
    location: { lat: 21.0367, lng: 105.7833 },
  },
];

export const mockFoodItems: FoodItem[] = [
  {
    id: 'f1',
    name: 'Túi Bất Ngờ - Bakery',
    merchantId: 'm1',
    merchantName: 'Tiệm Bánh Mỳ Phố Cổ',
    originalPrice: 140000,
    discountPrice: 35000,
    discountPercentage: 75,
    category: 'Bánh mỳ',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkbGggX4BowTY2QkdnUHGj9Zb5jLdnv8QllKvZW_rZamUaS9tTFNTipL5KrpbBHN5bjA-hpqLbHRdMnD1ywFTUqkBFUsrx_v9NG5oYwHE5McbATMRrpd2VOcdQnufTeFPoJ22Jx3Ocinq7p0KWHx7axHKRHqpqtMNDu-TuVfiHeNqluNznZsN58pzZVbtQoEe34bw_cdm0UbVMrkYBmzpsGzphj8lt0ecI2rcnRhZ_UkD9m8tnzZSfFkysbWZyY_bOJ2AO3uWyvw',
    rating: 4.8,
    expiryTime: 'Hết hạn sau 30p',
    remainingCount: 2,
    description: 'Một túi chứa 3-5 loại bánh mì tươi trong ngày. Các loại bánh có thể bao gồm Croissant, Sourdough, bánh mì đen hoặc bánh ngọt tùy thuộc vào lượng dư thực tế của cửa hàng.',
    impactCo2: 1.2,
  },
  {
    id: 'f2',
    name: 'Bữa Trưa Healthy',
    merchantId: 'm2',
    merchantName: 'Green Life Restaurant',
    originalPrice: 135000,
    discountPrice: 55000,
    discountPercentage: 60,
    category: 'Nhà hàng',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDETjQA_OpuFoNtca63zwi0622w6Di5qD4cZDVf5ZT2mvm4Yylp47y2kJBo8WW-_ZoNXtvciPJujfKdEE9f1WhOtQwPV44ewvH_KPJk-g4_ZfdKGbm-TSEP-UKp3CtwNHwG55EvCcJ-xrb-i9DZm3kcAjQQnmpKjxfctBX6CCL895j3BaURW3WfQ-3dqOYetTSpBQN0KO4KY43ypbSrcEGiN1EHRh1f7l7MUxPEiLB3VNgaHmE6vOCpQqjnkJ9zmGoZXI6mReup9A',
    rating: 4.5,
    expiryTime: 'Nhận lúc 18:00 - 19:30',
    remainingCount: 5,
    description: 'Bữa trưa dinh dưỡng với rau củ tươi sạch và protein lành mạnh.',
    impactCo2: 0.8,
  },
  {
    id: 'f3',
    name: 'Túi Hoa Quả Tươi',
    merchantId: 'm3',
    merchantName: 'Fresh Mart Cầu Giấy',
    originalPrice: 98000,
    discountPrice: 49000,
    discountPercentage: 50,
    category: 'Tạp hóa',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfwSTNpPNn01khnZjIp9ZbFaxTcPGjNsjUnsLPjxLhb9u7p1UCkw3A8sDbwbOeN7lkY_bHAJ7nDTstsTs1s4S5vchHx6xoPKgS2GLv0PRBkq9iPpuPjOKvnMHg-BQlUfz6uiqDsFF9vsFrRFLgASCcTupmTLESWthO0TlKNHpxxXEribr7w6sbNw6g6F4d-dndVWceN_o0DNe0GOvGsksh4AnLjn5769J77ZweEX5Db0i0LSufOwj5F5Zd8fuU7l2R7igxG-XSuw',
    rating: 4.2,
    expiryTime: 'Cách 1.2 km',
    remainingCount: 1,
    description: 'Các loại trái cây tươi ngon theo mùa, được đóng gói cẩn thận.',
    impactCo2: 0.5,
  },
  {
    id: 'f4',
    name: 'Set Đồ Nướng Sẵn',
    merchantId: 'm4',
    merchantName: 'BBQ Corner',
    originalPrice: 425000,
    discountPrice: 85000,
    discountPercentage: 80,
    category: 'Đồ mặn',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrDfjvjfU8MMmLoVXQv2f04wTaVVON1mb6D1IKV8ev8p2ipjMBpIHwe5gkpnyu2qkgeJR3GThVj_bT-Y65u045V2gaqQzMRgSzkiCvMMqRaL9zI1_YstajmflvmdggwLHjK9_-ssfT4iSc9Ebz4tnp9C-K8GyOy3BoIqvzpmnhPJza9U3U-vyu9zbCBNzaGUYtYAk_EEKzHhQzGAp7KFnMfU4WVSZ6cZES1AM7xC2jInBYzDzpb2NlsLPaf-AGH2IzjFqEzC2yag',
    rating: 4.9,
    expiryTime: 'Kết thúc sau 15p',
    remainingCount: 2,
    description: 'Set đồ nướng đầy đủ gia vị, chỉ cần hâm nóng hoặc nướng lại.',
    impactCo2: 1.5,
  },
];

export const mockReviews: Review[] = [
  {
    id: 'r1',
    userId: 'u2',
    userName: 'Minh Anh',
    rating: 5,
    comment: 'Bánh vẫn còn giòn và rất thơm. Một deal quá hời cho buổi tối!',
    createdAt: '2 giờ trước',
  },
  {
    id: 'r2',
    userId: 'u3',
    userName: 'Hoàng Nam',
    rating: 4,
    comment: 'Cửa hàng sạch sẽ, nhân viên thân thiện. Túi surprise rất đa dạng.',
    createdAt: 'Hôm qua',
  },
];

export const mockOrders: Order[] = [
  {
    id: 'SB-9021',
    userId: 'u1',
    merchantId: 'm1',
    merchantName: 'Nguyễn Văn A',
    items: [{ foodItemId: 'f1', name: 'Túi Surprise', quantity: 2, price: 35000 }],
    totalAmount: 70000,
    status: 'pending',
    pickupTime: '18:30',
    createdAt: '2024-03-26T18:00:00Z',
    impactCo2: 2.4,
  },
];
