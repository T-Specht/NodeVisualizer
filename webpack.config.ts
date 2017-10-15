import { Configuration } from 'webpack';
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';
import * as path from 'path';

const extractSass = new ExtractTextPlugin({
    filename: '[name].css',
    disable: false /* process.env.NODE_ENV === 'development' */
});

const CONFIG: Configuration = {
    entry: path.resolve('src/index.ts'),
    output: {
        filename: 'app.bundle.js',
        path: path.resolve('dist')
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000        
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'awesome-typescript-loader'
            },
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options:{
                                url: false
                            }
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ],
                    // use style-loader in development
                    fallback: 'style-loader'
                })
            },
            /* {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            
                        }
                    }
                ]
            } */
        ]
    },
    plugins: [extractSass]
};

export default CONFIG;
