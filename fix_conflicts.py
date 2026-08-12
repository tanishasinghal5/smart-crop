import os
import re

files_to_fix_ask = ['dashboard.html', 'index.html', 'planner.html', 'login.html']
for filename in files_to_fix_ask:
    path = os.path.join('c:/Users/Dell/Downloads/terrabyte', filename)
    if not os.path.exists(path): continue
    with open(path, 'r', encoding='utf-8') as f:
        html = f.read()
    
    # Remove 'Ask Mita'
    html = re.sub(r'<a href="#ask" data-i18n="ask">Ask Mita</a>', '', html)
    html = re.sub(r'<a href="dashboard\.html#ask" data-i18n="ask">Ask Mita</a>', '', html)
    
    # Ensure widget.js is included
    if 'krishi_sahayak/frontend/widget.js' not in html:
        html = html.replace('</body>', '<script src="krishi_sahayak/frontend/widget.js"></script></body>')
        
    with open(path, 'w', encoding='utf-8') as f:
        f.write(html)

# Fix styles.css
css_path = 'c:/Users/Dell/Downloads/terrabyte/styles.css'
with open(css_path, 'r', encoding='utf-8') as f:
    css = f.read()

# Update buttons
css = css.replace('.dashboard-hero .hero-nav-btn{background:#ede2a9;color:#1a3520}', '.dashboard-hero .hero-nav-btn{background:var(--gold);color:var(--forest)}')
css = css.replace('.dashboard-hero .hero-nav-btn.secondary{background:transparent;border:1px solid #ede2a9;color:#ede2a9}', '.dashboard-hero .hero-nav-btn.secondary{background:transparent;border:1px solid var(--gold);color:var(--gold)}')

with open(css_path, 'w', encoding='utf-8') as f:
    f.write(css)

print('Post-merge fixes applied.')
