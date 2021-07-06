import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';
import web3 from './ethereum/web3';
import factory from './ethereum/factory';
import Layout from './components/Layout';
import { Link } from './routes';

class ClientIndex extends Component {
  static async getInitialProps() {
    const clients = await factory.methods.getDeployedClients().call();

    return { clients };
  }

  renderClients() {
    const items = this.props.clients.map(address => {
      return {
        header: address,
        description: (
          <Link route={`/clients/${address}`}>
            <a>View Client</a>
          </Link>
        ),
        fluid: true
      };
    });

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <div>
          <h3>Open Clients</h3>

          <Link route="/clients/new">
            <a>
              <Button
                floated="right"
                content="Create Client"
                icon="add circle"
                primary
              />
            </a>
          </Link>

          {this.renderClients()}
        </div>
      </Layout>
    );
  }
}

export default ClientIndex;