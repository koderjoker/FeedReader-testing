/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

/* All tests are placed within the $() function,
 * to ensure they don't run until the DOM is ready,
 * since some of these tests may require DOM elements.
 */

$(function() {


    /* First test suite (a suite contains a related set of tests)
    * This suite is all about the RSS
    * feeds definitions and the allFeeds variable in the application.
    */


    describe('RSS Feeds', function() {
        /* Tests to make sure that the allFeeds variable
         * has been defined and that it is not empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('urls are defined', function() {
             for (let feed of allFeeds) {
                 expect(feed['url']).toBeDefined();
                 expect(feed['url'].length).toBeGreaterThan(0);
             }
         });

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('names are defined', function() {
            for (let feed of allFeeds) {
                expect(feed['name']).toBeDefined();
                expect(feed['name'].length).toBeGreaterThan(0);
            }
        });

    });


    /* Test suite named "The menu" */
    describe('The menu', function() {

        /* Test that ensures the menu element is
         * hidden by default.
         * Tests if the menu-hidden class is present or not
         */
         it('is hidden by default', function() {
             const menu = document.querySelector('.menu-hidden');
             expect(menu).not.toBeNull();
         });

         /* Test that ensures the menu changes
          * visibility when the menu icon is clicked. The menu
          * should display when clicked and hide when clicked again.
          * Tests if the menu-hidden class is removed after clicking the menu
          * Then hides the menu again.
          */
          it('changes when clicked', function() {
              const menuIcon = document.querySelector('.menu-icon-link');
              menuIcon.click();
              const menu = document.querySelector('.menu-hidden');
              expect(menu).toBeNull();
              menuIcon.click();
          });

    });

    /* Test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Loads a feed then tests whether a feed (of class entry-link)
         * has been loaded or not
         */

         beforeEach(function(done) {
             loadFeed(0, done);
         });

         it('load in the feed', function() {
             const entry = document.querySelector('.entry-link');
             expect(entry).not.toBeNull();
         });

    });


    /* Test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {

        /* Test that ensures when a new feed is loaded
         * by the loadFeed function, the content actually changes.
         * Compares the content of 2 subsequently loaded feeds
         * to test for change in content
         */

         let prevFeed, nextFeed;

         beforeEach(function(done) {
            loadFeed(0, function() {
                prevFeed = document.querySelector('.feed').innerText;
                loadFeed(1, function() {
                    nextFeed = document.querySelector('.feed').innerText;
                    done();
                });
            });
         });

         it('changes content', function() {
             expect(prevFeed).not.toBe(nextFeed);
         });
    });

}());
