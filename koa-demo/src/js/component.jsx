import React from 'react';
import reqwest from 'reqwest';
import {Link} from 'react-router-dom';
import {Table, Icon, Layout} from 'antd';
// import Table from 'antd/lib/table';
// import Icon from 'antd/lib/icon';
// import Layout from 'antd/lib/layout';
const {Header, Footer, Sider, Content} = Layout;

class Hello extends React.Component {
    render() {
        return <h1>欢迎张行莅临指导！</h1>;
    }
}

class List extends React.Component {
    state = {
        data: [],
        pagination: {},
        loading: false
    };

    handleTableChange = (pagination, filters, sorter) => {
        const pager = {
            ...this.state.pagination
        };
        pager.current = pagination.current;
        this.setState({pagination: pager});
        this.fetch({
            results: pagination.pageSize,
            page: pagination.current,
            sortField: sorter.field,
            sortOrder: sorter.order,
            ...filters
        });
    };

    fetch = (params = {}) => {
        console.log('params:', params);
        this.setState({loading: true});
        reqwest({
            // url: 'http://localhost:3000/posts',
            url: 'posts',
            method: 'get',
            data: {
                results: 10,
                ...params
            },
            type: 'json'
        }).then((data) => {
            const pagination = {
                ...this.state.pagination
            };
            // Read total count from server pagination.total = data.totalCount;
            pagination.total = data.info.total;
            this.setState({loading: false, data: data.results, pagination});
        });
    };
    componentDidMount() {
        this.fetch();
    }
    render() {
        return (<Table
            columns={columns}
            rowKey={record => record.registered}
            dataSource={this.state.data}
            pagination={this.state.pagination}
            loading={this.state.loading}
            onChange={this.handleTableChange}/>);
    }
}

class Main extends React.Component {
    render() {
        return <div>
            <Layout>
                <Header>
                    <Hello/>
                </Header>
                <Content>
                    <List/>
                </Content>
                {/* <Footer>Footer</Footer> */}
            </Layout>
        </div>
    }
}

class About extends React.Component {
    render() {
        return <div>
            This is about page!
        </div>
    }
}

class Detail extends React.Component {
    state = {
        // info includes: key,type,title,total,version
        info: {},
        urls: []
    };
    fetch = () => {
        reqwest({
            url: '/posts/' + this.props.match.params.key,
            method: 'get'
        }).then((data) => {

            console.log(data);
            this.setState({
                info: data.info,
                urls: data.results
            });
        });
    };
    componentDidMount() {
        this.fetch();
    }
    render() {
        const images = this.state.urls.map((url, index) =>
            <img src={url} width='300px' key={index}/>
        );

        return <div>
            <h1>{this.state.info.title}</h1>
            <p>{this.state.info.type}</p>
            <p>{this.state.info.key}</p>
            <p>{this.state.info.total}</p>
            {images}
        </div>
    }
}

module.exports = {
    Main,
    About,
    Detail
};

const columns = [
    {
        title: '类型',
        dataIndex: 'type'
        // sorter: true, render: name => `${name.first} ${name.last}`, width: '20%'
    }, {
        title: '标题',
        dataIndex: 'title',
        // width: '20%',
        render: (text, record) => (
            <span>
                <Link to={'/detail/' + record.key}>{record.title}</Link>
            </span>
        )
    }, {
        title: 'Action',
        key: 'href',
        render: (text, record) => (
            <span>
                <a target="_blank" href={'/static/' + record.key}>Open In New Tab</a>
            </span>
        )
    }, {
        title: '图片数目',
        dataIndex: 'imageCount'
    }
];
