const Filter = ({ showSome, handle }) => {
  return (
    <form>
      <div>
        filter shown with: <input value={showSome} onChange={handle} />
      </div>
    </form>
  );
};

export default Filter;
