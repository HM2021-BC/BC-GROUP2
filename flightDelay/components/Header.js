import React from 'react';
import { Menu, Button } from 'semantic-ui-react';
import { Link } from '../routes';

const Header = () => {
  return (
    <div>
      <Menu style={{ marginTop: '10px' }}>
        <Link route="/">
          <a className="item">
            <h4>Insurance</h4>
          </a>
        </Link>

        <Menu.Menu position="right">
          <Link route="/clients/new">
            <a className="item">
              <Button
                floated="right"
                content="Create Claim"
                icon="add circle"
                primary
              />
            </a>
          </Link>
        </Menu.Menu>
      </Menu>
      <br />
    </div>
  );
};

export default Header;