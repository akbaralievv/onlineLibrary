const changePassword = (password) => {
  const startInfo = password.slice(0, password.length - 2);
  const endInfo = password.slice(password.length - 2);
  // console.log(startInfo);
  // console.log(endInfo);
  const result =
    startInfo
      ?.split("")
      .map((i) => {
        return (i = "*");
      })
      ?.join()
      ?.replace(/,/g, "") + endInfo;
  // console.log(result);
  return result;
};
export default changePassword;
