export const ContactItem = ({ name, number, onDeleteContact }) => {
  return (
    <>
      <p>
        {name}: {number}
      </p>
      <button type="button" onClick={onDeleteContact}>
        Delete
      </button>
    </>
  );
};
