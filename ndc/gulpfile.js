var gulp = require("gulp"),
    less = require("gulp-less"),
    jade = require("gulp-jade"),
    autoprefixer = require("gulp-autoprefixer"),
    cssmin = require("gulp-clean-css"),
    uglify = require("gulp-uglify"),
    babel = require("gulp-babel"),
    concat = require("gulp-concat"),
    htmlmin = require("gulp-htmlmin"),
    sourcemaps = require("gulp-sourcemaps"),
    notify = require("gulp-notify"),
    plumber = require("gulp-plumber"),
    imgmin = require("gulp-imagemin"),
    pngquant = require("gulp-pngquant"),
    rev = require("gulp-rev"),
    changed = require("gulp-changed"),
    cache = require("gulp-cache"),
    spritesmith = require('gulp.spritesmith'),
    tinypng = require('gulp-tinypng-compress'),
    htmlreplace = require('gulp-html-replace'),
    header = require('gulp-header'),
    browsersync = require('browser-sync').create();
var config = {
    "browsersync_conf": {
        files: [
            '*.htm',
            'jade/*.jade',
            '*.html',
            'css/*.css'
        ],
        server: {
            baseDir: "./"
        },
        notify: false,
        port: 4000
    },
    "autoprefixer_conf": ["chrome 30", "Firefox < 20", "ios_saf 8", "safari 8", 'Android >= 2.1', 'IE 9', 'IE 10'],
};
var pkg = require('./package.json');
var banner = ['/**',
    ' * <%= pkg.name %>',
    ' * @Date:' + new Date(),
    ' * @link www.xinhuanet.com',
    ' * @Author <%= pkg.author %>',
    ' * @Copyright: Copyright © 2000 - 2017 XINHUANET.com　All Rights Reserved.',
    ' * @制作单位：新华网股份有限公司　　版权所有 新华网股份有限公司',
    ' */',
    ''
].join('\n');
/*
!以下为单功能模块
 */
//browsersync
gulp.task('browsersync', function() {
    var files = [
        "jade/*.jade",
        "less/*.less",
        "es6js/*.js",
        "css/*.css",
        "js/*.js"
    ];

    browsersync.init(files, {
        server: {
            baseDir: "./"
        },
        notify: false,
        port: 3000
    });
});

//babel
gulp.task('babel', () => {
    return gulp.src('es6js/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(sourcemaps.write('../maps/es6'))
        .pipe(gulp.dest('js'));
});

//autoprefixer
gulp.task('autofx', function() {
    gulp.src("css/*.css")
        .pipe(autoprefixer({
            browsers: config["autoprefixer_conf"], //不同浏览器的版本号，数组；
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove: true //是否去掉不必要的前缀 默认：true
        }))
        .pipe(gulp.dest('css'));
});

//concat
gulp.task('concatcss', function() {
    gulp.src('css/*.css')
        .pipe(concat('bundle.css')) //合并后的文件名
        .pipe(gulp.dest('bundle/css'));
});
gulp.task('concatjs', function() {
    gulp.src('js/*.js')
        .pipe(concat('bundle.js')) //合并后的文件名
        .pipe(gulp.dest('bundle/js'));
});

//cssmin
gulp.task('cssmin', function() {
    gulp.src("bundle/css/bundle.css")
        .pipe(cssmin({
            advanced: true, //类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            compatibility: 'ie8', //保留ie8及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
            keepBreaks: true, //类型：Boolean 默认：false [是否保留换行]
            keepSpecialComments: '*'
                //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
        }))
        .pipe(header(banner, {
            pkg: pkg
        }))
        .pipe(concat("bundle.min.css"))
        .pipe(gulp.dest("bundle/css"));
});
// jsmin
gulp.task('concatminjs', function() {
    return gulp.src('bundle/js/bundle.js')
        .pipe(concat('bundle.min.js')) //合并后的文件名
        // .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(header(banner, {
            pkg: pkg
        }))
        // .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest('bundle/js'));
});
//imagemin
gulp.task('imgmin', function() {
    gulp.src("img/*.{png,jpg,gif,ico}")
        .pipe(cache(imgmin({
            optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true, //类型：Boolean 默认：false 多次优化svg直到完全优化
            svgoPlugins: [{
                removeViewBox: false
            }], //不要移除svg的viewbox属性
            use: [pngquant()] //使用pngquant深度压缩png图片的imagemin插件
        })))
        .pipe(gulp.dest('bundle/img'));
});
//html修改路径
gulp.task('replacehtml', function() {
    gulp.src('*.html')
        .pipe(htmlreplace({
            'css': 'css/bundle.css',
            'js': 'js/bundle.js'
        }))
        .pipe(gulp.dest('bundle'));
});


