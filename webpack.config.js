const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    index: "./src/index.js",
    // another: "./src/another-module.js",
  },
  output: {
    path: path.resolve(__dirname, "ConvoxMeetConference"),
    filename: "[name].bundle.js",
  },
  devServer: {
    port: 3010,
    watchContentBase: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(jpe?g|gif|png|svg)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  // devtool: 'eval-cheap-source-map',
};

// const path = require("path");
// // var HtmlWebpackPlugin = require('html-webpack-plugin');
// module.exports = {
//     //entry: './src/index.js',
//     // entry: ['regenerator-runtime/runtime.js', './src/index.js'],
//     output: {
//         path: path.join(__dirname, '/ConvoxMeetConference'),  //here actually path instead of resolve there replace /public to /convoxmeet
//         filename: 'index.bundle.js',
        
//     },
//     devServer:{
//       port: 3010,
//       watchContentBase: true,
//    },
//     module:{
//         rules:[
//             {
//                 test: /\.jsx?$/, // match both .js and .jsx files
//                 exclude: /node_modules/,
//                 use: {
//                     loader: 'babel-loader',
//                     // options: {
//                     //     presets: [
//                     //       '@babel/preset-env',
//                     //       '@babel/preset-react' // add the preset here
//                     //     ]
//                     //   }
                    
//                 }

//             },
//             {
//                 test: /\.css$/,
//                 use: ['style-loader', 
//                       'css-loader'
//                     ]
//             },
//             {
//                 test: /\.(jpe?g|gif|png|svg)$/i,
//                 use: [
//                   {
//                     loader: 'url-loader',
//                     options: {
//                       limit: 10000
//                     }
//                   }
//                 ]
//               }
             
//         ]
//     },
//     resolve: {
//         extensions: ['', '.js', '.jsx'],
//       },
//     //devtool: 'eval-cheap-source-map',
   
    
// }