/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    describe('RSS Feeds', function() {
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('have urls', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).not.toBe('');
            }
        });

        it('have names', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name).not.toBe('');
            }
        });
    });

    describe('The menu', function() {
        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        // Use jQuery click method to see if the menu-hidden class changes
        // which controls the visibility of the off canvas menu
        it('changes visibility when clicked', function() {
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    describe('Initial Entries', function() {
        beforeEach(function(done){
            loadFeed(0, function(){
                done();
            });
        });

        // Check to see if there is more than one feed displayed
        // used vanilla Javascript instead of JQuery to learn something new :)
        it('are populated',function(done) {
            var entrycount = document.getElementsByClassName('feed')[0].getElementsByClassName('entry').length;
            expect(entrycount).toBeGreaterThan(0);
            done();
        });
    });

    describe('New Feed Selection', function() {
        // Function from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
        // Returns a random number between min (inclusive) and max (exclusive)
        function getRandomInt(min, max) {
          return Math.floor(Math.random() * (max - min)) + min;
        }

        var feedLength = allFeeds.length;

        // Set two random feed indexes
        var randomFeedIndexFirst = getRandomInt(0,feedLength);
        var randomFeedIndexSecond = getRandomInt(0,feedLength);

        // Ensure feed indexes are different
        while (randomFeedIndexFirst === randomFeedIndexSecond) {
            randomFeedIndexSecond = getRandomInt(0,feedLength);
        }

        var headerHtml;
        var feedHtml;


        // Before each spec load 2 random feeds and set dom html for the header and feeds
        beforeEach(function(done) {
            $('.header-title').empty();
            $('.feed').empty();
            loadFeed(randomFeedIndexFirst, function(){
                headerHtml = $('.header-title').html();
                feedHtml = $('.feed').html();

                loadFeed(randomFeedIndexSecond, function() {
                    done();
                });
            });


        });

        // Reset page content to original feed
        afterAll(function(){
            loadFeed(0);

        });

        it('should change header content html', function(done) {
            expect(headerHtml).not.toEqual($('header-title').html());
            done();
        });

        it('should change feed links and descriptions', function(done) {
            expect(feedHtml).not.toEqual($('.feed').html());
            done();
        });
    });
}());
