export interface Photo {
  src: string;
  alt: string;
}

export interface Album {
  name: string;
  cover: string;
  photos: Photo[];
}

export const albums: Album[] = [
  {
    name: "西昌",
    cover: "https://i.postimg.cc/yYRhBw1S/3c0f0d53d2958fabb603e76b675518f3.jpg",
    photos: [
      { src: "https://i.postimg.cc/yYRhBw1S/3c0f0d53d2958fabb603e76b675518f3.jpg", alt: "西昌 1" },
      { src: "https://i.postimg.cc/gjCv8KDN/7f9b9ff0446356ec8b475e6683ab9dd7.jpg", alt: "西昌 2" },
      { src: "https://i.postimg.cc/kXSN9kJ2/839d067ac8dca0a28f12eb387edf4395.jpg", alt: "西昌 3" },
      { src: "https://i.postimg.cc/8k9d21Sh/f486578ca623301a9331fd8b8aad0189.jpg", alt: "西昌 4" },
    ],
  },
];
