import "dotenv/config";

const port = process.env.PORT;
const password = process.env.PASSWORDMONGO;

export default { password, port };
