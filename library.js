window.Library = window.Library || {};

/**
 * @package    app/lightgallery
 * @category   Library
 * @author     Kamil Hajduk
 * @copyright  Drake1004 Factory
 * @version    1.5
 * @license    CPL
 */

(function (namespace) {

	/**
	 * Function gallery	
	 * @param {object} $containerPhotos 
	 * @param {object} $wrapper container where is gallery modal
	 * @param {array} $thumbs thumbnails links
	 * @param {array} $full   large photo links
	 * @returns {library_L12.Gallery}
	 */
	Gallery = function ($containerPhotos, $wrapper, $thumbs, $full) {
		this._initialize($containerPhotos, $wrapper, $thumbs, $full);
		this._close();
	};

	Gallery.prototype = {
		_$containerPhotos: "",
		_$indexPhotoContainer: "",
		_$wrapper: "",
		_$activeImg: "",
		_$thumbs: new Array(),
		_$full: new Array(),
		_$html: "\
			<div class='bgGallery' style='display:none;'>\n\
				<div class='galleryContent'>\n\
					<div class='loader'></div>\n\
						<div>\n\
							<div class='prevPhoto'></div>\n\
							<div class='target'>\n\
								<img id='mainPhoto' src=''>\n\
								<div class='close'></div>\n\
							</div>\n\
							<div class='nextPhoto'></div>\n\
						</div>\n\
					</div>\n\
				</div>",
		_$spinnerHtml: '<div id="floatingBarsG"><div class="blockG" id="rotateG_01"></div><div class="blockG" id="rotateG_02"></div><div class="blockG" id="rotateG_03"></div><div class="blockG" id="rotateG_04"></div><div class="blockG" id="rotateG_05"></div><div class="blockG" id="rotateG_06"></div><div class="blockG" id="rotateG_07"></div><div class="blockG" id="rotateG_08"></div></div>',
		_$footerHtml: '<div class="footerGallery"></div>',
		/**
		 * Initialize gallery
		 * @param {object} $containerPhotos 
		 * @param {object} $wrapper container where is gallery modal
		 * @param {array} $thumbs thumbnails links
		 * @param {array} $full   large photo links
		 * @returns {library_L12.Gallery}
		 */
		_initialize: function ($containerPhotos, $wrapper, $thumbs, $full) {
			var self = this;
			self._$wrapper = $wrapper;
			self._$containerPhotos = $containerPhotos;
			self._$full = $full;
			self._$thumbs = $thumbs;
			self._$wrapper.append(self._$html);
			self._$wrapper.append(self._$footerHtml);
			$.each(self._$thumbs, function (index, value) {
				self._$containerPhotos.append("<img src='" + value + "'>");
				self._$wrapper.find('.footerGallery').append("<img src='" + value + "'>");
			});

			self._$containerPhotos.find("img").on("click", function () {
				document.body.style.overflow = 'hidden';

				self._$wrapper.find(".bgGallery").show();
				self._$wrapper.find(".footerGallery").show();
				self._$wrapper.find("#mainPhoto").hide();
				self._$wrapper.find(".loader").show();
				var indexPhotoContainer = $(this).index();
				self._$indexPhotoContainer = indexPhotoContainer;

				if (indexPhotoContainer === 0) {
					self._$wrapper.find(".prevPhoto").hide();
					self._$wrapper.find(".nextPhoto").show();
				}

				if (indexPhotoContainer === parseInt(self._$thumbs.length) - 1) {
					self._$wrapper.find(".prevPhoto").show();
					self._$wrapper.find(".nextPhoto").hide();
				}

				self._$wrapper.find("#mainPhoto").attr("src", self._$full[indexPhotoContainer]);
				self._$wrapper.find(".loader").html(self._$spinnerHtml);
				self._$wrapper.find(".close").hide();
				self._$wrapper.find("#mainPhoto").load(function () {
					$(this).show();
					self._$wrapper.find(".loader").hide();
					self._$wrapper.find(".close").show();
				});

				self._$wrapper.find('.footerGallery img.active').removeClass("active");
				self._$wrapper.find('.footerGallery img').eq(self._$indexPhotoContainer).addClass("active");

				self._prevPhoto();
				self._nextPhoto();
				self._slider();
				self._keyboardPrevNext();
			});
		},
		/**
		 * Zamyka okno modalowe galerii
		 * @returns {null}
		 */
		_close: function () {
			var self = this;
			self._$wrapper.on("click", function (e) {
				if ($(event.target).hasClass("close")) {
					self._$wrapper.find(".bgGallery").hide();
					self._$wrapper.find(".footerGallery,.footerButtonDown,.footerButtonUp").hide();
					document.body.style.overflow = '';
				}
			});

		},
		/**
		 * Obsługuje zdarzenia związane z klawiaturą
		 * @returns {null}
		 */
		_keyboardPrevNext: function () {
			var self = this;
			var lastPhotoIndex = self._$indexPhotoContainer;
				
			$(document).off("keyup");
			$(document).on("keyup", function (e) {
				// prev photo <-
				if (e.keyCode === 37) {
					if (self._$indexPhotoContainer == 0) {
						self._$wrapper.find(".prevPhoto").hide();
						self._$wrapper.find(".nextPhoto").show();
						self._$indexPhotoContainer = 0;
						if (lastPhotoIndex === self._$indexPhotoContainer) {
							return false;
						}
					} else {
						self._$wrapper.find(".prevPhoto").show();
						self._$wrapper.find(".nextPhoto").show();
						self._$indexPhotoContainer = self._$indexPhotoContainer - 1;
					}
				}
				// next photo ->
				if (e.keyCode === 39) {
					if (self._$indexPhotoContainer + 1 >= parseInt(self._$thumbs.length) - 1) {
						self._$wrapper.find(".prevPhoto").show();
						self._$wrapper.find(".nextPhoto").hide();
						self._$indexPhotoContainer = parseInt(self._$thumbs.length) - 1;
						if (lastPhotoIndex === self._$indexPhotoContainer) {
							return false;
						}
					} else {
						self._$wrapper.find(".prevPhoto").show();
						self._$wrapper.find(".nextPhoto").show();
						self._$indexPhotoContainer = self._$indexPhotoContainer + 1;
					}
				}
				
				self._$wrapper.find("#mainPhoto").attr("src", self._$full[self._$indexPhotoContainer]);
				self._$wrapper.find('.footerGallery img.active').removeClass("active");
				self._$wrapper.find('.footerGallery img').eq(self._$indexPhotoContainer).addClass("active");
				lastPhotoIndex = self._$indexPhotoContainer;
				self._$wrapper.find("#mainPhoto").hide();

				self._$wrapper.find(".loader").show();
				self._$wrapper.find(".close").hide();
				self._$wrapper.find("#mainPhoto").load(function () {
					$(this).show();
					self._$wrapper.find(".loader").hide();
					self._$wrapper.find(".close").show();
				});
			});
		},
		/**
		 * Obsługuje przycisk cofania zdjęć
		 * @returns {null}
		 */
		_prevPhoto: function () {
			var self = this;
			var now = new Date()
					.getTime() / 1000;
			var s = parseInt(now, 10);
			var hash = (Math.round((now - s) * 1000) / 1000);
			self._$wrapper.find(".prevPhoto").on("click", function () {
				if (parseInt(self._$indexPhotoContainer) - 1 <= 0) {
					self._$indexPhotoContainer = 0;
					self._$wrapper.find(".prevPhoto").hide();
					self._$wrapper.find(".nextPhoto").show();
					self._$wrapper.find("#mainPhoto").attr("src", self._$full[self._$indexPhotoContainer] + "?" + hash);

				} else {

					self._$wrapper.find(".nextPhoto").show();
					self._$wrapper.find(".prevPhoto").show();
					self._$wrapper.find("#mainPhoto").attr("src", self._$full[self._$indexPhotoContainer - 1] + "?" + hash);
					self._$indexPhotoContainer = self._$indexPhotoContainer - 1;
				}

				self._$wrapper.find(".footerGallery img").removeClass("active");
				self._$wrapper.find(".footerGallery img").eq(self._$indexPhotoContainer).addClass("active");
				self._$wrapper.find(".close").hide();
				self._$wrapper.find(".loader").show();
				self._$wrapper.find("#mainPhoto").hide();
				self._$wrapper.find("#mainPhoto").load(function () {
					$(this).show();
					self._$wrapper.find(".loader").hide();
					self._$wrapper.find(".close").show();
				});
			})

		},
		/**
		 * Obsługuje przycisk następny
		 * @returns {null}
		 */
		_nextPhoto: function () {
			var self = this;
			var now = new Date()
					.getTime() / 1000;
			var s = parseInt(now, 10);
			var hash = (Math.round((now - s) * 1000) / 1000);
			self._$wrapper.find(".nextPhoto").on("click", function () {
				if (parseInt(self._$indexPhotoContainer) + 1 >= parseInt(self._$full.length) - 1) {
					self._$indexPhotoContainer = parseInt(self._$full.length) - 1;
					self._$wrapper.find(".nextPhoto").hide();
					self._$wrapper.find(".prevPhoto").show();
					self._$wrapper.find("#mainPhoto").attr("src", self._$full[self._$indexPhotoContainer] + "?" + hash);
				} else {

					self._$wrapper.find(".nextPhoto").show();
					self._$wrapper.find(".prevPhoto").show();
					self._$wrapper.find("#mainPhoto").attr("src", self._$full[self._$indexPhotoContainer + 1] + "?" + hash);
					self._$indexPhotoContainer = self._$indexPhotoContainer + 1;
				}

				self._$wrapper.find(".footerGallery img").removeClass("active");
				self._$wrapper.find(".footerGallery img").eq(self._$indexPhotoContainer).addClass("active");
				self._$wrapper.find(".close").hide();
				self._$wrapper.find(".loader").show();
				self._$wrapper.find("#mainPhoto").hide();
				self._$wrapper.find("#mainPhoto").load(function () {
					$(this).show();
					self._$wrapper.find(".loader").hide();
					self._$wrapper.find(".close").show();
				});
			})
		},
		/**
		 * Slider footera
		 * @returns {null}
		 */
		_slider: function () {
			var self = this;
			var now = new Date()
					.getTime() / 1000;
			var s = parseInt(now, 10);
			var hash = (Math.round((now - s) * 1000) / 1000);
			self._$wrapper.find('.footerGallery').css({"bottom": "-200px", "display": "none"});
			if (self._$wrapper.find(".footerButtonUp").html() !== null) {
				self._$wrapper.append("<div class='footerButtonUp'></div>");
			}
			self.slideUp();
			self._$wrapper.find('.footerGallery img').on("click", function () {
				self._$wrapper.find('.footerGallery img').removeClass("active");
				$(this).addClass("active");

				var actualIndex = $(this).index();
				self._$indexPhotoContainer = actualIndex;

				if (parseInt(self._$indexPhotoContainer) == 0) {
					self._$indexPhotoContainer = 0;
					self._$wrapper.find(".prevPhoto").hide();
					self._$wrapper.find(".nextPhoto").show();
					self._$wrapper.find("#mainPhoto").attr("src", self._$full[self._$indexPhotoContainer] + "?" + hash);

				} else if (parseInt(self._$indexPhotoContainer) >= parseInt(self._$full.length) - 1) {
					self._$indexPhotoContainer = parseInt(self._$full.length) - 1;
					self._$wrapper.find(".nextPhoto").hide();
					self._$wrapper.find(".prevPhoto").show();
					self._$wrapper.find("#mainPhoto").attr("src", self._$full[self._$indexPhotoContainer] + "?" + hash);
				} else {
					self._$wrapper.find(".nextPhoto").show();
					self._$wrapper.find(".prevPhoto").show();
					self._$wrapper.find("#mainPhoto").attr("src", self._$full[self._$indexPhotoContainer] + "?" + hash);
				}

				self._$wrapper.find(".close").hide();
				self._$wrapper.find(".loader").show();
				self._$wrapper.find("#mainPhoto").hide();
				self._$wrapper.find("#mainPhoto").load(function () {
					$(this).show();
					self._$wrapper.find(".loader").hide();
					self._$wrapper.find(".close").show();
				});
			});
		},
		/**
		 * Rozwija footera galerii
		 * @returns {null}
		 */
		slideUp: function () {
			var self = this;
			self._$wrapper.find(".footerButtonUp").off();
			self._$wrapper.find(".footerButtonUp").on("click", function () {
				self._$wrapper.find('.footerGallery').css("display", "block");
				if ($(window).width() > 881) {
					self._$wrapper.find(".footerGallery").animate({bottom: "0px"}, 1000, function () {
					});
				}
				if ($(window).width() > 881) {
					self._$wrapper.find(".footerButtonUp").animate({bottom: "215px"}, 1000, function () {
					});
				}

				self._$wrapper.find(".footerGallery").slideDown("slow");
				self._$wrapper.find(".footerButtonUp").removeClass("footerButtonUp").addClass("footerButtonDown");
				self.slideDown();
			});
		},
		/**
		 * Zwija footer galerii
		 * @returns {null}
		 */
		slideDown: function () {
			var self = this;
			self._$wrapper.find(".footerButtonDown").off();
			self._$wrapper.find(".footerButtonDown").on("click", function () {
				self._$wrapper.find(".footerGallery").slideUp("slow");
				if ($(window).width() > 881) {
					self._$wrapper.find(".footerGallery").animate({bottom: "-200px"}, 1000, function () {
					});
					self._$wrapper.find(".footerButtonDown").animate({bottom: "15px"}, 1000, function () {
					});
				}
				self._$wrapper.find(".footerButtonDown").removeClass("footerButtonDown").addClass("footerButtonUp");
				self.slideUp();
			});
		}
	}
	namespace.Gallery = Gallery;

})(window.Library);
