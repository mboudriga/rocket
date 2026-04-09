import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const BASE_PATH = '/rocket/';

// index.html — inject <base href> after <head> (no existing base tag)
const indexFile = 'storybook-static/index.html';
let indexHtml = readFileSync(indexFile, 'utf-8');
if (!indexHtml.includes(`<base href="${BASE_PATH}"`)) {
  indexHtml = indexHtml.replace('<head>', `<head>\n    <base href="${BASE_PATH}">`);
  writeFileSync(indexFile, indexHtml);
  console.log(`  index.html: injected <base href="${BASE_PATH}">`);
}

// iframe.html — has existing <base target="_parent" />, add href to it
const iframeFile = 'storybook-static/iframe.html';
let iframeHtml = readFileSync(iframeFile, 'utf-8');
if (!iframeHtml.includes(`<base href="${BASE_PATH}"`)) {
  iframeHtml = iframeHtml.replace(
    '<base target="_parent" />',
    `<base href="${BASE_PATH}" target="_parent" />`
  );
  writeFileSync(iframeFile, iframeHtml);
  console.log(`  iframe.html: updated <base> with href="${BASE_PATH}"`);
}

// Fix absolute /favicon.svg references in manager bundles to relative ./favicon.svg
// Storybook's build compiles brandImage: './favicon.svg' to '/favicon.svg' (absolute)
// With <base href="/rocket/">, only relative paths resolve correctly
const addonDirs = readdirSync('storybook-static/sb-addons');
for (const dir of addonDirs) {
  const bundlePath = join('storybook-static/sb-addons', dir, 'manager-bundle.js');
  try {
    let js = readFileSync(bundlePath, 'utf-8');
    if (js.includes('brandImage:"/favicon.svg"')) {
      js = js.replace(/brandImage:"\/favicon\.svg"/g, `brandImage:"./favicon.svg"`);
      writeFileSync(bundlePath, js);
      console.log(`  ${dir}/manager-bundle.js: fixed brandImage path`);
    }
  } catch {
    // Not all addon dirs have manager-bundle.js
  }
}

console.log('Storybook base path fixed for /rocket/');
