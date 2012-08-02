
DIST=_site
APP=yijing

default: clean

p:
	supervisor -w .,routes,views app.js

clean:
	rm -rf $(DIST)

build: clean
	mkdir -p $(DIST)
	cp -r *.js *.json public/ routes/ views/ node_modules/ $(DIST)
	cd $(DIST)/public/javascripts/ && for x in *.js ; do \
		uglifyjs $$x > $$x.min.js && rm $$x ; \
		mv -f $$x.min.js $$x ; \
	done

prod-prev: build
	cd $(DIST) && NODE_ENV=production node app.js

vmc: build
	vmc update $(APP) --path $(DIST) --runtime =node06

jitsu: build
	cd $(DIST) && jitsu deploy
