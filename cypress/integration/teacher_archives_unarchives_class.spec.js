import constants from '../support/constants.js'
import teacherHomePageElements from '../support/elements/teacher_home_page_elements.js'
import manageClassesPageElements from '../support/elements/manage_classes_page_elements.js'
import userHomePageElements from '../support/elements/user_home_page_elements.js'

let className = undefined;

context("Verify teacher can archive and unarchive a class", () => {

  before(function() {
    cy.visit(constants.LEARN_PORTAL_BASE_URL); // Visit LEARN Portal home page
    cy.login(constants.TEACHER_USERNAME, constants.TEACHER_PASSWORD); // Login as teacher user
  });

  after(function() {
    cy.logout();
  });

  it("Verify teacher is able to unarchive a class", () => {
    cy.contains(teacherHomePageElements.LEFT_NAV_CLASSES.selector, "Classes").click(); // Expand Classes section in the left nav bar
    cy.get(teacherHomePageElements.LEFT_NAV_MANAGE_CLASSES.selector).click(); // Click Manage Classes in the left nav bar
    cy.get(manageClassesPageElements.LAST_CLASS_ARCHIVE_UNARCHIVE.selector).should("have.text", "Unarchive").click(); // Click Unarchive button on the last added class
    cy.get(userHomePageElements.HEADER_MYCLASSES.selector).click(); // Navigate to the Getting Started page
    cy.contains(teacherHomePageElements.LEFT_NAV_CLASSES.selector, "Classes").click(); // Expand Classes section in the left nav bar
    cy.get(teacherHomePageElements.LEFT_NAV_CLASS_NAME.selector); // The unarchived class should exist in the left nav bar
  });

  it("Verify teacher is able to archive a class", () => {
    cy.get(teacherHomePageElements.LEFT_NAV_MANAGE_CLASSES.selector).click(); // Click Manage Classes in the left nav bar
    cy.get(manageClassesPageElements.LAST_CLASS_ARCHIVE_UNARCHIVE.selector).should("have.text", "Archive").click(); // Click Archive button on the last added class
    cy.get(userHomePageElements.HEADER_MYCLASSES.selector).click(); // Navigate to the Getting Started page
    cy.contains(teacherHomePageElements.LEFT_NAV_CLASSES.selector, "Classes").click(); // Expand Classes section in the left nav bar
    cy.get(teacherHomePageElements.LEFT_NAV_CLASS_NAME.selector).should("not.exist"); // The archived class should not exist in the left nav bar
  });
});
