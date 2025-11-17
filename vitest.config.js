/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.js'],
    css: false, // Don't process CSS in tests to avoid issues
    // Mock CSS and asset files
    transformMode: {
      web: [/\.[jt]sx?$/],
    },
    // Handle file imports
    alias: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
    }
  },
})