import { expectNotAssignable, expectAssignable } from "tsd";
import ".";

expectAssignable<WithNull<number>>(0);
expectAssignable<WithNull<number>>(null);
expectNotAssignable<WithNull<number>>(undefined);
expectNotAssignable<WithNull<number>>(true);

expectAssignable<WithUndefined<string>>("hello");
expectAssignable<WithUndefined<string>>(undefined);
expectNotAssignable<WithUndefined<string>>(null);
expectNotAssignable<WithUndefined<string>>(123);

expectAssignable<Optional<boolean>>(true);
expectAssignable<Optional<boolean>>(undefined);
expectAssignable<Optional<boolean>>(null);
expectNotAssignable<Optional<boolean>>(123);

interface Test {
  a: number;
  b: string;
  c: boolean;
  d: null;
  e: object;
  f: unknown;
}

expectAssignable<RequiredK<Test, "a">>({ a: 123 });
expectNotAssignable<RequiredK<Test, "a">>({});

expectAssignable<PartialK<Test, "a">>({
  b: "",
  c: false,
  d: null,
  e: {},
  f: "",
});
expectNotAssignable<PartialK<Test, "b" | "c" | "d" | "e" | "f">>({});
