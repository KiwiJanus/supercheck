import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../pages/base.page";
import { routes } from "../utils/env";

/**
 * Page Object for the Variables page (/variables)
 *
 * Handles interactions with the variables list including:
 * - Viewing variable list with pagination (TODO)
 * - Creating variables
 * - Filtering and searching (TODO)
 * - Viewing variable details (TODO)
 */
export class VariablesPage extends BasePage {
  // Page elements
  readonly pageTitle: Locator;
  readonly createButton: Locator;
  readonly searchInput: Locator;
  readonly dataTable: Locator;
  readonly tableRows: Locator;
  readonly emptyState: Locator;

  // Filters
  readonly statusFilter: Locator;
  readonly typeFilter: Locator;

  // Pagination
  readonly prevPageButton: Locator;
  readonly nextPageButton: Locator;
  readonly pageIndicator: Locator;

  // Actions
  readonly rowActionsMenu: Locator;
  readonly editAction: Locator;
  readonly deleteAction: Locator;
  readonly pauseAction: Locator;
  readonly resumeAction: Locator;

  // Delete dialog
  readonly deleteDialog: Locator;
  readonly deleteConfirmButton: Locator;
  readonly deleteCancelButton: Locator;

  constructor(page: Page) {
    super(page);

    // Page elements
    this.pageTitle = page
      .locator("h1, h2")
      .filter({ hasText: /variables/i })
      .first();

    this.createButton = page
      .locator('[data-testid="create-variable-button"]')
      .or(page.locator('button:has-text("Create Variable")'))
      .or(page.locator('a:has-text("Create Variable")'));

    this.searchInput = page
      .locator('[data-testid="search-input"]')
      .or(page.locator('input[placeholder*="Search"]'))
      .or(page.locator('input[placeholder*="search"]'));

    this.dataTable = page
      .locator('[data-testid="monitors-table"]')
      .or(page.locator("table"))
      .or(page.locator('[role="table"]'));

    this.tableRows = page.locator("tbody tr").or(page.locator('[role="row"]'));

    this.emptyState = page
      .locator('[data-testid="empty-state"]')
      .or(page.locator("text=/no monitors/i"))
      .or(page.locator("text=/create your first monitor/i"));

    // Filters
    this.statusFilter = page
      .locator('[data-testid="status-filter"]')
      .or(page.locator('button:has-text("Status")'));

    this.typeFilter = page
      .locator('[data-testid="type-filter"]')
      .or(page.locator('button:has-text("Type")'));

    // Pagination
    this.prevPageButton = page
      .locator('[data-testid="prev-page"]')
      .or(page.locator('button:has-text("Previous")'))
      .or(page.locator('button[aria-label="Previous page"]'));

    this.nextPageButton = page
      .locator('[data-testid="next-page"]')
      .or(page.locator('button:has-text("Next")'))
      .or(page.locator('button[aria-label="Next page"]'));

    this.pageIndicator = page
      .locator('[data-testid="page-indicator"]')
      .or(page.locator("text=/page \\d+ of \\d+/i"));

    // Row actions
    this.rowActionsMenu = page
      .locator('[data-testid="row-actions"]')
      .or(page.locator('button[aria-haspopup="menu"]'));

    this.editAction = page
      .locator('[data-testid="edit-action"]')
      .or(page.getByRole("menuitem", { name: /edit/i }));

    this.deleteAction = page
      .locator('[data-testid="delete-action"]')
      .or(page.getByRole("menuitem", { name: /delete/i }));

    this.pauseAction = page
      .locator('[data-testid="pause-action"]')
      .or(page.getByRole("menuitem", { name: /pause/i }));

    this.resumeAction = page
      .locator('[data-testid="resume-action"]')
      .or(page.getByRole("menuitem", { name: /resume/i }));

    // Delete dialog
    this.deleteDialog = page
      .locator('[role="alertdialog"]')
      .or(page.locator('[data-testid="delete-dialog"]'));

    this.deleteConfirmButton = this.deleteDialog.locator(
      'button:has-text("Delete")'
    );
    this.deleteCancelButton = this.deleteDialog.locator(
      'button:has-text("Cancel")'
    );
  }

  /**
   * Navigate to the variables page
   */
  async navigate(): Promise<void> {
    await this.goto(routes.variables);
    await this.waitForPageLoad();
  }

  /**
   * Click the create variable button
   */
  async clickCreate(): Promise<void> {
    await this.createButton.click();
  }

}