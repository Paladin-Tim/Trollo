import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3005", // Your backend API server
        changeOrigin: true, // Needed for virtual hosted sites
        rewrite: (path) => path.replace(/^\/api/, ""), // Optional: Remove '/api' prefix from the request path
        // secure: false, // Optional: Set to false if your target is an insecure (HTTP) server
        // configure: (proxy, options) => {
        //   proxy.on('proxyReq', (proxyReq, req, res) => {
        //     console.log('Proxy Request:', req.method, req.url);
        //   });
        // }, // Optional: Custom configuration for the proxy instance
      },
      // You can add more proxy rules for other paths:
      // '/auth': {
      //   target: 'http://localhost:4000',
      //   changeOrigin: true,
      // },
    },
  },
});
