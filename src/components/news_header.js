/**
 * Created by Administrator on 2017/9/1.
 */
import React,{Component} from 'react'
import {Link} from 'react-router'
import logo from '../images/logo.png'
import axios from 'axios'
import {
    Row,//行
    Col,//列

    Menu,
    Icon,
    Modal,
    Button,
    Tabs,
    Form,
    Input,
    message




} from 'antd'






//定义组件
const MenuItem = Menu.Item
// 页签项
const TabPane = Tabs.TabPane
// 表单项
const FormItem = Form.Item
class NewsHeader extends Component{

    state={
        username:null,
        modalShow: false,
        selectedKey:'top'


    }

    componentDidMount(){
        const username=localStorage.getItem('username')
        if(username){
            //username如果有值就更新状态
            this.setState({username})
        }
    }
    //模态框
    showModal = (isShow) => {
        this.setState({modalShow: isShow})
    }
    clickMenu = ({key}) => {
        const {selectedKey}=this.state
        // 如果点击的是'登陆/注册'
        if(key==='sigout') {
            // 显示modal
            this.setState({modalShow: true})
        }

        // 更新状态
        this.setState({selectedKey: key})
    }
    handleSubmit=(isLogin)=>{
        const {username, password, r_userName, r_password, r_confirmPassword} = this.props.form.getFieldsValue()
        let url = 'http://newsapi.gugujiankong.com/Handler.ashx?'
        if(isLogin){
            //登录页面
            url += `action=login&username=${username}&password=${password}`

        }else{
            //注册页面
            url += `action=register&r_userName=${r_userName}&r_password=${r_password}&r_confirmPassword=${r_confirmPassword}`

        }
        axios.get(url)
            .then(response => {
                // 清除输入的数据
                this.props.form.resetFields()

                const result = response.data
                if(isLogin) { // 登陆的返回
                    if(!result) { // 失败
                        message.error('登陆失败, 重新登陆')
                    } else { // 成功
                        message.success('登陆成功')
                        // 读取返回的username/userId
                        const username = result.NickUserName
                        const userId = result.UserId
                        // 更新状态
                        this.setState({username})
                        // 保存username/userId
                        localStorage.setItem('username', username)
                        localStorage.setItem('userId', userId)
                    }
                } else { // 注册的返回
                    // 提示成功
                    message.success('注册成功')
                }
            })
        //关闭modal
        this.setState({modalShow: false})
    }
    sigout=()=>{
//gengxinzhuangtai
        this.setState({username:null})
        localStorage.removeItem('username')
        localStorage.removeItem('userId')

    }

    render(){
        const {selectedKey,username,modalShow}=this.state
        const userShow=username?(
            <MenuItem key="sigin" className="register">
                <Icon type="appstore"/>&nbsp;&nbsp;
                <Button type="primary">{username}</Button>&nbsp;&nbsp;
                <Link to="/user_center"><Button type="Dashed">用户中心</Button></Link>&nbsp;&nbsp;
                <Button type="primary" onClick={this.sigout}>退出</Button>
            </MenuItem>
        ):(
        <MenuItem key="sigout" className="register">
            <Icon type="appstore"/>登录/注册

        </MenuItem>
        )
        const { getFieldDecorator} = this.props.form
        return(
            <header>
                <Row>
                    <Col span={1}></Col>
                    <Col span={3}>
                        <a href="#/" className="logo">
                            <img src={logo} alt="logo"/>
                            <span>ReactNews</span>
                        </a>
                    </Col>
                    <Col span={19}>
                        <Menu mode="horizontal" onClick={this.clickMenu} selectedKeys={[selectedKey]}>
                            <MenuItem key="top">
                                <Icon type="appstore"/>头条
                            </MenuItem>
                            <MenuItem key="shehui">
                                <Icon type="appstore"/>社会
                            </MenuItem>
                            <MenuItem key="guonei">
                                <Icon type="appstore"/>国内
                            </MenuItem>
                            <MenuItem key="guoji">
                                <Icon type="appstore"/>国际
                            </MenuItem>
                            <MenuItem key="yule">
                                <Icon type="appstore"/>娱乐
                            </MenuItem>
                            <MenuItem key="tiyu">
                                <Icon type="appstore"/>体育
                            </MenuItem>
                            <MenuItem key="keji">
                                <Icon type="appstore"/>科技
                            </MenuItem>
                            <MenuItem key="shishang">
                                <Icon type="appstore"/>时尚
                            </MenuItem>
                            {userShow}

                        </Menu>
                            {/*//登录注册模态框*/}

                            <Modal title='用户中心'
                                visible={modalShow}
                                onOk={this.showModal.bind(this,false)}
                                onCancel={()=>this.showModal(false)}
                                   okText='关闭'
                                   cancelText='取消'
                                >
                                <Tabs type="card" onChange={()=> this.props.form.resetFields}>
                                    <TabPane tab="Tab 1" key="1">
                                        <Form onSubmit={this.handleSubmit.bind(this,true)}>
                                            <FormItem label='用户名'>
                                                {
                                                    getFieldDecorator('username')(
                                                        <Input type='text' placeholder="请输入用户名" />
                                                    )
                                                }
                                            </FormItem>
                                            <FormItem label='密码'>
                                                {
                                                    getFieldDecorator('password')(
                                                        <Input type='password' placeholder="请输入密码" />
                                                    )
                                                }
                                            </FormItem>
                                            <Button type='primary' htmlType='submit'>登录</Button>

                                        </Form>

                                    </TabPane>
                                    <TabPane tab="Tab 2" key="2">
                                        <Form onSubmit={this.handleSubmit.bind(this,false)}>
                                            <FormItem label='用户名'>
                                                {
                                                    getFieldDecorator('r_userName')(
                                                        <Input type='text' placeholder="请输入用户名" />
                                                    )
                                                }
                                            </FormItem>
                                            <FormItem label='密码'>
                                                {
                                                    getFieldDecorator('r_password')(
                                                        <Input type='password' placeholder="请输入密码" />
                                                    )
                                                }
                                            </FormItem>
                                            <FormItem label='确认密码'>
                                                {
                                                    getFieldDecorator('r_confirmPassword')(
                                                        <Input type='password' placeholder="请确认输入密码" />
                                                    )
                                                }
                                            </FormItem>
                                            <Button type='primary' htmlType='submit'>注册</Button>

                                        </Form>

                                    </TabPane>


                                </Tabs>


                            </Modal>

                    </Col>
                    <Col span={1}>

                    </Col>

                </Row>
            </header>
        )
    }
}
export default Form.create()(NewsHeader)