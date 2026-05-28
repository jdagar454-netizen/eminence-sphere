import os
import re

target_dir = r"c:\Users\reyur\OneDrive\Documents\website\src\app"

for root, _, files in os.walk(target_dir):
    for file in files:
        if file.endswith('.jsx'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()

            original_content = content

            if 'useScrollReveal' in content:
                content = re.sub(r'import\s+{\s*useScrollReveal\s*}\s+from\s+[\'"].*?useScrollReveal.*?[\'"];?\n?', '', content)
                content = re.sub(r'\s*useScrollReveal\(\);\n?', '\n', content)
            
            if 'reveal' in content:
                if 'import FadeIn' not in content:
                    depth = root[len(target_dir):].count(os.sep)
                    prefix = '../' * (depth + 1) if depth > 0 else '../'
                    # if it is in src/app, depth is 0, so '../components/FadeIn'
                    # wait, from app/page.jsx to components is '../components'.
                    
                    content = content.replace('"use client";\n', f'"use client";\nimport FadeIn from "{prefix}components/FadeIn";\n')

            # We want to replace <div className="card reveal reveal-delay-1"> with <FadeIn className="card" delay={0.1}>
            # We want to replace <h1 className="heading-xl page-hero-title reveal"> with <FadeIn as="h1" className="heading-xl page-hero-title">
            
            def replace_tag(match):
                tag = match.group(1)
                before_class = match.group(2)
                class_str = match.group(3)
                after_class = match.group(4)
                
                delay = 0
                delay_match = re.search(r'reveal-delay-(\d+)', class_str)
                if delay_match:
                    delay = int(delay_match.group(1)) * 0.1
                
                # clean class
                clean_class = re.sub(r'\s*reveal(?:-delay-\d+)?', '', class_str).strip()
                
                props = ""
                if tag != 'div':
                    props += f' as="{tag}"'
                if clean_class:
                    props += f' className="{clean_class}"'
                if delay > 0:
                    props += f' delay={{{delay}}}'
                    
                return f'<FadeIn{props}{before_class}{after_class}>'
            
            # Match opening tags with reveal class
            content = re.sub(r'<([a-zA-Z0-9]+)(\s*[^>]*?)className=["\']([^"\']*?reveal[^"\']*?)["\']([^>]*?)>', replace_tag, content)
            
            # Now we need to close FadeIn. This is hard with regex because we don't know where the closing tag is.
            # INSTEAD, since the script above changes the opening tag to <FadeIn>, we can't just blindly change all </div> to </FadeIn>.
            # THIS IS WHY REGEX IS BAD FOR HTML/JSX.
            
            # Let's NOT use this approach. Let's write changes back only if successful.
