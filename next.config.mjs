/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'cnn-arabic-images.cnn.io' },
      { hostname: 'peregrinetreks.com' },
      { hostname: 'images.unsplash.com' },
      { hostname: 'images.squarespace-cdn.com' },
      { hostname: 'nawafir-tours.com' },
      { hostname: 'salalahsafari.com' },
      { hostname: 'ik.imagekit.io' },
      { hostname: 'alwatan.om' },
      { hostname: 'cdn4.premiumread.com' },
      { hostname: 'modo3.com' },
      { hostname: 'upload.wikimedia.org' },
      { hostname: 'wejhatt.com' },
      { hostname: 'www.aspdkw.com' },
      // image service APIs
      { hostname: 'images.pexels.com' },
      { hostname: 'rockidentifier.com' },
      { hostname: 'pixabay.com' },
      { hostname: 'cdn.pixabay.com' },
      { hostname: 'www.omanobserver.om' },
      { hostname: 'd24d7vsshzrslo.cloudfront.net' },
      { hostname: 'www.new-educ.com' },

    ],
  },
};

export default nextConfig;
