import { Button, MenuItem } from "semantic-ui-react";

export default function SignedOut({ signIn, signOut }) {
  return (
    <div>
      <MenuItem>
        <Button primary onClick={signIn}>
          Log in
        </Button>
        <Button primary onClick={signOut} style={{ marginLeft: "0.5em" }}>
          Register
        </Button>
      </MenuItem>
    </div>
  );
}
