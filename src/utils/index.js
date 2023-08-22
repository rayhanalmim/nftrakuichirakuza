export const truncateAddress = (address) => {
  return address.slice(0, 4) + "...." + address.slice(38, 42);
};
