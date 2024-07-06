const Notification = ({ message, nameclass }) => {
  if (message === null) {
    return null;
  }

  return <div className={nameclass}>{message}</div>;
};

export default Notification;
