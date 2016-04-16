/*global module:false*/
module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt); // 加载所有的任务
	// require('time-grunt')(grunt); 如果要使用 time-grunt 插件

	// var requireJsModules = [];
	// grunt.file.expand({cwd:"./static/js/"}, "**/*.js").forEach( function
	// (file) {
	// if (file !== 'opt.js') {
	// requireJsModules.push(file.replace(/\.js$/, ''));
	// }
	// });
	// grunt.log.write(requireJsModules);

	// Project configuration.
	grunt
			.initConfig({
				// Metadata.
				pkg : grunt.file.readJSON('package.json'),
				// Metadata.
				meta : {
					basePath : './',
					srcPath : './sass',
					deployPath : './assets/css/'
				},
				banner : '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - '
						+ '<%= grunt.template.today("yyyy-mm-dd") %>\n'
						+ '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>'
						+ '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;'
						+ ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
				// Task configuration.
				concat : {
					options : {
						banner : '<%= banner %>',
						stripBanners : true
					},
					dist : {
						src : [ 'lib/<%= pkg.name %>.js' ],
						dest : 'dist/<%= pkg.name %>.js'
					}
				},
				uglify : {
					static_mappings : {
						// Because these src-dest file mappings are manually
						// specified, every
						// time a new file is added or removed, the Gruntfile
						// has to be updated.
						files : [ {
							src : 'lib/a.js',
							dest : 'build/a.min.js'
						}, {
							src : 'lib/b.js',
							dest : 'build/b.min.js'
						}, {
							src : 'lib/subdir/c.js',
							dest : 'build/subdir/c.min.js'
						}, {
							src : 'lib/subdir/d.js',
							dest : 'build/subdir/d.min.js'
						}, ],
					},
					dynamic_mappings : {
						// Grunt will search for "**/*.js" under "lib/" when the
						// "uglify" task
						// runs and build the appropriate src-dest file mappings
						// then, so you
						// don't need to update the Gruntfile when files are
						// added or removed.
						files : [ {
							expand : true, // Enable dynamic expansion.
							cwd : 'src/public/js/requirejs', // Src matches
							// are relative
							// to this path.
							src : [ '**/*.js' ], // Actual pattern(s) to
							// match.
							dest : 'dest/js', // Destination path prefix.
							ext : '.min.js', // Dest filepaths will have this
							// extension.
							extDot : 'first' // Extensions in filenames begin
						// after the first dot
						}, ],
					},
				},
				cssmin : {
					compress : {
						files : [ {
							expand : true,
							cwd : 'src',
							src : 'css/**/*.css',
							dest : 'dest'
						} ]
					},
					buildcss : {
						files : {
							"dest/css/main.min.css" : "src/css/**/*.css"
						}
					},
					devcss : {
						files : {
							"src/csslib/main.min.css" : "src/css/**/*.css"
						}
					}
				},
				htmlmin : {
					dist : {
						options : {
							// 去注析
							removeComments : true,
							// 去换行
							collapseWhitespace : true
						},
						files : [ {
							expand : true,
							cwd : 'src',
							src : '**/*.html',
							dest : 'dest/'
						} ]
					}
				},
				imagemin : {
					dist : { // Target
						options : { // Target options
							optimizationLevel : 3
						},
						files : { // Dictionary of files
							'dist/images/photo.png' : 'src/images/photo.png', // 'destination':
							// 'source'
							'dist/images/badge.jpg' : 'src/images/badge.jpg'
						}
					},
					dynamic_mappings : {
						options : {
							optimizationLevel : 5
						},
						files : [ {
							expand : true,
							cwd : 'src/img/',
							src : [ '**/*.{png,jpg,gif}' ],
							dest : 'dest/img/',
							ext : '.png'
						} ]
					},
					compressAll : {
						options : {
							optimizationLevel : 5
						},
						files : [ {
							expand : true,
							cwd : 'src/img/',
							src : [ '**/*.{png,jpg,gif,webp}' ],
							dest : 'dest/img/',
						} ]
					}
				},
				sass : {
					dist : {
						options : {
							style : 'expanded',
							sourcemap : "none"
						},
						files : [ {
							expand : true,
							cwd : 'sass',
							src : '**/*.scss',
							dest : 'src/css',
							ext : '.css', // Dest filepaths will have this
							// extension.
							extDot : 'first'
						} ]
					}
				},
				jshint : {
					options : {
						curly : true,
						eqeqeq : true,
						immed : true,
						latedef : true,
						newcap : true,
						noarg : true,
						sub : true,
						undef : true,
						unused : true,
						boss : true,
						eqnull : true,
						browser : true,
						globals : {
							jQuery : true
						}
					},
					gruntfile : {
						src : 'Gruntfile.js'
					},
					lib_test : {
						src : [ 'lib/**/*.js', 'test/**/*.js' ]
					}
				},
				qunit : {
					files : [ 'test/**/*.html' ]
				},
				connect : {
					options : {
						port : 8001,
						hostname : '*', // 默认就是这个值，可配置为本机某个 IP，localhost 或域名
						livereload : 35729
					// 声明给 watch 监听的端口
					},

					server : {
						options : {
							open : {
								target : 'http://localhost:8001/index.html' // target
							// url
							// to
							// open

							}, // 自动打开网页 http://
							base : [ 'src' // 主目录
							],
							middleware : function(connect, options,
									defaultMiddleware) {
								var proxy = require('grunt-connect-proxy/lib/utils').proxyRequest;
								return [
								// Include the proxy first
								proxy ].concat(defaultMiddleware);
							}
						}
					},
					server2 : {
						proxies : [ {
							context : '/api',
							host : '210.73.90.29',
							port : 8888,
							https : false,
							xforward : false,

						} ]
					}

				},
				watch : {
					options : {
						spawn : false,
						event : [ 'added', 'deleted', 'changed' ],
						reload : true
					},
					livereload : {
						options : {
							livereload : '<%=connect.options.livereload%>' // 监听前面声明的端口
						// 35729
						},

						files : [ // 下面文件的改变就会实时刷新网页
						'src/**/*.html', 'src/**/*.js', 'src/**/*.css' ]
					},
					scripts : {
						options : {
							spawn : false,
							event : [ 'added', 'deleted', 'changed' ],
							reload : true
						},
						files : [ '<%= meta.srcPath %>/**/*.scss' ],
						tasks : [ 'sass' ]
					},
					cssconcat : {
						files : [ 'src/css/**/*.css' ],
						tasks : [ 'cssmin:devcss' ]
					},
				// gruntfile: {
				// files: '<%= jshint.gruntfile.src %>',
				// tasks: ['jshint:gruntfile']
				// },
				// lib_test: {
				// files: '<%= jshint.lib_test.src %>',
				// tasks: ['jshint:lib_test', 'qunit']
				// }
				},
				bower : {
					install : {
						options : {
							targetDir : './src/public/js',
							layout : 'byComponent',
							install : true,
							verbose : false,
							cleanTargetDir : false,
							cleanBowerDir : false,
							bowerOptions : {}
						}
					}
				},
				copy : {
					dev : {
						files : [ {
							expand : true,
							cwd : 'src/fonts',
							src : [ '**/*' ],
							dest : 'dest/fonts',
							filter : 'isFile'
						} ]
					}
				},
				requirejs : {
					compile : {
						options : {
							findNestedDependencies : true,
							// "uglify：使用 UglifyJS 压缩代码，默认值；
							// "uglify2"：使用 2.1.2+ 版本进行压缩；
							// "closure"： 使用 Google's Closure Compiler 进行压缩合并，需要
							// Java 环境；
							// "closure.keepLines"：使用 Closure Compiler
							// 进行压缩合并并保留换行；
							// "none"：不做压缩合并；
							optimize : "uglify2",
							// "standard"：标准的压缩方式；
							// "standard.keepLines"：保留换行；
							// "standard.keepComments"：保留注释；
							// "standard.keepComments.keepLines"：保留换行；
							// "none"：不压缩；
							optimizeCss : "standard.keepLines",
							// 删除之前压缩合并的文件，默认值 false
							removeCombined : true,
							// publish 任务时不可以将 generateSourceMaps 配置项打开
							generateSourceMaps : false,
							preserveLicenseComments : false,
							useSourceUrl : false,
							baseUrl : "src/",
							// 输出目录的路径。如果不设置，则默认为和 build 文件同级的 build 目录。
							// dir: "dest/dds",
							// 要排除的文件的正则匹配的表达式
							// fileExclusionRegExp: /^\./,
							mainConfigFile : 'src/js/main.js',
							name : "js/main",
							// include: ['jquery'],
							out : "dest/js/main.min.js"
						}
					},
					almond : {
						options : {
							baseUrl : "src",
							optimize : "uglify2",
							include : "js/main",
							mainConfigFile : 'src/js/main.js',
							preserveLicenseComments : false,
							// insertRequire: ['main'],
							name : "public/js/almond/almond", // assumes a
							// production
							// build using
							// almond
							out : "dest/to/optimizeds.js",
							wrap : true
						// wrap: {
						// startFile: 'src/public/start.frag.js',
						// endFile: 'src/public/end.frag.js'
						// }
						}
					},
					compile_split : {
						options : {
							findNestedDependencies : true,
							optimize : "none",
							optimizeCss : "standard.keepLines",
							removeCombined : true,
							generateSourceMaps : true,
							// publish 任务时不可以将 generateSourceMaps 配置项打开
							preserveLicenseComments : false,
							useSourceUrl : true,
							baseUrl : "src/",
							// 输出目录的路径。如果不设置，则默认为和 build 文件同级的 build 目录。
							dir : "dest/dds",
							// 要排除的文件的正则匹配的表达式
							// fileExclusionRegExp: /^\./,
							mainConfigFile : 'src/js/main.js',
							// modules定义要被优化的模块数组。每一项是模块优化的配置，常用的几个参数如下：
							// name：模块名；
							// create：如果不存在，是否创建。默认 false；
							// include：额外引入的模块，和 name 定义的模块一起压缩合并；
							// exclude：要排除的模块。有些模块有公共的依赖模块，在合并的时候每个都会压缩进去
							modules : [ {
								name : "domready",
							}, {
								name : "angular"
							}, {
								name : "angularRoute"
							}, {
								name : "angularResource"
							}, {
								name : "app"
							}, {
								name : "appCtrl"
							}, {
								name : "comp"
							}, {
								name : "service"
							}
							// {
							// name: "app/in-storage",
							// exclude: [
							// "jquery",
							// "app/common",
							// "pkg/DatePicker/app"
							// ]
							// }
							]
						}
					},
					app_2 : {
						options : {
							findNestedDependencies : true,
							baseUrl : "src/js",
							paths : {
								asset1 : "../public/js",
								assets : "js"
							},
							name : "app",
							out : "dest/app_2/app-built.js"
						}
					},
					compile2 : {
						options : {
							baseUrl : "src/",
							mainConfigFile : "dest/cp/src/js/main.js",
							out : "dest/jst/main.js"
						}
					}
				}
			});

	// These plugins provide necessary tasks.
	// grunt.loadNpmTasks('grunt-contrib-concat');

	// Load the plugin HTML/CSS/JS/IMG min
	// grunt.loadNpmTasks('grunt-contrib-htmlmin');
	// grunt.loadNpmTasks('grunt-contrib-uglify');
	// grunt.loadNpmTasks('grunt-contrib-cssmin');
	// grunt.loadNpmTasks('grunt-contrib-imagemin');

	// grunt.loadNpmTasks("grunt-contrib-sass");

	// grunt.loadNpmTasks('grunt-contrib-qunit');
	// grunt.loadNpmTasks('grunt-contrib-jshint');
	// grunt.loadNpmTasks('grunt-contrib-watch');
	// bower src copy
	// grunt.loadNpmTasks('grunt-bower-task');

	// Default task.
	grunt.registerTask('default', [ 'cssbuild', 'imagebuild', 'htmlbuild',
			'requirejsmin', 'requirebuild' ]);

	// 复制bower下载资源到public目录下
	grunt.registerTask('bowerbuild', [ 'bower' ]);

	// 编译scss文件到css目录
	grunt.registerTask('sassbuild', [ 'sass' ]);

	// 合并css文件
	grunt.registerTask('cssbuild', [ 'cssmin:buildcss' ]);

	// 开发合并css文件
	grunt.registerTask('devcss', [ 'cssmin:devcss' ]);

	// 图片压缩为png
	grunt.registerTask('imagebuild', [ 'imagemin:compressAll' ]);

	// html压缩
	grunt.registerTask('htmlbuild', [ 'htmlmin' ]);

	// copy文件
	grunt.registerTask('cpjs', [ 'copy' ]);

	// 编译合并requirejs文件
	grunt.registerTask('requirebuild', [ 'requirejs:compile' ]);

	// 压缩requirejs源码
	grunt.registerTask('requirejsmin', [ 'uglify:dynamic_mappings' ]);

	grunt.registerTask('almondbuild', [ 'requirejs:almond' ]);

	grunt.registerTask('build', [ 'htmlmin', 'uglify', 'cssmin', 'imagemin' ]);

	// 自动打开浏览器并监听scss文件变更
	grunt.registerTask('server', [ 'configureProxies:server2',
			'connect:server', 'watch' ]);
};
