/*global QUnit*/

sap.ui.define([
	"sap/ui/test/opaQunit",
	"sap/ui/Device",
	"./pages/Worklist",
	"./pages/Browser",
	"./pages/Object",
	"./pages/App"
], function (opaTest, Device) {
	"use strict";

	var iDelay = (Device.browser.msie || Device.browser.edge) ? 1500 : 1000;

	QUnit.module("Navigation");

	opaTest("Should see the objects list", function (Given, When, Then) {
		// Arrangements
		Given.iStartMyFLPApp({intent : "FioriWorkListV2-display"});

		// Assertions
		Then.onTheWorklistPage.iShouldSeeTheTable();
	});

	opaTest("Should react on hash change", function (Given, When, Then) {
		// Actions
		When.onTheWorklistPage.iRememberTheItemAtPosition(2);
		When.onTheBrowser.iChangeTheHashToTheRememberedItem();

		// Assertions
		Then.onTheObjectPage.iShouldSeeTheRememberedObject().
			and.theViewIsNotBusyAnymore();
	});

	opaTest("Should go back to the TablePage", function (Given, When, Then) {
		// Actions
		When.onTheBrowser.iPressOnTheBackwardsButton();

		// Assertions
		Then.onTheWorklistPage.iShouldSeeTheTable();
	});

	opaTest("Object Page shows the correct object Details", function (Given, When, Then) {
		// Actions
		When.onTheWorklistPage.iRememberTheItemAtPosition(1).
			and.iPressATableItemAtPosition(1);

		// Assertions
		Then.onTheObjectPage.iShouldSeeTheRememberedObject();
	});

	opaTest("Should be on the table page again when browser back is pressed", function (Given, When, Then) {
		// Actions
		When.onTheBrowser.iPressOnTheBackwardsButton();

		// Assertions
		Then.onTheWorklistPage.iShouldSeeTheTable();
	});

	opaTest("Should be on the object page again when browser forwards is pressed", function (Given, When, Then) {
		// Actions
		When.onTheBrowser.iPressOnTheForwardsButton();

		// Assertions
		Then.onTheObjectPage.iShouldSeeTheRememberedObject();

		// Cleanup
		Then.iLeaveMyFLPApp();
	});

	opaTest("Start the App and simulate metadata error: MessageBox should be shown", function (Given, When, Then) {
		//Arrangement
		Given.iStartMyFLPApp({
			intent : "FioriWorkListV2-display",
			delay : iDelay,
			metadataError : true
		});

		//Assertions
		Then.onTheAppPage.iShouldSeeTheMessageBox();

		// Actions
		When.onTheAppPage.iCloseTheMessageBox();

		// Cleanup
		Then.iLeaveMyFLPApp();
	});

	opaTest("Start the App and simulate bad request error: MessageBox should be shown", function (Given, When, Then) {
		//Arrangement
		Given.iStartMyFLPApp({
			intent : "FioriWorkListV2-display",
			delay : iDelay,
			errorType : "serverError"
		});

		//Assertions
		Then.onTheAppPage.iShouldSeeTheMessageBox();

		// Actions
		When.onTheAppPage.iCloseTheMessageBox();

		// Cleanup
		Then.iLeaveMyFLPApp();
	});

});