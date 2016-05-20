// var releaseMods = [ 'dashboard' ];
var releaseMods = 'all';

/******************** dev start ********************/

//dep文件夹为bower的下载目录，有大量的冗余资源，可能导致编译失败。
//因此编译时屏蔽该目录，但是会自动找出其中被引用的资源。
fis.set('project.files', ['!dep/**', '!node_modules/**', '!startbootstrap-sb-admin-1.0.4/**', '!inspinia_admin-v2.4/**']);

fis.hook('commonjs', {
    // 参考 http://imweb.io/topic/565c548a3ad940357eb99874
	paths: {
		react: './node_modules/react/dist/react-with-addons.js',
		'react-dom': './node_modules/react-dom/dist/react-dom.js',
		'react-redux': './node_modules/react-redux/dist/react-redux.min.js',
		'redux': './node_modules/redux/dist/redux.min.js',
		'react-router': './node_modules/react-router/umd/ReactRouter.js',
		'redux-thunk': './node_modules/redux-thunk/dist/redux-thunk.min.js',
		'redux-logger': './node_modules/redux-logger/dist/index.min.js',
		'amazeui-touch': './node_modules/amazeui-touch/dist/amazeui.touch.js',
		// 对ReactCSSTransitionGroup进行包装，给amazeui-touch的require使用
		'react-addons-css-transition-group': './app/wrap/WrapReactCSSTransition.js'
	}
});

/******************** 语言编译 ********************/
// fis
// .match('./node_modules/react/dist/react-with-addons.js', {
// 	isMod: true,
// 	moduleId: 'react'  // 为utils设置一个moduleId，希望以后能直接require('react')
// })
// .match('./node_modules/react-dom/dist/react-dom.js', {
// 	isMod: true,
// 	moduleId: 'react-dom'  // 为utils设置一个moduleId，希望以后能直接require('react-dom')
// })
// .match('./node_modules/react-redux/dist/react-redux.min.js', {
// 	isMod: true,
// 	moduleId: 'react-redux'  // 为utils设置一个moduleId，希望以后能直接require('react-redux')
// })
// .match('./node_modules/redux/dist/redux.min.js', {
// 	isMod: true,
// 	moduleId: 'redux'  // 为utils设置一个moduleId，希望以后能直接require('react-redux')
// })
// .match('./node_modules/react-router/umd/ReactRouter.js', {
// 	isMod: true,
// 	moduleId: 'react-router'  // 为utils设置一个moduleId，希望以后能直接require('react-redux')
// })
// .match('./node_modules/redux-thunk/dist/redux-thunk.min.js', {
// 	isMod: true,
// 	moduleId: 'redux-thunk'  // 为utils设置一个moduleId，希望以后能直接require('react-redux')
// })
// .match('./node_modules/redux-logger/dist/index.min.js', {
// 	isMod: true,
// 	moduleId: 'redux-logger'  // 为utils设置一个moduleId，希望以后能直接require('react-redux')
// })
// .match('./node_modules/amazeui-touch/dist/amazeui.touch.js', {
// 	isMod: true,
// 	moduleId: 'amazeui-touch'  // 为utils设置一个moduleId，希望以后能直接require('react-redux')
// });

// 包装node_modules依赖的包
fis.match('/{node_modules}/**.js', {
    isMod: true,
    useSameNameRequire: true
});

/*支持react*/
fis.match('app/**/*.{js, jsx, react.js}', {
    rExt: '.js',
	isMod: true,
	// 使用babel支持es6
  	parser: fis.plugin('babel')
	// 自己的define包装
	// postprocessor: plugin('define')
});

fis.match('*.html', {
    lint: fis.plugin('html')
});

fis.match('*.html', {
    parser: function(content) {
        var globalReg = /<!--\s*fis-([^-]+)-start\s*-->(.|[\r\n\t])*?<!--\s*fis-([^-]+)-end\s*-->/ig;
        var reg       = /<!--\s*fis-([^-]+)-start\s*-->(.|[\r\n\t])*?<!--\s*fis-([^-]+)-end\s*-->/i;

        var arr = content.match(globalReg);
        if(arr !== null) {
            arr.forEach(function(code) {
                var mediaInfo = code.match(reg);
                if(mediaInfo[1] === mediaInfo[3]) {
                    var medias = mediaInfo[1].split('|');
                    var media = fis.project.currentMedia();
                    if(medias.indexOf(media) === -1) {
                        content = content.replace(code, '');
                    }
                }
            });
        }
        return content;
    }
});

//less的混合样式文件，只会被其他less文件import，因此不需要单独发布。
fis.match(/^(.*)mixin\.less$/i,{
    release: false
});

fis.match('*.less', {
    parser: fis.plugin('less'),
    rExt: '.css'
});

//widgets,modules,components和page文件夹下的js文件被认为是模块
//编译时可以自动包裹factory函数：define(function(require, exports, module) {})
fis.match('**/{widgets,modules,components,page,common,mock}/**.js', {
    isMod: true
});

fis.match('{node_modules,dep}/**/**.js', {
    isMod: true
});

// 因为jquery几乎每个页面都要require，所以直接在页面引用
fis.match('dep/lib-flexible/**.js', {
    isMod: false
});

// 在页面的script标签指明是data-loader，所以不需要此处配置了
// fis.match('{mod}.js', {
//     isMod: false,
// 	packOrder: -1 //packOrder 控制文件的合并顺序，默认为0，值越小则顺序越靠前，可为负数
// });

fis.match('**/*', {
    useCache: false,
    release: '/$0'
});

fis.match('*.html', {
    useCache: false,
    release: '/$0'
});

fis.match('/test/**', {
    release: '/$0'
});

