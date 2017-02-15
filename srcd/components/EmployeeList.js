/**
 * Created by taranjeet.s on 1/20/2017.
 */
import _ from 'lodash';
import React, { Component } from 'react';
import EmployeeListItem from './EmployeeListItem';
import { connect } from 'react-redux';
import { ListView, View, Text } from 'react-native';
import { fetchEmployees } from '../actions';

class EmployeeList extends Component {
    componentWillMount() {
        this.props.fetchEmployees();
        console.log(this.props.employees);
        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps) {
        // nextProps are the next set of props that this component
        // will be rendered with
        // this.props is still the old set of props
        this.createDataSource(nextProps);
    }

    createDataSource({ employees }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.dataSource = ds.cloneWithRows(employees);
    }

    renderRow(employee){
        return <EmployeeListItem employee={ employee } ></EmployeeListItem>
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
    const employees = _.map(state.employees.employeelist, (val, uid) => {
        return { ...val,uid };
    });
    return {employees};
}

export default connect(mapStateToProps,{ fetchEmployees })(EmployeeList);
