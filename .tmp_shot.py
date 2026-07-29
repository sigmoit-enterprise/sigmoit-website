from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    for w, h, tag in ((1440, 1200, 'desk'), (420, 900, 'mob')):
        page = browser.new_page(viewport={'width': w, 'height': h})
        errs = []
        page.on('console', lambda m: errs.append(m.text) if m.type == 'error' else None)
        page.goto('http://localhost:5173/about')
        page.wait_for_load_state('networkidle')
        sec = page.locator('section', has_text='Our Process').last
        sec.scroll_into_view_if_needed()
        page.wait_for_timeout(2500)
        sec.screenshot(path=f'D:/new-sigmoit/.tmp_about_{tag}.png')
        print(tag, 'steps:', page.locator('ol li').count(), 'ERRORS:', errs)
        page.close()
    browser.close()