//htmlmin
// gulp.task('htmlmin', function() {
//     gulp.src('*.html')
//         .pipe(htmlmin(htmlmin_conf))
//         .pipe(gulp.dest('bundle'));
// });



// gulp.task("Totinypng", function(){
//     gulp.src('img/*.{png,jpg,jpeg}')
//         .pipe(tinypng({
//             key: 'YOUR_API_KEY',
//             sigFile: '',
//             log: true
//         })).on('error', function(err) {
//             console.error(err.message);
//         })
//         .pipe(gulp.dest('bundle/img'));
// });


//jade
gulp.task('jade', function() {
    return gulp.src("jade/*.jade")
        .pipe(plumber())
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('./'));
});
//less
gulp.task('less', function() {
    return gulp.src("less/*.less")
        .pipe(changed('css'))
        .pipe(sourcemaps.init())
        .pipe(plumber({
            errorHandler: notify.onError('Error: <%= error.message %>')
        })) //错误处理
        .pipe(less())
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest('css'));
});

/*
!以下为复合能模块
 */
//less-->cssmin-->autoprefixer-->sourcemaps;
gulp.task('less_all', function() {
    gulp.src("less/*.less")
        .pipe(sourcemaps.init()) //sourcemaps
        .pipe(plumber({
            errorHandler: notify.onError('Error: <%= error.message %>')
        })) //错误处理
        .pipe(less()) //less编译
        .pipe(cssmin()) //cssmin
        .pipe(autoprefixer({
            browsers: config["autoprefixer_conf"],
            cascade: true,
            remove: true,
            map: true
        })) //autoprefixer
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('css'));
});
//less-->concat-->cssmin-->autoprefixer-->sourcemaps;
gulp.task('less_allin', function() {
    return gulp.src("less/*.less")
        .pipe(sourcemaps.init()) //sourcemaps
        .pipe(plumber({
            errorHandler: notify.onError('Error: <%= error.message %>')
        })) //错误处理
        .pipe(less()) //less编译
        .pipe(concat("index.min.css"))
        .pipe(cssmin()) //cssmin
        .pipe(autoprefixer({
            browsers: config["autoprefixer_conf"],
            cascade: true,
            remove: true,
            map: true
        })) //autoprefixer
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest('css'));
});
//块级注释内可以选择性开启或者关闭cssmin/autoprefixer
gulp.task('less_alternertive', function() {
    gulp.src("less/*.less")
        .pipe(changed('less/*.less'))
        .pipe(sourcemaps.init()) //sourcemaps
        .pipe(plumber({
            errorHandler: notify.onError('Error: <%= error.message %>')
        })) //错误处理
        .pipe(less()) //less编译
        /*
            .pipe(cssmin())//cssmin
            */

    .pipe(autoprefixer({
            browsers: config["autoprefixer_conf"],
            cascade: true,
            remove: true,
            map: true
        })) //autoprefixer

    .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('css'));
});
//babel-->es5-->uglify-->sourcemaps
// gulp.task('babel_alternertive', () => {
//     return gulp.src('es6js/*.js')
//         .pipe(sourcemaps.init())
//         .pipe(babel({
//             presets: ['es2015']
//         }))
//         .pipe(uglify())
//         .pipe(sourcemaps.write('maps/es6'))
//         .pipe(gulp.dest('js'));
// });
//gulp.spritesmith
gulp.task('sprite', function() {
    var spriteData = gulp.src('bundle/img/*.png').pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: "css/sprite.css", //保存合并后对于css样式的地址
        padding: 5, //合并时两个图片的间距
        algorithm: 'left-right'
    }));
    return spriteData.pipe(gulp.dest('bundle/sprite'));
});
//watch
gulp.task('autowatch', function() {
    gulp.watch("less/*.less", ['less_alternertive']); //当所有less文件发生改变时，调用less任务
    gulp.watch('jade/*.jade', ['jade']);
    // gulp.watch('es6js/*.js', ['babel']);
    // gulp.watch('js/*.js',['concatminjs']);
});

//task list
gulp.task("build", ['autowatch', 'browsersync']);
gulp.task("out", ['concatcss', 'concatjs', 'imgmin', 'replacehtml']);
gulp.task("allmin", ['cssmin', 'concatminjs']);