// types/next-pwa.d.ts
declare module 'next-pwa' {
    import { NextConfig } from 'next';
  
    interface PWAOptions {
      dest: string;
      register?: boolean;
      skipWaiting?: boolean;
      disable?: boolean;
      [key: string]: any;
    }
  
    type WithPWA = (nextConfig: NextConfig & { pwa?: PWAOptions }) => NextConfig;
  
    const withPWA: WithPWA;
  
    export default withPWA;
  }
  