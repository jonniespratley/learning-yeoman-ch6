/* Script for <%= _.slugify(siteTitle) %> */
var App = {
	config: null,
	Models: {},
	Controllers: {},
	Views: {},
	/**
	 * I handle initializing the application
	 * @returns {App}
	 */
	init: function () {
		console.log('<%= _.capitalize(siteTitle) %> is ready to rock and roll!');
		this.startRouter(window.location.hash);
		return this;
	},
	/**
	 * I handle listening to the hashchange event to load a page.
	 */
	startRouter: function (path) {
		$(window).on('hashchange', function (e) {
			$('.active').removeClass('active');
			path = e.currentTarget.location.hash.replace('#/', '').toLowerCase();
			App.loadPage(path);
		});
	},
	/**
	 * I handle loading a page into the .page element
	 * @param path
	 */
	loadPage: function (path) {
		if(path === ''){
			path = 'main';
		}
		$.get('pages/' + path + '.html').done(function (html) {
			$('a[href="#/' + path + ']').parent().addClass('active');
			$('.page').html(html);
		});
	}
};

$(document).ready(function () {
	window.App = App.init();
});
