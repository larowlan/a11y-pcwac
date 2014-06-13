#
# This file is only needed for Compass/Sass integration. If you are not using
# Compass, you may safely ignore or delete this file.
#
# If you'd like to learn more about Sass and Compass, see the sass/README.txt
# file for more information.
#


# Change this to :production when ready to deploy the CSS to the live server.
environment = :development

# In development, we can turn on the FireSass-compatible debug_info.
firesass = false
#firesass = true


# Location of the theme's resources.
css_dir         = "assets"
sass_dir        = "sass"
fonts_dir       = "fonts"
extensions_dir  = "sass-extensions"
images_dir      = "images"
javascripts_dir = "js"
relative_assets = true

# Pass options to sass. For development, we turn on the FireSass-compatible
# debug_info if the firesass config variable above is true.
sass_options = (environment == :development && firesass == true) ? {:debug_info => true} : {}
