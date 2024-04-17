import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Image,
  MenuItem,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
export default function SignedIn({ signOut }) {
  return (
    <div>
      <MenuItem>
        <Image
          avatar
          spaced="right"
          src="https://images.unsplash.com/photo-1580735785747-379a7e3f5190?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <Dropdown pointing="top right" text="Account">
          <DropdownMenu>
            <DropdownItem text="Sign out" icon="sign-out" onClick={signOut} />
            <DropdownItem as={Link} to="/account" text="Account" icon="user" />
          </DropdownMenu>
        </Dropdown>
      </MenuItem>
    </div>
  );
}
