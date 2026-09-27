import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers(){
    return [
      {source:"/logo.png",headers:[{key:"Cache-Control",value:"public, max-age=86400, stale-while-revalidate=604800"}]},
      {source:"/ar-assets/logo.webp",headers:[{key:"Cache-Control",value:"public, max-age=604800, stale-while-revalidate=2592000"}]},
    ];
  },
};

export default nextConfig;
