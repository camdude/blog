export const createFragmentId = (id) => {
  return id.replace(/\s+/g, "-").toLowerCase();
};
