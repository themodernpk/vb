/**
 * Created by taranjeet.s on 1/24/2017.
 */
import React, { Component } from 'react';
import VisitorListItem from './VisitorListItem';
import { connect } from 'react-redux';
import { ListView, View, Text } from 'react-native';
import { fetchVisitors } from '../../actions';

class VisitorList extends Component {
    componentWillMount() {
        const { company_slug } = this.props;
        this.props.fetchVisitors(company_slug);
        this.createDataSource(this.props);
    }
    componentWillReceiveProps(nextProps) {
        // nextProps are the next set of props that this component
        // will be rendered with
        // this.props is still the old set of props
        this.createDataSource(nextProps);
    }
    createDataSource({ visitors }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.dataSource = ds.cloneWithRows(visitors);
    }
    renderRow(visitor){
        return <VisitorListItem visitor={ visitor } ></VisitorListItem>
    }
    render() {

        return (
            <ListView enableEmptySections
                      dataSource={this.dataSource}
                      renderRow = {this.renderRow}>
            </ListView>
        );
    }
}
function mapStateToProps(state) {
    const visitors = state.companies.visitorlist;
    return {visitors};
}

export default connect(mapStateToProps,{ fetchVisitors })(VisitorList);
