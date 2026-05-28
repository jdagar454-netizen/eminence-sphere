import os
import re

directory = r"c:\Users\reyur\OneDrive\Documents\website\src\app"

for root, _, files in os.walk(directory):
    for file in files:
        if file.endswith('.jsx'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()

            if 'useScrollReveal' in content:
                # Remove useScrollReveal import
                content = re.sub(r'import\s+{\s*useScrollReveal\s*}\s+from\s+[\'"].*?useScrollReveal[\'"];?\n?', '', content)
                # Remove useScrollReveal() hook call
                content = re.sub(r'\s*useScrollReveal\(\);\n?', '\n', content)
                
                # Add motion import
                if 'import { motion }' not in content:
                    content = content.replace('"use client";\n', '"use client";\nimport { motion } from "framer-motion";\n')

                # Replace <div className="... reveal ..."> with <motion.div>
                # We need to be careful. The reveal class could be anywhere in the string.
                
                def replace_reveal_div(match):
                    tag = match.group(1) # div, section, etc.
                    class_attr = match.group(2)
                    rest = match.group(3)
                    
                    # Remove reveal from class
                    classes = class_attr.split()
                    if 'reveal' in classes:
                        classes.remove('reveal')
                    new_class_attr = ' '.join(classes)
                    
                    motion_props = 'initial={{opacity:0, y:40}} whileInView={{opacity:1, y:0}} viewport={{once:true, margin:"-60px"}} transition={{duration:0.6, ease:"easeOut"}}'
                    
                    return f'<motion.{tag} className="{new_class_attr}" {motion_props}{rest}'

                content = re.sub(r'<([a-zA-Z0-9]+)\s+className=[\'"]([^\'"]*?reveal[^\'"]*?)[\'"](.*?)', replace_reveal_div, content, flags=re.DOTALL)
                
                # Close motion tags - this is trickier with regex. Let's just do simple replacements where we know it's a section or div.
                # Since closing tags don't have classes, we can't easily match them. 
                # Actually, a better approach is to wrap the return in an AnimatePresence or just use a custom `<FadeIn>` component.

# Wait, regex for React components is extremely dangerous because of nested tags.
# Instead of doing that, I'll create a custom <FadeIn> component that wraps the children!
