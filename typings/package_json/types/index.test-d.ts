import { expectType } from "tsd";
import pkg from ".";

expectType<string>(pkg.name);
expectType<string>(pkg.version);
