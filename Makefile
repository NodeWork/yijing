
DIST=_site
APP=yijing

jquery=jquery-1.7.2.min.js
mainFiles=bootstrap-dropdown.js jCanvaScript.js data.js yijing.js
mainjs=main.js

default: clean

p:
	supervisor -w .,routes,views app.js

clean:
	rm -rf $(DIST)

###
### To be simple, all JS files under main fold will be merge into a single named main.js
### TODO: add checksum sufix.
### 
build: clean
	mkdir -p $(DIST)
	cp -r *.js *.json public/ routes/ views/ node_modules/ $(DIST)

	cd $(DIST)/public/javascripts/ && for x in *.js ; do \
		uglifyjs $$x > $$x.min.js && rm $$x ; \
		mv -f $$x.min.js $$x ; \
	done

	cd $(DIST)/public/javascripts/main/ \
	   && cat $(jquery) > $(mainjs) \
	   && rm $(jquery)

	cd $(DIST)/public/javascripts/main && for x in $(mainFiles) ; do \
		uglifyjs $$x >> $(mainjs); \
	    echo >> $(mainjs); \
	    rm $$x; \
	done

	cd $(DIST)/views/layout/ \
	  && echo 'script(src="/javascripts/main/main.js")' > layout-js.jade

prod-prev: build
	cd $(DIST) && NODE_ENV=production node app.js

vmc: build
	vmc update $(APP) --path $(DIST) --runtime =node06

jitsu: build
	cd $(DIST) && jitsu deploy
