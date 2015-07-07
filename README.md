# jslightgallery
Simple javascript gallery plugin, based on jquery.
# Simple use
In your head section  add library.js file like this:
`<script type="text/javascript" src="/jslibrary/lightgallery/library.js"></script> `

and bind styles like this:

` <link rel="stylesheet" type="text/css" href="style.css"> `
` <link rel="stylesheet"  media="(max-width: 881px)" href="mobile.css"> `

` <!DOCTYPE html>
<html>
	<head>
		<title>Light Gallery</title>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<script type="text/javascript" src="/jquery.js"></script>
		<script type="text/javascript" src="/jslibrary/lightgallery/library.js"></script>
		<script type="text/javascript" src="/jslibrary/preloader/library.js"></script>
		<link rel="stylesheet" type="text/css" href="/jslibrary/preloader/style.css">
		<link rel="stylesheet" type="text/css" href="/jslibrary/lightgallery/style.css">
		<link rel="stylesheet"  media="(max-width: 881px)" href="/jslibrary/lightgallery/mobile.css">
		<script type="text/javascript">
			$(document).ready(function () {
				var $thumbs = [
					'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQHqnTuTIqwvU1MwXnjLZ8LmUVBKeWRe_PB4lZ042-JAZ1Pp7ip',
					'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQHwNeneWKeW95kT3O9baTOkFSTOv-4ev_ahE5t7epFOkjn-Sqn',
					'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQDRF0VKdLA_aJemamn5AYkfLLTEJe_uD3TwK2ROlwpIdOGkFXP_g'
				];
				var $full = [
					'http://wallarthd.com/wp-content/uploads/2014/09/Communist-Flag-World-War-Wallpaper-HD-191.jpg',
					'http://www.zastavki.com/pictures/originals/2014/Drawn_wallpapers_Tanks_in_the_second_world_war_083508_.jpg',
					'http://editwallpaper.com/wp-content/uploads/2015/04/World-War-2-Wallpaper-For-Desktop-Image.jpg'
				]
				new Library.Gallery($(".containerPhotos"), $("#wrapper"), $thumbs, $full);
			});
		</script>
	</head>
	<body style="background:url('/images/wallpaper-of-world-war-ii.jpg');height:3600px;">
		<div class='containerPhotos'>		
		</div>
		<div id="wrapper"></div>
	</body>
</html>`