//在编译期会被内嵌入js文件中，因此不需要发布。
fis.match('*.tpl',{
    release : false
});

//velocity模版对应的mock数据不需要发布。
fis.match('*.html.js', {
    release: false
});

//bower的package文件不需要发布。
fis.match('bower.json', {
    release: false
});

//文档不需要发布。
fis.match('*.md', {
    release: false
});

//fis配置文件不需要发布。
fis.match('fis-conf.js', {
    useCache: false,
    release: false
});

//本地调试时，需要将所有子系统下面的server.conf合并到根目录下的server.conf文件，最后发布到config文件夹下。
fis.match('/config/server.conf', {
    postprocessor: function(content, file) {
        content = '';
        var modConnfPaths = fis.util.find(fis.project.getProjectPath(), ['/**/server.conf']);
        modConnfPaths.forEach(function(modConnfPath) {
            content += fis.util.read(modConnfPath);
        });
        return content;
    },
    useCache: false,
    release: '/config/server.conf'
});

// npm install [-g] fis3-postpackager-loader
// 分析 __RESOURCE_MAP__ 结构，来解决资源加载问题
fis.match('::package', {
    postpackager: fis.plugin('loader', {
        resourceType: 'mod',
        useInlineMap: true,
		// allInOne: true
    }),
	packager: fis.plugin('map', {
        'pkg/vendor.js': [
            'dep/mod.js',
            'node_modules/**/react-with-addons.js',
            'node_modules/**/react-dom.js',
			// 'node_modules/redux/**/redux.min.js',
			// 'node_modules/react-redux/**/react-redux.min.js',
			// 'node_modules/react-router/umd/ReactRouter.js'
        ]
    })
});

/******************** dev end ********************/


/******************** qa start ********************/

//inspinia不需要发布。
// fis.media('qa').match('/dep/inspinia2.4/{img,fonts,emial_templates}/**', {
//     release: false
// });

fis.media('qa').match('*.{less,css,js}', {
    useHash: true
});

fis.media('qa').match('::image', {
    useHash: true
});

fis.media('qa').match('*.{less,css}', {
    useSprite: true
});

fis.media('qa').match('**/page/**.html', {
    postprocessor: null
});

//example不需要发布。
fis.media('qa').match('/example/**', {
    release: false
});

fis.media('qa').match('/test/**', {
    release: false
});

fis.media('qa').match('server.conf', {
    release: false
});

fis.media('qa').match('::package', {
    spriter: fis.plugin('csssprites'),
    postpackager: fis.plugin('loader', {
        resourceType: 'mod',
        useInlineMap: true,
        allInOne: true
    })
});

fis.media('qa').match('**/*', {
    // domain: "http://pstatic.lagou.com/www"
    domain: "http://223.4.177.139:8085/static/bkmis"
});

fis.media('qa').match('*', {
    deploy: fis.plugin('http-push', {
        receiver: 'http://223.4.177.139:8085/adsys/tools/deploy',
        to: '/home/ifangy_qa/odp/webroot/static/bkmis'
    })
});

fis.media('qa').match('::package', {
    packager: fis.plugin('map', {
        'pkg/vendor.js': [
            'common/**/mod.js',
            'node_modules/**/jquery.min.js',
            'node_modules/**/bootstrap.min.js'
        ]
    })
});

/******************** qa end ********************/


/******************** prod start ********************/

fis.media('prod').match('*.{less,css,js}', {
    useHash: true
});

fis.media('prod').match('::image', {
    useHash: true
});

fis.media('prod').match('*.{less,css,html:css}', {
    useSprite: true,
    optimizer: fis.plugin('clean-css')
});

// fis.media('prod').match('*.png', {
//     optimizer: fis.plugin('png-compressor')
// });

fis.media('prod').match('*.js', {
    optimizer: fis.plugin('uglify-js', {
        mangle: {
            except: 'exports, module, require, define'
        }
    })
});

fis.media('prod').match('**/page/**.html', {
    postprocessor: null
});

//example不需要发布。
fis.media('prod').match('/example/**', {
    release: false
});

fis.media('prod').match('/test/**', {
    release: false
});

fis.media('prod').match('server.conf', {
    release: false
});

fis.media('prod').match('::package', {
    spriter: fis.plugin('csssprites'),
    postpackager: fis.plugin('loader', {
        resourceType: 'mod',
        useInlineMap: true,
        allInOne: true
    })
});

fis.media('prod').match('**/*', {
    domain: fis.get('prod-domain')
});

fis.media('prod').match('*', {
    deploy: fis.plugin('http-push', {
        receiver: fis.get('prod-upload'),
        to: fis.get('prod-static')
    })
});

fis.media('prod').match('::package', {
    packager: fis.plugin('map', {
        'pkg/vendor.js': [
            'common/**/mod.js',
            'node_modules/**/jquery.min.js',
            'node_modules/**/bootstrap.min.js'
        ]
    })
});

/******************** prod end ********************/

var root = fis.project.getProjectPath();
var confs = fis.util.find(root, '/**/fis-conf.js');
var path = require('path');
var mods = [];
confs.forEach(function(conf) {
    var mod = path.dirname(path.relative(root, conf));
    mod !== '.' && mods.push(mod);
});
mods.forEach(function(mod) {
    if (releaseMods === 'all') {
        require('./' + mod + '/fis-conf');
        delete require.cache['./' + mod + '/fis-conf'];
    } else if (releaseMods.indexOf(mod) === -1) {
        fis.match('/' + mod + '/**/*', {
            release: false
        });
    } else {
        require('./' + mod + '/fis-conf');
        delete require.cache['./' + mod + '/fis-conf'];
    }
});
