import chalk from "chalk";

const compose = (...fns) => x => fns.reduceRight((c, f) => f(c), x);
let display = (...items) => items.forEach(item => console.log(item)); 

let title = (data) => compose(chalk.bgWhite, chalk.bold, chalk.black)(data);
let body = (data) => compose(chalk.yellow)(data);
let error = (data) => compose(chalk.bgBlack, chalk.red)(data);
let conf = (data) => compose(chalk.greenBright, chalk.green)(data);

let colorize = {title, body, error, conf}
export { compose, display, colorize};
