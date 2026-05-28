import re
import os

def convert_html_to_jsx(filepath, out_path, js_out_path):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract the main body content between nav and footer/scripts
    # This might need manual tuning depending on the HTML structure
    body_match = re.search(r'</nav>[\s\S]*?(<section class="admin-dashboard">[\s\S]*?)</section>', content)
    if not body_match:
        print("Could not find the main section")
        return

    main_html = body_match.group(1) + "</section>"

    # Extract inline style in head
    style_match = re.search(r'<style>([\s\S]*?)</style>', content)
    if style_match:
        with open('src/app/globals.css', 'a', encoding='utf-8') as sf:
            sf.write("\n" + style_match.group(1))

    # Extract inline scripts
    script_matches = re.findall(r'<script(?![^>]*src)[^>]*>([\s\S]*?)</script>', content)
    script_content = "\n".join(script_matches)

    # Convert HTML to JSX
    jsx = main_html.replace('class=', 'className=')
    jsx = jsx.replace('for=', 'htmlFor=')
    # Self close tags
    jsx = re.sub(r'<(img|hr|br|input)([^>]*)>', r'<\1\2 />', jsx)
    jsx = jsx.replace('/>>', '/>')
    
    # Inline styles
    def style_replacer(match):
        style_str = match.group(1)
        styles = []
        for prop in style_str.split(';'):
            if not prop.strip(): continue
            key, val = prop.split(':', 1)
            key = key.strip()
            val = val.strip()
            # camelCase keys
            parts = key.split('-')
            camel_key = parts[0] + ''.join(p.capitalize() for p in parts[1:])
            # numbers vs strings
            if val.replace('.','',1).isdigit():
                styles.append(f"{camel_key}: {val}")
            else:
                styles.append(f"{camel_key}: '{val}'")
        return 'style={{ ' + ', '.join(styles) + ' }}'
    jsx = re.sub(r'style="([^"]*)"', style_replacer, jsx)

    page_content = f"""import React from 'react';
import Script from 'next/script';

export default function PipelinePage() {{
  return (
    <main>
      {{/* Inject Firebase logic */}}
      <Script src="/js/pipeline-logic.js" strategy="lazyOnload" />
      {jsx}
    </main>
  );
}}
"""
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(page_content)
        
    os.makedirs(os.path.dirname(js_out_path), exist_ok=True)
    with open(js_out_path, 'w', encoding='utf-8') as f:
        f.write(script_content)

convert_html_to_jsx('pipeline.html', 'src/app/pipeline/page.jsx', 'public/js/pipeline-logic.js')
