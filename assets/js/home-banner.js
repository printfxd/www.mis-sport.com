/*
	Standout by Pixelarity
	pixelarity.com | hello@pixelarity.com
	License: pixelarity.com/license
*/

(function($) {

	// Banner.
		var $banner = $('#banner');

		(function() {

			// Settings.
				var settings = {

					// Images (in the format of 'url': 'alignment').
						images: {
							/*
							'https://storage.googleapis.com/mis-sport/banner/home/mis-dsm-001.jpg': '0% 35%', //1
							'https://storage.googleapis.com/mis-sport/banner/home/mis-dsm-007.jpg': 'center', //7
							'https://storage.googleapis.com/mis-sport/banner/home/mis-dsm-003.jpg': 'center', //3
							'https://storage.googleapis.com/mis-sport/banner/home/mis-dsm-008.jpg': 'center', //8
							'https://storage.googleapis.com/mis-sport/banner/home/mis-dsm-009.jpg': 'center', //9
							'https://storage.googleapis.com/mis-sport/banner/home/mis-dsm-004.jpg': 'center', //4
							'https://storage.googleapis.com/mis-sport/banner/home/mis-dsm-006.jpg': 'center' //6
							*/
						},

					// Delay.
						delay: 8000

				};

			// Vars.
				var	pos = 0, lastPos = 0,
					$wrapper, $bgs = [], $bg,
					k, v;

			// Create BG wrapper, BGs.
				$wrapper = $('<div class="bg" />')
					.appendTo($banner);

				for (k in settings.images) {

					// Create BG.
						$bg = $('<div />');
							$bg.css('background-image', 'url("' + k + '")');
							$bg.css('background-position', settings.images[k]);
							$bg.appendTo($wrapper);

					// Add it to array.
						$bgs.push($bg);

				}

			// Main loop.
			if ($bgs.length > 0 ) {
				$bgs[pos].addClass('visible');
				$bgs[pos].addClass('top');

				// Bail if we only have a single BG or the client doesn't support transitions.
					if ($bgs.length == 1)
						return;

				setInterval(function() {

					lastPos = pos;
					pos++;

					// Wrap to beginning if necessary.
						if (pos >= $bgs.length)
							pos = 0;

					// Swap top images.
						$bgs[lastPos].removeClass('top');
						$bgs[pos].addClass('visible');
						$bgs[pos].addClass('top');

					// Hide last image after a short delay.
						setTimeout(function() {
							$bgs[lastPos].removeClass('visible');
						}, settings.delay / 2);

				}, settings.delay);
			}
		})();
})(jQuery);