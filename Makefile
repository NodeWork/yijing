build:
	grunt clean build
	rm -rf _site
	mkdir _site
	cp -r dist/*.html dist/*.txt dist/*.ico dist/images dist/scripts dist/views dist/styles dist/.htaccess _site/
	mkdir -p _site/bower_components/es5-shim _site/bower_components/json3/lib/
	cp dist/bower_components/es5-shim/es5-shim.min.js _site/bower_components/es5-shim/es5-shim.min.js
	cp dist/bower_components/json3/lib/json3.min.js  _site/bower_components/json3/lib/json3.min.js
	cp gzall.pl _site/

deploy: build
	rsync -c -r -ave 'ssh' _site/* freizl_duyijing@ssh.phx.nearlyfreespeech.net:/home/public
	#scp -r _site/* freizl_duyijing@ssh.phx.nearlyfreespeech.net:/home/public/
