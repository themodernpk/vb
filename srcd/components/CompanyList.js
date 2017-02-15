/**
 * Created by taranjeet.s on 1/23/2017.
 */
import React, { Component } from 'react';
import CompanyListItem from './CompanyListItem';
import { connect } from 'react-redux';
import { ListView, View, Text } from 'react-native';
import { fetchCompanies } from '../actions';

class CompanyList extends Component {
    componentWillMount() {
        this.props.fetchCompanies();
        this.createDataSource(this.props);
    }
    componentWillReceiveProps(nextProps) {
        // nextProps are the next set of props that this component
        // will be rendered with
        // this.props is still the old set of props
        this.createDataSource(nextProps);
    }
    createDataSource({ companies }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.dataSource = ds.cloneWithRows(companies);
    }
    renderRow(company){
        return <CompanyListItem company={ company } ></CompanyListItem>
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
    /*const companies = _.map(state.companies.companylist, (val, uid) => {
        return { ...val,uid };
    });*/
    const companies = state.companies.companylist;
    return {companies};
}

export default connect(mapStateToProps,{ fetchCompanies })(CompanyList);
