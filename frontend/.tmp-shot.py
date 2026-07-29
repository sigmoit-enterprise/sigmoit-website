from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={'width': 1440, 'height': 900})
    page.goto('http://localhost:5173/')
    page.wait_for_load_state('networkidle')
    page.wait_for_timeout(1500)

    req = page.locator('text=Tell Us Your Requirement')
    req.scroll_into_view_if_needed()
    page.wait_for_timeout(1500)
    page.screenshot(path='D:/new-sigmoit/.tmp-req.png')

    browser.close()
