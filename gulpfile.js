// gulpと補助パッケージをインストール
const {src, dest, watch, parallel} = require("gulp");
const notify  = require("gulp-notify");
const plumber = require("gulp-plumber");

// pugとstylusをインストール
const pug     = require("gulp-pug");
const stylus  = require("gulp-stylus");


// pug用のタスクを生成
const compilePug = () =>
    src("./pug/*.pug")  // pugファイルの取得
        .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
        .pipe(pug({ pretty: true }))   // pugファイルのコンパイルを実行
        .pipe(dest("./"));         // 生成したhtmlファイルをhtmlディレクトリに保存


// stylus用のタスクを生成
const compileStylus = () =>
    src("./stylus/*.stly")  //stylusファイルの取得
        .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
        .pipe(stylus())       // stylusファイルのコンパイルを実行
        .pipe(dest("./css")); // 生成したcssファイルをcssディレクトリに保存


// pugファイルかstylusファイルに変更がある場合、自動的にコンパイルする
const watchPugs = () =>
    watch("./pug/*.pug", compilePug);

const watchStyluses = () =>
    watch("./stylus/*.stly", compileStylus);


// gulpコマンドを実行したとき、watchPugFilesが実行されるようにする
exports.default = parallel(watchPugs, watchStyluses);
