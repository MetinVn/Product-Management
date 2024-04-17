import { Icon, Label } from "semantic-ui-react";
export default function UserAccount() {
  const storedValues = JSON.parse(localStorage.getItem("userForm"));
  const registeredValues = JSON.parse(localStorage.getItem("userReg"));
  return (
    <div>
      <h2>User credentials:</h2>
      <Label as="a">
        <Icon name="mail" />
        {storedValues?.email || registeredValues?.email}
      </Label>
      <Label as="a">
        <Icon name="lock" />
        {storedValues?.password || registeredValues?.password}
      </Label>
    </div>
  );
}
