import { program } from "commander";
import { gitIgnoreCheck } from "./options/handlers";

const voidScanCLI =
    program.name("voidscan")
        .version("0.0.1")
        .option("-p, --path <directory>", "Root by default")
        .option("-i, --ignore", "Additional path(s) to be ignored")
        .action((options) => {
            gitIgnoreCheck(options.path)
        })

voidScanCLI.parse()