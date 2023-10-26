import { test, expect, type Page } from "@playwright/test";
import exp from "constants";

test.describe("SwagLab E2E", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("https://www.saucedemo.com/v1/index.html");
    });

    test("login successfully", async ({ page }) => {
        //Action
        await page.locator("#user-name").fill("standard_user");
        await page.locator("#password").fill("secret_sauce");
        await page.locator("#login-button").click();
        //Assertion
        await expect(page.url()).toContain("inventory.html");
    });

    test("login unsuccessfully", async ({ page }) => {
        //Action
        await page.locator("#user-name").fill("wrong_user");
        await page.locator("#password").fill("wrong_sauce");
        await page.locator("#login-button").click();
        //Assertion
        await expect(page.locator("[data-test='error']")).toContainText("Username and password do not match any user in this service");
    });
});
