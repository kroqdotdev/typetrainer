import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@typetrainer/shared"],
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "codemirror",
      "@codemirror/view",
      "@codemirror/state",
      "@codemirror/commands",
      "@codemirror/autocomplete",
      "@codemirror/lang-python",
      "@codemirror/language",
    ],
  },
};

export default nextConfig;
