function getNameByRepository(address) {
  if (typeof address === "string") {
    const splitAddress = address.split("/");
    const moduleName =
      splitAddress && splitAddress.length > 0
        ? splitAddress[splitAddress.length - 1]
        : null;
    const realModuleName = moduleName.replace(".git", "");
    const name =
      realModuleName.split("-")[realModuleName.split("-").length - 1];
    if (
      moduleName &&
      (moduleName.startsWith("sub-application-") ||
        moduleName.startsWith("application-")) &&
      moduleName.endsWith(".git")
    ) {
      let packageName = null;
      moduleName.startsWith("sub-application-")
        ? (packageName = `sub-application-${realModuleName}`)
        : (packageName = `application-${realModuleName}`);
      return {
        name,
        moduleName: realModuleName,
        packageName: packageName,
      };
    } else {
      throw new Error("git地址不合法!, 仓库名称命名不规范, 请查阅地址.eg xxx");
    }
  } else {
    throw new Error("git地址不合法!");
  }
}

module.exports = {
  getNameByRepository,
};
