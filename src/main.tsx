import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.tsx'
import './index.css'
import './styles/global.css'

// Performance monitoring
const reportWebVitals = (metric: any) => {
  if (metric.name === 'FCP') {
    console.log('First Contentful Paint:', metric.value);
  }
  if (metric.name === 'LCP') {
    console.log('Largest Contentful Paint:', metric.value);
  }
  if (metric.name === 'FID') {
    console.log('First Input Delay:', metric.value);
  }
  if (metric.name === 'CLS') {
    console.log('Cumulative Layout Shift:', metric.value);
  }
};

// Report Web Vitals
if (process.env.NODE_ENV === 'production') {
  import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP }) => {
    getCLS(reportWebVitals);
    getFID(reportWebVitals);
    getFCP(reportWebVitals);
    getLCP(reportWebVitals);
  });
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </HelmetProvider>
);
