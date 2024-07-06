const PersonForm = ({
  onSubmit,
  valName,
  valPhone,
  onChangeName,
  onChangePhone,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={valName} onChange={onChangeName} />
      </div>
      <div>
        number: <input value={valPhone} onChange={onChangePhone} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
