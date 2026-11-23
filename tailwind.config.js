/** Preflight is off so Tailwind's reset doesn't change the invitation's exact look. */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  corePlugins: { preflight: false },
  theme: { extend: { colors: { royal: '#6b3fa0', deep: '#3b1f63', lav: '#e9ddf7' } } },
  plugins: [],
}
