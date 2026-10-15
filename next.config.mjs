/** @type {import('next').NextConfig} */

// Base44 sandbox preview: allow the preview origin to reach dev assets / HMR.
// Only enabled when the platform passes BASE44_PREVIEW_MODE=1 and a host suffix.
const previewMode = process.env.BASE44_PREVIEW_MODE === '1';
const publicHostSuffix = process.env.BASE44_PUBLIC_HOST_SUFFIX;

const nextConfig = {
  reactStrictMode: true,
  ...(previewMode && publicHostSuffix
    ? { allowedDevOrigins: [`https://3000-${publicHostSuffix}`] }
    : {}),
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'i.ibb.co' }],
  },
};

export default nextConfig;
