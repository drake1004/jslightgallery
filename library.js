window.Library = window.Library || {};

/**
 * @package    app/webpreloader
 * @category   Library
 * @author     Kamil Hajduk
 * @copyright  Drake1004 Factory
 * @version    1.0
 * @license    CPL
 */

(function (namespace) {

	WebPreloader = function ($wrapper) {
		this._initialize($wrapper);
	};
	WebPreloader.prototype = {
		_$html: "\
			<div class='webpreloader'><div id='preloader-wrapper'><div id='loader'></div></div></div>",
		_$wrapper: "",
		/**
		 * Initialize preloader
		 * @param {object} $wrapper
		 * @returns {null}
		 */
		_initialize: function ($wrapper) {
			var self = this;
			self._$wrapper = $wrapper;
			self._$wrapper.append(self._$html);
			self._load();
		},
		_load: function () {
			var self = this;
			$(window).load(function () {
				self._$wrapper.fadeOut();
				self._$wrapper.find("#loader").delay(1000).fadeOut("slow");
			});

		}
	}
	namespace.WebPreloader = WebPreloader;
})(window.Library);
