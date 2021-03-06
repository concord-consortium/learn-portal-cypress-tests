import noticesPageElements from "../elements/notices_page_elements";
import userHomePageElements from "../elements/user_home_page_elements";
import adminPageElements from "../elements/admin_page_elements";

const RECENT_ACTIVITY_URL = 'https://test.dev.docker/recent_activity#';

export function createNotice(noticeText){
    //This API assumes that we just logged in as admin user
    addNotice(noticeText);
    submitNotice();
    cy.get(noticesPageElements.TABLE_ENTRY).contains(noticeText); // Check the notice is displayed in the 'Notices' table in the Admin page
}

export function editNotice(oldText, newText){
    cy.get(userHomePageElements.LEFT_NAV_ADMIN_LINK).click();   // Click on 'Admin' link in the sidebar
    cy.get(adminPageElements.NOTICES_LINK).click(); // Click on 'Notices' link in the Site Admin Links list
    cy.get(noticesPageElements.TABLE_ENTRY).contains(oldText).parent().parent().contains('a', 'edit').click();
    cy.setTinyMceContent(noticesPageElements.EDITOR, newText); // Type in a new notice text in the editor
    cy.get(noticesPageElements.NOTICE_SUBMIT).click(); // Publish the notice
}

export function deleteNotice(noticeText){
    cy.get(userHomePageElements.LEFT_NAV_ADMIN_LINK).click();   // Click on 'Admin' link in the sidebar
    cy.get(adminPageElements.NOTICES_LINK).click(); // Click on 'Notices' link in the Site Admin Links list
    cy.get(noticesPageElements.TABLE_ENTRY).contains(noticeText).parent().parent().find('td a[title=\"Delete Notice\"]').click();
    cy.confirm('Are you sure you want to delete this notice?');
}

export function userHideNotices(){
    cy.get(userHomePageElements.HIDE_SHOW_NOTICES).contains('Hide Notices').click();
}

export function userShowNotices(){
    cy.get(userHomePageElements.HIDE_SHOW_NOTICES).contains('Show Notices').click();
}

export function userViewNotice(noticeText){
    cy.get(userHomePageElements.NOTICES_TABLE_ENTRY).contains('td', noticeText);
}

export function userCannotViewNotice(noticeText){
    cy.get(userHomePageElements.NOTICES_TABLE_ENTRY).contains('td', noticeText).should('not.exist');
}

export function noticeTableDoesNotExist(){
    cy.get(userHomePageElements.NOTICES_TABLE).should("not.exist");
}

export function userDismissNotice(noticeText){
    cy.get(userHomePageElements.NOTICES_TABLE_ENTRY).contains('td', noticeText).parent().find('a[title=\"Dismiss\"]').click();
    cy.confirm('Are you sure you want to dismiss this notice?');
}

export function addNotice(noticeText) {
  cy.get(userHomePageElements.LEFT_NAV_ADMIN_LINK).click();   // Click on 'Admin' link in the sidebar
  cy.get(adminPageElements.NOTICES_LINK).click(); // Click on 'Notices' link in the Site Admin Links list
  cy.get(noticesPageElements.NEW_NOTICE_LINK).click(); // Click on 'Create New Notice'
  cy.setTinyMceContent(noticesPageElements.EDITOR, noticeText); // Type in a new notice text in the editor
}

export function submitNotice() {
  cy.get(noticesPageElements.NOTICE_SUBMIT).click(); // Publish the notice
}

export function cancelNotice() {
  cy.get(noticesPageElements.NOTICE_CANCEL).click(); // Click 'Cancel' button
}
