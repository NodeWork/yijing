
DIST=_deploy
APP=yijing

default: clean

clean:
	rm -rf $(DIST)

build:
	mkdir -p $(DIST)
	cp -r *.js *.json public/ routes/ views/ node_modules/ $(DIST)
	cd $(DIST)/views && mv layout-js.jade.prod layout-js.jade
	cd $(DIST)/public/javascripts/ && for x in *.js ; do \
		uglifyjs $$x > $$x.min.js && rm $$x ; \
	done

prev: build
	cd $(DIST) && node app.js

deploy: build
	vmc update $(APP) --path $(DIST) --runtime =node06