import { test, expect, defineConfig } from "@playwright/test";

test.describe("home page", () => {
  test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test.
    await page.goto("https://www.youtube.com/");
  });
  test("has title", async ({ page }) => {
    // Expect a title "to contain" a substring.

    await expect(page).toHaveTitle(/YouTube/);
  });

  test("to trending", async ({ page }) => {
    await page.locator('#guide-button').getByLabel('Guide').click()
    await page.locator('[title="Trending"]').click();
    const currentUrl = await page.url();
    expect(currentUrl.includes("https://www.youtube.com/feed/trending"));
  
  });
});

test.describe("trending page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.youtube.com/feed/trending");
  });

  test("has correct url", async ({ page }) => {
    const currentUrl = await page.url();
    expect(currentUrl.includes("https://www.youtube.com/feed/trending"));

  });

  test("has tabs", async ({ page }) => {
    await expect(page.locator('[tab-title=Now]')).toBeVisible();
    await expect(page.locator('[tab-title=Music]')).toBeVisible();
    await expect(page.locator('[tab-title=Gaming]')).toBeVisible();
    await expect(page.locator('[tab-title=Movies]')).toBeVisible();
 
  });

  test("has videos", async ({ page },testInfo) => {
    await expect(page.locator('ytd-video-renderer').first()).toBeVisible();
    const screenshot = await page.screenshot();

    // Attach the screenshot to the report
    await testInfo.attach('Example Screenshot', {
        body: screenshot,
        contentType: 'image/png',
    });

  });
});
