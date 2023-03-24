const permit = async ({
  predicate = async () => false,
  action = async () => {},
  defValue = { error: "Insufficient Permissions" },
}) => {
  if (!(await predicate())) return defValue;
  return await action();
};

const canChangNamePredicate = (user, currentUserEmail) => () =>
  user.isAdmin || user.email == currentUserEmail;

export { permit, canChangNamePredicate };
