/**
 * Created by Administrator on 2017/9/1.
 */
import React,{Component} from "react"
import NewsHeader from './news_header'

import '../componentsCss/pc.css'
import NewsFooter from './news_footer'
export default class App extends Component{
    render(){
        return(
            <div>
                <NewsHeader></NewsHeader>
                {this.props.children}
                <NewsFooter></NewsFooter>
            </div>
        )
    }
}