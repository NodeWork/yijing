
DIST=_deploy
APP=yijing

default: clean

clean:
	rm -rf $(DIST)

build: clean
	mkdir -p $(DIST)
	cp -r *.js *.json public/ routes/ views/ node_modules/ $(DIST)
	cd $(DIST)/public/javascripts/ && for x in *.js ; do \
		uglifyjs $$x > $$x.min.js && rm $$x ; \
		mv -f $$x.min.js $$x ; \
	done

prev: build
	cd $(DIST) && node app.js

deploy: build
	vmc update $(APP) --path $(DIST) --runtime =node06