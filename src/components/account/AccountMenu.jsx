import React from "react";

const AccountMenu = React.forwardRef((props, ref) => {
  return (
    <div className="account-menu selectable" ref={ref}>
      <p className="btn">Logout</p>
      <div className="vertical-divider"></div>
    </div>
  );
});

export default AccountMenu;
