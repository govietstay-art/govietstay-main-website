import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
    remotePatterns:[
      {protocol:"https",hostname:"vietnamtourism.vn",pathname:"/imguploads/**"},
      {protocol:"https",hostname:"minera.vn",pathname:"/static/upload/images/**"},
    ],
    formats:["image/avif","image/webp"],
  },
  async headers(){
    return [
      {source:"/logo.png",headers:[{key:"Cache-Control",value:"public, max-age=86400, stale-while-revalidate=604800"}]},
      {source:"/ar-assets/logo.webp",headers:[{key:"Cache-Control",value:"public, max-age=604800, stale-while-revalidate=2592000"}]},
      {source:"/ar-assets/hero-hoian.webp",headers:[{key:"Cache-Control",value:"public, max-age=604800, stale-while-revalidate=2592000"}]},
    ];
  },
};

export default nextConfig;
