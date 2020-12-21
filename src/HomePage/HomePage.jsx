import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';

class HomePage extends React.Component {
    componentDidMount() {
        this.props.getUsers();
        this.props.getProperties();
    }

    handleDeleteUser(id) {
        return (e) => this.props.deleteUser(id);
    }

    render() {
        const { user, users } = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Welcome back {user.firstName}!</h1>
                <h3>Properties available in your area </h3>
                {users.data &&
                    <table>
                        <tr>
                            <th>Address</th>
                            <th>City</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                        </tr>
                        {users.data.map((data, index) =>
                            <tr key={data.id}>
                                <td>{JSON.stringify(data.property.address.addressLine1)}</td>
                                <td>{JSON.stringify(data.property.address.city)}</td>
                                <td>{JSON.stringify(data.property.primaryOwner.user.firstName)}</td>
                                <td>{JSON.stringify(data.property.primaryOwner.user.lastName)}</td>
                                <td>{JSON.stringify(data.property.primaryOwner.user.email)}</td>
                            </tr>
                        )}
                    </table>
                }
                <p>
                    <Link to="/login">Logout</Link>
                </p>
            </div>
        );
    }
}

function mapState(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return { user, users };
}

const actionCreators = {
    getUsers: userActions.getAll,
    deleteUser: userActions.delete,
    getProperties: userActions.getProperties
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };