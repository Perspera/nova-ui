import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The dev server listens on 0.0.0.0, so Chrome's Origin is 127.0.0.1 and
  // would otherwise be refused the HMR socket. Without that socket, dev hydration stalls.
  allowedDevOrigins: ["127.0.0.1", "*.agent.cvm.dev"],
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
