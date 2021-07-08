import * as c from "../support/constants";
import * as TeacherHelper from '../support/helpers/teacherHelper';
import * as StudentHelper from '../support/helpers/studentHelper';
import * as AdminHelper from '../support/helpers/adminHelper';
import admin_page_elements from "../support/elements/admin_page_elements";
import studentHomePageElements from "../support/elements/student_home_page_elements";
import studentRosterPageElements from "../support/elements/student_roster_page_elements";

const CLASS_WORD_1 = 'word1_'+c.UID;
const CLASS_WORD_2 = 'word2_'+c.UID;
const CLASS_NAME_1 = 'Class '+ CLASS_WORD_1;
const CLASS_NAME_2 = 'Class '+ CLASS_WORD_2;

const STUDENT_FIRSTNAME = 'sri';
const STUDENT_LASTNAME = 'sun';
const STUDENT_USERNAME = 'ssun';
const STUDENT_PASSWORD = 'password';

context("Student joins another class tests", () => {

    before(function() {
        cy.visit(c.LEARN_PORTAL_BASE_URL); // Visit LEARN Portal home page
    });

    after(function() {
       cy.login(c.ADMIN_USERNAME, c.ADMIN_PASSWORD);
       cy.get(admin_page_elements.LNK_ADMIN).click();
       cy.get(admin_page_elements.USERS_LINK).click();
       AdminHelper.removeUser(STUDENT_USERNAME, STUDENT_FIRSTNAME + ' ' + STUDENT_LASTNAME);
    });

    it("Teacher1 creates new class with class_word_1", () => {
        cy.login(c.TEACHER1_USERNAME, c.TEACHER1_PASSWORD);
        TeacherHelper.addClass(CLASS_NAME_1, c.CLASS_DESC, CLASS_WORD_1);
        cy.logout();
    });

    it("Teacher2 creates new class with class_word_2", () => {
        cy.login(c.TEACHER2_USERNAME, c.TEACHER2_PASSWORD);
        TeacherHelper.addClass(CLASS_NAME_2, c.CLASS_DESC, CLASS_WORD_2);
        cy.logout();
    });

    it("New student registration for class_word_1 and joins another class class_word_2", () => {
        StudentHelper.registerStudent(STUDENT_USERNAME, STUDENT_FIRSTNAME, STUDENT_LASTNAME, STUDENT_PASSWORD, CLASS_WORD_1);
        cy.login(STUDENT_USERNAME, STUDENT_PASSWORD);
        StudentHelper.joinClass(CLASS_WORD_2, c.TEACHER2_FULLNAME);
        cy.get(studentHomePageElements.LEFT_NAV_CLASS_NAME).find('li a', CLASS_NAME_2);
        cy.logout();
    });

    it("Teacher2 Verifies new student is registered to the class", () => {
        cy.login(c.TEACHER2_USERNAME, c.TEACHER2_PASSWORD);
        TeacherHelper.openStudentRosterSection(CLASS_NAME_2);
        cy.contains(studentRosterPageElements.STUDENT_ROSTER_TABLE_USERNAME_COLUMN, STUDENT_USERNAME);
        cy.logout();
    });

});