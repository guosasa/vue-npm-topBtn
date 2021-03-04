const path = require('path')
const os = require('os')
const require_path = os.platform() == 'linux' ? '/usr/local/lib/node_modules/' : ''

const { VueLoaderPlugin } = require(require_path + 'vue-loader')
const CleanWebpackPlugin = require(require_path + 'clean-webpack-plugin')
module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'topBtn',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader'
          }
        ]

      },
      // 使用 Babel
      {
        test: /\.js$/, // 支持 js
        exclude: [/node_modules/],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['env']
            }
          }
        ]
      },
      {//字体文件
        test: /\.(ttf|eot|woff|woff2|otf|svg)$/,
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: 'font',
            name: '[name]_[hash:8].[ext]'
          }
        }]
      },
      // 构建 CSS
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              minimize: true
            }
          }
        ]
      },
      // CSS 预处理器
      {
        test: /\.less$/,
        // 因为这个插件需要干涉模块转换的内容，所以需要使用它对应的 loader
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              minimize: false
            }
          },
          'sprites-loader',
          'less-loader'
        ]
      }
    ]
  },
  externals: {
    jquery: {
      commonjs: 'jquery',
      commonjs2: 'jquery',
      amd: 'jquery',
      root: '$'
    }
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],//几个可以忽略后缀的配置
    alias: {
      //定义@符路径指向，减少路径索引
      '@': path.resolve('src')
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(['dist/*'], {
      'root': path.resolve(__dirname, '../'),
      verbose: true,
      dry: false
    })
  ]
}
