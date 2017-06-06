import React, { Component } from 'react';
import axios from 'axios';
import { Layout, Menu, Breadcrumb, Icon, Table, Button, Modal, Form, Input } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const FormItem = Form.Item;

const columns = [{
  title: 'Name',
  dataIndex: 'name',
}, {
  title: 'Age',
  dataIndex: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
}];

const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

const AddForm = Form.create()(
    (props) => {
        const { visible, form, onOk, confirmLoading,onCancel } = props;
        const { getFieldDecorator } = form;
        //debugger
        return (
            <Modal title="新增"
            visible={visible}
            onOk={onOk}
            confirmLoading={confirmLoading}
            onCancel={onCancel}
            >                           
            <Form layout='horizontal'>
                <FormItem 
                    label="name" {...{labelCol: {span: 4},wrapperCol: {span: 14}}}
                >
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: '请输入姓名!' }],
                    })(
                        <Input placeholder="请输入姓名" />
                    )}
                </FormItem>
                <FormItem 
                    label="age" {...{labelCol: {span: 4},wrapperCol: {span: 14}}}
                >
                    {getFieldDecorator('age', {
                        rules: [{ required: true, message: '请输入年龄!' }],
                    })(
                        <Input placeholder="请输入年龄" />
                    )}
                </FormItem>
                <FormItem 
                    label="address" {...{labelCol: {span: 4},wrapperCol: {span: 14}}}
                >
                    {getFieldDecorator('address', {
                        rules: [{ required: true, message: '请输入地址!' }],
                    })(
                        <Input placeholder="请输入地址" />
                    )}
                </FormItem>
            </Form>
            </Modal>            
        )
    }
) 

//const wrapedAddForm = Form.create()(AddForm);

class HomeComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedRowKeys: [],  // Check here to configure the default column
            loading: false,
            visible: false,
            data: data
        }
    }
    handleDel = () => {
        //this.setState({ loading: true });
        // ajax request after empty completing
        // setTimeout(() => {
        // this.setState({
        //     selectedRowKeys: [],
        //     loading: false,
            
        // });
        // }, 1000);
        //console.log(this.state.selectedRowKeys)
        let selectedRowKeys = this.state.selectedRowKeys
        let dataPre = this.state.data
        let delNum = selectedRowKeys.length
        for(let i=0;i<delNum;i++) {
            for(let j=0;j<dataPre.length;j++) {
                if(dataPre[j].key == selectedRowKeys[i]) {
                    dataPre.splice(j, 1)
                }
            }
        }
        this.setState({
            data: dataPre
        })
    }
    showModal = () => {
        this.setState({
            visible: true
        })        
    }
    handleOk = () => {
        const form = this.form;
        form.validateFields((err, values) => {
            if (!err) {
                this.setState({
                    confirmLoading: true,
                });
                axios({
                    method: 'get',
                    url: '/success',
                    data: values
                })
                .then((res) => {
                    if(res.data.status == 1)  {
                        form.resetFields();
                        debugger
                        let dataArr = this.state.data;
                        values.key = dataArr.length;
                        dataArr.splice(0, 0, values)
                        this.setState({ 
                            visible: false,
                            data: dataArr
                        });
                    }
                })
            }

        });
    }
    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
    }
    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }
    saveFormRef = (form) => {
        this.form = form;
    }
    render() {
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        return (
            <Layout>
                <Header className="header">
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    style={{ lineHeight: '64px' }}
                >
                    <Menu.Item key="1">nav 1</Menu.Item>
                    <Menu.Item key="2">nav 2</Menu.Item>
                    <Menu.Item key="3">nav 3</Menu.Item>
                </Menu>
                </Header>
                <Layout>
                <Sider width={200} style={{ background: '#fff' }}>
                    <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%' }}
                    >
                    <SubMenu key="sub1" title={<span><Icon type="user" />subnav 1</span>}>
                        <Menu.Item key="1">option1</Menu.Item>
                        <Menu.Item key="2">option2</Menu.Item>
                        <Menu.Item key="3">option3</Menu.Item>
                        <Menu.Item key="4">option4</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" title={<span><Icon type="laptop" />subnav 2</span>}>
                        <Menu.Item key="5">option5</Menu.Item>
                        <Menu.Item key="6">option6</Menu.Item>
                        <Menu.Item key="7">option7</Menu.Item>
                        <Menu.Item key="8">option8</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub3" title={<span><Icon type="notification" />subnav 3</span>}>
                        <Menu.Item key="9">option9</Menu.Item>
                        <Menu.Item key="10">option10</Menu.Item>
                        <Menu.Item key="11">option11</Menu.Item>
                        <Menu.Item key="12">option12</Menu.Item>
                    </SubMenu>
                    </Menu>
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '12px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                        <div style={{ marginBottom: 16 }}>
                            <Button type="primary" onClick={this.showModal}>新增</Button>
                            <Button type="danger" onClick={this.handleDel}
                                disabled={!hasSelected} loading={loading} 
                                style={{marginLeft:10}}
                            >删除</Button>                          
                            <AddForm 
                                ref={this.saveFormRef}
                                visible={this.state.visible}
                                onCancel={this.handleCancel}
                                onOk={this.handleOk}
                                confirmLoading={this.state.confirmLoading}
                            />
                            <span style={{ marginLeft: 8 }}>{hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}</span>
                        </div>
                        <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.data} />
                    </Content>
                </Layout>
                </Layout>
            </Layout>
        )
    }
}



export default HomeComponent;