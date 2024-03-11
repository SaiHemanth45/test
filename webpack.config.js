module.exports = {
    // Other configurations...
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        },
        // Other loaders...
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    // Other configurations...
  };
  