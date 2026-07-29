from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    b = p.chromium.launch(headless=True)
    for w, tag in ((1440, 'lg'), (800, 'sm'), (420, 'xs')):
        page = b.new_page(viewport={'width': w, 'height': 1000})
        page.goto('http://localhost:5173/about')
        page.wait_for_load_state('networkidle')
        page.locator('ol li').first.scroll_into_view_if_needed()
        page.wait_for_timeout(1500)
        out = []
        for i in range(6):
            li = page.locator('ol li').nth(i)
            r = li.locator('span[aria-hidden]').nth(0)
            d = li.locator('span[aria-hidden]').nth(1)
            out.append((i, r.is_visible() if r.count() else None, d.is_visible() if d.count() else None))
        print(tag, out)
        page.close()
    b.close()
